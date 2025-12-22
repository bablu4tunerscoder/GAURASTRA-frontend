import React from 'react'
import Heading from './Heading'

const MensWearSection = ({ data }) => {
    return (
        <section className="px-4 md:px-16 my-12">
            {/* Heading */}
            <Heading title="Men's Wear" />

            {/* Categories Row */}
            <div className="flex justify-between gap-8 overflow-x-auto scrollbar-hide">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="w-72 flex flex-col items-center text-center cursor-pointer"
                    >
                        {/* Image Card */}
                        <div className="w-full  rounded-xl flex items-center justify-center">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Label */}
                        <p className="text-[#6b3f2c] font-medium text-lg">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MensWearSection
