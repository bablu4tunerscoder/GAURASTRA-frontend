"use client";

import DeleteModal from "@/components/DeleteModal";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SingleTableData from "./SingleTableData";
import { Box } from "lucide-react";
import Pagination from "../../_components/pagination";

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
  totalPages: 1,
  totalRecords: 0,
});

    // Fetch products with a search query
   const fetchProducts = async (query = searchTerm) => {
  try {
    setLoading(true);

    const { data } = await axiosInstanceWithOfflineToken.get(
      "/api/offline/products/w",
      {
        params: {
          search: query,
          page: pagination.page,
          limit: pagination.limit,
        },
      }
    );

    setProducts(data.data || []);

    const totalPages = Math.ceil(
      data.pagination.total / data.pagination.limit
    );

    setPagination((prev) => ({
      ...prev,
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalRecords: data.pagination.total,
      totalPages,
    }));
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};



   const handleSearch = () => {
  setPagination((prev) => ({ ...prev, page: 1 }));
  fetchProducts(searchTerm);
};

    // Delete Modal Logic
    const [deleteId, setDeleteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const toggleRowExpansion = (id) => {
        setExpandedRows((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    };

    // OPEN DELETE MODAL
    const openDeleteModal = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteId(null);
        setIsModalOpen(false);
    };

    // DELETE CONFIRM
    const handleConfirmDelete = async () => {
        try {
            const token = sessionStorage.getItem("offline_access_token");

            await axiosInstanceWithOfflineToken.delete(
                `/api/offline/products/w/delete/${deleteId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Product deleted successfully!");
            setProducts((prev) => prev.filter((p) => p._id !== deleteId));
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete product.");
        }

        closeDeleteModal();
    };

    // OPEN EDIT PAGE INSTEAD OF MODAL
    const openEditPage = (product) => {
        sessionStorage.setItem("edit_product", JSON.stringify(product));
        router.push(`/offline/edit-product/${product.unique_id}`);
    };

    useEffect(() => {
        fetchProducts();
    }, [pagination.page, searchTerm]);

    // console.log('products',products)

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                {/* Left */}
                {/* <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl shadow-md flex items-center justify-center">
                        <Box className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h1 className="text-lg text-gray-900">View Products</h1>
                </div> */}
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="bg-blue-600 md:p-3 p-2 shadow-lg rounded-2xl flex items-center justify-center">
                        <Box className="text-white w-8 h-8" />
                    </div>

                    {/* Text */}
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">View Products</h1>
                        <p className="text-gray-600 md:text-md text-sm">
                            View and manage your products with ease.
                        </p>
                    </div>
                </div>

                {/* Right - Search */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch(); // Trigger search on Enter key
                        }}
                        placeholder="Search product..."
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleSearch} // Trigger search on button click
                        className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* === SLEEK PRODUCT TABLE === */}
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-white border-b border-border">
                            <tr>
                                <th className="w-8 px-6 py-3"></th>
                                <th className="px-6 py-3 text-left font-semibold">Product</th>
                                <th className="px-6 py-3 text-left font-semibold">Size Stock Details</th>
                                <th className="px-6 py-3 text-left font-semibold">Image</th>
                                 <th className="px-6 py-3 text-left font-semibold">Print</th>
                                <th className="px-6 py-3 text-left font-semibold">Status</th>
                                <th className="px-6 py-3 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-muted-foreground">
                                        No products found
                                    </td>
                                </tr>
                            )}
                            {products.map((p, index) => (
                                <SingleTableData
                                    key={p._id}
                                    p={p}
                                    index={index}
                                    expandedRows={expandedRows}
                                    toggleRowExpansion={toggleRowExpansion}
                                    openEditPage={openEditPage}
                                    openDeleteModal={openDeleteModal}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DELETE MODAL */}
            <DeleteModal
                open={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
            />

     <Pagination
  currentPage={pagination.page}
  totalPages={pagination.totalPages}
  onPageChange={(newPage) =>
    setPagination((prev) => ({ ...prev, page: newPage }))
  }
/>
        </>
    );
}
