import ProductCardEthnic from "@/components/ProductCardEthnic";
import OccasionBased from "./OccasionBased";
import MenEthnicWearSection from "@/app/(home page components)/MenEthnicWearSection";
import WomenEthnicWearSection from "@/app/(home page components)/WomenEthnicWearSection";
import Image from "next/image";

const CategoryCard = ({ img, title, large = false }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${large ? "row-span-2" : ""
        }`}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className={`${large ? "bg-white/90 text-black" : "text-white/90"}  text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap`}>
          {title}
        </span>
      </div>
    </div>
  );
};


export default function EthnicwearPage() {
  const occasionBasedWears = [
    {
      title: "Wedding Wear",
      image: "/assets/occasion01.png",
      url: "/women/lehenga"
    },
    {
      title: "Festive Wear",
      image: "/assets/occasion01.png",
      url: "/women/kurti"
    },
    {
      title: "Party Wear",
      image: "/assets/occasion01.png",
      url: "/women/saree"
    },
    {
      title: "Daily Wear",
      image: "/assets/occasion01.png",
      url: "/women/dupatta"
    },
    {
      title: "Office Wear",
      image: "/assets/occasion01.png",
      url: "/women/lehenga"
    },
  ];

  const ethnicProducts = [
    {
      product_name: "Indigo Cotton Bandhani Bush Shirt",
      brand: "LOOM",
      canonicalURL: "indigo-cotton-bandhani-bush-shirt",
      variants: [
        {
          images: [
            {
              image_url: "http://localhost:3000/assets/commonImageEthnic.png",
              is_primary: true
            }
          ],
          pricing: {
            original_price: 2499,
            discounted_price: 2499,
            discount_percent: 0
          }
        }
      ]
    },
    {
      product_name: "Indigo Cotton Bandhani Bush Shirt",
      brand: "LOOM",
      canonicalURL: "indigo-cotton-bandhani-bush-shirt-2",
      variants: [
        {
          images: [
            {
              image_url: "http://localhost:3000/assets/commonImageEthnic.png",
              is_primary: true
            }
          ],
          pricing: {
            original_price: 2499,
            discounted_price: 2499,
            discount_percent: 0
          }
        }
      ]
    },
    {
      product_name: "Indigo Cotton Bandhani Bush Shirt",
      brand: "LOOM",
      canonicalURL: "indigo-cotton-bandhani-bush-shirt-3",
      variants: [
        {
          images: [
            {
              image_url: "http://localhost:3000/assets/commonImageEthnic.png",
              is_primary: true
            }
          ],
          pricing: {
            original_price: 2499,
            discounted_price: 2499,
            discount_percent: 0
          }
        }
      ]
    },
    {
      product_name: "Purple Floral Lehenga Set",
      brand: "LOOM",
      canonicalURL: "purple-floral-lehenga",
      variants: [
        {
          images: [
            {
              image_url: "http://localhost:3000/assets/commonImageEthnic.png",
              is_primary: true
            }
          ],
          pricing: {
            original_price: 3999,
            discounted_price: 2999,
            discount_percent: 25
          }
        }
      ]
    },

  ];

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

  const menEthnicWearSection = [
    { title: "SHERWANI", image: "/assets/menethnic01.png" },
    { title: "INDOWESTERN", image: "/assets/menethnic02.png" },
    { title: "JODHPURI", image: "/assets/menethnic03.png" },
    { title: "SUITS & TUXEDOS", image: "/assets/menethnic04.png" },
  ];

  const craftChips = [
    {
      img: "http://localhost:3000/assets/womenswear1.png",
      title: "Silk"
    },
    {
      img: "http://localhost:3000/assets/womenswear1.png",
      title: "Cotton"
    },
    {
      img: "http://localhost:3000/assets/womenswear1.png",
      title: "Chikankari"
    },
    {
      img: "http://localhost:3000/assets/womenswear1.png",
      title: "Banarasi"
    },
    {
      img: "http://localhost:3000/assets/womenswear1.png",
      title: "Handloom"
    }
  ];


  return (
    <section className="min-h-screen">
      {/* Banner */}
      <div className="w-full relative">
        <img
          src="/assets/ethnicPageBanner.png"
          alt="Ethnic Page"
          className="w-full h-auto object-cover" // Makes the image cover the full width and maintain its aspect ratio
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
          <h1 className="text-4xl font-bold mb-2 text-primary">Ethnic Wear Collection</h1>
          <h2 className="text-xl mb-4 text-secondary">Celebrate Tradition • Wedding • Festive • Daily</h2>
          <button className="bg-white text-primary py-2 px-6 rounded-lg hover:scale-105 transition duration-300">
            View All Ethnic Wear
          </button>
        </div>
      </div>

      {/* Occasion Based Section */}
      <OccasionBased data={occasionBasedWears} />

      {/* Products Section */}
      <div className="section-spacing">

        {/* Horizontal Scrollable Products */}
        <div className="overflow-x-auto px-4 pb-4">
          <div className="flex justify-between gap-6">
            {ethnicProducts.map((product, index) => (
              <ProductCardEthnic
                key={index}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>


      {/* From Reception to Wedding  */}
      <section className="section-spacing">
        <section className="py-16 px-4 md:px-16 bg-[url('/assets/ReceptionToWedding.png')] bg-cover">
          {/* Heading */}
          <div className="text-center mb-12 flex flex-col  items-center">
            <img src="/assets/creativeBorderUp.png" alt="" />
            <h2 className="text-2xl md:text-3xl font-semibold
  bg-gradient-to-b
  from-[#FFECA7]
  via-[#F7DD95]
  to-[#FFB900]
  bg-clip-text text-transparent font-serif">
              From Reception to Wedding
            </h2>
            <img src="/assets/creativeBorderDown.png" alt="" />

          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-3xl h-[360px]"
                >
                  {/* Image */}
                  <img
                    src="http://localhost:3000/assets/womenswear1.png"
                    alt="Occasion"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/25" />

                  {/* Text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span className="text-xl md:text-2xl font-semibold
  bg-gradient-to-b
  from-[#FFECA7]
  via-[#F7DD95]
  to-[#FFB900]
  bg-clip-text text-transparent font-serif tracking-wide">
                      Occasion
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </section>



      {/* Women's Ethnic Wear */}
      {/* done responsive */}
      <WomenEthnicWearSection data={womenEthnicWearSection} />


      {/* Premium & Elegant */}
      <section className="section-spacing">


        <div className="bg-[url('/assets/premiumBg.png')] py-10">
          <div className="max-w-xl mx-auto flex flex-col justify-between items-center text-center mb-10">
            <img src="/assets/creativeBorderUp.png" alt="" />
            <h1 className="text-4xl text-primary font-serif font-semibold">Premium & Elegant</h1>
            <h2 className="text-3xl text-secondary">Handpicked ethnic wear crafted with elegance,
              comfort & timeless design.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              <CategoryCard
                img="/assets/premium-sm-img.png"
                title="Designer Sets"
              />
              <CategoryCard
                img="/assets/premium-sm-img.png"
                title="Daily Elegance"
              />
            </div>

            {/* CENTER COLUMN */}
            <div className="flex">
              <CategoryCard
                img="/assets/premium-lg-img.png"
                title="View Collection"
                large
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
              <CategoryCard
                img="/assets/premium-sm-img.png"
                title="Evening Gowns"
              />
              <CategoryCard
                img="/assets/premium-sm-img.png"
                title="Casual Ethnic"
              />
            </div>
          </div>


        </div>
      </section>

      {/*  Craft Chips */}
      <section className="section-spacing">
        <div className="px-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Fabric</h2>
          <p className="text-gray-600 mt-2">Discover our premium fabric collection</p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="overflow-x-auto px-4 pb-4 scrollbar-hide">
          <div className="flex justify-between gap-4 md:gap-6">
            {craftChips.map((fabric, index) => (
              <div key={index} className="flex-shrink-0 w-40 md:w-56">
                <div className="relative bg-primary rounded-xl aspect-square flex items-center justify-center">

                  {/* Oval Image */}
                  <div className="relative w-28 h-36 md:w-32 md:h-44 rounded-full overflow-hidden bg-white">
                    <img
                      src={fabric.img}
                      alt={fabric.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Center Text Overlay */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm text-center py-1.5 md:py-2">
                      <p className="font-primary text-xs md:text-sm font-medium text-gray-900 px-1">
                        {fabric.title}
                      </p>
                    </div>
                  </div>



                </div>
              </div>
            ))}

          </div>
        </div>


      </section>




      {/* Lightweight cotton fabric for all-day comfort */}
      <section className="section-spacing">
        <div className="relative w-full">
          {/* IMAGE */}
          <img
            src="/assets/ladies-and-flowers-bg.png"
            alt="Cotton Collection"
            className="w-full h-auto object-cover"
          />

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 flex justify-end px-6 md:px-16">
            <div className="w-3/5 flex flex-col justify-center text-left">
              <h2 className="text-2xl md:text-3xl font-serif text-[#2c1a10] leading-snug">
                Lightweight cotton <br />
                fabric for all-day comfort
              </h2>

              <div>
                <button className="mt-6 rounded-full bg-black text-white px-6 py-2 text-sm hover:bg-black/90 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Occasion Based Section */}
      <OccasionBased data={occasionBasedWears} />

      {/* banner wala */}
      <section className="section-spacing">
        <div className="relative w-full overflow-hidden rounded-2xl">
          {/* IMAGE */}
          <img
            src="/assets/sale-banner.png"
            alt="Wedding Season Sale"
            className="w-full h-auto object-cover"
          />

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 flex items-center px-6 md:px-16">
            <div className="max-w-md text-white">
              <h2 className="text-2xl md:text-3xl font-serif leading-snug">
                Wedding Season Sale
                <br />
                Flat 30% OFF
              </h2>

              <button className="mt-6 rounded-full bg-white text-black px-6 py-2 text-sm font-medium hover:bg-white/90 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* men weas section */}
      {/* done responsive */}
      <MenEthnicWearSection data={menEthnicWearSection} />

      {/* Products Section */}
      <div className="section-spacing">

        {/* Horizontal Scrollable Products */}
        <div className="overflow-x-auto px-4 pb-4">
          <div className="flex justify-between gap-6">
            {ethnicProducts.map((product, index) => (
              <ProductCardEthnic
                key={index}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>

      {/* banner wala and bottom 3 cards */}

      <section className="section-spacing space-y-10">
        {/* ================= TOP BANNER ================= */}
        <div className="relative w-full overflow-hidden">
          <Image
            src="/assets/classic-ethnic-banner.png"
            alt="Classic Ethnic Styles"
            width={1920}
            height={500}
            className="w-full h-auto"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-end px-6 md:px-16">
            <div className="w-1/3 text-white">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">
                Classic Ethnic Styles
                <br />
                for Modern Men
              </h2>

              <button className="mt-6 rounded-full bg-white text-primary font-serif px-6 py-2 text-lg font-medium hover:bg-white/90 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM 3 CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="
            relative
            bg-cover bg-center bg-no-repeat
            min-h-[240px]
            aspect-square
            p-32
            flex items-center justify-center
          "
                style={{
                  backgroundImage: "url('/assets/cardBg.png')",
                }}
              >
                <h3 className="text-white text-3xl md:text-5xl font-semibold text-center">
                  {index === 0 && "Under ₹200"}
                  {index === 1 && "Under ₹500"}
                  {index === 2 && "Best Deal"}
                </h3>
              </div>
            ))}
        </div>
      </section>


      {/* faq */}
    </section>
  );
}