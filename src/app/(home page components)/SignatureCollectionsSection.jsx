import React from 'react'
import Heading from './Heading'

const SignatureCollectionsSection = ({ data }) => {
    return (
        <section className='px-4 md:px-16 my-14'>
            <Heading title="Gaustra Signature Collections of  winter" />

            {/* Signature Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-no-repeat bg-cover pt-8 pb-4 px-3 overflow-hidden space-y-4 rounded-2xl"
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
                        <h3 className="w-full text-3xl font-serif font-bold text-black">
                            {item.title}
                        </h3>
                    </div>
                ))}

            </div>

        </section>
    )
}

export default SignatureCollectionsSection
