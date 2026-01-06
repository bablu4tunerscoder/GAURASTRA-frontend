"use client";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";
import { printSingleClickVariantQR } from "@/utils/printSingleClickVariantQR";
import { printSingleClickVariantQRAsImage } from "@/utils/printSingleClickVariantQRAsImage";
import { printVariantQR } from "@/utils/printVariantQR";
import { ChevronRight, Pencil, QrCode, Trash2 } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const VariantRow = ({ v, productId, GetData, productName }) => {

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
    // const colorValue = watch("color");


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
        <tr className="bg-white border-b border-gray-200">
            {/* COLOR */}
            <td className="px-3">
                <input
                    type="color"
                    {...register("color")}
                    className="w-9 h-10 cursor-pointer border-none"
                />
            </td>


            {/* SIZE */}
            <td className="px-3 py-3 ">
                <select
                    {...register("size")}
                    className="w-full p-2 bg-gray-100 min-w-14 text-sm rounded"
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
                    className="w-20 p-2 bg-gray-100  text-sm rounded"
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
                    className="flex-1 min-w-20 w-full p-2 bg-gray-100 text-sm rounded"
                />
            </td>

            {/* OFFER */}
            <td className="px-3  py-3">
                <div className="flex gap-1">
                    <input
                        type="number"
                        step="0.01"
                        {...register("offer", {
                            valueAsNumber: true,
                            min: 0
                        })}
                        className="w-2/3 p-2 min-w-20 bg-gray-100 text-sm rounded"
                    />
                    <select
                        {...register("offer_type")}
                        className="p-2 w-1/3 min-w-16  text-sm rounded bg-gray-100"
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
                    className="flex-1 w-full min-w-20 p-2  text-sm bg-gray-100 rounded"
                />
            </td>

            {/* QR CODE */}
            <td className="px-3 py-3 text-center">
                <button
                    type="button"
                    onClick={() => printVariantQR(v, productName)}
                    className="p-2 border text-gray-500 hover:bg-gray-100 rounded"
                    title="Print QR"
                >

                    <QrCode className="w-4 h-4" />
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
                        : "bg-green-600 text-white hover:bg cursor-pointer"
                        }`}
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>

            </td>
        </tr>
    );
};


const SingleTableData = ({
    p,
    index,
    expandedRows,
    toggleRowExpansion,
    openEditPage,
    openDeleteModal,
    GetData,
    postApiCall
}) => {



    return (
        <React.Fragment key={p._id}>
            {/* MAIN PRODUCT ROW */}
            <tr
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
            >
                <td className="p-0">
                    <button
                        onClick={() => toggleRowExpansion(p._id)}
                        className="w-full h-full py-8 flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-900"
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
                    {p.variants?.map((item, index) => (
                        <span
                            className={`uppercase ${item.stock < 5 ? 'text-red-500 font-bold' : ''}`}
                            key={index}
                        >
                            {item.size}({item.stock})
                            {index < p.variants.length - 1 && ", "}
                        </span>
                    ))}
                </td>


                <td className="px-6 py-4">
                    <Image
                        src={p.images?.[0]}
                        alt={p.product_name || "Product image"}
                        width={70}
                        height={70}
                        className="max-h-[70px] object-contain"
                    />
                </td>


                <td className="px-3 py-3">
                    <button
                        type="button"
                        onClick={async () => {
                            printSingleClickVariantQRAsImage(p.variants, p.title)
                        }}
                        className="p-1 border border-gray-400 text-gray-500 hover:bg-gray-100 rounded"
                        title="Print QR"
                    >
                        {/* <QrCode className="w-4 h-4" /> */}
                        <Image src="/assets/product-tag-qr.png" alt="QR Code" width={30} height={30} />
                    </button>
                </td>
                <td className="px-3 py-3">
                    <button
                        type="button"
                        onClick={() => {
                            printSingleClickVariantQR(p.variants, p.title)
                        }}

                        className="p-1 border border-gray-400 text-gray-500 hover:bg-gray-100 rounded"
                        title="Print QR"
                    >
                        {/* <QrCode className="w-4 h-4" /> */}
                        <Image src="/assets/qr.png" alt="QR Code" width={30} height={30} />
                    </button>
                </td>

                <td className="px-6 py-4">
                    <button className="cursor-pointer" onClick={() => postApiCall(p._id)}>
                        {p.print ? (
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Printed
                            </span>
                        ) : (
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                Not Printed
                            </span>
                        )}
                    </button>
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
                    <td colSpan={12} className="px-6 pb-4">
                        <div className="bg-blue-50 border-gray-200 border border-b-0 rounded-lg overflow-hidden ">

                            <p className="flex items-center p-3 font-semibold text-blue-900">
                                Product Variants
                            </p>

                            <div className="bg-white">
                                <table className="w-full">
                                    <thead className="bg-blue-100">
                                        <tr className="text-xs text-gray-600 bg-gray-100 border-y border-gray-200 font-medium">
                                            <th className="p-3 text-left">Color</th>
                                            <th className="p-3 text-left">Size</th>
                                            <th className="p-3 text-left w-20">Stock</th>
                                            <th className="p-3 text-left">Actual Price (₹)</th>
                                            <th className="p-3 text-left">Offer</th>
                                            <th className="p-3 text-left">Discounted (₹)</th>
                                            <th className="p-3 text-center">QR</th>
                                            <th className="p-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {p.variants?.map((v) => (
                                            <VariantRow
                                                GetData={GetData}
                                                key={v._id}
                                                v={v}
                                                productName={p.title}
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