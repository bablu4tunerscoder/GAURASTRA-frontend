import React from 'react'
import Heading from './Heading'

const MarriageGlowSection = ({ data }) => {
    return (
        <section className="md:px-16 my-10 px-4">
            <div className="flex items-center justify-between flex-wrap md:gap-10 gap-4">

                {/* Left Title */}
                <div className="min-w-[220px]">
                    <Heading title="Marriage Glow" />
                </div>

                {/* Cards */}
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center flex-1 gap-4 bg-white rounded-md p-4
                         shadow w-[320px]"
                    >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
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
                                Start from <span className="font-medium">{item.price}</span>
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default MarriageGlowSection
