"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Button from "../../components/Common/Button"

interface DashboardStats {
  totalOrders: number
  completedTests: number
  pendingResults: number
  activeServices: number
}

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    completedTests: 0,
    pendingResults: 0,
    activeServices: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalOrders: 3,
        completedTests: 1,
        pendingResults: 2,
        activeServices: 2,
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.profile?.fullName || user?.email}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your DNA testing services</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">✅</div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.completedTests}</p>
                <p className="text-gray-600">Completed Tests</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⏳</div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingResults}</p>
                <p className="text-gray-600">Pending Results</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🔬</div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.activeServices}</p>
                <p className="text-gray-600">Active Services</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link to="/services">
                <Button className="w-full justify-start" variant="outline">
                  🧬 Order New DNA Test
                </Button>
              </Link>
              <Link to="/test-process">
                <Button className="w-full justify-start" variant="outline">
                  📊 Track Test Progress
                </Button>
              </Link>
              <Link to="/history">
                <Button className="w-full justify-start" variant="outline">
                  📋 View Order History
                </Button>
              </Link>
              <Link to="/profile">
                <Button className="w-full justify-start" variant="outline">
                  👤 Update Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">📦</div>
                <div>
                  <p className="font-medium">DNA Kit Shipped</p>
                  <p className="text-sm text-gray-600">Order #12345 - 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">���</div>
                <div>
                  <p className="font-medium">Payment Confirmed</p>
                  <p className="text-sm text-gray-600">Order #12344 - 5 days ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">✅</div>
                <div>
                  <p className="font-medium">Results Available</p>
                  <p className="text-sm text-gray-600">Order #12343 - 1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Services</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Paternity Test</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Kit Sent
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 15, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to="/test-process" className="text-teal-600 hover:text-teal-900">
                      Track
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12344</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sibling Test</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Under Examination
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 12, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to="/test-process" className="text-teal-600 hover:text-teal-900">
                      Track
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
