import { clearCartLocal } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";

/**
 * Syncs local cart items to the server when user logs in
 * @param {Array} localCartItems - Items from local storage
 * @param {Function} addToCartMutation - RTK Query mutation function
 * @param {Function} dispatch - Redux dispatch function
 */
export const syncCartOnLogin = async (localCartItems, addToCartMutation, dispatch) => {
    if (!localCartItems || localCartItems.length === 0) {
        return;
    }

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

        // Add all items to cart via API
        const promises = itemsToSync.map((item) =>
            addToCartMutation(item).unwrap()
        );

        await Promise.all(promises);

        // Clear local storage after successful sync
        dispatch(clearCartLocal());
        localStorage.removeItem("cart_items");

        toast.success(`${itemsToSync.length} item(s) synced to your cart`);
    } catch (error) {
        console.error("Failed to sync cart:", error);
        toast.error("Failed to sync cart items");
    }
};