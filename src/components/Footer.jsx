import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, SendHorizontal, Youtube } from "lucide-react";
import Image from "next/image";
import Newsletter from "./Newsletter";

const Footer = () => {
  const footerSections = [
    {
      title: "EXPLORE",
      links: [
        { label: "Man", href: "/category/men" },
        { label: "Women", href: "/category/women" },
        { label: "Ethnic Wear", href: "/category/ethnic-wear" },
      ],
    },
    {
      title: "INFORMATION",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Store", href: "/store" },
        { label: "Blog", href: "/blogs" },
      ],
    },
    {
      title: "POLICIES",
      links: [
        { label: "Cancellation Policy", href: "/policy/cancellation-policy" },
        { label: "Privacy Policy", href: "/policy/privacy-policy" },
        { label: "Terms & Conditions", href: "/policy/terms-conditions" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-[url('/assets/footerbg.png')] bg-cover text-white">
      {/* newsletter section */}
     <Newsletter />

      {/* Main Footer */}
      <div className="px-4 md:px-16 py-14  overflow-hidden">
        <div className="flex  gap-10 md:items-center  md:flex-row flex-col">
          {/* Logo */}
          <div className="flex justify-center gap-6 relative">
            {/* Gradient Circle */}
            <div className="absolute z-10 -left-full -top-10 h-96 w-96 rounded-full 
    bg-gradient-to-br from-[#000A1D] to-[#031433] md:block hidden" />

            <Image
              src="/assets/updated-logo-white.png"
              alt="Gaurastra"
              width={180}
              height={50}
              className="md:h-16 h-14 w-auto relative z-10"
            />
          </div>

          <div className="flex-1 w-full grid lg:grid-cols-5 grid-cols-2">

            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="mb-4 font-semibold tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:block hidden">
              <p className="text-sm mb-3">Connect with Us</p>
              <div className="flex gap-1">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-white hover:text-black transition"
                    >
                      <Icon size={14} />
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* qr code */}
            <div className="">
              <div className="p-2 rounded-lg">
                <Image
                  src={"/assets/qr.png" || "/assets/box.png"}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="bg-white p-2"
                />
              </div>
              <p className="text-sm text-gray-300">Scan and follow us</p>
            </div>
            <div>
            </div>
          </div>
          {/* social media */}
          <div className="md:hidden flex  items-center gap-2">
            <p className="text-sm mb-3">Connect with Us</p>
            <div className="flex gap-1 items-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <Icon size={14} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 py-6 text-center text-sm text-gray-400">
        © 2025 GAURASTRA All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
