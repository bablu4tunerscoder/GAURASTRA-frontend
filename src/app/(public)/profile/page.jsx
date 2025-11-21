"use client";
import { useState } from "react";

const TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Orders" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className=" mx-auto py-16">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-black mb-6">My Account</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium 
              ${
                activeTab === tab.id
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === 1 && <ProfileTab />}
        {activeTab === 2 && <OrdersTab />}
      </div>
    </div>
  );
}

/* ---------------------- Profile Tab ---------------------- */
function ProfileTab() {
  return (
    <div className="space-y-4 text-black">
      <h2 className="text-xl font-semibold">Profile Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <Info label="Name" value="John Doe" />
        <Info label="Email" value="john@gmail.com" />
        <Info label="Phone" value="+91 99999 99999" />
        <Info label="Member Since" value="2023" />
      </div>
    </div>
  );
}

/* ---------------------- Orders Tab ---------------------- */
function OrdersTab() {
  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <p className="font-medium">No orders found.</p>
        <p className="text-gray-500 text-sm mt-1">
          Your recent orders will appear here.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- Reusable Components ---------------------- */

function Info({ label, value }) {
  return (
    <div className="p-3 border rounded-lg bg-white shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}
