"use client";

import { useForm } from "react-hook-form";
import { User, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";

const ReturnStatusForm = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            phone: "",
            full_name: "",
            date: "",
        },
    });

    const onSubmit = async (formData) => {
        const { phone, full_name, date } = formData;
        console.log(phone)
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axiosInstanceWithOfflineToken.get(
                "/api/offline/billing/w/get-billings-with-return-status",
                {
                    params: {
                        ...(phone && { phone }),
                        ...(full_name && { full_name }),
                        ...(date && { date }),
                    },
                }
            );

            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch return status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* ================= FORM ================= */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white p-4 rounded-lg shadow
                   grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                {/* Phone */}
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="tel"
                        placeholder="Phone *"
                        {...register("phone")}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Full Name */}
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Full name"
                        {...register("full_name")}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Date */}
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="date"
                        {...register("date")}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded-md
                     hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {/* ================= ERROR ================= */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* ================= TABLE ================= */}
            {result?.data?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.data.map((bill) => (
                        <div
                            key={bill._id}
                            className="bg-white rounded-lg shadow p-4 space-y-3"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500">Billing ID</p>
                                    <p className="text-sm font-semibold break-all">
                                        {bill.billing_id}
                                    </p>
                                </div>

                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded
              ${bill.returnable
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {bill.returnable ? "Returnable" : "Not Returnable"}
                                </span>
                            </div>

                            {/* Customer */}
                            <div className="flex justify-between">
                                <div>

                                    <p className="text-xs text-gray-500">Customer</p>
                                    <p className="font-medium">{bill.user_info.full_name}</p>
                                </div>

                                <div>
                                    <p className=" text-xs text-gray-500">Phone</p>
                                    <p className="font-medium">{bill.user_info.phone}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <p className="text-xs text-gray-500">Items</p>
                                <div className="text-sm space-y-1">
                                    {bill.items.map((item) => (
                                        <div key={item._id} className="flex justify-between">
                                            <span>{item.title}</span>
                                            <span className="font-medium">× {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Info */}
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="font-semibold">₹{bill.total_amount}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Payment</p>
                                    <p className="uppercase font-medium">
                                        {bill.payment_method}
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between text-xs text-gray-500 border-t pt-2">
                                <span>{bill.days_passed} days passed</span>
                                <span>
                                    {new Date(bill.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                    }
                </div >
            )}

        </div >
    );
};

export default ReturnStatusForm;
