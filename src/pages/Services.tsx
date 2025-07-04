'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceService } from '../services/serviceService'
import { useAuth } from '../hooks/useAuth'
import type { Services, UserProfile } from '../utils/types'
import { userService } from '../services/userService'
import { testRequestService } from '../services/testRequestService'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  Services: Services | null
  serviceType: 'Administrative' | 'Civil'
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, Services, serviceType }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    appointmentDate: '',
    collectionMethod: serviceType === 'Administrative' ? 'facility' : 'home',
    selectedService: '',
    fullName: '',
    birthDate: '',
    gender: 'Nam',
    phoneNumber: '',
    signatureFile: null as File | null,
    agreeTerms: false
  })

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const fetchUserProfile = async () => {
    try {
      if (user?.accountId) {
        const profile = await userService.getProfile()
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
  useEffect(() => {
    console.log('Current user:', user)

    fetchUserProfile()
  }, [])

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && user?.profile) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.profile?.FullName || '',
        birthDate: user.profile?.DateOfBirth || '',
        phoneNumber: user.profile?.PhoneNumber || '',
        selectedService: Services?.ServiceName || ''
      }))
    }
  }, [isOpen, user, Services])

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

    if (formData.collectionMethod === 'facility') {
      const today = new Date()
      const selectedDate = new Date(formData.appointmentDate)
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      if (selectedDate < tomorrow) {
        alert('Ngày đăng ký phải sau ngày hiện tại ít nhất 1 ngày!')
        return
      }
    }

    try {
      const registrationData = {
        serviceId: Services?.ServiceID!,
        collectionMethod: formData.collectionMethod,
        appointmentDate: formData.collectionMethod === 'facility' ? formData.appointmentDate : undefined
      }

      const result = await testRequestService.createTestRequest(registrationData)

      alert(result.message || 'Đăng ký thành công!')
      // ❗ Thêm timeout 300ms để đảm bảo người dùng thấy alert trước khi đóng
      setTimeout(() => {
        onClose()
      }, 300)
    } catch (error) {
      console.error('Đăng ký thất bại:', error)
      alert('Đăng ký thất bại. Vui lòng thử lại sau.')
    }
  }

  if (!isOpen) return null

  const isAdministrative = serviceType === 'Administrative'
  const showDateField = isAdministrative || formData.collectionMethod === 'facility'

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='bg-gray-200 px-6 py-4 flex items-center'>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-800 mr-3'>
            ← Quay lại
          </button>
          <h2 className='text-lg font-semibold'>
            Đăng ký lịch xét nghiệm - {isAdministrative ? 'Hành chính' : 'Dân sự'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Date Field - Only show for Administrative or when Facility is selected for Civil */}
          {formData.collectionMethod === 'facility' && (
            <div>
              <label className='block text-sm font-medium mb-2'>
                Ngày đăng ký <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
              />
            </div>
          )}

          {/* Collection Method */}
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
                    value='home'
                    checked={formData.collectionMethod === 'home'}
                    onChange={(e) => handleInputChange('collectionMethod', e.target.value)}
                    className='mr-2'
                  />
                  Tại nhà
                </label>
              )}
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='collectionMethod'
                  value='facility'
                  checked={formData.collectionMethod === 'facility'}
                  onChange={(e) => handleInputChange('collectionMethod', e.target.value)}
                  className='mr-2'
                />
                Tại cơ sở
              </label>
            </div>
          </div>

          {/* Services Selection */}
          <div>
            <label className='block text-sm font-medium mb-2'>
              Chọn dịch vụ <span className='text-red-500'>*</span>
            </label>
            <select
              value={formData.selectedService}
              onChange={(e) => handleInputChange('selectedService', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              required
            >
              {Services && <option value={Services.ServiceName}>{Services.ServiceName}</option>}
            </select>
          </div>

          {/* User Information Section */}
          <div>
            <h3 className='text-lg font-medium mb-4'>Thông tin người yêu cầu</h3>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={userProfile?.FullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Ngày tháng năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={userProfile?.DateOfBirth?.slice(0, 10) || ''}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
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
                  value={userProfile?.PhoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>
            </div>

            {/* Signature Upload */}
            <div>
              <label className='block text-sm font-medium mb-1'>
                Hình ảnh chữ ký <span className='text-red-500'>*</span>
              </label>
              <div className='flex items-center gap-2'>
                {formData.signatureFile ? (
                  <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                    <span className='text-sm'>{userProfile?.SignatureImage}</span>
                    <button
                      type='button'
                      onClick={() => handleInputChange('signatureFile', null)}
                      className='text-red-500 hover:text-red-700'
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                    <span className='text-sm'>chu-ky.png (100kb)</span>
                    <button type='button' className='text-red-500 hover:text-red-700'>
                      ✕
                    </button>
                  </div>
                )}
                <input
                  type='file'
                  onChange={handleFileChange}
                  accept='image/*'
                  className='hidden'
                  id='signature-upload'
                />
                <label htmlFor='signature-upload' className='cursor-pointer text-blue-500 hover:text-blue-700 text-sm'>
                  Chọn file
                </label>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
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
              />
              <span className='text-sm'>Tôi đồng ý với các điều khoản và cam kết nêu trên</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium'
          >
            Gửi đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Administrative' | 'Civil'>('Administrative')
  const [servicesList, setServicesList] = useState<Services[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState<Services | null>(null)
  const [showModal, setShowModal] = useState(false)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await serviceService.getServicesByType(activeTab)
      setServicesList(Array.isArray(data) ? data : [])
    } catch (error) {
      setError('Failed to load services' + error)
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

  const handleRegisterClick = (Services: Services) => {
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
      {/* Header */}
      <div className='bg-gradient-to-r from-teal-600 to-purple-600 py-16'>
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

      {/* Services list */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading services...</p>
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
                  className='bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg p-8 text-white'
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
                      <h3 className='font-semibold mb-2'>Đăng ký</h3>
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

      {/* Registration Modal */}
      <RegistrationModal isOpen={showModal} onClose={closeModal} Services={selectedService} serviceType={activeTab} />
    </div>
  )
}

export default Services
