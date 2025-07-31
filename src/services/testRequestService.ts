import { apiClient } from '../utils/api'
import type { ApiResponse, TestProcess, TestRequestData, TestResults } from '../utils/types'

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
      throw new Error('Không thể tạo yêu cầu xét nghiệm')
    }
  },
  getTestResult: async (TestRequestID: number): Promise<TestResults> => {
    try {
      const response = await apiClient.get<ApiResponse<TestResults>>(`/test-requests/${TestRequestID}/results`)
      return response.data.data
    } catch (error) {
      console.error('Error creating test request:', error)
      throw new Error('Không thể tạo yêu cầu xét nghiệm')
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
    try {
      console.log('Calling getUserTestRequests API...')
      const response = await apiClient.get<ApiResponse<TestProcess[]>>('/test-requests/testRequestCustomer')
      console.log('getUserTestRequests response:', response.data)
      return response.data.data
    } catch (error) {
      console.error('Error in getUserTestRequests:', error)

      // Fallback: try alternative endpoint
      try {
        console.log('Trying fallback endpoint...')
        const fallbackResponse = await apiClient.get<ApiResponse<TestProcess[]>>('/test-requests/user')
        console.log('Fallback response:', fallbackResponse.data)
        return fallbackResponse.data.data
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
        throw error // throw original error
      }
    }
  },

  // Download test result PDF
  downloadTestResultPDF: async (testRequestId: number): Promise<Blob> => {
    try {
      const response = await apiClient.get(`/test-requests/${testRequestId}/pdf`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading test result PDF:', error)
      throw new Error('Không thể tải xuống file kết quả PDF')
    }
  },

  // Download sample form PDF
  downloadSampleFormPDF: async (testRequestId: number): Promise<Blob> => {
    try {
      const response = await apiClient.get(`/test-requests/${testRequestId}/sample-form-pdf`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading sample form PDF:', error)
      throw new Error('Không thể tải xuống file biên bản PDF')
    }
  }

  // Update test request status (for staff)
}
