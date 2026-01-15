import ProductCardEthnic from "@/components/ProductCardEthnic";
import OccasionBased from "./OccasionBased";

import Image from "next/image";
import FAQ from "@/components/FAQ";
import Heading from "@/components/home_components/Heading";
import WomenEthnicWearSection from "@/components/home_components/WomenEthnicWearSection";
import MenEthnicWearSection from "@/components/home_components/MenEthnicWearSection";

const CategoryCard = ({ img, title, large = false }) => {
  return (
    <div
      className={`relative overflow-hidden md:rounded-3xl rounded ${large ? "row-span-2" : ""
        }`}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Bottom black overlay (30px) */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-24
          bg-gradient-to-t
          from-black/90
          via-black/80
          to-transparent"
      />

      {/* Text */}
      <div className="absolute md:bottom-6 bottom-1 left-1/2 -translate-x-1/2">
        <span
          className={`text-sm md:text-xl md:font-semibold font-medium tracking-wider rounded-full whitespace-nowrap 
            ${large && " px-10  bg-white/40 py-3 rounded-full"} `
          }
        >
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
      image: "/assets/occasion-wedding-wear.png",
      url: "/women/lehenga"
    },
    {
      title: "Festive Wear",
      image: "/assets/occasion-festive-wear.png",
      url: "/women/kurti"
    },
    {
      title: "Party Wear",
      image: "/assets/occasion-party-wear.png",
      url: "/women/saree"
    },
    {
      title: "Daily Wear",
      image: "/assets/occasion-daily-wear.png",
      url: "/women/dupatta"
    },
    {
      title: "Office Wear",
      image: "/assets/occasion-office-wear.png",
      url: "/women/lehenga"
    },
  ];



  const occasionBasedMenWears = [
    {
      title: "  Cultural Events",
      image: "/assets/occasion-men-cultural-events.png",
      url: "/women/lehenga"
    },
    {
      title: "Festive Wear",
      image: "/assets/occasion-men-festive-wear.png",
      url: "/women/kurti"
    },
    {
      title: "Party Wear",
      image: "/assets/occasion-men-party-wear.png",
      url: "/women/saree"
    },
    {
      title: "Puja  Cloths",
      image: "/assets/occasion-men-puja-cloths.png",
      url: "/women/dupatta"
    },
    {
      title: "Office Wear",
      image: "/assets/occasion-men-office-wear.png",
      url: "/women/lehenga"
    },
  ];

  const ethnicProductsWomen = [
    {
      product_name: "Indigo Cotton Bandhani Bush Shirt",
      brand: "LOOM",
      canonicalURL: "indigo-cotton-bandhani-bush-shirt",
      variants: [
        {
          images: [
            {
              image_url: "/assets/occasion-women-product-01.png",
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
              image_url: "/assets/occasion-women-product-02.png",
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
              image_url: "/assets/occasion-women-product-03.png",
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
              image_url: "/assets/occasion-women-product-04.png",
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

  const ethnicProductsMen = [
    {
      product_name: "Indigo Cotton Bandhani Bush Shirt",
      brand: "LOOM",
      canonicalURL: "indigo-cotton-bandhani-bush-shirt",
      variants: [
        {
          images: [
            {
              image_url: "/assets/occasion-men-product-01.png",
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
              image_url: "/assets/occasion-men-product-02.png",
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
              image_url: "/assets/occasion-men-product-03.png",
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
              image_url: "/assets/occasion-men-product-04.png",
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
      name: "Long Kurti",
      image: "/assets/ethnic-long-kurti.png",
      url: "/women/lehenga"
    },
    {
      name: "Short Kurti",
      image: "/assets/ethnic-short-kurti.png",
      url: "/women/kurti"
    },
    {
      name: "Co-ord Sets",
      image: "/assets/ethnic-co-ord-set.png",
      url: "/women/saree"
    },
    {
      name: "Gown",
      image: "/assets/ethnic-gown.png",
      url: "/women/dupatta"
    },
    {
      name: "Sharara Set",
      image: "/assets/ethnic-sharara-set.png",
      url: "/women/lehenga"
    },
  ]


  const fromReceptiontoWedding = [
    {
      img: "/assets/reception.png",
      title: "Reception"
    },
    {
      img: "/assets/engagement.png",
      title: "Engagement"
    },
    {
      img: "/assets/sangeet.png",
      title: "Sangeet"
    },
    {
      img: "/assets/wedding.png",
      title: "Wedding"
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
      img: "/assets/craft-silk.png",
      title: "Silk"
    },
    {
      img: "/assets/craft-cotton.png",
      title: "Cotton"
    },
    {
      img: "/assets/craft-chikankari.png",
      title: "Chikankari"
    },
    {
      img: "/assets/craft-banarasi.png",
      title: "Banarasi"
    },
    {
      img: "/assets/craft-handloom.png",
      title: "Handloom"
    }
  ];

  const faqData = [
    {
      question: "How do I choose the right size?",
      answer:
        "You can refer to our detailed size guide available on every product page to find the perfect fit.",
    },
    {
      question: "Are your products handcrafted or handloom?",
      answer:
        "Yes, all our products are carefully handcrafted using premium-quality fabrics.",
    },
    {
      question: "Will the color fade after washing?",
      answer:
        "No, our products go through color-fastness testing to ensure long-lasting colors.",
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes, we deliver to all major cities and towns across India.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 5–7 business days depending on your location.",
    },
  ];

  return (
    <section className="min-h-screen dark:bg-white">

      {/* Banner */}
      {/* done responsive */}
      <div className="w-full relative">
        <img
          src="/assets/ethnicPageBanner.png"
          alt="Ethnic Page"
          className="w-full h-auto object-cover" // Makes the image cover the full width and maintain its aspect ratio
        />
        <div className="absolute top-1/2 md:left-10  w-1/2 left-4 transform -translate-y-1/2">
          <h1
            className="
    md:text-4xl text-xl
    font-medium
    tracking-wide
    font-serif
    md:mb-2
    text-primary
    drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)]
  "
          >
            Ethnic Wear Collection
          </h1>
          <h2
            className="
    md:text-xl text-sm
    tracking-tight
    md:mb-4 mb-2
    text-secondary
    drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]
  "
          >
            Celebrate Tradition • Wedding • Festive • Daily
          </h2>


          <button className="bg-white text-primary md:py-2 py-1 md:px-6 px-3 text-sm md:text-lg font-serif rounded-lg hover:scale-105 transition duration-300">
            View All Ethnic Wear
          </button>
        </div>

      </div>

      {/* Occasion Based Section */}
      {/* done responsive */}
      <OccasionBased data={occasionBasedWears} title=" Occasion-Based Women Wear" />

      {/* Products Section */}
      {/* done responsive */}
      <div className="section-spacing">

        {/* Horizontal Scrollable Products */}
        <div className="overflow-x-auto no-scrollbar ">
          <div className="flex justify-between gap-6">
            {ethnicProductsWomen.map((product, index) => (
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
        <section className="section-spacing bg-[url('/assets/ReceptionToWedding.png')] bg-cover  py-6">
          {/* Heading */}
          <div className="text-center md:mb-12 mb-6 flex flex-col items-center">
            <img src="/assets/creativeBorderUp.png" className="w-2/3 md:w-auto" alt="" />
            <h2 className="text-xl md:text-3xl font-semibold
  bg-gradient-to-b
  from-[#FFECA7]
  via-[#F7DD95]
  to-[#FFB900]
  bg-clip-text text-transparent font-serif
  leading-none
  ">
              From Reception to Wedding
            </h2>
            <img src="/assets/creativeBorderDown.png" className="w-2/3 md:w-auto" alt="" />

          </div>

          {/* Cards */}
          <div className="flex gap-6 justify-center overflow-x-auto no-scrollbar lg:overflow-x-hidden">
            {fromReceptiontoWedding
              .map((item, index) => (
                <div
                  key={index}
                  className="
          relative
          flex-shrink-0
          w-[200px] md:w-[280px] lg:w-[300px]
          md:h-[360px] h-[250px]
          overflow-hidden
          rounded-3xl
        "
                >
                  {/* Image */}
                  <img
                    src={item.img}
                    alt="Occasion"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/25" />

                  {/* Text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <span
                      className="
              text-xl md:text-2xl font-semibold
              bg-gradient-to-b
              from-[#FFECA7]
              via-[#F7DD95]
              to-[#FFB900]
              bg-clip-text text-transparent
              font-serif tracking-wide
            "
                    >
                      {item.title}
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
      {/* done responsive */}
      <section className="section-spacing">

        <div className="bg-[url('/assets/premiumBg.png')] pb-4 md:py-6">
          <div className="md:max-w-xl max-w-lg mx-auto flex flex-col justify-between items-center text-center md:mb-10 mb-4">
            <img src="/assets/creativeBorderUp.png" alt="" />
            <h1 className="md:text-4xl text-2xl md:mt-0 -mt-3 text-primary font-serif font-semibold">Premium & Elegant</h1>
            <h2 className="md:text-3xl text-lg text-secondary">Handpicked ethnic wear crafted with elegance,
              comfort & timeless design.</h2>
          </div>
          <div className="grid grid-cols-3 md:gap-4 gap-1">
            {/* LEFT COLUMN */}
            <div className="flex flex-col md:gap-4 gap-1">
              <CategoryCard
                img="/assets/premium-designer-set.png"
                title="Designer Sets"
              />
              <CategoryCard
                img="/assets/premium-daily-elegance.png"
                title="Daily Elegance"
              />
            </div>

            {/* CENTER COLUMN */}
            <div className="flex">
              <CategoryCard
                img="/assets/premium-center-image.png"
                title="View Collection"
                large
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col md:gap-4 gap-1">
              <CategoryCard
                img="/assets/premium-evening-gowns.png"
                title="Evening Gowns"
              />
              <CategoryCard
                img="/assets/premium-casual-ethnic.png"
                title="Casual Ethnic"
              />
            </div>
          </div>


        </div>
      </section>

      {/*  Craft Chips */}
      {/* done responscive */}
      <section className="section-spacing">
        <Heading title="Craft Chips" />

        {/* Horizontal Scrollable Container */}
        <div className="overflow-x-auto px-4 pb-4 no-scrollbar">
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
      {/* done responsive */}
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
              <h2 className="text-lg md:text-3xl font-serif text-[#2c1a10] leading-snug">
                Lightweight cotton <br />
                fabric for all-day comfort
              </h2>

              <div>
                <button className="md:mt-6 mt-1 rounded-2xl bg-black text-white px-6 py-2 md:text-sm text-xs hover:bg-black/90 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Occasion Based Section */}
      <OccasionBased data={occasionBasedMenWears} title="Occasion Based Men Wear" />

      {/* banner wala */}
      {/* done resppnsive */}
      <section className="section-spacing">
        <div className="relative w-full overflow-hidden ">
          {/* IMAGE */}
          <img
            src="/assets/sale-banner.png"
            alt="Wedding Season Sale"
            className="w-full h-auto object-cover"
          />

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 flex items-center px-4 md:px-16">
            <div className="max-w-md text-white">
              <h2 className="text-sm md:text-lg lg:text-3xl font-serif leading-snug">
                Wedding Season Sale
                <br />
                Flat 30% OFF
              </h2>

              <button className="lg:mt-6 md:mt-2 mt-1 md:rounded-full rounded text-primary bg-white font-serif md:px-6 px-3 md:py-2 py-1 md:text-lg text-xs font-medium hover:bg-white/90 transition">
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
      {/* done responsive */}
      <div className="section-spacing">

        {/* Horizontal Scrollable Products */}
        <div className="overflow-x-auto no-scrollbar ">

          <div className="flex justify-between gap-6">
            {ethnicProductsMen.map((product, index) => (
              <ProductCardEthnic
                key={index}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>

      {/* banner wala and bottom 3 cards */}
      {/* done responsive */}
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

          <div className="absolute inset-0 flex items-center justify-end">
            <div className="md:w-1/3 w-1/2 ps-6 text-white">
              <h2 className="text-xs md:text-3xl md:font-serif md:font-semibold tracking-widest">
                Classic Ethnic Styles
                <br />
                for Modern Men
              </h2>

              <button className="md:mt-6 mt-2 rounded-full bg-white text-primary font-serif px-6 py-1 text-sm  font-medium hover:bg-white/90 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM 3 CARDS ================= */}
        <div className="grid grid-cols-3 gap-4 md:gap-20 w-full">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="
        relative
        bg-contain bg-center bg-no-repeat
        flex items-center justify-center
        aspect-square
      "
                style={{
                  backgroundImage: "url('/assets/cardBg.png')",
                }}
              >
                <h3 className="text-white text-lg sm:text-xl md:text-5xl font-semibold text-center px-2 whitespace-pre-line">
                  {index === 0 && "Under\n₹200"}
                  {index === 1 && "Under\n₹500"}
                  {index === 2 && "Best Deal"}
                </h3>
              </div>
            ))}

        </div>

      </section>


      {/* faq */}
      <div className="section-spacing pb-10">
        <Heading title="Frequently Asked Questions" />
        <FAQ data={faqData} />
      </div>
    </section>
  );
}