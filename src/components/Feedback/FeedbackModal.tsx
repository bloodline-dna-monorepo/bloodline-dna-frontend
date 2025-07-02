// "use client"

// import type React from "react"
// import { useState } from "react"
// import { validateFeedbackForm } from "../../utils/validation"
// import Button from "../Common/Button"
// import type { TestRequest, FeedbackData, FormErrors } from "../../utils/types"
// import { testRequestService } from "../../services/testRequestService"

// interface FeedbackModalProps {
//   testRequest: TestRequest
//   isOpen: boolean
//   onClose: () => void
//   onSubmit: () => void
// }

// const FeedbackModal: React.FC<FeedbackModalProps> = ({ testRequest, isOpen, onClose, onSubmit }) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [feedbackData, setFeedbackData] = useState<FeedbackData>({
//     rating: 0,
//     feedback: "",
//   })

//   const handleRatingClick = (rating: number) => {
//     setFeedbackData((prev) => ({ ...prev, rating }))
//     if (errors.rating) {
//       setErrors((prev) => ({ ...prev, rating: "" }))
//     }
//   }

//   const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { value } = e.target
//     setFeedbackData((prev) => ({ ...prev, feedback: value }))
//     if (errors.feedback) {
//       setErrors((prev) => ({ ...prev, feedback: "" }))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validate form
//     const validationErrors = validateFeedbackForm(feedbackData)
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors)
//       return
//     }

//     setIsLoading(true)
//     try {
//       // Submit feedback via API
//       const response = await testRequestService.submitFeedback(testRequest.id, feedbackData)
//       if (response.success) {
//         onSubmit()
//       } else {
//         setErrors({ submit: response.message })
//       }
//     } catch (error) {
//       console.error("Failed to submit feedback:", error)
//       setErrors({ submit: "Đã có lỗi xảy ra. Vui lòng thử lại." })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN")
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-md">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-lg font-semibold text-gray-900">Đánh giá dịch vụ</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             ✕
//           </button>
//         </div>

//         <div className="p-6">
//           <p className="text-sm text-gray-600 mb-6">Chia sẻ trải nghiệm của bạn về dịch vụ</p>

//           {/* Service Info */}
//           <div className="flex items-center space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
//             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//               <span className="text-blue-600 text-sm">🧬</span>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">
//                 {testRequest.service?.serviceName || "Xét nghiệm ADN cha con"}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Mã: {testRequest.sampleProviders?.length || 1} • Kit: {testRequest.kitCode} • Hoàn thành:{" "}
//                 {formatDate(testRequest.updatedAt)}
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {errors.submit && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{errors.submit}</div>
//             )}

//             {/* Rating */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Đánh giá tổng thể <span className="text-red-500">*</span>
//               </label>
//               <div className="flex space-x-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => handleRatingClick(star)}
//                     className={`text-2xl transition-colors ${
//                       star <= feedbackData.rating ? "text-yellow-400" : "text-gray-300"
//                     } hover:text-yellow-400`}
//                   >
//                     ★
//                   </button>
//                 ))}
//               </div>
//               {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
//             </div>

//             {/* Feedback Text */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Nhận xét chi tiết <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={feedbackData.feedback}
//                 onChange={handleFeedbackChange}
//                 placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này. Điều gì bạn thích nhất? Có điều gì cần cải thiện không?"
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
//               />
//               <div className="flex justify-between items-center mt-1">
//                 {errors.feedback && <p className="text-sm text-red-600">{errors.feedback}</p>}
//                 <p className="text-sm text-gray-500 ml-auto">Tối thiểu 20 ký tự ({feedbackData.feedback.length}/500)</p>
//               </div>
//             </div>

//             {/* Helpful Tips */}
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Mẹo viết đánh giá hữu ích:</h4>
//               <ul className="text-sm text-blue-800 space-y-1">
//                 <li>• Chia sẻ cụ thể về trải nghiệm của bạn</li>
//                 <li>• Đề cập đến điểm mạnh và điểm cần cải thiện</li>
//                 <li>• Giúp khách hàng khác hiểu rõ hơn về dịch vụ</li>
//               </ul>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-3">
//               <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
//                 Hủy
//               </Button>
//               <Button
//                 type="submit"
//                 variant="primary"
//                 loading={isLoading}
//                 className="flex-1 bg-black hover:bg-gray-800 text-white"
//               >
//                 {isLoading ? "Đang gửi..." : "🌟 Gửi đánh giá"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FeedbackModal
