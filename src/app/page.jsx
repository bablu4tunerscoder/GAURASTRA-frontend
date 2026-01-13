import CarouselCard from "@/components/home_components/CarouselCard";
import EthnicBannerSection from "@/components/home_components/EthnicBannerSection";
import HeroSection from "@/components/home_components/HeroSection";
import LimitedStockSection from "@/components/home_components/LimitedStockSection";
import MarriageGlowSection from "@/components/home_components/MarriageGlowSection";
import MenEthnicWearSection from "@/components/home_components/MenEthnicWearSection";
import MensWearSection from "@/components/home_components/MensWearSection";
import SignatureCollectionsSection from "@/components/home_components/SignatureCollectionsSection";
import WhyChooseUsSection from "@/components/home_components/WhyChooseUsSection";
import WomenEthnicWearSection from "@/components/home_components/WomenEthnicWearSection";
import WomensWear from "@/components/home_components/WomensWear";




const HomePage = () => {
  const womenEthnicWearSection = [
    {
      name: "Lehenga",
      image: "/assets/womenethnic01.png",
      url: "/women/lehenga"
    },
    {
      name: "Kurti",
      image: "/assets/EthnicSection01.png",
      url: "/women/kurti"
    },
    {
      name: "Saree",
      image: "/assets/EthnicSection01.png",
      url: "/women/saree"
    },
    {
      name: "Dupatta",
      image: "/assets/EthnicSection01.png",
      url: "/women/dupatta"
    },
    {
      name: "Lehenga",
      image: "/assets/EthnicSection01.png",
      url: "/women/lehenga"
    },
  ]
  const ethnicBannerSection = [
    {
      img: "/assets/ethnicBanner01.png",
      text: "30% off",

    },
    {
      img: "/assets/ethnicBanner02.png",
      text: "40% off",

    },
    {
      img: "/assets/ethnicBanner03.png",
      text: "20% off",
    },
  ];
  const marriageGlowSection = [
    { title: "Haldi look", price: "₹ 999", img: "/assets/marriegeglow1.png" },
    { title: "Mahndi look", price: "₹ 1999", img: "/assets/marriegeglow2.png" },
    { title: "Bridesmaids look", price: "₹ 2999", img: "/assets/marriegeglow3.png" },
  ];
  const limitedStockSection = [
    {
      image: "/assets/marriegeglow01.png",
      discount: "40% OFF",
      label: "LIMITED STOCK"
    },
    {
      image: "/assets/marriegeglow02.png",
      discount: "50% OFF",
      label: "LIMITED STOCK"
    },
    {
      image: "/assets/marriegeglow03.png",
      discount: "30% OFF",
      label: "LIMITED STOCK"
    },
    {
      image: "/assets/marriegeglow04.png",
      discount: "45% OFF",
      label: "LIMITED STOCK"
    },
    {
      image: "/assets/marriegeglow05.png",
      discount: "35% OFF",
      label: "LIMITED STOCK"
    },
    {
      image: "/assets/marriegeglow06.png",
      discount: "40% OFF",
      label: "LIMITED STOCK"
    }
  ];
  const menEthnicWearSection = [
    { title: "SHERWANI", image: "/assets/menethnic01.png" },
    { title: "INDOWESTERN", image: "/assets/menethnic02.png" },
    { title: "JODHPURI", image: "/assets/menethnic03.png" },
    { title: "SUITS & TUXEDOS", image: "/assets/menethnic04.png" },
  ];
  const ethnicCards = [
    {
      type: "text",
      title: "SHERWANI",
      offer: "UPTO 20% OFF",
      height: "md:h-[340px] h-[240px]",
      gradient: "from-[#8b5a2b] to-[#c98a3e]",
    },
    {
      type: "image",
      img: "/assets/sherawani01.png",
      height: "md:h-[300px] h-[200px]",
    },
    {
      type: "image",
      img: "/assets/sherawani02.png",
      height: "md:h-[320px] h-[220px]",
    },
    {
      type: "image",
      img: "/assets/sherawani03.png",
      height: "md:h-[320px] h-[220px]",
    },
    {
      type: "text",
      title: "INDOWESTERN",
      offer: "UPTO 40% OFF",
      height: "md:h-[340px] h-[240px]",
      gradient: "from-[#7a4a1f] to-[#b87632]",
    },
    {
      type: "image",
      img: "/assets/indewestern01.jpeg",
      height: "md:h-[300px] h-[200px]",
    },
    {
      type: "image",
      img: "/assets/indewestern02.jpeg",
      height: "md:h-[320px] h-[220px]",
    },
    {
      type: "image",
      img: "/assets/indewestern03.jpeg",
      height: "md:h-[320px] h-[220px]",
    },
  ];
  const mensWearSection = [
    { title: "T-Shirts", img: "/assets/menswear01.png" },
    { title: "Shirt", img: "/assets/menswear02.png" },
    { title: "Jeans", img: "/assets/menswear03.jpeg" },
    { title: "Trousers & Blazers", img: "/assets/menswear04.png" },
    { title: "Trousers", img: "/assets/menswear05.png" },
    { title: "Accessories", img: "/assets/menswear06.png" },
  ]
  const womensWear = [
    { title: "T-Shirts", img: "/assets/womenswear1.png" },
    { title: "Shirt", img: "/assets/womenswear02.jpeg" },
    { title: "Jeans", img: "/assets/womenswear03.png" },
    { title: "Trousers & Blazers", img: "/assets/womenswear04.png" },
    { title: "Trousers", img: "/assets/womenswear05.jpeg" }
  ]
  const signatureCollection = [
    { title: "Jacket", img: "/assets/signature01.png", bgimg: "/assets/signaturebg01.png" },
    { title: "Sportcoat", img: "/assets/signature02.png", bgimg: "/assets/signaturebg02.png" },
    { title: "Sweater", img: "/assets/signature03.png", bgimg: "/assets/signaturebg03.png" },
    { title: "Sweatshirt", img: "/assets/signature04.png", bgimg: "/assets/signaturebg04.png" },
    { title: "Coats", img: "/assets/signature05.png", bgimg: "/assets/signaturebg05.png" },
  ]
  const newArrivals = [
    { id: 1, image: "/assets/trendingWear01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 2, image: "/assets/trendingWear02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 3, image: "/assets/trendingWear03.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 4, image: "/assets/trendingWear04.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 5, image: "/assets/trendingWear01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 6, image: "/assets/trendingWear02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
  ];
  const trendingWear = [
    { id: 1, image: "/assets/trendingWear01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 2, image: "/assets/trendingWear02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 3, image: "/assets/trendingWear03.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 4, image: "/assets/trendingWear04.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 5, image: "/assets/trendingWear01.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
    { id: 6, image: "/assets/trendingWear02.png", badge: "Just In", title: "Indigo Cotton Bandhani Bush Shirt", material: "Cotton", price: "₹2,499" },
  ];
  const whyChooseUsSection = [
    {
      title: "Free Delivery Above ₹1000/-",
      img: "/assets/box.png",
    },
    {
      title: "Secure Payment",
      img: "/assets/card.png",
    },
    {
      title: "UPI & Cards Accepted",
      img: "/assets/globeCard.png",
    },
    {
      title: "Fast Delivery",
      img: "/assets/deliveryTruck.png",
    },
    {
      title: "Easy Return",
      img: "/assets/returnBox.png",
    },
  ];

  return (
    <main className='dark:bg-white'>
      {/* hero section */}
      {/* not responsive yet coz content not finalized */}
      <HeroSection />

      {/* women weas section */}
      {/* done responsive */}
      <WomenEthnicWearSection data={womenEthnicWearSection} />

      {/* ethnic banner section */}
      {/* done responsive */}
      <EthnicBannerSection data={ethnicBannerSection} />

      {/* marriage glow */}
      {/* done responsive */}
      <MarriageGlowSection data={marriageGlowSection} />

      {/* limited stock */}
      {/* done responsive */}
      <LimitedStockSection data={limitedStockSection} />

      {/* men weas section */}
      {/* done responsive */}
      <MenEthnicWearSection data={menEthnicWearSection} />

      {/* bg gradient with new arrival cards */}
      {/* done responsive */}
      <div className="relative min-h-screen z-10">
        {/* Background image */}
        <div
          className="
        absolute inset-x-0 top-0 h-[115%]
        bg-[url('/assets/bgImage.png')]
        bg-center bg-no-repeat bg-cover
        -z-10
      "
        />

        {/* Content layer */}
        <div className="relative">
          {/* sherwani and indo western */}
          <section className="section-spacing">
            <div className="grid grid-flow-col auto-cols-[50%] md:auto-cols-[50%] lg:auto-cols-[25%] gap-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-4">

              {/* Group cards in pairs for vertical stacking */}
              {Array.from({ length: Math.ceil(ethnicCards.length / 2) }).map((_, groupIndex) => (
                <div key={groupIndex} className="flex flex-col gap-1">
                  {ethnicCards.slice(groupIndex * 2, groupIndex * 2 + 2).map((card, index) => {
                    const actualIndex = groupIndex * 2 + index;

                    if (card.type === "text") {
                      return (
                        <div
                          key={actualIndex}
                          className={`relative flex flex-col items-center justify-center bg-gradient-to-b ${card.gradient} ${card.height}`}
                        >
                          <h3 className="font-serif text-white md:text-4xl text-xl font-semibold text-center leading-tight">
                            {card.title}
                          </h3>
                          <span className="font-serif text-white md:text-3xl text-2xl font-semibold text-center leading-tight">
                            {card.offer}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={actualIndex}
                        className={`relative ${card.height} overflow-hidden`}
                      >
                        <img
                          src={card.img}
                          alt="Ethnic Collection"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-serif uppercase md:text-md text-sm">
                          SHOP NOW
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </section>

          {/* new arrival */}
          <section className='section-spacing'>
            <CarouselCard title="New Arrivals" products={newArrivals} />
          </section>

        </div>
      </div>

      {/* mens wear */}
      {/* done responsive */}
      <MensWearSection data={mensWearSection} />

      {/* banner */}
      {/* done responsive */}
      <section className="section-spacing">
        <div className="relative">
          <img
            src="/assets/home-banner.png"
            alt="Ethnic Collection"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute md:left-16 left-4 top-1/2 -translate-y-1/2 
                text-white font-serif uppercase 
                flex flex-col items-center md:gap-4">
            <h1 className="md:text-4xl text-sm text-center">
              CLASS THAT SPEAKS
            </h1>

            <button className="md:px-6 px-2 md:py-2 py-1 bg-gradient-to-b md:text-md text-xs rounded from-[#432B08] to-[#A96C14]">
              SHOP NOW
            </button>
          </div>

        </div>
      </section>

      {/* women wear */}
      {/* done responsive */}
      <WomensWear data={womensWear} />

      {/*bg gradient with trending now */}
      {/* done responsive */}
      <div className="relative min-h-screen z-10">
        {/* Background layer ONLY */}
        <div
          className="absolute inset-x-0 top-0 h-[115%] 
               bg-[url('/assets/bgImage.png')] 
               bg-center bg-no-repeat bg-cover 
               -z-10"
        />

        {/* Content layer */}
        <div className="relative">
          {/* discover section */}
          <section className="section-spacing">
            <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10">

              {/* LEFT IMAGE */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="relative w-full lg:p-0 p-8">
                  <img
                    src="/assets/discover01.png"
                    alt="Style Left"
                    className="w-full"
                  />
                </div>
              </div>

              {/* CENTER CONTENT */}
              <div className="text-center w-full lg:w-1/3 md:space-y-4">
                <h2 className="text-[#9C0131] font-serif text-2xl md:text-6xl font-semibold">
                  DISCOVER YOUR STYLE
                </h2>

                <p className="md:text-4xl  text-lg font-semibold lg:tracking-widest md:tracking-wider font-montserrat">
                  TRENDY • ELEGANT • EVERYDAY
                </p>

                <button className="px-6 py-2 mt-4 md:text-3xl text-sm font-serif rounded-md bg-black text-white transition">
                  SHOP NOW
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="relative w-full lg:p-0 p-8">
                  <img
                    src="/assets/discover02.png"
                    alt="Style Right"
                    className="w-full"
                  />
                </div>
              </div>

            </div>

          </section>

          {/* trending wear */}
          <section className='section-spacing'>
            <CarouselCard title="Trending Now" products={trendingWear} />
          </section>

        </div>
      </div>

      {/* signature collectoion */}
      {/* done responsive */}
      <SignatureCollectionsSection data={signatureCollection} />

      {/* why choose us */}
      {/* done responsive */}
      <WhyChooseUsSection data={whyChooseUsSection} />

    </main>

  )
}

export default HomePage
