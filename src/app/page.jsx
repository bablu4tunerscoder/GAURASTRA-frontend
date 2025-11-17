import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-16 lg:px-32 py-12 bg-gray-900 text-white overflow-hidden">
      {/* 🔹 Background Image */}
      <Image
        src="/assets/fastionb.jpeg"
        alt="Luxury Designer Shirt Background"
        fill
        className="object-cover opacity-40"
        priority
      />

      {/* 🔹 Overlay Content */}
      <div className="relative z-10 max-w-4xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Luxury Designer Shirts for Men –{" "}
          <span className="text-blue-400">Gaurastra's</span> Handcrafted
          Streetwear Intermeets Indian Heritage
        </h1>

        <p className="text-gray-200 text-lg leading-relaxed mb-8">
          Discover unique oversized and vintage print tops in Khadi, Linen, and
          Cotton — from peacock to mirror work, India's hottest fashion brand
          combines style with culture.
        </p>

        <Link
          href="/category/men"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Shop Now →
        </Link>
      </div>
    </section>
  );
}
