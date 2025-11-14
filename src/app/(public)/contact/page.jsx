import HeroBanner from "@/components/HeroBanner";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800">
      {/* 🔹 Hero Section */}
      <HeroBanner title="Contact Us" imgUrl="/assets/bg3.webp" />

      {/* 🔹 Contact Info Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            For further assistance or inquiries, feel free to reach out to us through any of the
            channels below. We’re always happy to help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Phone */}
          <div className="flex items-start gap-4 p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <Phone className="text-blue-600" size={26} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+91 9522474600</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-4 p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <MessageCircle className="text-green-600" size={26} />
            <div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/919522474600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <Mail className="text-red-500" size={26} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a
                href="mailto:yaduayush100@gmail.com"
                className="text-blue-600 hover:underline"
              >
                yaduayush100@gmail.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <MapPin className="text-purple-600" size={26} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">
                1701, New Dwarkapuri, Indore – 452009, India
              </p>
              <a
                href="https://maps.google.com/?q=1701+New+Dwarkapuri+Indore+452009"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Footer Quote */}
      <div className="text-center text-gray-700 italic text-lg pb-16">
        “We’re just a message away — your fashion journey begins with Gaurastra.”
      </div>
    </section>
  );
};

export default ContactUs;
