import React from 'react'

const HeroSection = () => {
    return (
        <div>
            <section className="relative w-full md:h-[90vh] h-100 overflow-hidden">
                {/* Background Image */}
                <img
                    src="/assets/herobg.png" // replace with your image path
                    alt="Gaurastra Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* CENTER SECTION */}
                <div className="absolute inset-x-0 bottom-0 z-20">

                    {/* MODELS ROW (bottom aligned & centered) */}
                    <div className="flex justify-center items-baseline gap-10">

                        {/* Model */}
                        <div className="relative">
                            <img
                                src="/assets/hero-model.png"
                                alt="Model 1"
                                className="relative h-[300px] md:h-[460px] object-contain top-4 z-30"
                                style={{
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, black 70%, transparent 100%)",
                                    maskImage:
                                        "linear-gradient(to bottom, black 70%, transparent 100%)",
                                }}
                            />

                            {/* Tag */}
                            <div className="absolute left-[-40px] top-1/2 bg-white/80 px-3 py-1 text-xs tracking-wide">
                                KURTAS <br /> ₹ 555
                            </div>
                            <div className="absolute right-[-40px] top-[35%] bg-white/80 px-3 py-1 text-xs tracking-wide">
                                KURTAS <br /> ₹ 555
                            </div>

                            {/* TEXT BELOW MODELS */}
                            <div className="mt-8 absolute -top-12 text-center px-4">
                                <p className="text-gray-200 text-xs mb-3 font-semibold max-w-2xl mx-auto">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis corrupti velit aliquam aut repellendus perferendis consectetur in esse.
                                </p>

                                <h1 className="font-primary text-white leading-10 text-5xl md:text-7xl tracking-tight">
                                    GAURASTRA
                                </h1>
                            </div>

                            <div className="mt-8 absolute bottom-4 left-1/2 -translate-x-1/2 text-center px-4">
                                <h2 className="font-primary text-white text-3xl text-nowrap uppercase tracking-tighter">
                                    Focus on YourSelf
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Vertical Shop Now Button */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-20">
                    <button className="bg-white text-black px-2 py-3 -rotate-90 writing-mode-vertical font-semibold rounded-b-lg tracking-widest">
                        SHOP NOW
                    </button>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-6 right-8 flex gap-2 z-20">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="w-2 h-2 rounded-full bg-white/40"></span>
                    <span className="w-2 h-2 rounded-full bg-white/40"></span>
                </div>
            </section>
        </div>
    )
}

export default HeroSection
