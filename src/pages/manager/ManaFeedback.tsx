"use client"

import type React from "react"
import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Common/Sidebar"
import type { Feedback } from "../../utils/types"
import { StarIcon as StarSolid, ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid"
import { StarIcon as StarOutline } from "@heroicons/react/24/outline"
import { managerService } from "../../services/managerService"

const ManaFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [stats, setStats] = useState({
    avgRating: 0,
    totalFeedbacks: 0,
    distribution: [0, 0, 0, 0, 0],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
    fetchFeedbackStats()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const data = await managerService.getFeedbacks()
      setFeedbacks(data)
    } catch (error) {
      console.error("Lỗi khi lấy phản hồi:", error)
      setFeedbacks([])
    }
  }

  const fetchFeedbackStats = async () => {
    try {
      const data = await managerService.getFeedbackStats()
      setStats(data)
    } catch (error) {
      console.error("Lỗi khi lấy thống kê phản hồi:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (count: number) => (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) =>
        i < count ? (
          <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
        ) : (
          <StarOutline key={i} className="w-5 h-5 text-yellow-400" />
        ),
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 py-10 px-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="font-bold text-3xl mb-8">Xem phản hồi</h1>

          {/* Top stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Average rating & count */}
            <div className="flex flex-col gap-4">
              <StatCard
                icon={<StarSolid className="w-6 h-6 text-yellow-500" />}
                label="Đánh giá trung bình"
                value={`${stats.avgRating}/5`}
                extra={renderStars(Math.round(stats.avgRating))}
                bgColor="bg-yellow-100"
              />
              <StatCard
                icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />}
                label="Tổng phản hồi"
                value={stats.totalFeedbacks.toString()}
                extra={<span className="text-xs text-gray-400">Trong tháng này</span>}
                bgColor="bg-blue-100"
              />
            </div>

            {/* Rating distribution */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-semibold text-lg mb-1">Phân bổ đánh giá</h2>
                <p className="text-gray-500 text-xs mb-4">Thống kê theo số sao đánh giá</p>
                {([5, 4, 3, 2, 1] as const).map((star) => (
                  <RatingRow key={star} star={star} value={stats.distribution[5 - star]} total={stats.totalFeedbacks} />
                ))}
              </div>
            </div>
          </div>

          {/* Feedback list */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="font-semibold text-lg mb-1">Danh sách phản hồi</h2>
            <p className="text-gray-500 text-sm mb-4">Quản lý và phản hồi ý kiến khách hàng</p>

            <div className="flex flex-col gap-4">
              {feedbacks.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Không có phản hồi nào.</p>
              ) : (
                feedbacks.map((fb) => (
                  <div
                    key={fb.FeedbackID}
                    className="border-l-4 border-blue-400 bg-gray-50 rounded p-4 flex flex-col md:flex-row md:items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{fb.FullName}</div>
                      <div className="text-xs text-gray-400 mb-2">
                        {new Date(fb.CreatedAt).toLocaleDateString("vi-VN")}
                      </div>
                      <div className="text-gray-700 max-w-xl whitespace-pre-line">{fb.Comment}</div>
                    </div>
                    <div className="mt-2 md:mt-0">{renderStars(fb.Rating)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Re‑usable components                                                      */
/* ------------------------------------------------------------------------- */

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  extra?: React.ReactNode
  bgColor: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, extra, bgColor }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {extra && <span>{extra}</span>}
      </div>
    </div>
    <span className={`rounded-full p-2 ${bgColor}`}>{icon}</span>
  </div>
)

interface RatingRowProps {
  star: 1 | 2 | 3 | 4 | 5
  value: number
  total: number
}

const RatingRow: React.FC<RatingRowProps> = ({ star, value, total }) => (
  <div className="flex items-center mb-2">
    <span className="w-6 flex items-center gap-0.5">
      <StarSolid className="w-4 h-4 text-yellow-400" />
      <span className="ml-0.5 text-sm">{star}</span>
    </span>
    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
      <div className="h-2 bg-black rounded" style={{ width: total ? `${(value / total) * 100}%` : "0%" }}></div>
    </div>
    <span className="w-6 text-xs text-gray-500">{value}</span>
  </div>
)

export default ManaFeedback
