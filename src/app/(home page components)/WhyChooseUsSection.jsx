import React from 'react'
import Heading from './Heading';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const WhyChooseUsSection = ({ data }) => {
    return (
        <section className='section-spacing'>
            <Heading title="Why Choose Us" />

            <div
                className="
    flex
    gap-6
    overflow-x-auto
    scrollbar-hide
    pb-2

    md:grid
    md:grid-cols-5
    md:gap-20
    md:overflow-visible
  "
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="
        flex-shrink-0
        bg-[#FFECA4]
        rounded-xl
        p-4
        flex
        flex-col
        items-center
        justify-center
        text-center
        shadow
        space-y-5
        w-[47%]
        md:w-auto
      "
                    >
                        <p className="font-serif text-[#9C0131] text-lg md:text-xl">
                            {item.title}
                        </p>

                        <div className="bg-[#F2D56C] relative rounded-full w-16 h-16 flex items-center justify-center">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={120}
                                height={60}
                                className="h-14 w-auto object-contain absolute -right-5 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                ))}
            </div>


            <div className="w-full my-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 relative">
                        {/* Left Card - Promo Code */}
                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl md:p-8 p-4 relative overflow-hidden">
                            {/* Circular cutout on right */}
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"></div>

                            <div className="text-center text-white">
                                <p className="text-xl tracking-widest md:mb-2 mb-0 font-serif font-light">USE CODE</p>
                                <h2 className="text-4xl font-semibold md:mb-4 mb-2 tracking-wide">WACTH900</h2>
                                <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition">
                                    REFER NOW
                                </button>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div
                            className="
                          absolute z-20
                          border-dashed border-gray-400
                          left-1/2 -translate-x-1/2
                          top-0 h-full w-0.5 border
                          md:block
                          mt-1
                          max-md:top-1/2 max-md:left-0
                          max-md:-translate-x-0 max-md:-translate-y-1/2
                          max-md:w-full max-md:h-0.5 max-md:border-l-0 max-md:border-t"
                        >
                        </div>


                        {/* Right Card - Try Deal */}
                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl md:p-8 p-4 relative overflow-hidden">
                            {/* Circular cutout on left */}
                            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"></div>

                            <div className="text-center text-white">
                                <h3 className="text-2xl leading-tight font-serif md:mb-4 mb-2">Try Deal on Swing<br />Weel</h3>
                                <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition flex items-center justify-center mx-auto">
                                    <span className="mr-2"><Sparkles size={20} /></span> Let's Try
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WhyChooseUsSection
