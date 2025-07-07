import { useNavigate, useSearchParams } from 'react-router-dom'
import { paymentService } from '../services/paymentService'
import { useEffect, useState } from 'react'
import type { TestRequestData } from 'utils/types'

interface PaymentReturnResponse {
  success: boolean
  message: string
  data: {
    testRequest?: TestRequestData
    transactionId?: string
    paymentStatus: 'success' | 'failed'
    responseCode?: string
  }
}

const PaymentReturn: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [paymentResult, setPaymentResult] = useState<PaymentReturnResponse >()
  const [error, setError] = useState('')

  useEffect(() => {
    handlePaymentReturn()
  }, [])

  const handlePaymentReturn = async () => {
    try {
      setLoading(true)

      // Get all URL parameters
      const params: Record<string, string> = {}
      searchParams.forEach((value, key) => {
        params[key] = value
      })

      // Call backend to verify payment
      const response = await paymentService.handleVNPayReturn(params)
      setPaymentResult(response)

      if (response.success) {
        // Payment successful - show success message for 3 seconds then redirect
        setTimeout(() => {
          navigate('/customer/dashboard')
        }, 3000)
      } else {
        // Payment failed
        setError(response.message || 'Thanh toán thất bại')
      }
    } catch (error) {
      console.error('Payment return error:', error)
      setError('Có lỗi xảy ra khi xử lý kết quả thanh toán')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thanh toán thất bại</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/services')}
            className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
          >
            Quay lại dịch vụ
          </button>
        </div>
      </div>
    )
  }

  if (paymentResult?.data.paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thanh toán thành công!</h2>
          <p className="text-gray-600 mb-6">Đơn hàng của bạn đã được tạo thành công.</p>
          <p className="text-sm text-gray-500 mb-4">Đang chuyển hướng đến trang quản lý...</p>
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
          >
            Đi đến trang quản lý
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default PaymentReturn
