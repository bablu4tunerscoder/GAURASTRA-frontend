"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "@/store/slices/orderSlice";

import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";

const TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Orders" }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(1);

  const user = useSelector((s) => s.auth.user);
  const orders = useSelector((s) => s.order.orders);

  const dispatch = useDispatch();


  useEffect(() => {
    user?.user_id && dispatch(getUserOrders(user.user_id));
  }, [user?.user_id, dispatch]);

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 text-black bg-white">
      {/* Tabs */}
      <div className="flex border-b">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${activeTab === tab.id
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 1 && <ProfileTab user={user} />}
        {activeTab === 2 && <OrdersTab orders={orders} />}
      </div>
    </div>
  );
}
