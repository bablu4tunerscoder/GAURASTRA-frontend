import React from "react"
import Heading from "./Heading"

const MensWearSection = ({ data }) => {
    return (
        <section className="section-spacing">
            {/* Heading */}
            <Heading title="Men's Wear" />

            {/* Categories Row */}
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
              w-[32%]
              md:w-auto
            "
                    >
                        {/* Image Card */}
                        <div className="w-full rounded-xl overflow-hidden">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover"
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

export default MensWearSection
