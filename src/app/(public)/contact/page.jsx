"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-white">
      <Image
        src="/assets/productPageBanner.png"
        alt="Category Banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="min-h-screen px-4 md:px-16 py-16">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-500 mb-8">Have a question? We’re here to help.</p>
        </div>
        <div className="flex flex-col md:flex-row py-10 gap-8">
          {/* Left: Form */}
          <div className="max-w-md">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:border-none focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:border-none focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:border-none focus:ring-primary"
              />
              <textarea
                rows={4}
                placeholder="Message"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:border-none focus:ring-primary"
              />
              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Map Illustration */}
          <div className="relative md:block hidden w-full h-full">
            <Image
              src="/assets/world-map.png"
              alt="World map"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            {/* Location Tag */}
            <div className="absolute right-32 top-44 flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md">
              <span className="text-xl">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}