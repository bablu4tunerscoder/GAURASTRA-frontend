"use client";

// Everything in ONE file — all components created locally (NO external components)
import axiosInstance, { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance";
import { openPrintWindow } from "@/utils/openPrintWindow";
import { ChevronDown, CreditCard, Eye, FileCheck, IndianRupee, Mail, MapPin, Minus, Phone, Plus, RotateCcw, Scan, ScanQrCode, ShoppingCart, Trash2, User, X } from "lucide-react";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSessionAuth from "../../hook/useSessionAuth";
import toast from "react-hot-toast";

// Local Button Component
const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-lg font-semibold transition ${className}`}
        >
            {children}
        </button>
    );
};


export default function Billing() {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const videoRef = useRef(null);
    const scannerRef = useRef(null);
    const [billingPreview, setBillingPreview] = useState(null);


    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        defaultValues: {
            full_name: "",
            phone: "",
            pincode: "",
            payment_method: "cod",
            address_line1: "",
            address_line2: "",
            city: "",
            state: ""
        }
    });

    // Watch form values for invoice preview
    const formValues = watch();

    const startScanner = async () => {
        setIsScannerOpen(true);

        await new Promise((resolve) => setTimeout(resolve, 100)); // UI render wait

        if (videoRef.current) {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });

                scannerRef.current = new QrScanner(
                    videoRef.current,
                    (result) => handleScan(result),
                    { highlightScanRegion: true }
                );

                scannerRef.current.start();
            } catch (error) {
                toast.error("Camera not accessible");
            }
        }
    };

    const stopScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.stop();
            scannerRef.current = null;
        }
        setIsScannerOpen(false);
    };

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === item.id);

            if (exists) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, qty: p.qty + 1 } : p
                );
            }

            return [...prev, item];
        });
    };

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, qty: p.qty + 1 } : p
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev
                .map((p) =>
                    p.id === id ? { ...p, qty: p.qty - 1 } : p
                )
                .filter((p) => p.qty > 0)
        );
    };

    const handleScan = async (result) => {

        if (!result || !result.data) {
            console.log("No QR detected");
            return;
        }

        stopScanner();

        try {

            const qr = JSON.parse(result.data);

            const productId = qr.product_id;
            const variantId = qr.variant_id;

            const { data } = await axiosInstanceWithOfflineToken.get(
                `/api/offline/products/w/${productId}/variant/${variantId}`,
            );

            const cartItem = {
                id: data.variant.variant_unique_id,
                variant_id: data.variant.variant_unique_id,
                product_uniq_id: data.product_uniq_id,
                title: `${data.product_title} (${data.variant.color}, ${data.variant.size})`,
                discounted_price: data.variant.discounted_price,
                qty: 1
            };

            addToCart(cartItem);

        } catch (err) {
            console.error("QR ERROR:", err);
        }
    };

    const CalculatePrice = async () => {
        try {
            const payload = {
                items: cart.map((item) => ({
                    product_id: item.product_uniq_id,
                    quantity: item.qty,
                    variant_id: item.variant_id
                }))
            };

            const { data } = await axiosInstanceWithOfflineToken.post(`/api/offline/billing/calculate`,
                payload,
            );
            setBillingPreview(data.preview);

        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = async (formData) => {
        try {
            const payload = {
                items: cart.map((item) => ({
                    product_id: item.product_uniq_id,
                    quantity: item.qty,
                    variant_id: item.variant_id
                })),
                payment_method: formData.payment_method,
                user_info: {
                    full_name: formData.full_name,
                    phone: formData.phone
                },
                address: {
                    pincode: formData.pincode,
                    address_line1: formData.address_line1,
                    address_line2: formData.address_line2,
                    city: formData.city,
                    state: formData.state
                }
            };

            console.log(payload)
            const { data } = await axiosInstanceWithOfflineToken.post(
                `/api/offline/billing/create`,
                payload
            );
            openPrintWindow(data.data);

        } catch (err) {
            if (err?.response?.data?.warnings) {
                for (const warning of err?.response?.data?.warnings) {
                    toast.error(warning.product + " " + warning.variant + " " + warning.message,
                        {
                            duration: 5000,
                        });
                }
            } else {
                toast.error(err?.response?.data?.message || "No items available for sale");
            }
        }
    };

    const handleNewBill = () => {
        reset();
        setCart([]);
        setBillingPreview(null);
        window.location.reload();
    };

    useEffect(() => {
        CalculatePrice();
    }, [cart]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex items-center gap-3 mb-4">
                {/* Icon */}
                <div className="bg-blue-600 md:p-3 p-2 shadow-lg rounded-2xl flex items-center justify-center">
                    <IndianRupee className="text-white w-8 h-8" />
                </div>

                {/* Text */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Billing System</h1>
                    <p className="text-gray-600 md:text-md text-sm">
                        Scan, bill, and manage your sales efficiently
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">
                    {/* left */}
                    <div className="md:space-y-8 space-y-4">
                        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
                            <div className="flex gap-2">
                                <Scan className="text-blue-500" />
                                <p className="text-gray-600">
                                    QR Scanner
                                </p>
                            </div>
                            <Button
                                type="button"
                                onClick={startScanner}
                                className="w-full flex items-center justify-center gap-2 py-2 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow"
                            >
                                <Scan size={20} />
                                {cart.length == 0 ? ' Scan Product' : "Add More Product"}
                            </Button>

                            {isScannerOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                                        onClick={stopScanner}
                                    />

                                    {/* Modal */}
                                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                                        <div className="bg-white rounded-xl overflow-hidden shadow-xl w-md mx-4 relative">
                                            {/* Header */}
                                            <div className="flex justify-between items-start bg-[#0051ED] rounded-t-xl p-5">
                                                <div>
                                                    <h2 className="text-xl font-normal text-white flex items-center gap-2 mb-1">
                                                        <ScanQrCode className="w-6 h-6" />
                                                        Scan QR Scanner
                                                    </h2>
                                                    <p className="text-md font-normal text-white opacity-90">
                                                        Pasting the QR Code within the frame
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={stopScanner}
                                                    className="text-white hover:text-gray-300 text-2xl leading-none"
                                                >
                                                    <X size={26} />
                                                </button>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6 space-y-4">
                                                <div className="w-full h-80 border rounded-xl overflow-hidden flex items-center justify-center text-gray-500">
                                                    <video ref={videoRef} className="w-full h-full object-cover" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={stopScanner}
                                                    className="w-full text-center bg-[#F0F5F9] hover:bg-blue-200 transition font-semibold py-2 px-4 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* consumer details */}
                        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center gap-2 font-medium text-gray-700">
                                    <User className="w-4 h-4 text-blue-500" />
                                    <span>Customer Details</span>
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mt-1">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register("full_name", {
                                                required: "Full name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 characters"
                                                }
                                            })}
                                            className={`w-full border ${errors.full_name ? 'border-red-500' : 'border-gray-200'} rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    {errors.full_name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mt-1">
                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Please enter a valid 10-digit phone number"
                                                }
                                            })}
                                            className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                {/* Payment Method */}
                                {/* <hr /> */}
                                <div>
                                    <div className="flex text-sm font-medium text-gray-600 gap-2 items-center">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Payment Method</span>
                                    </div>

                                    <select
                                        className="w-full border mt-1 border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        {...register("paymentMethod", {
                                            required: "Payment method is required",
                                        })}
                                    // defaultValue="cash"
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>

                                {/* Address Section */}
                                <hr className="border-gray-200" />
                                <div className="flex items-center gap-2 font-medium text-gray-700">
                                    <MapPin className="w-4 h-4" />
                                    <span>Address</span>
                                </div>

                                {/* Pincode + City */}
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        {...register("pincode")}
                                        className="border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Pincode"
                                    />
                                    <input
                                        type="text"
                                        {...register("city")}
                                        className="border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="City"
                                    />
                                </div>

                                {/* Address Line 1 */}
                                <input
                                    type="text"
                                    {...register("address_line1")}
                                    className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Street address, building name"
                                />

                                {/* Address Line 2 */}
                                <input
                                    type="text"
                                    {...register("address_line2")}
                                    className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Apartment, suite, etc."
                                />

                                {/* State */}
                                <input
                                    type="text"
                                    {...register("state")}
                                    className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="State"
                                />


                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="rounded-xl overflow-hidden space-y-4">
                        <div className="bg-white p-6 rounded-2xl overflow-hidden shadow-md">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-medium text-gray-700 text-lg">
                                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                                    <span>Products</span>
                                </div>
                                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                    {cart.length} items
                                </span>
                            </div>

                            {/* Table */}
                            <div className="mt-4">
                                <div className="grid grid-cols-12 text-gray-600 text-sm font-semibold border-b pb-2">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Price</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>
                                {/* Cart Items */}
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <div key={index} className="grid grid-cols-12 items-center py-4 border-b">
                                            <div className="col-span-6 font-medium text-gray-700">
                                                {item.title}
                                            </div>

                                            {/* Qty */}
                                            <div className="col-span-2 flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQty(item.id)}
                                                    className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-md"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-gray-700 font-medium">{item.qty}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => increaseQty(item.id)}
                                                    className="w-7 h-7 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2 text-right text-gray-700">₹{item.discounted_price}</div>

                                            {/* Total */}
                                            <div className="col-span-2 text-right flex items-center justify-end gap-4 text-gray-700">
                                                ₹{item.discounted_price * item.qty}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="grid grid-cols-12 items-center py-4 border-b">
                                        <div className="col-span-12 font-medium text-gray-500 text-center">
                                            Your cart is empty
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="mt-4 space-y-1 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{billingPreview?.subtotal || 0}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        Tax (GST)
                                        <input
                                            type="text"
                                            value="0"
                                            className="border p-1 rounded-md w-12 text-center"
                                        />
                                        %
                                    </span>
                                    <span>₹{billingPreview?.tax || 0}</span>
                                </div>

                                <div className="flex justify-between font-semibold text-black text-lg pt-2">
                                    <span>Total</span>
                                    <span>₹{billingPreview?.total_amount || 0}</span>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="mt-6 flex justify-between md:flex-row flex-col gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FileCheck className="w-4 h-4" />
                                    Generate Bill
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNewBill}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    New Bill
                                </button>
                            </div>
                        </div>

                        <h2 className="text-lg flex gap-2 font-bold mb-4 bg-white shadow-lg rounded px-4 py-2">
                            <Eye className="text-blue-500" />
                            Invoice Preview ⬇️
                        </h2>
                        {/* preview */}
                        <div className="max-w-3xl min-h-screen bg-[url('/assets/invoicebg.png')] bg-cover bg-no-repeat bg-center text-white relative overflow-hidden rounded-2xl">
                            {/* Main Wrapper */}
                            <div className="relative z-10 p-6 pb-20 max-w-3xl mx-auto space-y-2">
                                {/* Header */}
                                <div className="text-right space-y-1 flex justify-between">
                                    <div className="w-24 overflow-hidden rounded-full h-24">
                                        <img src="/assets/logo.png" className="rounded-full w-32" alt="" />
                                    </div>

                                    <div className="space-y-1">
                                        <h1 className="text-3xl font-bold text-yellow-400">INVOICE</h1>
                                        <p className="text-sm">
                                            <span className="text-gray-300">Date :</span> {new Date().toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-gray-300">Invoice no :</span> xyz...
                                        </p>
                                    </div>
                                </div>

                                {/* Bill To + Payable To */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {/* Bill To */}
                                    <div className="bg-[#505050] rounded p-4 space-y-1">
                                        <h3 className="text-lg font-semibold text-yellow-400">Bill to:</h3>
                                        <p className="font-semibold">{formValues.full_name || "Customer Name"}</p>
                                        <p className="text-sm">{formValues.phone || "Phone Number"}</p>
                                        <p className="text-sm">{formValues.address_line1}</p>
                                        <p className="text-sm">{formValues.city}</p>
                                        <p className="text-sm">{formValues.state}</p>
                                    </div>

                                    {/* Payable To */}
                                    <div className="bg-[#505050] rounded p-4 space-y-1">
                                        <h3 className="text-lg font-semibold text-yellow-400">Payable to:</h3>
                                        <p className="font-semibold">Gaurastra</p>
                                        <p className="text-sm">+91 9522474600</p>
                                        <p className="text-sm">Indore, MP</p>
                                    </div>
                                </div>

                                {/* Product Table */}
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-yellow-500 text-black">
                                            <th className="p-3 text-left w-10">No</th>
                                            <th className="p-3 text-left">Items</th>
                                            <th className="p-3 text-center w-20">QTY</th>
                                            <th className="p-3 text-right w-24">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&>tr:nth-child(2n)]:bg-transparent [&>tr:nth-child(2n+1)]:bg-[#505050]">
                                        {cart.map((item, idx) => (
                                            <tr key={idx} className="py-10">
                                                <td className="p-3">{idx + 1}</td>
                                                <td className="p-3">{item.title}</td>
                                                <td className="p-3 text-center">{item.qty}</td>
                                                <td className="p-3 text-right">₹{item.qty * item.discounted_price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Total Box */}
                                <div className="flex justify-end mb-8">
                                    <div className="space-y-3">
                                        <div className="bg-yellow-500 text-black px-6 py-2 rounded-sm font-semibold text-lg">
                                            Total : ₹{billingPreview?.total_amount}
                                        </div>
                                        <div>
                                            <h3 className="text-lg mb-2 font-semibold-400">Terms Conditions</h3>
                                            <p className="text-sm leading-relaxed">
                                                No Return, <br />
                                                No Exchange, <br />
                                                No Guarantee.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="text-center space-y-2 pb-10">
                                    <div className="flex justify-center gap-3 text-sm text-gray-300">
                                        <span>📞 +91-9522474600</span>
                                        <span>🌐 www.Gaurastra.com</span>
                                    </div>
                                    <p className="text-sm text-gray-400">📍 1701, New Dwarkapuri Indore</p>
                                    <img src="/assets/thank-you.png" className="absolute -z-10 bottom-10 h-32 right-8 mx-auto" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}