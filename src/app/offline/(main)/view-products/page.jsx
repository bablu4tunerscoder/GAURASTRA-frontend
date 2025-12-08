// app/products/page.jsx
import { Box } from "lucide-react";
import ProductsTable from "./ProductsTable";
import React from "react";

export default function ProductsPage() {
    return (
        <>
            {/* Icon */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl shadow-md flex items-center justify-center">
                    <Box className="w-5 h-5 text-indigo-600" />
                </div>
                <h1 className="text-lg text-gray-900">View Products</h1>
            </div>

            <ProductsTable />
        </>
    );
}
