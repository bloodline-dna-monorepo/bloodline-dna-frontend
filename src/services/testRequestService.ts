import { apiClient } from '../utils/api'
import type { ApiResponse, TestProcess, TestRequestData, test } from '../utils/types'

interface CreateTestRequestResponse {
  message: string
}
interface CreateSampleResponse {
  message: string
}

export const testRequestService = {
  // Create test request (called ONLY after successful payment)
  createTestRequest: async (registrationData: TestRequestData): Promise<CreateTestRequestResponse> => {
    try {
      const response = await apiClient.post<CreateTestRequestResponse>('/test-requests', registrationData)
      return response.data
    } catch (error) {
      console.error('Error creating test request:', error)
      throw new Error( 'Không thể tạo yêu cầu xét nghiệm')
    }
  },
  createSampleCategory: async (testRequestId: number, formData: FormData): Promise<CreateSampleResponse> => {
    const res = await apiClient.post<CreateSampleResponse>(`/test-requests/${testRequestId}/submit-sample`, formData)
    return {
      message: res.data.message
    }
  },

  // Get user's test requests
  getUserTestRequests: async (): Promise<TestProcess[]> => {
    const response = await apiClient.get<ApiResponse<TestProcess[]>>('/test-requests/testRequestCustomer')
    return response.data.data
  },

  // // Get test request by ID
  // getTestRequestById: async (testRequestId: number): Promise<ApiResponse<TestRequests>> => {
  //   return apiClient<TestRequests>(`/test-requests/${testRequestId}`)
  // },

  // Update test request status (for staff)
  updateTestRequestStatus: async (testRequestId: string, status: string): Promise<ApiResponse<test>> => {
    return apiClient.put<test>(`/test-requests/${testRequestId}/status`, { status })
  }

  // // Get test requests for feedback (completed tests)
  // getTestRequestsForFeedback: async (): Promise<ApiResponse<TestRequests[]>> => {
  //   return apiClient<TestRequests[]>('/test-requests/feedback')
  // }
}
