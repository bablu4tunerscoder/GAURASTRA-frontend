"use client";
import HeroBanner from "@/components/HeroBanner";
import { BookOpen, CheckCircle, Shirt, Star, Truck } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="min-h-screen  text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner imgUrl="/assets/bg3.webp" title="About Us" />

      {/* 🔹 Header Text */}
      <div className="text-center mb-16 px-6 md:px-16 lg:px-32">
        <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
          At <strong>Gaurastra</strong>, we believe fashion is more than just clothing—it’s a
          statement, a legacy, and a reflection of individuality. Our mission is to empower you
          with extraordinary{" "}
          <a
            href="https://www.gaurastra.com/our-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            custom-designed wear
          </a>{" "}
          that goes beyond the ordinary.
        </p>
      </div>

      {/* 🔹 Philosophy Section */}
      <div className="max-w-4xl mx-auto mb-20 px-6 md:px-16 lg:px-32 text-gray-700 leading-relaxed">
        <p>
          Every piece at Gaurastra is crafted with creativity, precision, and a deep appreciation
          for uniqueness. We provide a platform where your vision meets expert craftsmanship,
          allowing you to create styles that are truly your own. From timeless elegance to bold,
          contemporary{" "}
          <a
            href="https://www.gaurastra.com/our-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            designer outfits
          </a>
          , we ensure your wardrobe is as distinctive as you are.
        </p>

        <p className="mt-6">
          With quality at our core, we meticulously source premium fabrics and collaborate with
          skilled artisans to bring your ideas to life. Whether you’re looking for a signature
          piece or a completely{" "}
          <a
            href="https://www.gaurastra.com/our-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            custom wardrobe
          </a>
          , Gaurastra is where innovation meets tradition, and fashion turns into a personal
          legacy.
        </p>
      </div>

      {/* 🔹 Why Choose Us Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 md:px-12 mb-20">
        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <CheckCircle className="text-blue-600 mb-4" size={28} />
          <h3 className="font-semibold text-xl mb-3">Uncompromising Quality</h3>
          <p className="text-gray-600">
            We use only premium-quality, breathable, and skin-friendly materials ensuring both
            luxury and comfort.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <Star className="text-blue-600 mb-4" size={28} />
          <h3 className="font-semibold text-xl mb-3">Custom Creations</h3>
          <p className="text-gray-600">
            Your style, your rules! From{" "}
            <a
              href="https://www.gaurastra.com/category/shirts"
              className="text-blue-600 hover:underline"
            >
              minimalist looks
            </a>{" "}
            to bold statement pieces — we bring your ideas to life.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <Shirt className="text-blue-600 mb-4" size={28} />
          <h3 className="font-semibold text-xl mb-3">Handpicked Luxury Fabrics</h3>
          <p className="text-gray-600">
            From linen and muslin to silk and khadi — we carefully select high-quality, sustainable
            materials for your perfect wear.
          </p>
        </div>
      </div>

      {/* 🔹 Fabric Images */}
      <div className="grid md:grid-cols-3 gap-6 px-6 md:px-12 mb-20">
        {[
          "/assets/bg3.webp",
          "/assets/bg3.webp",
          "/assets/bg3.webp",
        ].map((src, i) => (
          <div key={i} className="relative w-full h-64">
            <Image
              fill
              src={src}
              alt="Fabric"
              className="rounded-2xl shadow-sm object-cover"
            />
          </div>
        ))}
      </div>

      {/* 🔹 Quick Links */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-6">
        <h2 className="text-2xl font-semibold mb-6">Explore More</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://www.gaurastra.com/blogs"
            className="text-blue-600 hover:underline flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen size={18} /> Read Our Blogs
          </a>
          <a
            href="https://www.gaurastra.com/faq"
            className="text-blue-600 hover:underline flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ
          </a>
          <a
            href="https://www.gaurastra.com/policy/shipping-policy"
            className="text-blue-600 hover:underline flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Truck size={18} /> Shipping & Returns
          </a>
        </div>
      </div>

      {/* 🔹 Popular Products */}
      <div className="max-w-5xl mx-auto text-center px-6 md:px-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Mirror Work Shirt – Premium Edition",
              link: "https://www.gaurastra.com/mirror-work-heritage-motif-design-shirt-63936a0f-895a-4704-860f-15b34eb9a4a9",
              img: "/assets/bg3.webp",
            },
            {
              name: "Peacock Print Cotton Shirt",
              link: "https://www.gaurastra.com/gaurastra-peacock-print-shirt-500e4f22-d431-40d8-84d0-43bad1a24533",
              img: "/assets/bg3.webp",
            },
            {
              name: "Khadi Shirt",
              link: "https://www.gaurastra.com/gaurastra-khadi-shirt-a27c2e13-76bf-4ceb-a382-adbdf4e46335",
              img: "/assets/bg3.webp",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-56 w-full overflow-hidden relative">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600">
                  {item.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 🔹 Footer Quote */}
      <div className="text-center mt-20 text-gray-700 italic text-lg px-6">
        “Design beyond limits. Wear beyond expectations. Leave a legacy with Gaurastra.”
      </div>
    </section>
  );
};

export default AboutUs;
