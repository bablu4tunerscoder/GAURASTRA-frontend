"use client";
import { useState } from "react";
import OrderCard from "./OrderCard";
import RatingModal from "./RatingModal";

export default function OrdersTab({ orders }) {
  const [ratingData, setRatingData] = useState(null); // {orderId, productIdx}
  if (!orders?.length)
    return (
      <div className="border p-8 rounded-lg bg-white shadow-sm text-center">
        <p className="font-medium">No orders found.</p>
        <p className="text-gray-500 text-sm mt-1">Your recent orders will appear here.</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Orders</h2>

      {orders.map((o, i) => (
        <OrderCard key={i} data={o} openRating={setRatingData} />
      ))}

      {ratingData && (
        <RatingModal
          data={ratingData}
          close={() => setRatingData(null)}
        />
      )}
    </div>
  );
}
