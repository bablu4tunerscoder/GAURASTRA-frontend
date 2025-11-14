"use client";
import HeroBanner from "@/components/HeroBanner";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner title="Privacy Policy" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <p className="text-gray-600 mb-8 text-lg">
          At <span className="font-semibold text-blue-600">Gaurastra</span>, we value your privacy
          and are committed to protecting your personal data. This policy explains how we collect,
          use, and protect your information when you use our services.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect personal details such as your name, email, phone number, address, and
              payment information when you make a purchase or register an account. We also collect
              non-personal data like browser type, pages visited, and usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>To process your orders and deliver products efficiently.</li>
              <li>To improve our website’s performance and user experience.</li>
              <li>To send updates, offers, or service-related notifications (with your consent).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
            <p className="text-gray-700">
              We use industry-standard encryption and secure servers to protect your data from
              unauthorized access, disclosure, or alteration.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
            <p className="text-gray-700">
              Gaurastra does not sell or rent your personal information. We only share necessary data
              with trusted partners (e.g., payment gateways or delivery providers) to complete your
              transactions securely.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
            <p className="text-gray-700">
              We use cookies to enhance your browsing experience. You can modify your browser
              settings to disable cookies, but some features of our site may not function properly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p className="text-gray-700">
              Gaurastra reserves the right to update this Privacy Policy periodically. Any changes
              will be reflected on this page with an updated date.
            </p>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            For any privacy-related queries, contact us at:
          </h3>
          <p className="text-gray-700">📞 +91 9522474600 | 💬 WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
