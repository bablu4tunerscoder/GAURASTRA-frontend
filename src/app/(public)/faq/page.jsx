"use client";
import HeroBanner from "@/components/HeroBanner";
import { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Gaurastra?",
      answer:
        "Gaurastra is a fashion label that creates custom-designed, premium-quality clothing. From everyday elegance to grand wedding attire, our pieces reflect individuality and tradition.",
    },
    {
      question: "Do you offer custom designs?",
      answer:
        "Absolutely! We specialize in creating made-to-measure pieces based on your style, fit, and occasion. Whether it’s a casual look or wedding couture, we bring your ideas to life.",
    },
    {
      question: "Can I get outfits designed for a wedding?",
      answer:
        "Yes! We design custom wedding wear for the bride, groom, and the entire wedding party. You can also book a call with our design team for personalized assistance.",
    },
    {
      question: "What fabrics do you use?",
      answer: `
        <p>We work exclusively with premium, breathable, and skin-friendly fabrics, including:</p>
        <ul>
          <li>• Linen – Lightweight & perfect for summer</li>
          <li>• Muslin – Soft, airy, and elegant for drapes</li>
          <li>• Silk – Luxurious, rich, and ideal for occasion wear</li>
          <li>• Cotton – Comfortable, natural, and everyday-friendly</li>
          <li>• Khadi – Handwoven, traditional & eco-conscious</li>
          <li>• Modal & Bamboo – Smooth, breathable, and sustainably crafted</li>
        </ul>
        <p>Looking for something specific? We also offer custom fabric sourcing based on your design needs, wedding themes, or seasonal requirements.</p>
        <p>Quality isn’t optional—it’s a promise.</p>
      `,
    },
    {
      question: "How do I place an order?",
      answer:
        "You can order directly through our website or contact us via Instagram DM or WhatsApp for custom pieces. We’ll guide you through every step.",
    },
    {
      question: "How long does it take to deliver a custom order?",
      answer:
        "Most custom orders are ready within 7–14 working days, depending on the design. For urgent wedding orders, we offer fast-tracked options too.",
    },
    {
      question: "Do you ship across India?",
      answer:
        "Yes, we offer pan-India shipping. Charges are calculated at checkout based on your location.",
    },
    {
      question: "Can I return or exchange a custom piece?",
      answer:
        "Since all our pieces are custom-made, we do not offer returns or exchanges unless there is a defect or a mistake from our side. But don’t worry—we ensure quality checks at every stage.",
    },
    {
      question: "How can I consult a designer?",
      answer: `
        <p>Simply reach out via:</p>
        <ul>
          <li>• Instagram DM: <a href="https://www.instagram.com/gaurastra/" target="_blank" rel="noopener noreferrer"><strong>@gaurastra</strong></a></li>
          <li>• Book a Call: <a href="https://wa.me/919522474600" target="_blank" rel="noopener noreferrer"><strong>Click to chat</strong></a></li>
        </ul>
      `,
    },
  ];

  const [openIndex, setOpenIndex] = useState(nullO);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner imgUrl="/assets/faq.webp" title="FAQs" />

      {/* 🔹 FAQ Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12">
        <p className="text-center text-gray-600 text-lg mb-12">
          Find answers to common questions about our custom fashion, services, and policies.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h2>
                <span className="text-xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[800px] p-5 pt-0" : "max-h-0"
                  }`}
              >
                <div
                  className="text-gray-700 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
