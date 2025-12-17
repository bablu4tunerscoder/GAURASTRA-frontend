import { Providers } from "@/Redux/provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ToasterProvider from "@/components/ToasterProvider";

import GOOGLE_ANALYTICS from "@/Helper/GOOGLE_ANALYTICS";
import CookieConsent from "@/components/CookieConsent";


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

       <GOOGLE_ANALYTICS />

        <Providers>
          <ToasterProvider />
    
          {children}
          <CookieConsent />
        
        </Providers>
      </body>
    </html>

  );
}
