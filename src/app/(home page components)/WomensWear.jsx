import React from "react"
import Heading from "./Heading"

const WomensWear = ({ data }) => {
    return (
        <section className="section-spacing">
            {/* Section Title */}
            <Heading title="Women's Wear" />

            {/* Scrollable Row */}
            <div
                className="
          flex
          gap-6
          justify-between
          overflow-x-auto
          scrollbar-hide
          pb-2
        "
            >
                {data.map((item, index) => (
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
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Label */}
                        <p className="md:mt-3 mt-1 text-secondary font-medium text-xs md:text-lg">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WomensWear
