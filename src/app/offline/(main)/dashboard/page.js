'use client'

import React from 'react'
import useSessionAuth from '../../hook/useSessionAuth';

const Dashboard = () => {
  const { user } = useSessionAuth();

  return (
    <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-3xl w-full text-center">
        {/* Welcome Message */}
        <h1 className="text-4xl capitalize font-bold text-gray-800 mb-4">
          Welcome, {user?.name || 'User'}! 👋
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-6">
          You are logged in as <span className="font-semibold">{user?.role || 'Member'}</span>.
        </p>

        {/* Quick Links / Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Add Product
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
            View Orders
          </button>
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
            Manage Users
          </button>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-indigo-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Orders Today</h2>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-2xl font-bold mt-2">32</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
