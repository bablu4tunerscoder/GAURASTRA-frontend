"use client"

import DeleteModal from "@/components/DeleteModal"
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { useRouter } from "next/navigation"
import SingleTableData from "./SingleTableData"

export default function ProductsTable() {
    const [products, setProducts] = useState([])
    const [expandedRows, setExpandedRows] = useState(new Set());

    // Delete Modal Logic
    const [deleteId, setDeleteId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter()

    const GetData = async () => {
        try {
            const { data } = await axiosInstanceWithOfflineToken.get("/api/offline/products/w")
            setProducts(data.data || [])
        } catch (error) {
            console.error("Fetch error:", error)
        }
    }

    useEffect(() => {
        GetData()
    }, [])

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
        setDeleteId(id)
        setIsModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteId(null)
        setIsModalOpen(false)
    }

    // DELETE CONFIRM
    const handleConfirmDelete = async () => {
        try {
            const token = sessionStorage.getItem("offline_access_token")

            await axiosInstanceWithOfflineToken.delete(`/api/offline/products/w/delete/${deleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            toast.success("Product deleted successfully!")
            setProducts((prev) => prev.filter((p) => p._id !== deleteId))
        } catch (error) {
            console.error("Delete error:", error)
            toast.error("Failed to delete product.")
        }

        closeDeleteModal()
    }

    // OPEN EDIT PAGE INSTEAD OF MODAL
    const openEditPage = (product) => {
        sessionStorage.setItem("edit_product", JSON.stringify(product))
        router.push(`/offline/edit-product/${product.unique_id}`)
    }

    return (
        <>
            {/* === SLEEK PRODUCT TABLE === */}
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-white border-b border-border">
                            <tr>
                                <th className="w-8 px-6 py-3"></th>
                                <th className="px-6 py-3 text-left font-semibold">Product</th>
                                <th className="px-6 py-3 text-left font-semibold">Total Stock</th>
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
                                    GetData={GetData}
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
            <DeleteModal open={isModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
        </>
    )
}
