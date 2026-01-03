import React from "react";

/**
 * Responsive Pagination Component
 * Props:
 * - currentPage: number
 * - totalPages: number
 * - onPageChange: (page:number) => void
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
      >
        Prev
      </button>

      {/* Mobile view (only current page) */}
      <span className="sm:hidden px-3 py-1 border rounded-lg text-sm">
        {currentPage} / {totalPages}
      </span>

      {/* Desktop view (page numbers) */}
      <div className="hidden sm:flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg border text-sm transition ${
              page === currentPage
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

/* Example Usage:

const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
/>

*/