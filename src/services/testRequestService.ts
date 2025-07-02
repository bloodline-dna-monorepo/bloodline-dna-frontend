import { apiClient } from '../utils/api'
import type { ApiResponse, ServiceRegistrationData, TestRequests } from '../utils/types'

interface CreateTestRequestResponse {
  testRequestId: string
  message: string
}

export const testRequestService = {
  // Create test request (called ONLY after successful payment)
  createTestRequest: async (
    registrationData: ServiceRegistrationData
  ): Promise<ApiResponse<CreateTestRequestResponse>> => {
    return apiClient<CreateTestRequestResponse>('/test-requests', registrationData)
  },

  // Get user's test requests
  getUserTestRequests: async (): Promise<ApiResponse<TestRequests[]>> => {
    return apiClient<TestRequests[]>('/test-requests/user')
  },

  // Get test request by ID
  getTestRequestById: async (testRequestId: number): Promise<ApiResponse<TestRequests>> => {
    return apiClient<TestRequests>(`/test-requests/${testRequestId}`)
  },

  // Update test request status (for staff/admin)
  updateTestRequestStatus: async (testRequestId: string, status: string): Promise<ApiResponse<TestRequests>> => {
    return apiClient<TestRequests>(`/test-requests/${testRequestId}/status`, { status })
  },

  // Get test requests for feedback (completed tests)
  getTestRequestsForFeedback: async (): Promise<ApiResponse<TestRequests[]>> => {
    return apiClient<TestRequests[]>('/test-requests/feedback')
  }
}
