import React from 'react'
import Heading from './Heading'
import Link from 'next/link'

const WomenEthnicWearSection = ({ data }) => {
    return (
        <div>
            <section className="md:px-16 my-10 px-4">
                <Heading title="Women's Ethnic Wear" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12">
                    {data.map((card, index) => (
                        <Link key={index} href={card.url} className="group w-full max-w-[220px]">

                            <div className="bg-white rounded shadow-md hover:shadow-xl transition-all duration-300 p-4 flex justify-center">

                                {/* Circle Image */}
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Overlay Name */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/60  backdrop-blur-sm text-center py-2">
                                        <p className="font-primary text-sm sm:text-base font-medium text-gray-900">
                                            {card.name}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default WomenEthnicWearSection
