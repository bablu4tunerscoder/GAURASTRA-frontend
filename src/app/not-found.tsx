'use client'

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6" role="main">
      <div className="w-full max-w-md text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-900 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9z" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-300">Sorry — the page you are looking for doesn’t exist or has been moved.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <span className="inline-block px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Go to homepage</span>
          </Link>

          <button
            type="button"
            onClick={() => history.back()}
            className="inline-block px-5 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Go back
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-400">If you think this is an error, <a href="/contact" className="underline">contact us</a>.</p>
      </div>
    </main>
  );
}
