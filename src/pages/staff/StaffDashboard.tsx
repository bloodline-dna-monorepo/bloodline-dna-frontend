"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { HomeIcon, DocumentTextIcon, BeakerIcon, UsersIcon } from "@heroicons/react/24/outline"
import DashboardSidebar from "../../components/Common/Sidebar"
import { type DashboardStaffStats, type RecentRequest } from "../../utils/types"
import { staffService } from "../../services/staffService"

const StaffDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStaffStats>({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalCustomers: 0,
    completionRate: 0,
  })
  const [recentRequests, setRecentRequests] = useState<RecentRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await staffService.getDashboardStats()
        setStats(data.stats)
        setRecentRequests(data.recentRequests)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Tổng quan về hoạt động và trạng thái công việc</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Requests */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tổng yêu cầu</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Đang xử lý</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <BeakerIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Completed Requests */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Đã hoàn thành</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedRequests}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Khách hàng</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ xử lý yêu cầu</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>
                  {stats.completedRequests}/{stats.totalRequests} yêu cầu đã hoàn thành
                </span>
                <span>{stats.completionRate}% hoàn thành</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu gần đây chưa xác nhận</h3>
            <p className="text-sm text-gray-600 mb-6">{recentRequests.length} yêu cầu mới nhất từ khách hàng</p>

            {recentRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">MÃ YÊU CẦU</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">KHÁCH HÀNG</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TRẠNG THÁI</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">THỜI GIAN TẠO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request.TestRequestID} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{request.TestRequestID}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{request.CustomerName}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Chưa xác nhận
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(request.CreatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Không có yêu cầu mới</h3>
                <p className="mt-1 text-sm text-gray-500">Tất cả yêu cầu đã được xử lý.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
