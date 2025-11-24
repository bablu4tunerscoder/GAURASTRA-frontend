import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "@/Redux/provider";
import DiscountPopup from "@/components/DiscountPopup";
import ToasterProvider from "@/components/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gaurastra",
  description: "Gaurastra ecommerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Providers>
          {/* <ToasterProvider />  */}
          {/* Discount Popup */}
          <DiscountPopup />
          
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="pt-16 max-w-7xl mx-auto min-h-[50vh] md:px-6 px-2 ">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>

  );
}
