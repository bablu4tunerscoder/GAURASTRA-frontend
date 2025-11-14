"use client";

import HeroBanner from "@/components/HeroBanner";

export default function CancellationPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner title="Cancellation Policy" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <p className="text-gray-600 mb-8 text-lg">
          At <span className="font-semibold text-blue-600">Gaurastra</span>, we strive to provide
          the best service possible. If you need to cancel an order, please review our cancellation
          policy below.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Order Cancellation Before Shipment</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>You may cancel your order within 3 hours of placing it, provided it has not been shipped.</li>
              <li>To cancel, contact our support team at 📞 +91 9522474600 | 💬 WhatsApp.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Cancellation After Shipment</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Once an order is shipped, it cannot be canceled.</li>
              <li>If you no longer need the item, you may request a return as per our refund policy.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Custom or Personalized Orders</h2>
            <p className="text-gray-700">
              Custom-made or personalized items cannot be canceled after processing has started.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Subscription Cancellations (If applicable)</h2>
            <p className="text-gray-700">
              Subscription services can be canceled at any time; however, refunds will not be issued
              for the current billing period.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Refund Process for Canceled Orders</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>If your cancellation is approved, a refund will be credited within 5 - 6 business days.</li>
              <li>Refunds will be credited to the original payment method.</li>
            </ul>
            <p className="text-gray-700 mt-2">
              <strong>Note:</strong> There is no exchange — only refunds are processed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Cancellation Policy</h2>
            <p className="text-gray-700">
              We reserve the right to modify or update this policy at any time without prior notice.
            </p>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            For further assistance, please contact us at:
          </h3>
          <p className="text-gray-700">📞 +91 9522474600 | 💬 WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
