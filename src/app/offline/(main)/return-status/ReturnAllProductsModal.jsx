"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";

const ReturnAllProductsModal = ({ bill, onClose }) => {
    if (!bill) return null;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            reason: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await axiosInstanceWithOfflineToken.post(
                `/api/offline/return/full/${bill.billing_id}`,
                {
                    reason: data.reason,
                }
            );

            toast.success("All products returned successfully");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Failed to return products"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold">Return All Products</h2>

                <p className="text-sm text-gray-600">
                    Are you sure you want to return all items for this bill?
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Reason */}
                    <div>
                        <Controller
                            name="reason"
                            control={control}
                            rules={{ required: "Return reason is required" }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="Return reason"
                                    className="w-full border rounded p-2 text-sm"
                                />
                            )}
                        />
                        {errors.reason && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reason.message}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-200 py-2 rounded disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Confirm Return"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReturnAllProductsModal;
