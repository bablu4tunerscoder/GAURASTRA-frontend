"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const formatLabel = (text) =>
    text
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-black font-medium">
                Home
            </Link>

            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const notClickable = index < 1;

                return (
                    <div key={href} className="flex items-center">
                        <ChevronRight size={16} className="mx-2 text-gray-400" />

                        {notClickable ? (
                            <span className="text-black cursor-default">
                                {formatLabel(segment)}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:text-black font-medium cursor-pointer"
                            >
                                {formatLabel(segment)}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;