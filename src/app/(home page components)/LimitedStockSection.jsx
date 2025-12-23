import React from 'react'

const LimitedStockSection = ({ data }) => {
    return (
        <section className="section-spacing">
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 md:gap-8 lg:gap-10">
                {data.map((offer, index) => (
                    <div
                        key={index}
                        className="group relative h-[250px] md:h-[500px] lg:h-[550px] overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={offer.image}
                            alt={offer.label}
                            className="h-full w-full object-cover transition-transform duration-500"
                        />

                        {/* Bottom Gradient Overlay */}
                        <div className="absolute" />

                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-end justify-center">

                            <div className="pb-5 text-white text-center ">

                                {/* UPTO Label and Text Container */}
                                <div className="relative flex items-center justify-center gap-0">
                                    {/* Vertical UPTO Label */}
                                    <div className="absolute md:-left-20 -left-9 md:rounded-md rounded md:top-6 top-2 bg-white text-black md:px-3 px-1 md:py-2 py-0.5 md:text-lg text-xs font-semibold font-mono md:tracking-[0.3em] -rotate-90 whitespace-nowrap text-center">
                                        UPTO
                                    </div>

                                    {/* Text Content */}
                                    <div className="text-left md:-ml-2">
                                        <p className="font-serif text-xs md:text-4xl  uppercase md:leading-6 leading-2">
                                            {offer.label}
                                        </p>

                                        <h2 className="font-serif  text-xl md:text-5xl lg:text-6xl ">
                                            {offer.discount}
                                        </h2>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="mt-2">
                                    <button className="px-3 md:px-4 py-0.5 font-serif md:py-1 bg-black text-white text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-gray-600 cursor-pointer transition-colors duration-300">
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default LimitedStockSection
