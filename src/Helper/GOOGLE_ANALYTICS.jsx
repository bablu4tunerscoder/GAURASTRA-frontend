'use client';

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function GOOGLE_ANALYTICS() {
  const pathname = usePathname();

  if (pathname.startsWith("/offline")) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-71TXNSBGQL"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-71TXNSBGQL');
        `}
      </Script>
    </>
  );
}
