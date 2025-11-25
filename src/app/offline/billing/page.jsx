"use client";

// Everything in ONE file — all components created locally (NO external components)
import React, { useState, useRef } from "react";
import QrScanner from "qr-scanner";
import axiosInstance from "@/Helper/axiosinstance";
import { openPrintWindow } from "@/utils/openPrintWindow";

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
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [userInfo, setUserInfo] = useState({
        full_name: "",
        phone: ""
    });

    const [address, setAddress] = useState({
        pincode: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: ""
    });

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
                console.error(error);
                alert("Camera not accessible");
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
                    p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
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

            const { data } = await axiosInstance.get(
                `/api/offline/products/${productId}/variant/${variantId}`
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

            const { data } = await axiosInstance.post(`/api/offline/billing/calculate`,
                payload
            );
            setBillingPreview(data.preview);
            // console.log('data', data.preview)

        } catch (err) {
            console.error(err);
        }
    };

    const GenrateBill = async () => {
        try {
            const payload = {
                items: cart.map((item) => ({
                    product_id: item.product_uniq_id,
                    quantity: item.qty,
                    variant_id: item.variant_id
                })),

                payment_method: paymentMethod,
                user_info: userInfo,
                address: address
            };


              console.log(payload)

            const { data } = await axiosInstance.post(
                `/api/offline/billing/create`,
                payload
            );

            // console.log("Bill Created:", data);
            openPrintWindow(data.data);


        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div className="min-h-screen bg-white  p-6">
            <h1 className="text-3xl  font-bold  mb-6 text-gray-900 tracking-tight">
                Billing System
            </h1>

            <div className="flex gap-10 pt-5">
                <div className="w-[30%] " >
                    <div className="top-[70px] sticky">
                        <Button
                            onClick={startScanner}
                            className="w-full py-4 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow"
                        >
                            {
                                cart.length == 0 ? ' Start Billing' : "Add More Product"
                            }

                        </Button>

                        {isScannerOpen && (
                            <div className="mt-6">
                                <div className="rounded-xl overflow-hidden shadow border bg-gray-500">
                                    <video ref={videoRef} className="w-full " />
                                </div>

                                <Button
                                    onClick={stopScanner}
                                    className="w-full mt-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Close Scanner
                                </Button>
                            </div>
                        )}
                    </div>

                </div>


                <div className="w-[70%] text-black">
                    <div className=" grid gap-5 grid-cols-2 text-black p-5 rounded-xl border">

                        <h2 className="text-xl col-span-2 font-semibold mb-2">Customer Details</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="border p-3 rounded-lg w-full"
                            value={userInfo.full_name}
                            onChange={(e) => setUserInfo({ ...userInfo, full_name: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="border p-3 rounded-lg w-full"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        />

                        <h2 className=" col-span-2 text-xl font-semibold mt-5 mb-2">Address</h2>

                        <input
                            type="text"
                            placeholder="Pincode"
                            className="border p-3 rounded-lg w-full"
                            value={address.pincode}
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Address Line 1"
                            className="border p-3 rounded-lg w-full"
                            value={address.address_line1}
                            onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Address Line 2"
                            className="border p-3 rounded-lg w-full"
                            value={address.address_line2}
                            onChange={(e) => setAddress({ ...address, address_line2: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="City"
                            className="border p-3 rounded-lg w-full"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="State"
                            className="border p-3 rounded-lg w-full"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />

                        <div className="col-span-2 mt-4">
                            <label className="font-semibold text-gray-700">Payment Method</label>
                            <select
                                className="w-full border p-3 mt-1 rounded-lg"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cod">Cash on Delivery</option>
                                <option value="card">Card</option>
                                <option value="online">Online</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        {cart.length > 0 && (
                            <div className="">
                                <h2 className="text-xl font-semibold mb-3">Products</h2>

                                <div className="rounded-xl overflow-hidden shadow border bg-white">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-100 border-b">
                                            <tr>
                                                <th className="p-3 text-left">Name</th>
                                                <th className="p-3 text-left">Qty</th>
                                                <th className="p-3 text-left">Price</th>
                                                <th className="p-3 text-left">Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                                    <td className="p-3 font-medium">{item.title}</td>

                                                    <td className="p-3 flex items-center gap-3">
                                                        <Button
                                                            onClick={() => decreaseQty(item.id)}
                                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black"
                                                        >
                                                            -
                                                        </Button>

                                                        <span className="min-w-[20px] text-center font-medium">{item.qty}</span>

                                                        <Button
                                                            onClick={() => increaseQty(item.id)}
                                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black"
                                                        >
                                                            +
                                                        </Button>
                                                    </td>

                                                    <td className="p-3">₹{item.discounted_price}</td>
                                                    <td className="p-3 font-semibold">₹{item.discounted_price * item.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {
                        cart.length != 0 && <div className="flex justify-between gap-6 pt-10">
                            <Button
                                onClick={CalculatePrice}
                                className="w-full mt-4 py-3 rounded-xl bg-yellow-700 hover:bg-yellow-800 text-white"
                            >
                                Calculate Price
                            </Button>
                            <Button
                                onClick={GenrateBill}
                                className="w-full mt-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                            >
                                Get Billing
                            </Button>

                            <Button
                                onClick={() => window.location.reload()}
                                className="w-full max-w-[130px] mt-4 py-3 rounded-xl  bg-red-600 hover:bg-red-700 text-white"
                            >
                                New Billing
                            </Button>
                        </div>
                    }

                    {billingPreview && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-xl  shadow-sm border text-right">
                            <p className="text-lg font-medium">
                                Subtotal: ₹{billingPreview.subtotal}
                            </p>
                            <p className="text-lg font-medium">
                                Tax: ₹{billingPreview.tax}
                            </p>
                            <p className="text-2xl font-bold mt-2">
                                Total: ₹{billingPreview.total_amount}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
