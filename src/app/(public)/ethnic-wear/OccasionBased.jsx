
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
      gap-6

      overflow-x-auto no-scrollbar

      md:grid-flow-row
      md:grid-cols-3
      md:overflow-visible
      md:gap-10

      lg:grid-cols-5
      pb-2
    "
            >
                {data.map((card, index) => (
                    <Link key={index} href={card.url}>
                        <div className="text-center cursor-pointer">
                            {/* Image Box */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                />
                            </div>

                            {/* Label */}
                            <p className="mt-1 md:mt-3 text-secondary font-serif text-xs md:text-3xl">
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
