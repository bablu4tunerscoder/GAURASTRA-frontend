"use client";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Heading from "./Heading";

export default function CarouselCard({ title, products }) {
    const [currentSlide, setCurrentSlide] = useState(0);

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
        <>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <Heading title={title} />

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
                            <button className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
                            </button>

                            {/* Image */}
                            <div className="relative h-[380px] overflow-hidden bg-[url('/assets/bgImageContainer.png')] p-4 bg-no-repeat">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="pt-2">

                                <span className=" text-secondary text-sm">
                                    {product.badge}
                                </span>
                                <h3 className="font-bold line-clamp-2 text-xl">
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
        </>
    );
}
