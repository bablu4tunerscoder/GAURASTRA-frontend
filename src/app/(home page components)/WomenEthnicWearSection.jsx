import React from 'react'
import Heading from './Heading'
import Link from 'next/link'

const WomenEthnicWearSection = ({ data }) => {

    return (
        <section className="section-spacing">
            <Heading title="Women's Ethnic Wear" />

            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-[calc(33.333%-1rem)]
                    md:auto-cols-[calc(33.333%-1rem)]
                    lg:auto-cols-[calc(20%-1.2rem)]
                    gap-4 md:gap-6
                    overflow-x-auto no-scrollbar
                    pb-2
                "
            >
                {data.map((card, index) => (
                    <Link
                        key={index}
                        href={card.url}
                        className="group"
                    >
                        <div className="bg-white rounded shadow-md  p-3 md:p-4 flex justify-center h-full">

                            {/* Circle Image */}
                            <div className="flex justify-center h-full">
                                {/* Perfect Circle Wrapper */}
                                <div
                                    className="
      relative
      aspect-square
      w-full
      max-w-[90px]
      sm:max-w-[100px]
      md:max-w-[120px]
      lg:max-w-[144px]
      rounded-full
      overflow-hidden
    "
                                >
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay Name */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm text-center py-1.5 md:py-2">
                                        <p className="font-primary text-xs md:text-sm font-medium text-gray-900 px-1">
                                            {card.name}
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default WomenEthnicWearSection