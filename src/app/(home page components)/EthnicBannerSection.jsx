import React from 'react'

const EthnicBannerSection = ({ data }) => {
    return (
        <section className="w-full bg-[url('/assets/ethnicBanner.svg')] bg-no-repeat bg-cover bg-center aspect-[16/7] flex justify-end">
            <div className="w-1/2 pe-4 flex gap-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className='relative flex-1 '
                    >
                        {/* Product Image */}
                        <div className={`absolute w-full flex ${index === 1 ? "flex-col-reverse md:top-4 lg:top-10 top-0" : "flex-col md:bottom-4 lg:bottom-10 bottom-0"}`}

                        >
                            <img
                                src={item.img}
                                alt={item.text}
                                className="w-full h-auto object-contain"
                            />

                            {/* Offer Text */}
                            <p className="mt-2 text-center text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide">
                                {item.text}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default EthnicBannerSection
