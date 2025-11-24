import Image from "next/image";

export default function OrderCard({ data, openRating }) {
    console.log(data)
    const order = data.order;
    const pay = data.payment;

    return (
        <div className="border border-black/10 rounded-xl bg-white shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5 border-b border-black/10 bg-black/5">
                <h3 className="font-semibold text-lg text-black">Order Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <Info label="Order ID" value={pay?.order_id} />
                    <Info label="Order Date" value={order?.createdAtIST} />
                    <Info label="Amount" value={`₹${pay?.amount}`} />
                    <Info
                        label="Payment Status"
                        value={pay?.payment_id ? "Paid" : "Unpaid"}
                        status={pay?.payment_id ? "completed" : "pending"}
                    />
                </div>
            </div>

            {/* Products */}
            <div className="p-6 space-y-4">
                {order.products.map((p, idx) => (
                    <div
                        key={idx}
                        className="flex gap-4 p-5 border border-black/10 rounded-lg hover:bg-black/5 transition"
                    >

                        {/* Image */}
                        <div className="min-w-[90px] h-[90px]">
                            <Image
                                src={p.product_image || "/assets/default-product.png"}
                                alt="product"
                                width={90}
                                height={90}
                                className="rounded-lg object-cover w-full h-full border border-black/10"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-lg text-black">{p.product_name}</h3>
                                <p className="text-gray-700 text-sm mt-1">Quantity: {p.quantity}</p>
                                {p.selectedSize && (
                                    <p className="text-gray-700 text-sm">Size: {p.selectedSize}</p>
                                )}
                            </div>
                        </div>

                        {/* Rate Button */}
                        <button
                            onClick={() => openRating({ orderId: pay.order_id, productIdx: idx })}
                            className="h-fit px-5 py-2 border border-black rounded-lg text-black font-medium hover:bg-black hover:text-white transition"
                        >
                            Rate
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            {pay && (
                <div className="px-6 py-4 border-t border-black/10 bg-black/5">
                    <h4 className="text-sm font-semibold text-black mb-3">Payment Details</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Info label="Gateway" value={pay.payment_gateway} />
                        <Info label="Transaction ID" value={pay.transaction_id} />
                        <Info label="Payment ID" value={pay.payment_id} />
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({ label, value, status }) {
    const badgeStyles = {
        completed: "bg-black text-white border border-black",
        pending: "bg-white text-black border border-black/40",
        failed: "bg-red-100 text-red-700 border border-red-300",
    };

    return (
        <div className="flex flex-col">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>

            {status ? (
                <span
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[status]}`}
                >
                    {value}
                </span>
            ) : (
                <p className="font-medium text-black mt-1">{value || "-"}</p>
            )}
        </div>
    );
}
