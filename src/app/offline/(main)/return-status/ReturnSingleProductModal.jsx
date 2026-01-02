"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstanceWithOfflineToken } from "@/helpers/axiosinstance";

const ReturnSingleProductModal = ({ bill, onClose }) => {

    if (!bill) return null;

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            reason: "",
            items: bill.items.reduce((acc, item) => {
                acc[item.variant_id] = false;
                return acc;
            }, {}),
            quantities: bill.items.reduce((acc, item) => {
                acc[item.variant_id] = item.quantity;
                return acc;
            }, {}),
        },
    });

    const [loading, setLoading] = useState(false);

    const itemsWatch = watch("items");
    const quantitiesWatch = watch("quantities");

    const isSubmitDisabled = Object.values(itemsWatch).every(value => !value);

    const handleIncrease = (variant_id, maxQty) => {
        const current = quantitiesWatch[variant_id] || 1;
        if (current < maxQty) setValue(`quantities.${variant_id}`, current + 1);
    };

    const handleDecrease = (variant_id) => {
        const current = quantitiesWatch[variant_id] || 1;
        if (current > 1) setValue(`quantities.${variant_id}`, current - 1);
    };

    const onSubmit = async (data) => {
        const selectedItems = Object.entries(data.items)
            .filter(([variant_id, checked]) => checked)
            .map(([variant_id]) => ({
                variant_id,
                quantity: Number(data.quantities[variant_id]),
            }));

        if (selectedItems.length === 0) {
            toast.error("Please select at least one product");
            return;
        }

        try {
            setLoading(true);
            await axiosInstanceWithOfflineToken.post(
                `/api/offline/return/partial/${bill.billing_id}`,
                {
                    reason: data.reason,
                    items: selectedItems,
                }
            );
            toast.success("Return request submitted successfully");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to submit return");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold">Return Selected Products</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Items with quantity */}
                    <div className="space-y-3">
                        {bill.items.map((item) => {
                            const isSelected = itemsWatch[item.variant_id];
                            const qty = quantitiesWatch[item.variant_id] || 1;

                            return (
                                <div
                                    key={item._id}
                                    className={`border rounded p-3 ${isSelected ? "border-blue-500" : "border-gray-200"}`}
                                >
                                    <div className="flex justify-between items-center gap-3">
                                        <label className="flex items-center gap-2">
                                            <Controller
                                                name={`items.${item.variant_id}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={(e) => field.onChange(e.target.checked)}
                                                    />
                                                )}
                                            />
                                            <span className="text-sm">{item.title}</span>
                                        </label>

                                        {isSelected && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDecrease(item.variant_id)}
                                                    className="px-2 border rounded text-sm"
                                                >
                                                    -
                                                </button>
                                                <Controller
                                                    name={`quantities.${item.variant_id}`}
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                        min: 1,
                                                        max: item.quantity,
                                                    }}
                                                    render={({ field }) => (
                                                        <input
                                                            type="number"
                                                            {...field}
                                                            min={1}
                                                            max={item.quantity}
                                                            className="w-12 border rounded text-center text-sm"
                                                        />
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleIncrease(item.variant_id, item.quantity)}
                                                    className="px-2 border rounded text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {isSelected && errors.quantities?.[item.variant_id] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            Quantity must be between 1 and {item.quantity}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

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
                            <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-200 py-2 cursor-pointer rounded disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading || isSubmitDisabled}
                            className={`flex-1 bg-blue-600 text-white py-2 rounded disabled:opacity-50 ${loading || isSubmitDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {loading ? "Submitting..." : "Submit Return"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReturnSingleProductModal;
