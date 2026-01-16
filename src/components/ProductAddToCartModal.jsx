import React, { useState, useMemo, useEffect } from "react";
import { X, Handbag } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "@/store/slices/cartSlice";
import {
    useGetCartQuery,
    useAddToCartMutation,
    useIncreaseCartMutation,
    useDecreaseCartMutation
} from "@/store/api/cartApi";

const DEFAULT_IMAGE = "/assets/default-product.png";

const ProductAddToCartModal = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

    const [increaseCart] = useIncreaseCartMutation();
    const [decreaseCart] = useDecreaseCartMutation();
    const [addToCart] = useAddToCartMutation();


    // Modal state - MUST be declared before any conditional returns
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const variants = product?.variants || [];
    const defaultVariant = variants[0];

    // ================== VARIANT LOGIC ==================
    const uniqueColors = useMemo(
        () => [...new Set(variants.map((v) => v?.attributes?.color).filter(Boolean))],
        [variants]
    );

    const uniqueSizes = useMemo(
        () => [...new Set(variants.map((v) => v?.attributes?.size).filter(Boolean))],
        [variants]
    );

    const sizesByColor = useMemo(() => {
        const map = {};
        uniqueColors.forEach((color) => {
            map[color] = [
                ...new Set(
                    variants
                        .filter((v) => v?.attributes?.color === color)
                        .map((v) => v?.attributes?.size)
                        .filter(Boolean)
                ),
            ];
        });
        return map;
    }, [uniqueColors, variants]);

    const colorsBySize = useMemo(() => {
        const map = {};
        uniqueSizes.forEach((size) => {
            map[size] = [
                ...new Set(
                    variants
                        .filter((v) => v?.attributes?.size === size)
                        .map((v) => v?.attributes?.color)
                        .filter(Boolean)
                ),
            ];
        });
        return map;
    }, [uniqueSizes, variants]);

    const currentVariant = useMemo(
        () =>
            variants.find(
                (v) =>
                    v?.attributes?.color === selectedColor &&
                    v?.attributes?.size === selectedSize
            ) || defaultVariant,
        [selectedColor, selectedSize, variants, defaultVariant]
    );

    const availableSizes = useMemo(() => {
        if (!selectedColor) return uniqueSizes;
        return sizesByColor[selectedColor] || [];
    }, [selectedColor, uniqueSizes, sizesByColor]);

    const availableColors = useMemo(() => {
        if (!selectedSize) return uniqueColors;
        return colorsBySize[selectedSize] || [];
    }, [selectedSize, uniqueColors, colorsBySize]);

    // ================== PRICING ==================
    const modalDiscountedPrice = currentVariant?.pricing?.discounted_price || 0;
    const modalOriginalPrice = currentVariant?.pricing?.original_price || 0;
    const modalDiscountPercent = modalOriginalPrice > 0
        ? Math.round(((modalOriginalPrice - modalDiscountedPrice) / modalOriginalPrice) * 100)
        : 0;

    // ================== STOCK ==================
    const stockQuantity = currentVariant?.stock?.stock_quantity || 0;
    const isAvailable = currentVariant?.stock?.is_available ?? true;

    // ================== IMAGES ==================
    const variantImages = currentVariant?.images || defaultVariant?.images || [];
    const displayImage = variantImages.length > 0
        ? variantImages[0]?.image_url?.startsWith("http")
            ? variantImages[0].image_url
            : `https://backend.gaurastra.com${variantImages[0].image_url}`
        : DEFAULT_IMAGE;

    // ================== HANDLERS ==================
    const handleColorChange = (color) => {
        setSelectedColor(color);
        const availableSizesForColor = sizesByColor[color] || [];
        if (availableSizesForColor.length > 0 && !availableSizesForColor.includes(selectedSize)) {
            setSelectedSize(availableSizesForColor[0]);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        const availableColorsForSize = colorsBySize[size] || [];
        if (availableColorsForSize.length > 0 && !availableColorsForSize.includes(selectedColor)) {
            setSelectedColor(availableColorsForSize[0]);
        }
    };

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select color and size");
            return;
        }

        if (!isAvailable || quantity > stockQuantity) {
            toast.error(`Only ${stockQuantity} items in stock!`);
            return;
        }

        if (!currentVariant) {
            toast.error("Selected variant not found");
            return;
        }

        const { variants: _, selected_variant: __, ...rest } = product;

        const variantWithQuantity = {
            ...currentVariant,
            quantity: quantity,
        };

        const cartPayload = {
            ...rest,
            variant: variantWithQuantity,
        };

        if (!isLoggedIn) {
            dispatch(addToCartLocal(cartPayload));
            toast.success("Item added to Cart");
            handleClose();
            return;
        }

        // Add your API call here for logged-in users

        toast.success("Item added to bag");
        handleClose();
    };

    const handleClose = () => {
        setSelectedColor("");
        setSelectedSize("");
        setQuantity(1);
        onClose();
    };

    // Initialize selections on open
    useEffect(() => {
        if (isOpen && uniqueColors.length > 0 && uniqueSizes.length > 0) {
            setSelectedColor(uniqueColors[0]);
            setSelectedSize(uniqueSizes[0]);
            setQuantity(1);
        }
    }, [isOpen, uniqueColors, uniqueSizes]);

    // NOW we can conditionally render after all hooks are called
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="z-10 w-full max-w-2xl mx-4 bg-white animate-fadeIn">
                {/* Close Button */}
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-semibold">Add to Cart</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded border text-primary border-primary hover:bg-primary hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200"></div>

                <div className="p-6">
                    {/* Top Section: Image + Details */}
                    <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-1/4">
                            <img
                                src={displayImage}
                                alt={product?.product_name}
                                className="w-full h-auto object-cover"
                                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">{product?.product_name}</h2>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">₹{modalDiscountedPrice}</span>
                                {modalDiscountedPrice < modalOriginalPrice && (
                                    <span className="text-gray-400 text-sm line-through">
                                        MRP ₹{modalOriginalPrice}
                                    </span>
                                )}
                                {modalDiscountPercent > 0 && (
                                    <span className="text-red-600 font-medium">
                                        {modalDiscountPercent}% off
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="flex text-yellow-400">
                                    <span>★★★★</span>
                                    <span className="text-gray-300">★</span>
                                </div>
                                <span className="text-gray-500 text-sm">4.5 (212 reviews)</span>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedColor || !selectedSize}
                                className="w-full flex items-center justify-center gap-2 bg-primary/90 text-white py-3 rounded-lg hover:bg-primary transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-2"
                            >
                                <Handbag className="w-5 h-5" />
                                ADD TO CART
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-4 mb-3" />

                    {/* Bottom Section: Selections & Info */}
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-3">
                            {/* Size Selection */}
                            <div className="flex gap-2 items-center flex-wrap">
                                <span className="font-medium">Size:</span>
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeChange(size)}
                                        className={`px-6 py-1 font-medium rounded border-2 transition-all ${selectedSize === size
                                            ? "bg-primary text-white border-primary"
                                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Color Selection */}
                            <div className="flex gap-2 items-center flex-wrap">
                                <span className="font-medium">Color:</span>
                                {availableColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`relative w-8 h-8 p-0.5 rounded-full overflow-hidden transition-all border-2 ${selectedColor === color
                                            ? "ring-2 ring-primary border-primary"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <div
                                            style={{ backgroundColor: color }}
                                            className="w-full h-full rounded-full"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Stock Info */}
                            {stockQuantity > 0 && stockQuantity <= 5 && (
                                <div className="text-sm text-orange-600">
                                    Only {stockQuantity} left in stock!
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="text-sm text-gray-600">FREE Delivery Sat 17 Jan</div>
                            <Link
                                href={`/product-details/${product?.slug}`}
                                className="text-green-600 hover:underline cursor-pointer text-sm"
                            >
                                See item details
                            </Link>
                            <button
                                onClick={handleClose}
                                className="px-6 py-1 cursor-pointer border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAddToCartModal;