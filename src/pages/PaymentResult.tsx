'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { testRequestService } from '../services/testRequestService'
import { useAuth } from '../hooks/useAuth'

interface ServiceDetails {
  serviceName: string
  serviceType: string
  amount: number
  sampleCount: number
}

const PaymentResult: React.FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(null)

  useEffect(() => {
    handlePaymentResult()
  }, [])

  const handlePaymentResult = async (): Promise<void> => {
    try {
      const responseCode = searchParams.get('vnp_ResponseCode')
      console.log('Payment result code:', responseCode)

      // Get stored data
      const storedData = localStorage.getItem('pendingRegistration')
      let registrationData = null
      let serviceInfo = null

      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          registrationData = parsed.registrationData
          serviceInfo = parsed.serviceInfo
          localStorage.removeItem('pendingRegistration')
        } catch (parseError) {
          console.error('Error parsing stored data:', parseError)
        }
      }

      // Handle payment result
      if (responseCode === '00') {
        setSuccess(true)
        setMessage('Thanh toán thành công!')
        setCustomerName(user?.profile?.FullName || user?.name || 'Khách hàng')

        if (registrationData && serviceInfo) {
          try {
            console.log('Creating test request with data:', registrationData)
            const result = await testRequestService.createTestRequest(registrationData)
            console.log('Test request created successfully:', result)

            setServiceDetails({
              serviceName: serviceInfo.serviceName,
              serviceType: serviceInfo.serviceType,
              amount: serviceInfo.amount,
              sampleCount: serviceInfo.serviceType === 'Administrative' ? 3 : 2
            })

            setMessage('Thanh toán thành công! Yêu cầu xét nghiệm đã được tạo.')
          } catch (error: any) {
            console.error('Error creating test request:', error)
            setMessage('Thanh toán thành công nhưng có lỗi khi tạo yêu cầu xét nghiệm. Vui lòng liên hệ hỗ trợ.')
          }
        } else {
          console.warn('No registration data found')
          setMessage('Thanh toán thành công nhưng thiếu thông tin đăng ký. Vui lòng liên hệ hỗ trợ.')
        }
      } else {
        setSuccess(false)
        const errorMessages: Record<string, string> = {
          invalid: 'Giao dịch không hợp lệ',
          '01': 'Giao dịch chưa hoàn tất',
          '02': 'Giao dịch bị lỗi',
          '04': 'Giao dịch đảo',
          '05': 'VNPAY đang xử lý giao dịch',
          '06': 'VNPAY đã gửi yêu cầu hoàn tiền',
          '07': 'Giao dịch bị nghi ngờ',
          '09': 'Giao dịch hoàn trả bị từ chối',
          '21': 'Giao dịch chưa được thanh toán',
          '22': 'Giao dịch bị hủy'
        }

        setMessage(errorMessages[responseCode || ''] || 'Thanh toán thất bại hoặc bị hủy.')
      }
    } catch (error: any) {
      console.error('Error processing payment result:', error)
      setSuccess(false)
      setMessage('Có lỗi xảy ra khi xử lý kết quả thanh toán.')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (success) {
      // Redirect to customer test tracking page
      navigate('/customer/test-process')
    } else {
      // Redirect back to services page
      navigate('/services')
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center'>
        {/* Success/Error Icon */}
        <div className='mb-6'>
          {success ? (
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
          ) : (
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className='text-2xl font-bold mb-2'>{success ? 'Xác Nhận Thanh Toán' : 'Thanh Toán Thất Bại'}</h1>

        {/* Subtitle */}
        <p className='text-gray-600 mb-6'>{success ? 'Chi Tiết Thanh Toán' : 'Thông tin đơn hàng và thanh toán'}</p>

        {/* Customer and Service Details */}
        {success && serviceDetails && (
          <div className='text-left mb-6 space-y-4'>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>Khách hàng:</span>
              <span className='font-medium'>{customerName}</span>
            </div>

            <div className='py-2'>
              <div className='text-gray-600 mb-1'>Dịch vụ:</div>
              <div className='font-medium'>
                {serviceDetails.serviceName} ({serviceDetails.sampleCount} mẫu) - {serviceDetails.serviceType}
              </div>
            </div>

            <div className='flex justify-between items-center py-2 border-t border-gray-100'>
              <span className='text-lg font-semibold'>Tổng tiền:</span>
              <span className='text-xl font-bold text-green-600'>
                {serviceDetails.amount.toLocaleString('vi-VN')} VND
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <p className={`mb-6 ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</p>

        {/* Action Button */}
        <button
          onClick={handleContinue}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            success ? 'bg-black text-white hover:bg-gray-800' : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          {success ? 'Tiếp tục' : 'Thử lại'}
        </button>

        {/* Additional Info for Success */}
        {success && (
          <div className='mt-6 p-4 bg-green-50 rounded-lg'>
            <p className='text-sm text-green-700'>
              Yêu cầu xét nghiệm của bạn đã được tạo thành công. Bạn có thể theo dõi tiến trình tại trang "Theo dõi xét
              nghiệm".
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentResult
