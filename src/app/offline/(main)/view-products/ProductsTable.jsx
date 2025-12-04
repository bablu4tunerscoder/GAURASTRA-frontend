"use client"

import DeleteModal from "@/components/DeleteModal"
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance"
import { ChevronRight, Pencil, Printer, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { printVariantQR } from "@/utils/printVariantQR"
import { useRouter } from "next/navigation"

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
                                <th className="px-6 py-3 text-left font-semibold text-foreground/80">Product</th>
                                <th className="px-6 py-3 text-left font-semibold text-foreground/80">Price</th>
                                <th className="px-6 py-3 text-left font-semibold text-foreground/80">Stock</th>
                                <th className="px-6 py-3 text-left font-semibold text-foreground/80">Status</th>
                                <th className="px-6 py-3 text-left font-semibold text-foreground/80">Actions</th>
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
                                <React.Fragment key={p._id}>
                                    {/* MAIN PRODUCT ROW */}
                                    <tr
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-muted/30"} 
                        hover:bg-muted/20 transition-colors duration-150`}
                                    >
                                        <td className="text-center">
                                            <button
                                                onClick={() => toggleRowExpansion(p._id)}
                                                className="inline-flex cursor-pointer px-6 py-4  items-center justify-center p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label="Toggle variants"
                                            >
                                                <ChevronRight
                                                    className={`w-4 h-4 transition-transform duration-200 ${expandedRows.has(p._id) ? "rotate-90" : ""
                                                        }`}
                                                />
                                            </button>
                                        </td>


                                        <td className="px-6 py-4 text-foreground font-medium">{p.title}</td>

                                        <td className="px-6 py-4 text-foreground font-semibold">
                                            ₹{p.variants?.[0]?.discounted_price || "—"}
                                        </td>

                                        <td className="px-6 py-4 text-foreground">
                                            {p.variants?.reduce((acc, v) => acc + v.stock, 0) ?? "—"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {p.active ? (
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditPage(p)}
                                                    className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 cursor-pointer text-blue-500 rounded-md transition-all duration-150"
                                                    aria-label="Edit product"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => openDeleteModal(p._id)}
                                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 cursor-pointer text-red-500 rounded-md transition-all duration-150"
                                                    aria-label="Delete product"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* VARIANT TABLE */}
                                    {expandedRows.has(p._id) && (
                                        <tr className="bg-muted/10  border-b border-border">
                                            <td colSpan="6" className="p-0">
                                                <div className="pl-10 pt-4">
                                                    <div className="mb-3">
                                                        <h3 className="text-sm font-semibold text-foreground/70">Variants</h3>
                                                    </div>

                                                    <div className="overflow-x-auto">
                                                        <table className="w-full text-xs">
                                                            <thead>
                                                                <tr className="bg-gray-700 text-white border-b border-border/50">
                                                                    <th className="px-3 py-2 text-left font-medium">Color</th>
                                                                    <th className="px-3 py-2 text-left font-medium">Size</th>
                                                                    <th className="px-3 py-2 text-left font-medium">Stock</th>
                                                                    <th className="px-3 py-2 text-left font-medium">Price</th>
                                                                    <th className="px-3 py-2 text-left font-medium">QR Code</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="divide-y divide-border/30">
                                                                {p.variants?.map((v, vIndex) => (
                                                                    <tr
                                                                        key={v._id}
                                                                        className={`${vIndex % 2 === 0 ? "bg-white" : "bg-muted/20"} 
                                                        hover:bg-muted/30 transition-colors duration-150`}
                                                                    >
                                                                        <td className="px-3 py-3">
                                                                            <div className="flex items-center gap-2">
                                                                                <span
                                                                                    className="w-5 h-5 rounded border border-border"
                                                                                    style={{ background: v.color }}
                                                                                ></span>
                                                                                <span className="text-foreground/70 text-xs">{v.color}</span>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-3 py-3 text-foreground/70 text-xs">{v.size}</td>
                                                                        <td className="px-3 py-3 text-foreground/70 text-xs">{v.stock}</td>

                                                                        <td className="px-3 py-3 text-foreground font-medium text-xs">
                                                                            ₹{v.discounted_price}
                                                                        </td>

                                                                        <td className="px-3 py-3">
                                                                            <img
                                                                                src={v.qrcode_url || "/placeholder.svg"}
                                                                                alt="QR Code"
                                                                                className="w-16 h-16 object-contain border border-border rounded"
                                                                            />

                                                                            {/* PRINT BUTTON */}
                                                                            <button
                                                                                onClick={() => printVariantQR(v)}
                                                                                className="px-3  cursor-pointer py-2 text-sm mt-1 rounded-md bg-blue-600 flex items-center text-white hover:bg-blue-700 transition"
                                                                            >
                                                                                <Printer className="w-4 h-4 mr-2" />
                                                                                Print
                                                                            </button>


                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
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
