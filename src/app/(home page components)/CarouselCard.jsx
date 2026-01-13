"use client";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Heading from "./Heading";

export default function CarouselCard({ title, products }) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef(null);

    // Check scroll position
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const cardWidth = window.innerWidth < 768 ? 160 : window.innerWidth < 1024 ? 240 : 280;
        const gap = window.innerWidth < 768 ? 24 : 40;
        const visibleCards = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
        const scrollAmount = (cardWidth + gap) * visibleCards;

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Heading title={title} />

                <div className="flex gap-3">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary disabled:opacity-40 text-white flex items-center justify-center shadow-lg transition-opacity"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary disabled:opacity-40 text-white flex items-center justify-center shadow-lg transition-opacity"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
            {/* CAROUSEL */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none', /* IE and Edge */
                }}
            >
                <div className="flex gap-6 md:gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[160px] max-w-[160px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[280px] lg:max-w-[280px] overflow-hidden relative flex-shrink-0"
                        >
                            {/* Wishlist */}
                            <button className="absolute top-3 right-3 md:top-6 md:right-6 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow">
                                <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-red-600" />
                            </button>

                            {/* Image */}
                            <div className="relative h-[220px] md:h-[320px] lg:h-[380px] overflow-hidden bg-[url('/assets/bgImageContainer.png')] p-2 md:p-4 bg-no-repeat bg-cover">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="pt-2">
                                <span className="text-secondary text-xs md:text-sm">
                                    {product.badge}
                                </span>
                                <h3 className="font-bold text-black line-clamp-2 text-sm md:text-xl">
                                    {product.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600">{product.material}</p>
                                <p className="font-bold text-sm md:text-md mt-1">
                                    M.R.P {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}