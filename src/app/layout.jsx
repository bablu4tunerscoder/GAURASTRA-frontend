import { Providers } from "@/Redux/provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
          <ToasterProvider />
          {/* Discount Popup */}
          {/* <DiscountPopup /> */}

          {/* Header */}

          {/* <main className="pt-16 max-w-7xl mx-auto min-h-[50vh]"> */}
          {children}
          {/* </main> */}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>

  );
}
