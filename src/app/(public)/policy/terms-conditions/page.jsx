"use client";
import HeroBanner from "@/components/HeroBanner";

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
    <HeroBanner title="Terms and Conditions" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 leading-relaxed">
        <p className="text-gray-600 mb-8 text-lg">
          Welcome to <span className="font-semibold text-blue-600">Gaurastra</span>!
          By accessing our website and using our services, you agree to abide by
          the following terms and conditions. Please read them carefully before proceeding.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using our website, you agree to these terms and conditions.
              If you do not agree, please refrain from using our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>You must provide accurate and up-to-date information when using our services.</li>
              <li>You agree not to use our platform for any illegal activities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including logos, text, and images,
              is the property of Gaurastra and is protected under intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
            <p className="text-gray-700">
              Gaurastra is not responsible for any damages resulting from the use of our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Modification of Terms</h2>
            <p className="text-gray-700">
              We reserve the right to update these terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by the laws of Indore, India.
            </p>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            For any queries, please contact us at:
          </h3>
          <p className="text-gray-700">📞 +91 9522474600 | 💬 WhatsApp</p>
        </div>
      </div>
    </section>
  );
}
