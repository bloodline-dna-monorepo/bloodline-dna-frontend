import { apiClient } from "../utils/api"
import type { ApiResponse, DashboardStaffStats, RecentRequest, TestRequestDetail, TestRequestFullDetail, TestResultData, VerifiedResult, VerifiedResultDetail } from "../utils/types"



class StaffService {
  async getDashboardStats(): Promise<{ stats: DashboardStaffStats; recentRequests: RecentRequest[] }> {
    const response =
      await apiClient.get<ApiResponse<{ stats: DashboardStaffStats; recentRequests: RecentRequest[] }>>(
        "/staff/dashboard/stats",
      )
    return response.data.data
  }

  async getUnconfirmedRequests(): Promise<TestRequestDetail[]> {
    const response = await apiClient.get<ApiResponse<TestRequestDetail[]>>("/staff/requests/unconfirmed")
    return response.data.data
  }

  async getConfirmedRequests(): Promise<TestRequestDetail[]> {
    const response = await apiClient.get<ApiResponse<TestRequestDetail[]>>("/staff/requests/confirmed")
    return response.data.data
  }

  async getRequestById(requestId: number): Promise<TestRequestDetail> {
    const response = await apiClient.get<ApiResponse<TestRequestDetail>>(`/staff/requests/${requestId}`)
    return response.data.data
  }

  async getRequestFullDetail(requestId: number): Promise<TestRequestFullDetail> {
    const response = await apiClient.get<ApiResponse<TestRequestFullDetail>>(`/staff/requests/${requestId}/detail`)
    return response.data.data
  }

  async confirmRequest(requestId: number): Promise<TestRequestDetail> {
    const response = await apiClient.put<ApiResponse<TestRequestDetail>>(`/staff/requests/${requestId}/confirm`)
    return response.data.data
  }

  async updateRequestStatus(requestId: number, status: string): Promise<TestRequestDetail> {
    const response = await apiClient.put<ApiResponse<TestRequestDetail>>(`/staff/requests/${requestId}/status`, {
      status,
    })
    return response.data.data
  }

  async confirmSample(requestId: number): Promise<TestRequestDetail> {
    const response = await apiClient.put<ApiResponse<TestRequestDetail>>(`/staff/requests/${requestId}/confirm-sample`)
    return response.data.data
  }
  async getVerifiedResults(): Promise<VerifiedResult[]> {
    const response = await apiClient.get<ApiResponse<VerifiedResult[]>>("/staff/results/verified")
    return response.data.data
  }

  async getVerifiedResultDetail(resultId: number): Promise<VerifiedResultDetail> {
    const response = await apiClient.get<ApiResponse<VerifiedResultDetail>>(`/staff/results/${resultId}/detail`)
    return response.data.data
  }
  async createTestResult(requestId: number, resultData: TestResultData): Promise<void> {
    await apiClient.post(`/staff/requests/${requestId}/result`, resultData)
  }
}
export const staffService = new StaffService()
