// app/products/page.jsx

import ProductsTable from "./ProductsTable";

export default function ProductsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Products</h1>
            <ProductsTable />
        </div>
    );
}
