"use client";

import React from "react";
import useSessionAuth from "../../hook/useSessionAuth";
import { Package, TrendingUp, Users } from "lucide-react";

const Dashboard = () => {
  const { user } = useSessionAuth();

  return (
    <div >

      {/* TOP BAR */}
      <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-700">
            Welcome, {user?.name || "User"}! 👋
          </h1>
          <p className="text-sm text-gray-500 -mt-1">
            You are logged in as {user?.role || "Member"}.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow">
            Add product
          </button>
          <button className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow">
            View Orders
          </button>
          <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow">
            Manage Users
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">

        {/* LEFT 3 CARDS */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* CARD 1 - Total Product */}
          <div className="bg-[#3d3d3d] text-white rounded-md p-6 shadow-lg h-[180px] flex flex-col justify-between">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm opacity-80">Total Product</h3>
              <p className="text-3xl font-bold">120</p>
            </div>
          </div>

          {/* CARD 2 - Order Today */}
          <div className="bg-white rounded-md p-6 shadow-lg h-[180px] flex flex-col justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Order Today</h3>
              <p className="text-3xl font-bold text-gray-800">45</p>
            </div>
          </div>

          {/* CARD 3 - Active Users */}
          <div className="bg-white rounded-md p-6 shadow-lg h-[180px] flex flex-col justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Active Users</h3>
              <p className="text-3xl font-bold text-gray-800">32</p>
            </div>
          </div>
        </div>

        {/* RIGHT ORDER ACTIVITY WIDGET */}
        <div className="bg-white rounded-md p-6 shadow-lg">

          <h2 className="font-semibold text-gray-800 mb-6">Order Activity</h2>

          {/* CIRCLES */}
          <div className="relative h-48 flex items-center justify-center mb-8">
            {/* Main Circle - This Year */}
            <div className="w-36 h-36 bg-indigo-600 text-white rounded-full flex flex-col items-center justify-center shadow-lg z-10">
              <span className="text-2xl font-bold">10000</span>
              <span className="text-xs opacity-90 mt-1">This year</span>
            </div>

            {/* Left Circle - This Month */}
            <div className="absolute left-2 w-24 h-24 bg-gray-100 rounded-full flex flex-col items-center justify-center shadow-md z-20">
              <span className="font-bold text-gray-800">1000</span>
              <span className="text-xs text-gray-600 mt-0.5">This Month</span>
            </div>

            {/* Right Circle - Today */}
            <div className="absolute right-2 w-20 h-20 bg-gray-800 text-white rounded-full flex flex-col items-center justify-center shadow-md z-20">
              <span className="font-bold text-lg">45</span>
              <span className="text-xs opacity-90 mt-0.5">Today</span>
            </div>
          </div>

          {/* COMPARISON SECTION */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Comparison(Month)</h3>
              <span className="text-gray-400 text-sm cursor-pointer">⌄</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">This Month</span>
                <div className="flex-1 h-2 bg-indigo-600 rounded-full max-w-[140px]"></div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">Past Month</span>
                <div className="flex-1 h-2 bg-gray-700 rounded-full max-w-[140px]"></div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
