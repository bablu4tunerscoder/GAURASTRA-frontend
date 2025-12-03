"use client";

import { useEffect, useState } from "react";
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [deleteId, setDeleteId] = useState(null); // TRACK which product to delete
    const [isModalOpen, setIsModalOpen] = useState(false);

    const GetData = async () => {
        try {
            const token = sessionStorage.getItem("offline_access_token");

            const { data } = await axiosInstanceWithOfflineToken.get(
                "/api/offline/products/w",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts(data.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    // OPEN modal
    const openDeleteModal = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    // CLOSE modal
    const closeModal = () => {
        setDeleteId(null);
        setIsModalOpen(false);
    };

    // CONFIRM delete
    const handleConfirmDelete = async () => {
        try {
            const token = sessionStorage.getItem("offline_access_token");

            await axiosInstanceWithOfflineToken.delete(
                `/api/offline/products/w/delete/${deleteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Product deleted successfully!");

            // Remove from UI
            setProducts((prev) => prev.filter((p) => p._id !== deleteId));

        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete product.");
        }

        closeModal();
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border border-gray-200">

                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Active</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-6 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}

                        {products.map((p) => (
                            <tr
                                key={p._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{p.title}</td>
                                <td className="px-4 py-3">{p.slug}</td>

                                <td className="px-4 py-3">
                                    {p.active ? (
                                        <span className="text-green-600 font-medium">Active</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Inactive</span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    ₹{p.variants?.[0]?.discounted_price || "—"}
                                </td>

                                <td className="px-4 py-3">
                                    {p.variants?.[0]?.stock ?? "—"}
                                </td>

                                <td className="px-4 py-3 flex gap-2">

                                    <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
                                        <Eye className="w-5 h-5 text-blue-600" />
                                    </button>

                                    <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100">
                                        <Pencil className="w-5 h-5 text-yellow-600" />
                                    </button>

                                    <button
                                        onClick={() => openDeleteModal(p._id)}
                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-600" />
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DELETE CONFIRM MODAL */}
            <DeleteModal
                open={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
