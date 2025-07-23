"use client"

import type React from "react"
import { useState, useEffect } from "react"
import DashboardSidebar from "../../components/Common/Sidebar"
import {
  StarIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"

import type { PendingFeedbackRequest, SubmittedFeedbackRequest } from "../../utils/types"
import { feedbackService } from "../../services/feedbackService"
import dayjs from "dayjs"

const FeedbackPage: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingFeedbackRequest[]>([])
  const [submittedRequests, setSubmittedRequests] = useState<SubmittedFeedbackRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<PendingFeedbackRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [editingFeedback, setEditingFeedback] = useState<SubmittedFeedbackRequest | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editRating, setEditRating] = useState(0)
  const [editComment, setEditComment] = useState("")
  const [editCommentError, setEditCommentError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedbackRequests()
  }, [])

  const fetchFeedbackRequests = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const pending = await feedbackService.getPendingFeedbackRequests()
      const submitted = await feedbackService.getSubmittedFeedback()
      setPendingRequests(pending)
      setSubmittedRequests(submitted)
    } catch (err) {
      setError("Không thể tải dữ liệu phản hồi. Vui lòng thử lại.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenModal = (request: PendingFeedbackRequest) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
    setRating(0)
    setComment("")
    setCommentError(null)
    setSuccessMessage(null)
    setError(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRequest(null)
    setRating(0)
    setComment("")
    setCommentError(null)
    setSuccessMessage(null)
    setError(null)
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    if (e.target.value.length >= 20) {
      setCommentError(null)
    }
  }

  const handleSubmitFeedback = async () => {
    if (comment.length < 20) {
      setCommentError("Nhận xét phải có ít nhất 20 ký tự.")
      return
    }
    if (rating === 0) {
      setCommentError("Vui lòng chọn số sao đánh giá.")
      return
    }

    if (!selectedRequest) return

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)
    try {
      await feedbackService.submitFeedback(selectedRequest.TestResultID, rating, comment)

      setSuccessMessage("Đánh giá của bạn đã được gửi thành công!")
      handleCloseModal()
      fetchFeedbackRequests() // Refresh lists after submission
    } catch (err) {
      setError("Gửi đánh giá thất bại. Vui lòng thử lại.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenEditModal = (feedback: SubmittedFeedbackRequest) => {
    setEditingFeedback(feedback)
    setEditRating(feedback.Rating)
    setEditComment(feedback.Comment)
    setIsEditModalOpen(true)
    setEditCommentError(null)
    setSuccessMessage(null)
    setError(null)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingFeedback(null)
    setEditRating(0)
    setEditComment("")
    setEditCommentError(null)
    setSuccessMessage(null)
    setError(null)
  }

  const handleEditRatingChange = (newRating: number) => {
    setEditRating(newRating)
  }

  const handleEditCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value)
    if (e.target.value.length >= 20) {
      setEditCommentError(null)
    }
  }

  const handleUpdateFeedback = async () => {
    if (editComment.length < 20) {
      setEditCommentError("Nhận xét phải có ít nhất 20 ký tự.")
      return
    }
    if (editRating === 0) {
      setEditCommentError("Vui lòng chọn số sao đánh giá.")
      return
    }

    if (!editingFeedback) return

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)
    try {
      await feedbackService.updateFeedback(editingFeedback.FeedbackID, editRating, editComment)

      setSuccessMessage("Cập nhật đánh giá thành công!")
      handleCloseEditModal()
      fetchFeedbackRequests() // Refresh lists after update
    } catch (err) {
      setError("Cập nhật đánh giá thất bại. Vui lòng thử lại.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const renderEditStars = (currentRating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= currentRating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            onClick={() => handleEditRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const renderStars = (currentRating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= currentRating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const renderDisplayStars = (displayRating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${star <= displayRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({displayRating}/5)</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Đánh giá</h1>

        {isLoading && <p className="text-center text-gray-600">Đang tải dữ liệu...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

        {/* Dịch vụ chờ đánh giá Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Dịch vụ chờ đánh giá</h2>
          </div>
          <p className="text-gray-600 mb-4">Hãy chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ</p>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500">Không có dịch vụ nào đang chờ đánh giá.</p>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.TestRequestID}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium text-gray-800">{request.ServiceName}</p>
                      <p className="text-sm text-gray-500">
                        Mã đăng ký: {request.TestRequestID} • Kit: {request.KitID} • Hoàn thành: {dayjs(request.CompletionDate).format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenModal(request)}
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    <StarIcon className="h-5 w-5 mr-2 fill-current text-yellow-400" />
                    Đánh giá ngay
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Đánh giá đã gửi Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Đánh giá đã gửi</h2>
          </div>
          <p className="text-gray-600 mb-4">Các đánh giá bạn đã gửi trước đây</p>
          {submittedRequests.length === 0 ? (
            <p className="text-gray-500">Bạn chưa gửi đánh giá nào.</p>
          ) : (
            <div className="space-y-4">
              {submittedRequests.map((request) => (
                <div key={request.TestRequestID} className="flex flex-col p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <DocumentDuplicateIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium text-gray-800">{request.ServiceName}</p>
                        <p className="text-sm text-gray-500">
                          Mã đăng ký: {request.TestRequestID} • Kit: {request.KitID}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                        Đã đánh giá
                      </span>
                      <button
                        onClick={() => handleOpenEditModal(request)}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Đánh giá của bạn:</p>
                    {renderDisplayStars(request.Rating)}
                  </div>
                  <p className="text-gray-700">{request.Comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Đánh giá dịch vụ</h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">Chia sẻ trải nghiệm của bạn về dịch vụ</p>

              {selectedRequest && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="font-medium text-gray-800">{selectedRequest.ServiceName}</p>
                  <p className="text-sm text-gray-500">
                    Mã đăng ký: {selectedRequest.TestRequestID} • Kit: {selectedRequest.KitID} • Hoàn thành:{" "}
                    {dayjs(selectedRequest.CompletionDate).format('DD/MM/YYYY')}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Đánh giá tổng thể <span className="text-red-500">*</span>
                </label>
                {renderStars(rating)}
              </div>

              <div className="mb-6">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                  Nhận xét chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none ${
                    commentError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này. Điều gì bạn thích nhất? Có điều gì cần cải thiện không?"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <p className="text-xs text-gray-500 mt-1">Tối thiểu 20 ký tự</p>
                {commentError && <p className="text-red-500 text-xs italic mt-2">{commentError}</p>}
              </div>

              <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm mb-6">
                <p className="font-semibold mb-2">Mẹo viết đánh giá hữu ích:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chia sẻ cụ thể về trải nghiệm của bạn</li>
                  <li>Đề cập đến điểm mạnh và điểm cần cải thiện</li>
                  <li>Giúp khách hàng khác hiểu rõ hơn về dịch vụ</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={comment.length < 20 || rating === 0 || isLoading}
                  className={`flex items-center px-6 py-2 rounded-md text-white transition-colors duration-200 ${
                    comment.length < 20 || rating === 0 || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2 rotate-90" /> {/* Rotate for right arrow look */}
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Feedback Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa đánh giá</h2>
                <button onClick={handleCloseEditModal} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">Cập nhật đánh giá của bạn về dịch vụ</p>

              {editingFeedback && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="font-medium text-gray-800">{editingFeedback.ServiceName}</p>
                  <p className="text-sm text-gray-500">
                    Mã đăng ký: {editingFeedback.TestRequestID} • Kit: {editingFeedback.KitID}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Đánh giá tổng thể <span className="text-red-500">*</span>
                </label>
                {renderEditStars(editRating)}
              </div>

              <div className="mb-6">
                <label htmlFor="editComment" className="block text-gray-700 text-sm font-bold mb-2">
                  Nhận xét chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="editComment"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none ${
                    editCommentError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Cập nhật nhận xét của bạn về dịch vụ này..."
                  value={editComment}
                  onChange={handleEditCommentChange}
                />
                <p className="text-xs text-gray-500 mt-1">Tối thiểu 20 ký tự</p>
                {editCommentError && <p className="text-red-500 text-xs italic mt-2">{editCommentError}</p>}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseEditModal}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateFeedback}
                  disabled={editComment.length < 20 || editRating === 0 || isLoading}
                  className={`flex items-center px-6 py-2 rounded-md text-white transition-colors duration-200 ${
                    editComment.length < 20 || editRating === 0 || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2 rotate-90" />
                  Cập nhật đánh giá
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackPage
