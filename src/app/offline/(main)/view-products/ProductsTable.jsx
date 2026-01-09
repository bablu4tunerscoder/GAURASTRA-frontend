"use client";

import DeleteModal from "@/components/DeleteModal";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SingleTableData from "./SingleTableData";
import { Box, Printer } from "lucide-react";
import Pagination from "../../_components/pagination";
import { useSearchParams } from "next/navigation";
import { printBulkVariantQR } from "@/utils/printBulkVariantQR";

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    // Changed from IDs to full product objects for bulk print
    const [selectedProductsForBulkPrint, setSelectedProductsForBulkPrint] = useState([]);

    const handleBulkProductToggle = (product) => {
        setSelectedProductsForBulkPrint(prevProducts => {
            const exists = prevProducts.some(p => p._id === product._id);
            if (exists) {
                return prevProducts.filter(p => p._id !== product._id);
            } else {
                return [...prevProducts, product];
            }
        });
    };

    // Check if all current page products are selected
    const isAllCurrentPageSelected = () => {
        if (products.length === 0) return false;
        return products.every(p =>
            selectedProductsForBulkPrint.some(selected => selected._id === p._id)
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Add all current page products to selection
            setSelectedProductsForBulkPrint(prevProducts => {
                const newProducts = [...prevProducts];
                products.forEach(product => {
                    if (!newProducts.some(p => p._id === product._id)) {
                        newProducts.push(product);
                    }
                });
                return newProducts;
            });
        } else {
            // Remove all current page products from selection
            const currentPageIds = products.map(p => p._id);
            setSelectedProductsForBulkPrint(prevProducts =>
                prevProducts.filter(p => !currentPageIds.includes(p._id))
            );
        }
    };

    const [pagination, setPagination] = useState({
        page: parseInt(searchParams.get("page")) || 1,
        limit: 10,
        totalPages: 1,
        totalRecords: 0,
    });


    // Update the useEffect to watch for URL changes:
    useEffect(() => {
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;
        setPagination(prev => ({ ...prev, page: pageFromUrl }));
    }, [searchParams]);

    // Fetch products with a search query
    const fetchProducts = async (query = searchTerm) => {
        try {
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
        }
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        // Clear selections on new search
        // setSelectedProductsForBulkPrint([]);
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
            // Remove from bulk print selection if exists
            setSelectedProductsForBulkPrint(prev =>
                prev.filter(p => p._id !== deleteId)
            );
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

    // to know the print is done before or not
    const handleAfterPrintApiCall = async (id, singlePrintCall = true) => {
        try {
            const { data } = await axiosInstanceWithOfflineToken.put(
                "/api/offline/products/print-done/" + id
            );

            if (data && data.success) {
                if (singlePrintCall) {
                    fetchProducts();
                }
            } else {
                console.log('API call failed or no data received');
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    const handleBulkPrint = () => {
        console.log("bulk print");
        if (selectedProductsForBulkPrint.length === 0) {
            toast.error("Please select at least one product to print");
            return;
        }

        // No need to filter - we already have the full product objects
        printBulkVariantQR(selectedProductsForBulkPrint);

        selectedProductsForBulkPrint.forEach(product => {
            handleAfterPrintApiCall(product._id, false);
        });

        // Clear selections after printing
        setSelectedProductsForBulkPrint([]);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, [pagination.page]);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 md:p-3 p-2 shadow-lg rounded-2xl flex items-center justify-center">
                        <Box className="text-white w-8 h-8" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">View Products</h1>
                        <p className="text-gray-600 md:text-md text-sm">
                            View and manage your products with ease.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => {
                                fetchProducts('');
                                setSearchTerm('');
                            }}
                            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        placeholder="Search product..."
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 cursor-pointer"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Bulk Print Button */}
            {selectedProductsForBulkPrint.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                        {selectedProductsForBulkPrint.length} product(s) selected across all pages
                    </span>
                    <button
                        onClick={handleBulkPrint}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        <Printer className="w-4 h-4" />
                        Print Selected ({selectedProductsForBulkPrint.length})
                    </button>
                </div>
            )}

            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-white border-b border-border">
                            <tr className="text-nowrap">
                                <th className="px-6 py-4 text-center font-semibold ">
                                    <div className="flex gap-1 items-center ">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            id="all-checkbox-select"
                                            checked={isAllCurrentPageSelected()}
                                            className="w-4 h-4 cursor-pointer  accent-gray-300"
                                        />
                                        <label className="cursor-pointer" htmlFor="all-checkbox-select">
                                            Select All (This Page)
                                        </label>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left font-semibold ">Product</th>
                                <th className="px-6 py-4 text-left font-semibold">Size Stock Details</th>
                                <th className="px-6 py-4 text-left font-semibold">Image</th>
                                <th className="px-6 py-4 text-left font-semibold">Print image</th>
                                <th className="px-6 py-4 text-left font-semibold">Print PDF</th>
                                <th className="px-6 py-4 text-left font-semibold">Printed Before</th>
                                <th className="px-6 py-4 text-left font-semibold">Status</th>
                                <th className="px-6 py-4 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="10" className="py-12 text-center text-muted-foreground">
                                        No products found
                                    </td>
                                </tr>
                            )}
                            {products.map((p, index) => (
                                <SingleTableData
                                    key={p._id}
                                    p={p}
                                    GetData={fetchProducts}
                                    selectedProductsForBulkPrint={selectedProductsForBulkPrint}
                                    handleBulkProductToggle={handleBulkProductToggle}
                                    postApiCall={handleAfterPrintApiCall}
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

            <DeleteModal
                open={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
            />

            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
            />
        </>
    );
}