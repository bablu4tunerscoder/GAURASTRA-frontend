import Image from "next/image";

const HeroBanner = ({ imgUrl, title }) => {
    return (
        <div>
            <div className="relative w-full md:h-[60vh] h-64 overflow-hidden">
                <Image
                    src={imgUrl ?? "/assets/bg3.webp"}
                    alt="background image"
                    fill
                    priority
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-wide">
                        {title ?? "Gaurastra"}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;
