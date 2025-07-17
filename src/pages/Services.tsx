'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../hooks/useAuth'
import type { Services as ServiceType, UserProfile } from '../utils/types'
import { userService } from '../services/userService'
import { paymentService } from '../services/paymentService'
import type { CreatePaymentUrlRequest } from '../utils/types'
import { ArrowUpIcon } from 'lucide-react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  Services: ServiceType | null
  serviceType: 'Administrative' | 'Civil'
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, Services, serviceType }) => {
 
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    appointmentDate: '',
    collectionMethod: serviceType === 'Administrative' ? 'Facility' : 'Home',
    selectedService: '',
    fullName: '',
    birthDate: '',
    gender: 'Nam',
    phoneNumber: '',
    signatureFile: null as File | null,
    agreeTerms: false
  })

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchUserProfile = async () => {
    try {
      if (user?.accountId) {
        const profile = await userService.getProfile()
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Lỗi khi tải hồ sơ người dùng:', error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchUserProfile()
    }
  }, [isOpen])

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && userProfile) {
      setFormData((prev) => ({
        ...prev,
        fullName: userProfile.FullName || '',
        birthDate: userProfile.DateOfBirth?.slice(0, 10) || '',
        phoneNumber: userProfile.PhoneNumber || '',
        selectedService: Services?.ServiceName || ''
      }))
    }
  }, [isOpen, userProfile, Services])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        signatureFile: e.target.files![0]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với các điều khoản')
      return
    }

    if (formData.collectionMethod === 'Facility' && !formData.appointmentDate) {
      alert('Vui lòng chọn ngày đăng ký')
      return
    }

    if (formData.collectionMethod === 'Facility') {
      const today = new Date()
      const selectedDate = new Date(formData.appointmentDate)
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      if (selectedDate < tomorrow) {
        alert('Ngày đăng ký phải sau ngày hiện tại ít nhất 1 ngày!')
        return
      }
    }

    if (!Services) {
      alert('Không tìm thấy thông tin dịch vụ')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare payment data with proper validation
      const paymentData: CreatePaymentUrlRequest = {
        amount: Services.Price,
        orderInfo: `Đăng ký dịch vụ ${Services.ServiceName} - ${Services.ServiceType}`,
        serviceId: Services.ServiceID
      }

      console.log('Đang gửi yêu cầu thanh toán:', paymentData)

      // Create VNPAY payment URL
      const paymentResponse = await paymentService.createPaymentUrl(paymentData)

      if (paymentResponse.success && paymentResponse.paymentUrl) {
        // Store registration data and service info for after payment
        const registrationData = {
          serviceId: Services.ServiceID,
          collectionMethod: formData.collectionMethod,
          appointmentDate: formData.appointmentDate
        } // Declare registrationData here
        const navigationState = {
          registrationData,
          serviceInfo: {
            serviceID: Services.ServiceID,
            serviceName: Services.ServiceName,
            serviceType: Services.ServiceType,
            SampleCount: Services.SampleCount,
            amount: Services.Price
          }
        }

        // Store data in sessionStorage as backup
        localStorage.setItem('pendingRegistration', JSON.stringify(navigationState))

        console.log('Chuyển hướng đến VNPAY:', paymentResponse.paymentUrl)

        // Redirect to VNPAY payment page
        window.location.href = paymentResponse.paymentUrl
      } else {
        throw new Error(paymentResponse.message || 'Không thể tạo liên kết thanh toán')
      }
    } catch (error: any) {
      console.error('Lỗi khi tạo thanh toán:', error)
      alert(error.message || 'Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const isAdministrative = serviceType === 'Administrative'

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
        {/* Tiêu đề */}
        <div className='bg-gray-200 px-6 py-4 flex items-center'>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-800 mr-3' disabled={isSubmitting}>
            ← Quay lại
          </button>
          <h2 className='text-lg font-semibold'>
            Đăng ký lịch xét nghiệm - {isAdministrative ? 'Hành chính' : 'Dân sự'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Trường ngày - Chỉ hiển thị cho Hành chính hoặc khi chọn Cơ sở cho Dân sự */}
          {formData.collectionMethod === 'Facility' && (
            <div>
              <label className='block text-sm font-medium mb-2'>
                Ngày đăng ký <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Ngày mai
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Phương thức lấy mẫu */}
          <div>
            <label className='block text-sm font-medium mb-2'>
              Hình thức lấy mẫu <span className='text-red-500'>*</span>
            </label>
            <div className='space-y-2'>
              {!isAdministrative && (
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='collectionMethod'
                    value='Home'
                    checked={formData.collectionMethod === 'Home'}
                    onChange={(e) => handleInputChange('collectionMethod', e.target.value)}
                    className='mr-2'
                    disabled={isSubmitting}
                  />
                  Tại nhà
                </label>
              )}
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='collectionMethod'
                  value='Facility'
                  checked={formData.collectionMethod === 'Facility'}
                  onChange={(e) => handleInputChange('collectionMethod', e.target.value)}
                  className='mr-2'
                  disabled={isSubmitting}
                />
                Tại cơ sở
              </label>
            </div>
          </div>

          {/* Lựa chọn dịch vụ */}
          <div>
            <label className='block text-sm font-medium mb-2'>
              Chọn dịch vụ <span className='text-red-500'>*</span>
            </label>
            <select
              value={formData.selectedService}
              onChange={(e) => handleInputChange('selectedService', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              required
              disabled={isSubmitting}
            >
              {Services && <option value={Services.ServiceName}>{Services.ServiceName}</option>}
            </select>
          </div>

          {/* Phần thông tin người dùng */}
          <div>
            <h3 className='text-lg font-medium mb-4'>Thông tin người yêu cầu</h3>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100'
                  required
                  readOnly
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Ngày tháng năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100'
                  required
                  readOnly
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Số điện thoại <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100'
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Tải chữ ký */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Hình ảnh chữ ký <span className='text-red-500'>*</span>
              </label>
              <div className='flex items-center gap-2'>
                {userProfile?.SignatureImage ? (
                  <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                    <span className='text-sm'>{userProfile.SignatureImage}</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                    <span className='text-sm'>Chưa có chữ ký</span>
                  </div>
                )}
                <input
                  type='file'
                  onChange={handleFileChange}
                  accept='image/*'
                  className='hidden'
                  id='signature-upload'
                  disabled={isSubmitting}
                />
                <label
                  htmlFor='signature-upload'
                  className={`cursor-pointer text-blue-500 hover:text-blue-700 text-sm ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Chọn file
                </label>
              </div>
            </div>
          </div>

          {/* Điều khoản và điều kiện */}
          <div>
            <h3 className='text-lg font-medium mb-4'>Tôi xin cam kết</h3>
            <div className='space-y-2 text-sm text-gray-700 mb-4'>
              <p>1. Tôi tự nguyện đề nghị xét nghiệm ADN và chấp nhận chi phí xét nghiệm.</p>
              <p>2. Những thông tin tôi đã khai trên đây là đúng và thật và không thay đổi.</p>
              <p>3. Tôi không đổ nghĩa nhà, người quan đến phiền nhiễu, làm mất trật tự.</p>
              <p>
                4. Những trường hợp sản đẻ, người giám hộ tuy, nhận mẫu, nếu không thái hảo trung thực sẽ bị phạt giáp 2
                lần số phí đã nộp.
              </p>
              <p>
                5. Tôi đã đọc và chấp nhận các{' '}
                <a href='#' className='text-blue-500 underline'>
                  điều khoản của trung tâm GenUnity
                </a>{' '}
                và sử dụng ý đề Viện thực hiện các phân tích với các mẫu trên. Nếu vi phạm, tôi xin chịu hoàn toàn trách
                nhiệm trước pháp luật.
              </p>
            </div>

            <label className='flex items-start gap-2'>
              <input
                type='checkbox'
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className='mt-1'
                required
                disabled={isSubmitting}
              />
              <span className='text-sm'>Tôi đồng ý với các điều khoản và cam kết nêu trên</span>
            </label>
          </div>

          {/* Nút gửi */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi đăng ký'}
          </button>
        </form>
      </div>
    </div>
  )
}

const ServicesPage: React.FC = () => {
   const [showScrollTop, setShowScrollTop] = useState(false)
  
    useEffect(() => {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300) // hiện khi scroll hơn 300px
      }
  
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  const [activeTab, setActiveTab] = useState<'Administrative' | 'Civil'>('Administrative')
  const [servicesList, setServicesList] = useState<ServiceType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [showModal, setShowModal] = useState(false)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await serviceService.getServicesByType(activeTab)
      setServicesList(Array.isArray(data) ? data : [])
    } catch (error: any) {
      setError('Không thể tải dịch vụ: ' + (error.message || error))
    } finally {
      setLoading(false)
    }
  }, [activeTab])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

  const handleRegisterClick = (Services: ServiceType) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để đăng ký dịch vụ')
      navigate('/login')
      return
    }

    setSelectedService(Services)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedService(null)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Tiêu đề */}
      <div className='bg-gradient-to-r from-teal-600 to-blue-600 py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Dịch vụ Giám định ADN</h1>
          <div className='flex justify-center space-x-4 mb-8'>
            {['Administrative', 'Civil'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Administrative' | 'Civil')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === tab ? 'bg-white text-teal-600' : 'bg-teal-500 text-white hover:bg-teal-400'
                }`}
              >
                {tab === 'Administrative' ? 'Hành chính pháp lý' : 'Dân sự tư nhân'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách dịch vụ */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Đang tải dịch vụ...</p>
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <p className='text-red-600'>{error}</p>
            <button
              onClick={fetchServices}
              className='mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700'
            >
              Thử lại
            </button>
          </div>
        ) : servicesList.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600'>Không có dịch vụ nào cho loại: {activeTab}.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {servicesList.map((Services) => {
              const basePrice = Services.Price ?? 0
              return (
                <div
                  key={Services.ServiceID}
                  className='bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-8 text-white'
                >
                  <div className='mb-6'>
                    <h2 className='text-2xl font-bold mb-2'>{Services.ServiceName}</h2>
                    <p className='text-white/90'>{Services.Description}</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div>
                      <h3 className='font-semibold mb-2'>Số mẫu</h3>
                      <p className='text-xl'>{Services.SampleCount ?? 'Không xác định'}</p>
                    </div>

                    <div>
                      <h3 className='font-semibold mb-2'>Giá dịch vụ</h3>
                      <p className='text-xl font-bold'>{formatPrice(basePrice)}</p>
                    </div>
                    <div></div>
                    <div>
                      <button
                        onClick={() => handleRegisterClick(Services)}
                        className='inline-block mt-2 px-6 py-2 rounded-full font-medium transition-colors bg-white/20 text-white hover:bg-white/30 active:bg-white/40'
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal đăng ký */}
      <RegistrationModal isOpen={showModal} onClose={closeModal} Services={selectedService} serviceType={activeTab} />
       {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all duration-300'
          title='Lên đầu trang'
        >
          <ArrowUpIcon className='w-6 h-6' />
        </button>
      )}
    </div>
  )
}

export default ServicesPage
