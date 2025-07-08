import { apiClient } from "../utils/api"

export interface CreatePaymentUrlRequest {
  amount: number
  orderInfo: string
  serviceId?: number
}

export interface CreatePaymentUrlResponse {
  success: boolean
  paymentUrl?: string
  message: string
}

export const paymentService = {
  createPaymentUrl: async (data: CreatePaymentUrlRequest): Promise<CreatePaymentUrlResponse> => {
    try {
      // Validation
      if (!data.amount || typeof data.amount !== "number" || data.amount <= 0) {
        throw new Error("Amount must be a positive number")
      }

      if (!data.orderInfo || typeof data.orderInfo !== "string" || data.orderInfo.trim().length === 0) {
        throw new Error("Order info is required")
      }

      console.log("Sending payment request:", data)

      const response = await apiClient.post<CreatePaymentUrlResponse>("/payments/create-vnpay-url", {
        amount: Math.round(data.amount), // Ensure integer
        orderInfo: data.orderInfo.trim(),
        serviceId: data.serviceId,
      })

      console.log("Payment response:", response.data)

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create payment URL")
      }

      return response.data
    } catch (error: any) {
      console.error("Payment service error:", error)

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error("Không thể tạo liên kết thanh toán")
      }
    }
  },

  verifyPayment: async (transactionId: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/payments/verify/${transactionId}`)
      return response.data
    } catch (error: any) {
      console.error("Payment verification error:", error)
      throw new Error(error.response?.data?.message || "Không thể xác minh thanh toán")
    }
  },
}
