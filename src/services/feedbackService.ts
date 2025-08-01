import { apiClient } from '../utils/api'
import type { ApiResponse, PendingFeedbackRequest, SubmittedFeedback, SubmittedFeedbackRequest } from '../utils/types'

export const feedbackService = {
  async getPendingFeedbackRequests(): Promise<PendingFeedbackRequest[]> {
    const response = await apiClient.get<ApiResponse<PendingFeedbackRequest[]>>('/feedback/pending')
    return response.data.data
  },

  async getSubmittedFeedback(): Promise<SubmittedFeedbackRequest[]> {
    const response = await apiClient.get<ApiResponse<SubmittedFeedbackRequest[]>>('/feedback/submitted')
    return response.data.data
  },
  async getPublicFeedbacks(): Promise<SubmittedFeedback[]> {
    const response = await apiClient.get<ApiResponse<SubmittedFeedback[]>>('/feedback/public')
    return response.data.data
  },
  async submitFeedback(testResultId: number, rating: number, comment: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/feedback', {
      testResultId,
      rating,
      comment
    })
    return response.data.data
  },
    async updateFeedback(feedbackId: number, rating: number, comment: string): Promise<{ message: string }> {
    const response = await apiClient.put<ApiResponse<{ message: string }>>(`/feedback/${feedbackId}`, {
      rating,
      comment,
    })
    return response.data.data
  },
}
