import CarouselCard from './(home page components)/CarouselCard';
import EthnicBannerSection from './(home page components)/EthnicBannerSection';
import HeroSection from './(home page components)/HeroSection';
import LimitedStockSection from './(home page components)/LimitedStockSection';
import MarriageGlowSection from './(home page components)/MarriageGlowSection';
import MenEthnicWearSection from './(home page components)/MenEthnicWearSection';
import MensWearSection from './(home page components)/MensWearSection';
import SignatureCollectionsSection from './(home page components)/SignatureCollectionsSection';
import WhyChooseUsSection from './(home page components)/WhyChooseUsSection';
import WomenEthnicWearSection from './(home page components)/WomenEthnicWearSection';
import WomensWear from './(home page components)/WomensWear';

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
      height: "h-[340px]",
      gradient: "from-[#8b5a2b] to-[#c98a3e]",
    },
    {
      type: "image",
      img: "/assets/sherawani01.png",
      height: "h-[300px]",
    },
    {
      type: "image",
      img: "/assets/sherawani02.png",
      height: "h-[320px]",
    },
    {
      type: "image",
      img: "/assets/sherawani03.png",
      height: "h-[320px]",
    },
    {
      type: "text",
      title: "INDOWESTERN",
      offer: "UPTO 40% OFF",
      height: "h-[340px]",
      gradient: "from-[#7a4a1f] to-[#b87632]",
    },
    {
      type: "image",
      img: "/assets/indewestern01.jpeg",
      height: "h-[300px]",
    },
    {
      type: "image",
      img: "/assets/indewestern02.jpeg",
      height: "h-[320px]",
    },
    {
      type: "image",
      img: "/assets/indewestern03.jpeg",
      height: "h-[320px]",
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
    <main>
      {/* hero section */}
      <HeroSection />

      {/* women weas section */}
      <WomenEthnicWearSection data={womenEthnicWearSection} />

      {/* ethnic banner section */}

      <EthnicBannerSection data={ethnicBannerSection} />

      {/* marriage glow */}
      <MarriageGlowSection data={marriageGlowSection} />

      {/* limited stock */}
      <LimitedStockSection data={limitedStockSection} />

      {/* men weas section */}
      <MenEthnicWearSection data={menEthnicWearSection} />

      {/* bg gradient with new arrival cards */}
      <div className="relative">
        {/* Background layer ONLY */}
        <div
          className="absolute inset-x-0 top-0 h-[115%] 
               bg-[url('/assets/bgImage.png')] 
               bg-center bg-no-repeat bg-cover 
               -z-10"
        />

        {/* Content layer */}
        <div className="relative">
          {/* sherwani and indo western */}
          <section className="md:px-16 my-10 px-4">
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-1 space-y-1">

              {ethnicCards.map((card, index) => {
                if (card.type === "text") {
                  return (
                    <div
                      key={index}
                      className={`relative flex flex-col items-center justify-center bg-gradient-to-b ${card.gradient} ${card.height} break-inside-avoid`}
                    >
                      <h3 className="font-serif text-white text-4xl font-semibold text-center leading-tight">
                        {card.title}
                      </h3>
                      <span className="font-serif text-white text-3xl font-semibold text-center leading-tight">
                        {card.offer}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`relative ${card.height} overflow-hidden break-inside-avoid`}
                  >
                    <img
                      src={card.img}
                      alt="Ethnic Collection"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-serif uppercase">
                      SHOP NOW
                    </button>
                  </div>
                );
              })}

            </div>
          </section>

          {/* new arrival */}
          <section className='px-4 md:px-16 my-14'>
            <CarouselCard title="New Arrivals" products={newArrivals} />
          </section>

        </div>
      </div>

      {/* mens wear */}
      <MensWearSection data={mensWearSection} />

      {/* banner */}
      <section className="px-4 md:px-16 my-12">
        <div className="relative">
          <img
            src="/assets/home-banner.png"
            alt="Ethnic Collection"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute left-16 top-1/2 -translate-y-1/2 
                text-white font-serif uppercase 
                flex flex-col items-center gap-4">
            <h1 className="text-4xl text-center">
              CLASS THAT SPEAKS
            </h1>

            <button className="px-6 py-2 bg-gradient-to-b rounded from-[#432B08] to-[#A96C14]">
              SHOP NOW
            </button>
          </div>

        </div>
      </section>

      {/* women wear */}
      <WomensWear data={womensWear} />

      {/*bg gradient with trending now */}
      <div className="relative">
        {/* Background layer ONLY */}
        <div
          className="absolute inset-x-0 top-0 h-[115%] 
               bg-[url('/assets/bgImage.png')] 
               bg-center bg-no-repeat bg-cover 
               -z-10"
        />

        {/* Content layer */}
        <div className="relative">
          {/* sherwani and indo western */}
          <section className="md:px-16 my-10 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">

              {/* LEFT IMAGE */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full">
                  <img
                    src="/assets/discover01.png"
                    alt="Style Left"
                    className="w-full"
                  />
                </div>
              </div>

              {/* CENTER CONTENT */}
              <div className="text-center w-full md:w-1/3 space-y-4">
                <h2 className="text-[#9C0131] font-serif text-4xl font-semibold">
                  DISCOVERY YOUR STYLE
                </h2>

                <p className="text-3xl font-semibold tracking-widest font-montserrat">
                  TRENDY • ELEGANT • EVERYDAY
                </p>

                <button className=" px-6 py-2 text-sm font-serif rounded-md bg-black text-white transition">
                  SHOP NOW
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full">
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
          <section className='px-4 md:px-16 my-14'>
            <CarouselCard title="Trending Now" products={trendingWear} />
          </section>

        </div>
      </div>

      {/* signature collectoion */}
      <SignatureCollectionsSection data={signatureCollection} />

      {/* why choose us */}
      <WhyChooseUsSection data={whyChooseUsSection} />

    </main>

  )
}

export default HomePage
