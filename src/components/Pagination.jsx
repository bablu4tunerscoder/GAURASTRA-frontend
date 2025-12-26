"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages = 1 }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page);
        router.push(`?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {/* Previous */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                <ChevronLeft size={16} />
                Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 rounded-md text-sm border
            ${page === currentPage
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
