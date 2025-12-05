"use client";
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance";
import { printVariantQR } from "@/utils/printVariantQR";
import { ChevronRight, Pencil, Printer, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const VariantRow = ({ v, productId, GetData }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue, formState: { isSubmitting }
    } = useForm({
        defaultValues: {
            color: v.color || "#000000",
            size: v.size || "M",
            stock: v.stock || 0,
            actual_price: v.actual_price || 0,
            offer: v.offer || 0,
            offer_type: v.offer_type || "percentage",
            discounted_price: v.discounted_price || 0,
            qrcode_url: v.qrcode_url || ""
        }
    });

    const actualPrice = watch("actual_price");
    const offer = watch("offer");
    const offerType = watch("offer_type");
    const colorValue = watch("color");


    // Auto calculate discounted price
    useEffect(() => {
        const price = parseFloat(actualPrice) || 0;
        const offerAmount = parseFloat(offer) || 0;
        let discounted = price;

        if (offerType === "percentage") {
            discounted = price - (price * offerAmount / 100);
        } else {
            discounted = price - offerAmount;
        }

        setValue("discounted_price", Math.max(0, discounted).toFixed(2));
    }, [actualPrice, offer, offerType, setValue]);

    const onSubmit = async (data) => {
        try {
            await axiosInstanceWithOfflineToken.put(
                `/api/offline/products/update-variant/w/p/${productId}/v/${v.variant_unique_id}`,
                data
            );

            toast.success("Variant updated successfully!");
            GetData()

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update variant.");
        }
    };


    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            {/* COLOR */}
            <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        {...register("color")}
                        className="w-10 h-10 border rounded cursor-pointer"
                    />
                    <input
                        type="text"
                        value={colorValue}
                        onChange={(e) => setValue("color", e.target.value)}
                        className="w-24 px-2 py-1 text-sm border rounded"
                    />
                </div>
            </td>

            {/* SIZE */}
            <td className="px-3 py-3">
                <select
                    {...register("size")}
                    className="w-full px-2 py-1 text-sm border rounded"
                >
                    {sizeOptions.map((s) => (
                        <option key={s} value={s.toLowerCase()}>{s}</option>
                    ))}
                </select>
            </td>

            {/* STOCK */}
            <td className="px-3 py-3">
                <input
                    type="number"
                    {...register("stock", {
                        valueAsNumber: true,
                        min: 0
                    })}
                    className="w-20 px-2 py-1 text-sm border rounded"
                />
            </td>

            {/* ACTUAL PRICE */}
            <td className="px-3 py-3">
                <input
                    type="number"
                    step="0.01"
                    {...register("actual_price", {
                        valueAsNumber: true,
                        min: 0
                    })}
                    className="w-24 px-2 py-1 text-sm border rounded"
                />
            </td>

            {/* OFFER */}
            <td className="px-3 py-3">
                <div className="flex gap-1">
                    <input
                        type="number"
                        step="0.01"
                        {...register("offer", {
                            valueAsNumber: true,
                            min: 0
                        })}
                        className="w-16 px-2 py-1 text-sm border rounded"
                    />
                    <select
                        {...register("offer_type")}
                        className="px-2 py-1 text-sm border rounded"
                    >
                        <option value="percentage">%</option>
                        <option value="flat">₹</option>
                    </select>
                </div>
            </td>

            {/* DISCOUNTED PRICE */}
            <td className="px-3 py-3">
                <input
                    type="number"
                    readOnly
                    {...register("discounted_price", {
                        valueAsNumber: true
                    })}
                    className="w-24 px-2 py-1 text-sm bg-gray-100 border rounded"
                />
            </td>

            {/* QR CODE */}
            <td className="px-3 py-3 text-center">
                <button
                    type="button"
                    onClick={() => printVariantQR(v)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Print QR"
                >
                    <Printer className="w-4 h-4" />
                </button>
            </td>

            {/* UPDATE BUTTON */}
            <td className="px-3 py-3 text-center">
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className={`px-3 py-1 text-sm rounded ${isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        }`}
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>

            </td>
        </tr>
    );
};

// ========================================================================
// MAIN PRODUCT ROW + VARIANT TABLE
// ========================================================================
const SingleTableData = ({
    p,
    index,
    expandedRows,
    toggleRowExpansion,
    openEditPage,
    openDeleteModal,
    GetData
}) => {
    return (
        <React.Fragment key={p._id}>
            {/* MAIN PRODUCT ROW */}
            <tr
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
            >
                <td className="text-center">
                    <button
                        onClick={() => toggleRowExpansion(p._id)}
                        className="inline-flex px-6 py-4 items-center justify-center text-gray-600 hover:text-gray-900"
                    >
                        <ChevronRight
                            className={`w-4 h-4 transition-transform ${expandedRows.has(p._id) ? "rotate-90" : ""
                                }`}
                        />
                    </button>
                </td>

                <td className="px-6 py-4 text-gray-900 font-medium">
                    {p.title}
                </td>

                <td className="px-6 py-4 text-gray-900">
                    {p.variants?.reduce((acc, v) => acc + v.stock, 0) ?? "—"}
                </td>

                <td className="px-6 py-4">
                    {p.active ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Inactive
                        </span>
                    )}
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openEditPage(p)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => openDeleteModal(p._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* VARIANTS SUBTABLE */}
            {expandedRows.has(p._id) && (
                <tr>
                    <td colSpan={5} className="p-0">
                        <div className="bg-blue-50 border-t border-b border-blue-200 p-4">
                            <p className="text-sm font-semibold text-blue-900 mb-3">
                                Product Variants
                            </p>

                            <div className="bg-white rounded-lg border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-blue-100">
                                        <tr className="text-xs text-blue-900 font-medium">
                                            <th className="px-3 py-2 text-left">Color</th>
                                            <th className="px-3 py-2 text-left">Size</th>
                                            <th className="px-3 py-2 text-left">Stock</th>
                                            <th className="px-3 py-2 text-left">Actual Price (₹)</th>
                                            <th className="px-3 py-2 text-left">Offer</th>
                                            <th className="px-3 py-2 text-left">Discounted (₹)</th>
                                            <th className="px-3 py-2 text-center">QR</th>
                                            <th className="px-3 py-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {p.variants?.map((v) => (
                                            <VariantRow
                                                GetData={GetData}
                                                key={v._id}
                                                v={v}
                                                productId={p.unique_id}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default SingleTableData;