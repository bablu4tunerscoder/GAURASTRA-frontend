"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Responsive Pagination Component (Next.js App Router)
 */
export default function Pagination({ currentPage, totalPages }) {

  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) pages.push(i);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50 border-black text-black"
      >
        Prev
      </button>

      <span className="sm:hidden px-3 py-1 border rounded-lg text-sm">
        {currentPage} / {totalPages}
      </span>

      <div className="hidden sm:flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-3 py-1 rounded-lg border text-sm transition ${page === currentPage
              ? "bg-black text-white"
              : "hover:bg-gray-100 border-black text-black"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-black text-black text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
