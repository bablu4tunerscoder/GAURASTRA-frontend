import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddBulkCartMutation } from "@/store/api/cartApi";
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

    // const [addToCart] = useAddToCartMutation();

    // uncomment this if you want to use bulk cart

    const [addToCartBulk] = useAddBulkCartMutation();
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

    // console.log(localCartItems)
    const syncCart = async () => {
        try {
            // Flatten all variants from all products
            const itemsToSync = [];

            localCartItems.forEach((product) => {
                itemsToSync.push({ sku: product.sku, quantity: product.quantity, product_id: product.product_id });
            });

            if (itemsToSync.length === 0) return;



            // Add all items to cart via API
            // const promises = itemsToSync.map((item) =>
            //     addToCart(item).unwrap()
            // );

            // uncomment this if you want to use bulk cart
            console.log(itemsToSync)
            await addToCartBulk({ items: itemsToSync }).unwrap();

            // await Promise.all(promises);

            // Clear local storage after successful sync
            dispatch(clearCartLocal());

            // ✅ Trigger a refetch of the cart to update Redux state
            dispatch(cartApi.util.invalidateTags(["Cart"]));

            toast.success(`${itemsToSync.length} item(s) synced to your cart`);
        } catch (error) {
            console.error("Failed to sync cart:", error);
            toast.error("Some items failed to sync");
        }
    };
};