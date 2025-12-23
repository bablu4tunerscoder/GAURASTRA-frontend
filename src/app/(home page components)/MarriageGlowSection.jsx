import React from "react"
import Heading from "./Heading"

const MarriageGlowSection = ({ data }) => {
    return (
        <section className="section-spacing">
            <div className="flex items-center gap-6">

                {/* Left Title (Fixed) */}
                <div className="shrink-0">
                    <Heading title="Marriage Glow" />
                </div>

                {/* Scrollable Cards */}
                <div
                    className="
            flex
            gap-4
            overflow-x-auto
            scrollbar-hide
            pb-2
          "
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="
                flex
                items-center
                gap-4
                bg-white
                rounded-md
                p-4
                shadow
                min-w-[300px]
              "
                        >
                            {/* Image */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="font-primary font-serif text-lg text-[#6b3f2c]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Start from{" "}
                                    <span className="font-medium">{item.price}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default MarriageGlowSection
