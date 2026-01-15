"use client";
import React from "react";
import {
    useGetWishlistItemsQuery,
    useDeleteWishlistItemMutation,
    useClearWishlistMutation,
} from "@/store/api/wishlistApi";
import toast from "react-hot-toast";

const Wishlist = () => {
    // QUERY: auto fetch wishlist
    const { data: items = [], isLoading, refetch } = useGetWishlistItemsQuery();

    if (!isLoading) {
        console.log(items)
    }
    // MUTATIONS
    const [deleteWishlistItem, { isLoading: deleting }] =
        useDeleteWishlistItemMutation();
    const [clearWishlist, { isLoading: clearing }] =
        useClearWishlistMutation();

    // HANDLE DELETE
    const handleDelete = async (wishlist_id) => {
        try {
            await deleteWishlistItem(wishlist_id).unwrap();
            toast.success("Item removed from wishlist ✅");
        } catch (err) {
            toast.error("Failed to remove item ❌");
        }
    };

    // HANDLE CLEAR
    const handleClear = async () => {
        try {
            await clearWishlist().unwrap();
            refetch();
            toast.success("Wishlist cleared ✅");
        } catch (err) {
            toast.error("Failed to clear wishlist ❌");
        }
    };


    const variant = items?.data?.flatMap((item) => item.variants)[0] || [];



    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">My Wishlist</h1>

                {/* {items?.data?.length > 0 && ( */}
                <button
                    onClick={handleClear}
                    disabled={clearing}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                    {clearing ? "Clearing..." : "Clear Wishlist"}
                </button>
                {/* )} */}
            </div>

            {/* LOADING */}
            {isLoading && (
                <div className="text-center py-10 text-gray-500">
                    Loading wishlist...
                </div>
            )}

            {/* EMPTY */}
            {!isLoading && items?.data?.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    Your wishlist is empty ❤️
                </div>
            )}

            {/* LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items?.data?.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center gap-4 border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <img
                            src={variant?.images[0]?.image_url || "/placeholder.png"}
                            alt={item.product?.name}
                            className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800">
                                {item.product_name}
                            </h3>

                            {variant.sku && (
                                <p className="text-xs text-gray-500 mt-1">
                                    SKU: {variant.sku}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deleting}
                            className="text-red-500 hover:text-red-600 text-sm font-medium"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
