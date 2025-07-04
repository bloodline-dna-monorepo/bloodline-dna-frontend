import { apiClient } from '../utils/api'
import type { ApiResponse, TestProcess, TestRequestData, TestRequests } from '../utils/types'

interface CreateTestRequestResponse {
  message: string
}

export const testRequestService = {
  // Create test request (called ONLY after successful payment)
  createTestRequest: async (registrationData: TestRequestData): Promise<CreateTestRequestResponse> => {
    const response = await apiClient.post<CreateTestRequestResponse>('/test-requests', registrationData)
    return {
      message: response.data.message
    }
  },

  // Get user's test requests
  getUserTestRequests: async (): Promise<TestProcess[]> => {
    const response = await apiClient.get<ApiResponse<TestProcess[]>>('/test-requests/testRequestCustomer')
    return response.data.data
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
