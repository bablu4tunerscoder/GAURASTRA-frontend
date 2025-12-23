import React from "react"
import Heading from "./Heading"

const SignatureCollectionsSection = ({ data }) => {
    return (
        <section className="section-spacing">
            <Heading title="Gaustra Signature Collections of Winter" />

            {/* Scrollable Row */}
            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-[calc(50%-0.75rem)]
                    md:auto-cols-[calc(50%-0.75rem)]
                    lg:grid-cols-5
                    lg:auto-cols-auto
                    gap-6
                    overflow-x-auto
                    lg:overflow-x-visible
                    scrollbar-hide
                    pb-2
                "
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="
                            rounded-2xl
                            bg-no-repeat
                            bg-cover
                            overflow-hidden
                            space-y-4
                            pt-8 pb-4 px-3
                        "
                        style={{
                            backgroundImage: `url(${item.bgimg})`,
                        }}
                    >
                        {/* Product Image */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full object-contain"
                        />

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-black">
                            {item.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SignatureCollectionsSection