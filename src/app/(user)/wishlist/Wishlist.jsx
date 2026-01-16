"use client";
import React, { useState } from "react";
import {
    useGetWishlistItemsQuery,
    useDeleteWishlistItemMutation,
    useClearWishlistMutation,
    useAddWishlistItemMutation,

} from "@/store/api/wishlistApi";
import toast from "react-hot-toast";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import ProductAddToCartModal from "@/components/ProductAddToCartModal";

const Wishlist = () => {
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // QUERY: auto fetch wishlist
    const { data: items = [], isLoading } = useGetWishlistItemsQuery();

    if (!isLoading) {
        console.log(items);
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
            toast.success("Wishlist cleared ✅");
        } catch (err) {
            toast.error("Failed to clear wishlist ❌");
        }
    };

    const variant = items?.data?.flatMap((item) => item.variants)[0] || [];

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
            <div className="md:p-10 p-2 bg-white">
                <h1 className="text-2xl font-semibold mb-6">Product Wishlist</h1>

                {/* HEADER */}
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-12 items-center bg-pink-100 px-4 py-3 rounded text-sm font-medium text-gray-700">
                        <div className="col-span-6 flex items-center gap-2">
                            <input type="checkbox" />
                            <span>Product</span>
                        </div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-2">Stock</div>
                        <div className="col-span-2 text-center">Action</div>
                    </div>

                    {/* ROWS */}
                    {items?.data?.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 items-center md:px-4 md:py-5 px-2 py-3 border-b"
                        >
                            {/* PRODUCT */}
                            <div className="col-span-6 flex items-center gap-4">
                                <input type="checkbox" />
                                <img
                                    src={variant?.images[0]?.image_url || "/placeholder.png"}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div>
                                    <h3 className="font-medium text-xs md:text-md text-gray-800">
                                        {item.product_name}
                                    </h3>
                                    <p className="md:text-xs text-[10px] text-gray-500">
                                        Color : {item.variants[0]?.attributes?.color}
                                    </p>
                                    <p className="md:text-xs text-[10px] text-gray-500">
                                        Size : {item.variants[0]?.attributes?.size}
                                    </p>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="col-span-2 text-sm text-blue-700 font-medium">
                                ₹{item.variants[0]?.pricing?.discounted_price}
                            </div>

                            {/* STOCK */}
                            <div className="col-span-2 text-green-600 text-sm">
                                <input
                                    type="checkbox"
                                    checked={item.variants[0]?.stock?.is_available}
                                    className="accent-green-700 w-4 h-4"
                                    readOnly
                                />
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-2 flex items-center justify-center md:gap-4 gap-1">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="flex text-nowrap items-center gap-2 bg-primary/90 text-white md:px-4 md:py-2 px-2 py-1 rounded text-xs hover:bg-primary"
                                >
                                    <ShoppingCart className="md:w-5 md:h-5 w-4 h-4" />
                                    <span className="lg:block hidden">ADD TO CART</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="hover:text-white text-primary md:px-4 md:py-2 px-2 py-1 rounded duration-300 bg-primary/10 hover:bg-primary"
                                >
                                    <Trash2 className="md:w-5 md:h-5 w-4 h-4" strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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