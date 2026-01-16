"use client";
import React, { useState } from "react";
import {
    useGetWishlistItemsQuery,
    useDeleteWishlistItemMutation,
    useClearWishlistMutation,
} from "@/store/api/wishlistApi";
import toast from "react-hot-toast";
import Image from "next/image";
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import ProductAddToCartModal from "@/components/ProductAddToCartModal";
import Link from "next/link";

const Wishlist = () => {
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // QUERY: auto fetch wishlist
    const { data: items = [], isLoading } = useGetWishlistItemsQuery();

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
            toast.success("Wishlist cleared ✅");
        } catch (err) {
            toast.error("Failed to clear wishlist ❌");
        }
    };

    // HANDLE ADD TO CART - Open Modal
    const handleAddToCart = (item) => {
        setSelectedProduct(item);
        setIsModalOpen(true);
    };

    // HANDLE CLOSE MODAL
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Image
                src="/assets/wishlist-banner.png"
                alt="Background"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
            />

            {/* EMPTY STATE */}
            {!items?.data?.length ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                        <Heart className="w-10 h-10 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Your wishlist is empty
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm">
                        Save items you love to your wishlist and come back to them anytime.
                    </p>
                    <Link
                        href="/category/all-products"
                        className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary/90 transition"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                /* WISHLIST ITEMS */
                <div className="md:p-10 p-2 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Product Wishlist</h1>
                        <button
                            onClick={handleClear}
                            disabled={clearing}
                            className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded disabled:opacity-50 transition"
                        >
                            {clearing ? "Clearing..." : "Clear Wishlist"}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {/* HEADER */}
                        <div className="grid grid-cols-12 items-center bg-pink-100 px-4 py-3 rounded text-sm font-medium text-gray-700">
                            <div className="col-span-8">Product</div>
                            <div className="col-span-4 text-center">Action</div>
                        </div>

                        {/* WISHLIST ITEMS */}
                        {items.data.map((item) => {
                            const pricing = item.variants[0]?.pricing || {};
                            const originalPrice = pricing.original_price || 0;
                            const discountedPrice = pricing.discounted_price || 0;

                            const hasDiscount =
                                originalPrice > 0 && discountedPrice > 0 && discountedPrice < originalPrice;

                            const discountPercent = hasDiscount
                                ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
                                : 0;

                            return (
                                <div
                                    key={item._id}
                                    className="grid grid-cols-12 items-center md:px-4 md:py-5 px-2 py-3 border-b hover:bg-gray-50 transition"
                                >
                                    {/* PRODUCT */}
                                    <div className="col-span-8 flex items-center gap-4">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={
                                                    item.variants[0]?.images?.[0]?.image_url ||
                                                    "/placeholder.png"
                                                }
                                                alt={item.product_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-1 line-clamp-2">
                                                {item.product_name}
                                            </h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    Color:
                                                    <span className="font-medium text-gray-700">
                                                        {item.variants[0]?.attributes?.color}
                                                    </span>
                                                </p>
                                                <span className="text-gray-300">•</span>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    Size:
                                                    <span className="font-medium text-gray-700">
                                                        {item.variants[0]?.attributes?.size}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* PRICE */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-lg md:text-xl font-bold text-primary">
                                                    ₹{discountedPrice || originalPrice}
                                                </span>

                                                {hasDiscount && (
                                                    <>
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ₹{originalPrice}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                                            {discountPercent}% OFF
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="col-span-4 flex items-center justify-end md:gap-3 gap-2">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="flex items-center gap-2 bg-primary text-white md:px-4 md:py-2.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary/90 transition shadow-sm"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            <span className="hidden md:inline">Add to Cart</span>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            disabled={deleting}
                                            className="p-2.5 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="w-5 h-5" strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Product Add to Cart Modal */}
            <ProductAddToCartModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Wishlist;