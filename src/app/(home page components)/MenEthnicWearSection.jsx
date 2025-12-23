import React from "react"
import Heading from "./Heading"

const MenEthnicWearSection = ({ data }) => {
    return (
        <section className="section-spacing">
            <Heading title="Men's Ethnic Wear" />

            {/* Cards Wrapper */}
            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-[calc(50%-0.5rem)]
                    md:auto-cols-[calc(50%-0.5rem)]
                    lg:auto-cols-[calc(25%-0.75rem)]
                    gap-4
                    overflow-x-auto
                    scrollbar-hide
                "
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="
                            relative
                            rounded
                            overflow-hidden
                            cursor-pointer
                        "
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-end px-4">
                            <h3 className="text-white md:text-xl text-xs  font-serif">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MenEthnicWearSection