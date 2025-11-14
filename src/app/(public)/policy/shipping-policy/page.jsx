"use client";
import HeroBanner from "@/components/HeroBanner";

export default function ShippingPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner title="Shipping Policy" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <p className="text-gray-600 mb-8 text-lg">
          At <span className="font-semibold text-blue-600">Gaurastra</span>, we are committed to
          delivering your orders in a timely and efficient manner. Please review our shipping and
          delivery policy below.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Shipping Locations</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>We currently ship to Pan India.</li>
              <li>International shipping availability may vary.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Shipping Timeframes</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Orders are processed within 5 - 6 business days.</li>
              <li>Products will be delivered as follows:</li>
              <ul className="list-disc pl-6 space-y-1">
                <li>Domestic: 5 - 6 business days</li>
              </ul>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Shipping Charges</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Shipping costs are calculated at checkout based on weight and destination.</li>
              <li>Free shipping is available on orders above ₹799.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Order Tracking</h2>
            <p className="text-gray-700 mb-2">
              Once shipped, you will receive a tracking number via Email, SMS, or WhatsApp.
            </p>
            <p className="text-gray-700">
              You can track your order on our website or through the courier partner’s site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Delivery Delays</h2>
            <p className="text-gray-700">
              Delays may occur due to weather conditions, customs, or other unforeseen
              circumstances. We will notify you in case of significant delays.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Undeliverable Packages</h2>
            <p className="text-gray-700">
              If a package is returned due to an incorrect or incomplete address, additional charges
              may apply for re-shipping.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Lost or Damaged Orders</h2>
            <p className="text-gray-700">
              If your order is lost or arrives damaged, please contact us within 2 days of delivery
              to initiate a claim. We will assist you with a replacement or refund as applicable.
            </p>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            For any shipping-related inquiries, contact us at:
          </h3>
          <p className="text-gray-700">📞 +91 9522474600 | 💬 WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
