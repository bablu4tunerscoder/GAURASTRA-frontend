import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewArrivalsSection from './(home page components)/NewArrivalsSection';

const HomePage = () => {
  const womenEthnicWearCard = [
    {
      name: "Lehenga",
      image: "/assets/EthnicSection01.png",
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
  const marriageLook = [
    { title: "Haldi look", price: "₹ 999", img: "/assets/marriegeglow1.png" },
    { title: "Mahndi look", price: "₹ 1999", img: "/assets/marriegeglow2.png" },
    { title: "Bridesmaids look", price: "₹ 2999", img: "/assets/marriegeglow3.png" },
  ];
  const offers = [
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

  const menEthnicWear = [
    { title: "SHERWANI", image: "/assets/menethnic01.png" },
    { title: "INDOWESTERN", image: "/assets/menethnic02.png" },
    { title: "JODHPURI", image: "/assets/menethnic03.png" },
    { title: "SUITS & TUXEDOS", image: "/assets/menethnic04.png" },
  ];

  const whyChooseUsData = [
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
  const mensWear = [
    { title: "T-Shirts", img: "/assets/menswear01.png" },
    { title: "Shirt", img: "/assets/menswear02.png" },
    { title: "Jeans", img: "/assets/menswear03.jpeg" },
    { title: "Trousers & Blazers", img: "/assets/menswear04.png" },
    { title: "Trousers", img: "/assets/menswear05.png" },
    { title: "Accessories", img: "/assets/menswear06.png" },
  ]
  const womensWear = [
    { title: "T-Shirts", img: "/assets/womenswear01.png" },
    { title: "Shirt", img: "/assets/womenswear02.jpeg" },
    { title: "Jeans", img: "/assets/womenswear03.png" },
    { title: "Trousers & Blazers", img: "/assets/womenswear04.png" },
    { title: "Trousers", img: "/assets/womenswear05.jpeg" }
  ]
  const signatureWear = [
    { title: "Jacket", img: "/assets/signature1.png" },
    { title: "Sportcoat", img: "/assets/signature2.png" },
    { title: "Sweater", img: "/assets/signature3.jpeg" },
    { title: "Sweatshirt", img: "/assets/signature4.png" },
    { title: "Coats", img: "/assets/signature5.jpeg" },
  ]


  return (
    <main>

      {/* hero section */}
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

      {/* women weas section */}
      <section className="md:px-16 my-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl my-6 font-semibold text-[#6b3f2c]">
          Women's Ethnic Wear
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12">
          {womenEthnicWearCard.map((card, index) => (
            <Link key={index} href={card.url} className="group w-full max-w-[220px]">

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex justify-center">

                {/* Circle Image */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Name */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/30  backdrop-blur-sm text-center py-2">
                    <p className="font-primary text-sm sm:text-base font-medium text-gray-900">
                      {card.name}
                    </p>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* marriage glow */}
      <section className="md:px-16 my-10 px-4">
        <div className="flex items-center justify-between flex-wrap md:gap-10 gap-4">

          {/* Left Title */}
          <div className="min-w-[220px]">
            <h2 className="font-primary text-3xl text-[#6b3f2c] flex items-center gap-2">
              Marriage Glow
              <span className="text-[#6b3f2c]">✦</span>
            </h2>
          </div>

          {/* Cards */}
          {marriageLook.map((item, index) => (
            <div
              key={index}
              className="flex items-center flex-1 gap-4 bg-white rounded-xl p-4
                         shadow-[0_0_8px_rgba(0,0,0,0.70)] w-[320px]"
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
                <h3 className="font-primary text-lg text-[#6b3f2c]">
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

      {/* limited stock */}
      <div className="md:px-16 my-10 px-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 lg:gap-10">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="group relative h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={offer.image}
                alt={offer.label}
                className="h-full w-full object-cover transition-transform duration-500"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute" />

              {/* Content Container */}
              <div className="absolute inset-0 flex items-end justify-center">

                <div className="pb-5 text-white text-center ">

                  {/* UPTO Label and Text Container */}
                  <div className="flex items-center justify-center gap-0">
                    {/* Vertical UPTO Label */}
                    <div className="bg-white border border-white text-black px-2 py-2 text-md md:text-xs font-bold tracking-[0.5em] -rotate-90 whitespace-nowrap text-center">
                      UPTO
                    </div>

                    {/* Text Content */}
                    <div className="text-left -ml-2">
                      <p className="font-serif text-xs md:text-4xl  uppercase leading-tight">
                        {offer.label}
                      </p>

                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-none">
                        {offer.discount}
                      </h2>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-2">
                    <button className="px-3 md:px-4 py-0.5 font-serif md:py-1 bg-black text-white text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-gray-600 cursor-pointer transition-colors duration-300">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* men weas section */}
      <section className="md:px-16 my-10 px-4">
        <h2 className="text-4xl my-6 font-semibold text-[#6b3f2c]">
          Men's Ethnic Wear
        </h2>

        {/* Cards Wrapper */}
        <div className="flex gap-6 flex-wrap justify-between">
          {menEthnicWear.map((item, index) => (
            <div
              key={index}
              className="relative h-[190px] w-full sm:w-[48%] lg:w-[23%]
                   rounded-lg overflow-hidden cursor-pointer"
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

      {/* sherwani and indo western */}
      <section className="md:px-16 my-10 px-4">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-1 space-y-1">

          {ethnicCards.map((card, index) => {
            // TEXT CARD
            if (card.type === "text") {
              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center justify-center bg-gradient-to-b ${card.gradient} ${card.height} break-inside-avoid`}
                >
                  <h3 className="font-serif text-white text-3xl lg:text-4xl font-bold tracking-wider text-center leading-tight">
                    {card.title}
                  </h3>
                  <span className="text-white text-lg lg:text-xl font-light tracking-wide mt-2">
                    {card.offer}
                  </span>
                </div>
              );
            }

            // IMAGE CARD
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
      <NewArrivalsSection />

      {/* mens wear */}
      <section className="px-4 md:px-16 my-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#6b3f2c] mb-10">
          Men's Wear
        </h2>

        {/* Categories Row */}
        <div className="flex justify-between gap-8 overflow-x-auto scrollbar-hide">
          {mensWear.map((item, index) => (
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
      <section className="px-4 md:px-16 my-14">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-[#6b3f2c] mb-10">
          Women Wear
        </h2>

        {/* Categories Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {womensWear.map((item, index) => (
            <div key={index} className="text-center cursor-pointer group">
              {/* Image Box */}
              <div className="relative h-[260px] overflow-hidden bg-[#f5f0eb]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover"
                />
              </div>

              {/* Label */}
              <p className="mt-2 text-lg font-serif text-[#6b3f2c]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* discover your style section */}
      <section className='px-4 md:px-16 my-14'>

      </section>


      {/* trending now */}
      <NewArrivalsSection />
      {/* why choose us */}


      {/* signature collectoion */}
      <section className='px-4 md:px-16 my-14'>
        <h2 className="text-4xl font-serif text-[#6b3f2c] mb-10">
          Gaustra Signature Collections of  winter
        </h2>

        {/* Signature Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {signatureWear.map((item, index) => (
            <div key={index} className="text-center cursor-pointer group">

              {/* Image Box */}
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover"
                />

                {/* Overlay Text */}
                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-lg font-serif text-white bg-black/40 px-4 py-1 rounded">
                  {item.title}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      <section className='px-4 md:px-16 my-14'>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-20">
          {whyChooseUsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FFECA4] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow space-y-5"
              >
                <p className="font-serif text-[#9C0131] text-xl">
                  {item.title}
                </p>

                <div className="mr-10 bg-[#F2D56C] relative rounded-full w-18 h-18 flex items-center justify-center overflow-visible">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={120}
                    height={60}
                    className="h-16 w-auto object-contain absolute -right-6 top-1/2 -translate-y-1/2"
                  />
                </div>

              </div>

            );
          })}
        </div>

        <div className="w-full my-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 relative">
              {/* Left Card - Promo Code */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 relative overflow-hidden">
                {/* Circular cutout on right */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"></div>

                <div className="text-center text-white">
                  <p className="text-sm tracking-widest mb-2 font-light">USE CODE</p>
                  <h2 className="text-4xl font-bold mb-4 tracking-wide">WACTH900</h2>
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
                          mt-0.5
                          top-0 h-full w-0.5 border
                          
                          md:block
                          max-md:top-1/2 max-md:left-0
                          max-md:-translate-x-0 max-md:-translate-y-1/2
                          max-md:w-full max-md:h-0.5 max-md:border-l-0 max-md:border-t"
              >
              </div>


              {/* Right Card - Try Deal */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 relative overflow-hidden">
                {/* Circular cutout on left */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"></div>

                <div className="text-center text-white">
                  <h3 className="text-2xl font-semibold mb-4">Try Deal on Swing<br />Weel</h3>
                  <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition flex items-center justify-center mx-auto">
                    <span className="mr-2"><Sparkles size={20} /></span> Let's Try
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </main>

  )
}

export default HomePage
