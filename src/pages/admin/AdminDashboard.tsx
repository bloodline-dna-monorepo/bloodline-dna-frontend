"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import Button from "../../components/Common/Button"

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalOrders: 3420,
        totalRevenue: 2850000,
        pendingOrders: 45,
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and management tools</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">💰</div>
              <div>
                <p className="text-2xl font-bold text-green-600">₫{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⏳</div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                <p className="text-gray-600">Pending Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                👥 Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                🔐 Role Management
              </Button>
              <Button className="w-full justify-start" variant="outline">
                📊 User Analytics
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Management</h2>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                🧬 Service Management
              </Button>
              <Button className="w-full justify-start" variant="outline">
                📋 Order Management
              </Button>
              <Button className="w-full justify-start" variant="outline">
                ⚙️ System Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
