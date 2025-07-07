'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { paymentService } from '../services/paymentService'
import type { Services } from '../utils/types'

interface PaymentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  customerName: string
  serviceName: string
  amount: number
  onConfirm: () => void
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  customerName,
  serviceName,
  amount,
  onConfirm
}) => {
  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND'
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg w-full max-w-md'>
        {/* Header with green checkmark */}
        <div className='text-center py-8'>
          <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Xác Nhận Thanh Toán</h2>
          <p className='text-lg font-semibold text-gray-700 mb-6'>Chi Tiết Thanh Toán</p>
          <p className='text-sm text-gray-500 mb-6'>Thông tin đơn hàng và khách hàng</p>
        </div>

        {/* Payment Details */}
        <div className='px-8 pb-8'>
          <div className='space-y-4 mb-6'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Khách hàng:</span>
              <span className='font-medium'>{customerName}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Dịch vụ:</span>
              <span className='font-medium'>{serviceName}</span>
            </div>
            <div className='border-t pt-4'>
              <div className='flex justify-between text-lg font-bold'>
                <span>Tổng tiền:</span>
                <span className='text-green-600'>{formatPrice(amount)}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onConfirm}
            className='w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium'
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  )
}

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [service, setService] = useState<Services>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [paymentForm, setPaymentForm] = useState({
    bankCode: '',
    cardNumber: '',
    cardHolder: ''
  })

  const sessionId = searchParams.get('sessionId')

  useEffect(() => {
    if (!sessionId) {
      navigate('/services')
      return
    }

    fetchPaymentSession()
  }, [sessionId])

  const fetchPaymentSession = async () => {
    try {
      setLoading(true)
      const response = await paymentService.getPaymentSession(sessionId!)
      setService(response.data.service)
    } catch (error) {
      console.error('Error fetching payment session:', error)
      setError('Không thể tải thông tin thanh toán')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleConfirmPayment = () => {
    if (!paymentForm.bankCode || !paymentForm.cardNumber || !paymentForm.cardHolder) {
      alert('Vui lòng điền đầy đủ thông tin thanh toán')
      return
    }

    setShowConfirmModal(true)
  }

  const handleFinalConfirm = async () => {
    try {
      // Create payment with VNPay
      const response = await paymentService.createPayment({
        serviceId: service!.ServiceID,
        collectionMethod: 'facility', // This should come from session
        appointmentDate: undefined // This should come from session
      })

      // Redirect to VNPay
      window.location.href = response.data.paymentUrl
    } catch (error) {
      console.error('Payment error:', error)
      alert('Có lỗi xảy ra khi xử lý thanh toán')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND'
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>{error || 'Không tìm thấy thông tin thanh toán'}</p>
          <button
            onClick={() => navigate('/services')}
            className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700'
          >
            Quay lại dịch vụ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Warning Banner */}
      <div className='bg-orange-100 border-l-4 border-orange-500 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <svg className='h-5 w-5 text-orange-400' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='ml-3'>
            <p className='text-sm text-orange-700'>
              Quý khách vui lòng không tắt trình duyệt cho đến khi kết quả hiện trên website. Xin cảm ơn!
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Order Information */}
          <div className='bg-white rounded-lg p-6 shadow-sm'>
            <h2 className='text-xl font-bold mb-6'>Thông tin đơn hàng</h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Số tiền thanh toán</label>
                <p className='text-2xl font-bold text-gray-900'>{formatPrice(service.Price)}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Tên dịch vụ</label>
                <p className='text-gray-900'>{service.ServiceName}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Mã dịch vụ</label>
                <p className='text-gray-900'>DV{service.ServiceID.toString().padStart(3, '0')}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Nhà cung cấp</label>
                <p className='text-gray-900 font-medium'>GenUnity</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='bg-white rounded-lg p-6 shadow-sm'>
            <h2 className='text-xl font-bold mb-6'>Thanh toán qua Ngân hàng nội địa</h2>

            <div className='mb-6'>
              <h3 className='text-lg font-medium mb-4'>Thẻ nội địa</h3>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Ngân hàng</label>
                  <select
                    value={paymentForm.bankCode}
                    onChange={(e) => handleInputChange('bankCode', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  >
                    <option value=''>Không chọn</option>
                    <option value='NCB'>Ngân hàng NCB</option>
                    <option value='AGRIBANK'>Ngân hàng Agribank</option>
                    <option value='SCB'>Ngân hàng SCB</option>
                    <option value='SACOMBANK'>Ngân hàng Sacombank</option>
                    <option value='EXIMBANK'>Ngân hàng EximBank</option>
                    <option value='MSBANK'>Ngân hàng MSBANK</option>
                    <option value='NAMABANK'>Ngân hàng NamABank</option>
                    <option value='VNMART'>Ví điện tử VnMart</option>
                    <option value='VIETINBANK'>Ngân hàng Vietinbank</option>
                    <option value='VIETCOMBANK'>Ngân hàng VCB</option>
                    <option value='HDBANK'>Ngân hàng HDBank</option>
                    <option value='DONGABANK'>Ngân hàng Dong A</option>
                    <option value='TPBANK'>Ngân hàng TPBank</option>
                    <option value='OJB'>Ngân hàng OceanBank</option>
                    <option value='BIDV'>Ngân hàng BIDV</option>
                    <option value='TECHCOMBANK'>Ngân hàng Techcombank</option>
                    <option value='VPBANK'>Ngân hàng VPBank</option>
                    <option value='MBBANK'>Ngân hàng MBBank</option>
                    <option value='ACB'>Ngân hàng ACB</option>
                    <option value='OCB'>Ngân hàng OCB</option>
                    <option value='IVB'>Ngân hàng IVB</option>
                    <option value='VISA'>Thanh toán qua VISA/MASTER</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Số thẻ</label>
                  <input
                    type='text'
                    value={paymentForm.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder='Nhập số thẻ'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Tên chủ thẻ</label>
                  <input
                    type='text'
                    value={paymentForm.cardHolder}
                    onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                    placeholder='Nhập tên chủ thẻ (không dấu)'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  />
                </div>
              </div>
            </div>

            <div className='flex space-x-4'>
              <button
                onClick={() => navigate('/services')}
                className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium'
              >
                Hủy thanh toán
              </button>
              <button
                onClick={handleConfirmPayment}
                className='flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium'
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        customerName={user?.profile?.FullName || ''}
        serviceName={service.ServiceName}
        amount={service.Price}
        onConfirm={handleFinalConfirm}
      />
    </div>
  )
}

export default Payment
