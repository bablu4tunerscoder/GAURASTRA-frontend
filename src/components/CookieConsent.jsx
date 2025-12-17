"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({
        accepted: true,
        necessaryOnly: false,
        timestamp: Date.now(),
      })
    );
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({
        accepted: false,
        necessaryOnly: false,
        timestamp: Date.now(),
      })
    );
    setVisible(false);
  };

  const necessaryOnlyCookies = () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({
        accepted: false,
        necessaryOnly: true,
        timestamp: Date.now(),
      })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-100 p-4 w-full z-50">
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm max-w-[60%] text-gray-700">
            We value your privacy. We use cookies to enhance your browsing
            experience, analyse traffic, and serve personalised content. Read
            our{" "}
            <Link
              href="/cookie-policy"
              className="font-medium text-blue-600 underline"
            >
              Cookie Policy
            </Link>
            .
          </p>

          <div className="flex gap-3 flex-wrap"> 
             <button
              onClick={acceptCookies}
              className="border px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
            >
              Accept All
            </button>
            <button
              onClick={necessaryOnlyCookies}
              className="border px-4 py-2 text-sm text-yellow-700 hover:bg-gray-100"
            >
              Necessary Only
            </button>

            <button
              onClick={rejectCookies}
              className="border px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
            >
              Reject
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
}
