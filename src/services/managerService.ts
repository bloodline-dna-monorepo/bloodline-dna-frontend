import { apiClient } from '../utils/api'
import type { ApiResponse, TestResults, Feedback, DashboardStats, BlogPost, BlogPostAdd } from '../utils/types'

export const managerService = {
  // Dashboard APIs
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/manager/dashboard')
    return response.data.data
  },

  // Test Results Management APIs
  async getTestResults(): Promise<TestResults[]> {
    const response = await apiClient.get<ApiResponse<TestResults[]>>('/manager/test-results')
    return response.data.data
  },

  async getTestResultById(testResultId: number): Promise<TestResults> {
    const response = await apiClient.get<ApiResponse<TestResults>>(`/manager/test-results/${testResultId}`)
    return response.data.data
  },

  async approveTestResult(testResultId: number): Promise<{ message: string }> {
    const response = await apiClient.put<ApiResponse<{ message: string }>>(
      `/manager/test-results/${testResultId}/approve`
    )
    return response.data.data
  },

  async rejectTestResult(testResultId: number, reason?: string): Promise<{ message: string }> {
    const response = await apiClient.put<ApiResponse<{ message: string }>>(
      `/manager/test-results/${testResultId}/reject`,
      { reason }
    )
    return response.data.data
  },

  // Feedback APIs
  async getFeedbacks(): Promise<Feedback[]> {
    const response = await apiClient.get<ApiResponse<Feedback[]>>('/manager/feedbacks')
    return response.data.data
  },

  async getFeedbackStats(): Promise<{
    avgRating: number
    totalFeedbacks: number
    distribution: number[]
  }> {
    const response = await apiClient.get<
      ApiResponse<{
        avgRating: number
        totalFeedbacks: number
        distribution: number[]
      }>
    >('/manager/feedbacks/stats')
    return response.data.data
  },

  // Blog Management APIs
  async getBlogs(): Promise<BlogPost[]> {
    const response = await apiClient.get<ApiResponse<BlogPost[]>>('/manager/blogs')
    return response.data.data
  },

  async getBlogById(blogId: number): Promise<BlogPost> {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/manager/blogs/${blogId}`)
    return response.data.data
  },

  async createBlog(blogData: Omit<BlogPostAdd, 'BlogID' | 'CreatedAt' | 'UpdatedAt'>): Promise<BlogPost> {
    const response = await apiClient.post<ApiResponse<BlogPost>>('/manager/blogs', blogData)
    return response.data.data
  },

  async updateBlog(blogId: number, blogData: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiClient.put<ApiResponse<BlogPost>>(`/manager/blogs/${blogId}`, blogData)
    return response.data.data
  },

  async deleteBlog(blogId: number): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/manager/blogs/${blogId}`)
    return response.data.data
  }
}
