"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

const ManagerDashboard: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    assignedOrders: 0,
    completedToday: 0,
    pendingReview: 0,
    teamMembers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading manager data
    setTimeout(() => {
      setStats({
        assignedOrders: 25,
        completedToday: 8,
        pendingReview: 12,
        teamMembers: 6,
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
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-2">Team management and order oversight</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.assignedOrders}</p>
                <p className="text-gray-600">Assigned Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">✅</div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.completedToday}</p>
                <p className="text-gray-600">Completed Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👁️</div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</p>
                <p className="text-gray-600">Pending Review</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.teamMembers}</p>
                <p className="text-gray-600">Team Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Tools */}
        {/* Placeholder for Management Tools */}
      </div>
    </div>
  )
}

export default ManagerDashboard
