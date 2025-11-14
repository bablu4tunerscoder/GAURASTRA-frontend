"use client";

import HeroBanner from "@/components/HeroBanner";

export default function ReturnPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner title="Return Policy" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <p className="text-gray-600 mb-8 text-lg">
          At <span className="font-semibold text-blue-600">Gaurastra</span>, we strive to provide
          our customers with the best products and service. If you are not entirely satisfied with
          your purchase, please review our return and refund policy below.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Eligibility for Returns</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Items must be returned within 7 days of delivery.</li>
              <li>
                Products must be unused, unworn, unwashed, and in their original packaging with all
                tags intact.
              </li>
              <li>Customized or personalized products are not eligible for return.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Return Process</h2>
            <p className="text-gray-700 mb-2">
              To initiate a return, please contact our support team with your order ID and reason
              for return. Once approved, we will provide instructions for sending the item back.
            </p>
            <p className="text-gray-700">
              Please ensure that the product is securely packaged to avoid damage during transit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Refunds</h2>
            <p className="text-gray-700">
              Once your return is received and inspected, we will notify you about the approval or
              rejection of your refund. Approved refunds will be processed within 5–7 business days
              to your original payment method.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Exchanges</h2>
            <p className="text-gray-700">
              If you wish to exchange a product for a different size or color, please reach out to
              us. Exchanges are subject to stock availability and approval.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Damaged or Incorrect Items</h2>
            <p className="text-gray-700">
              If you receive a damaged or incorrect item, notify us within 48 hours of delivery.
              We will arrange a replacement or issue a refund after verification.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Non-Returnable Items</h2>
            <p className="text-gray-700">
              Certain items, including gift cards, sale items, and personalized orders, cannot be
              returned or refunded.
            </p>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            For return or refund queries, contact us at:
          </h3>
          <p className="text-gray-700">📞 +91 9522474600 | 💬 WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
