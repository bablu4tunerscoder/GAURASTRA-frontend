import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { clearCartLocal } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";
import { cartApi } from "@/store/api/cartApi"; // ✅ Import to trigger refetch

/**
 * Custom hook to automatically sync local cart to server when user logs in
 * Place this in your root layout or App component
 */
export const useCartSync = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth || {});
    const { items: localCartItems } = useSelector((state) => state.cart || {});

    const [addToCart] = useAddToCartMutation();
    const hasSynced = useRef(false);

    useEffect(() => {
        // Only sync once when user logs in and has items in local cart
        if (user && localCartItems.length > 0 && !hasSynced.current) {
            syncCart();
            hasSynced.current = true;
        }

        // Reset sync flag when user logs out
        if (!user) {
            hasSynced.current = false;
        }
    }, [user, localCartItems]);

    const syncCart = async () => {
        try {
            // Flatten all variants from all products
            const itemsToSync = [];

            localCartItems.forEach((product) => {
                product.variants.forEach((variant) => {
                    itemsToSync.push({
                        product_id: product._id,
                        sku: variant.sku,
                        quantity: variant.quantity || 1,
                    });
                });
            });

            if (itemsToSync.length === 0) return;

            // Add all items to cart via API
            const promises = itemsToSync.map((item) =>
                addToCart(item).unwrap()
            );

            await Promise.all(promises);

            // Clear local storage after successful sync
            dispatch(clearCartLocal());
            localStorage.removeItem("cart_items");

            // ✅ Trigger a refetch of the cart to update Redux state
            dispatch(cartApi.util.invalidateTags(["Cart"]));

            toast.success(`${itemsToSync.length} item(s) synced to your cart`);
        } catch (error) {
            console.error("Failed to sync cart:", error);
            toast.error("Some items failed to sync");
        }
    };
};