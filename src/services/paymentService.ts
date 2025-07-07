import { apiClient } from '../utils/api'
import type { Services, TestRequestData } from '../utils/types'

// Định nghĩa các kiểu dữ liệu

interface PaymentSession {
  sessionId: string
  userId: number
  serviceId: number
  collectionMethod: string
  appointmentDate?: string
  amount: number
  createdAt: Date
}

interface PaymentResponse {
  success: boolean
  message: string
  data: {
    paymentUrl: string
    sessionId: string
    service: Services // Thay 'any' bằng kiểu Service
  }
}

interface PaymentReturnResponse {
  success: boolean
  message: string
  data: {
    testRequest: TestRequestData // Thay 'any' bằng kiểu TestRequest
    transactionId?: string
    paymentStatus: 'success' | 'failed'
    responseCode?: string
  }
}

interface PaymentSessionResponse {
  success: boolean
  data: {
    session: PaymentSession // Thay 'any' bằng kiểu PaymentSession
    service: Services // Thay 'any' bằng kiểu Service
  }
}

class PaymentService {
  // Tạo phiên thanh toán
  async createPayment(data: TestRequestData): Promise<PaymentResponse> {
    const response = await apiClient.post('/payment/create', data)
    return response.data as PaymentResponse
  }

  // Xử lý kết quả trả về từ VNPay
  async handleVNPayReturn(params: Record<string, string>): Promise<PaymentReturnResponse> {
    const queryString = new URLSearchParams(params).toString()
    const response = await apiClient.get(`/payment/vnpay-return?${queryString}`)
    return response.data
  }

  // Lấy thông tin phiên thanh toán
  async getPaymentSession(sessionId: string): Promise<PaymentSessionResponse> {
    const response = await apiClient.get(`/payment/session/${sessionId}`)
    return response.data as PaymentSessionResponse
  }
}

export const paymentService = new PaymentService()
