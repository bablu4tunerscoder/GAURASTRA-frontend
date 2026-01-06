
import Heading from '@/app/(home page components)/Heading'
import Link from 'next/link'
import React from 'react'

const OccasionBased = ({ data }) => {
    return (

        <section className="section-spacing">
            <Heading title="Occasion-Based Women Wear" />

            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-[calc(33.333%-1rem)]
                    md:auto-cols-[calc(33.333%-1rem)]
                    lg:auto-cols-[calc(20%-1.2rem)]
                    gap-4 md:gap-6
                    overflow-x-auto scrollbar-hide
                    pb-2
                "
            >
                {data.map((card, index) => (
                    <Link
                        key={index}
                        href={card.url}
                        className="group"
                    >
                        <div
                            key={index}
                            className="
              flex-shrink-0
              text-center
              cursor-pointer
              group
              w-[32%]
              md:w-auto
            "
                        >
                            {/* Image Box */}
                            <div className="relative overflow-hidden rounded-xl">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Label */}
                            <p className="md:mt-3  mt-1 text-secondary font-serif text-xs md:text-3xl">
                                {card.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

    )
}

export default OccasionBased
