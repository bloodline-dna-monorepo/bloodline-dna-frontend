"use client"

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/AdminSidebar/Sidebar.tsx";

const statsInit = {
  totalTests: 1999,
  totalTestsChange: 37,
  processing: 69,
  processingChange: 6,
  pending: 5,
  pendingChange: -9,
  urgent: 3,
  urgentChange: 2,
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState(statsInit);
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return (
      now.toLocaleTimeString("en-GB", { hour12: false }) +
      " " +
      now.toLocaleDateString("en-GB")
    );
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(() => {
        const now = new Date();
        return (
          now.toLocaleTimeString("en-GB", { hour12: false }) +
          " " +
          now.toLocaleDateString("en-GB")
        );
      });
      setStats((prev) => ({
        ...prev,
        totalTests: prev.totalTests + getRandomInt(-2, 5),
        totalTestsChange: getRandomInt(30, 45),
        processing: prev.processing + getRandomInt(-1, 2),
        processingChange: getRandomInt(3, 10),
        pending: Math.max(0, prev.pending + getRandomInt(-2, 2)),
        pendingChange: getRandomInt(-15, 0),
        urgent: Math.max(0, prev.urgent + getRandomInt(-1, 1)),
        urgentChange: getRandomInt(0, 5),
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 w-1/3"
          />
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-sm">
              Last updated: {currentTime}
            </span>
            <div className="relative">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </div>
          </div>
        </div>
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow border p-4 flex flex-col min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-blue-100 text-blue-600 rounded p-1">
                <svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="8" /></svg>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Total DNA Tests
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.totalTests}</div>
            <div className="text-green-600 text-xs mt-1">
              +{stats.totalTestsChange}% compared to last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4 flex flex-col min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-yellow-100 text-yellow-600 rounded p-1">
                <svg width="20" height="20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="3" /></svg>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Samples in Processing
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.processing}</div>
            <div className="text-green-600 text-xs mt-1">
              +{stats.processingChange}% compared to last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4 flex flex-col min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-orange-100 text-orange-600 rounded p-1">
                <svg width="20" height="20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="3" /></svg>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Pending Results
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-red-500 text-xs mt-1">
              {stats.pendingChange}% compared to last month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4 flex flex-col min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-red-100 text-red-600 rounded p-1">
                <svg width="20" height="20" fill="currentColor"><polygon points="10,2 18,18 2,18" /></svg>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Urgent Cases
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.urgent}</div>
            <div className="text-red-500 text-xs mt-1">
              +{stats.urgentChange} compared to last month
            </div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow border p-6 flex flex-col items-center">
            <div className="font-semibold mb-4 text-lg w-full">
              DNA Testing Trend (Last 6 Months)
            </div>
            <img
              src="/dashboard-bar-demo.png"
              alt="Bar Chart"
              className="w-full max-w-[350px] h-48 object-contain"
            />
          </div>
          <div className="bg-white rounded-lg shadow border p-6 flex flex-col items-center">
            <div className="font-semibold mb-4 text-lg w-full">
              Request Status Breakdown
            </div>
            <img
              src="/dashboard-pie-demo.png"
              alt="Pie Chart"
              className="w-full max-w-[350px] h-48 object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default AdminDashboard;