import "./globals.css";
import { Providers } from "@/Redux/provider";
import ToasterProvider from "@/components/ToasterProvider";
import {
  Montserrat,
  Playfair_Display,
} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Gaurastra",
  description: "Gaurastra ecommerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
          ${playfair.variable}
          antialiased bg-gray-50 text-gray-900
        `}
      >

        {/* <GOOGLE_ANALYTICS /> */}
        <Providers>
          <ToasterProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
