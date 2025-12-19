"use client";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function NewArrivalsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = [
        { id: 1, image: "/assets/trendingnow01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
        { id: 2, image: "/assets/trendingnow02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
        { id: 3, image: "/assets/trendingnow03.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
        { id: 4, image: "/assets/trendingnow04.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
        { id: 5, image: "/assets/trendingnow01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
        { id: 6, image: "/assets/trendingnow02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    ];

    const VISIBLE_CARDS = 4;

    const handlePrev = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentSlide((prev) =>
            Math.min(prev + 1, products.length - VISIBLE_CARDS)
        );
    };

    return (
        <section className="px-4 md:px-16 my-12">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#6b3f2c]">
                    New Arrivals
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentSlide === 0}
                        className="w-12 h-12 rounded-full bg-red-700 disabled:opacity-40 text-white flex items-center justify-center shadow-lg"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentSlide >= products.length - VISIBLE_CARDS}
                        className="w-12 h-12 rounded-full bg-red-700 disabled:opacity-40 text-white flex items-center justify-center shadow-lg"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* CAROUSEL */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-10 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 280}px)`,
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[300px] max-w-[300px] overflow-hidden  relative"
                        >
                            {/* Wishlist */}
                            <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
                            </button>

                            {/* Image */}
                            <div className="relative h-[320px] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                />
                            </div>

                            {/* Info */}
                            <div>

                                <span className="text-xs font-semibold text-[#562E16]">
                                    {product.badge}
                                </span>
                                <h3 className="font-bold text-gray-800 line-clamp-2">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600">{product.material}</p>
                                <p className="font-bold text-md mt-1">
                                    M.R.P {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
