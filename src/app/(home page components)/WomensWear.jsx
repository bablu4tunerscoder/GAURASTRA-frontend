import React from 'react'
import Heading from './Heading'

const WomensWear = ({ data }) => {
    return (
        <section className="px-4 md:px-16 my-14">
            {/* Section Title */}
            <Heading title="Women's Wear" />

            {/* Categories Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {data.map((item, index) => (
                    <div key={index} className="text-center cursor-pointer group">
                        {/* Image Box */}
                        <div className="relative h-[260px] overflow-hidden">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full object-cover"
                            />
                        </div>

                        {/* Label */}
                        <p className="mt-2 text-2xl font-serif text-primary">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WomensWear
