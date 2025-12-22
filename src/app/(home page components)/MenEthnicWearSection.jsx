import React from 'react'
import Heading from './Heading'

const MenEthnicWearSection = ({ data }) => {
    return (
        <section className="md:px-16 my-10 px-4">
            <Heading title="Men's Ethnic Wear" />

            {/* Cards Wrapper */}
            <div className="flex gap-6 flex-wrap justify-between">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-[180px] w-full sm:w-[48%] lg:w-[23%]
                   rounded overflow-hidden cursor-pointer"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                        />

                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-end px-4">
                            <h3 className="text-white text-xl tracking-tight font-serif text-center">
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
