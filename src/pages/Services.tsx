'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceService } from '../services/serviceService'
import type { Services } from '../utils/types'

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Administrative' | 'Civil'>('Administrative')
  const [services, setServices] = useState<Services[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState<Services | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<'home' | 'center' | ''>('')

  const navigate = useNavigate()

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await serviceService.getServicesByType(activeTab)
      setServices(Array.isArray(data) ? data : [])
    } catch (error: any) {
      setError('Failed to load services')
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

  const handleRegisterClick = (service: Services) => {
    setSelectedService(service)
    setSelectedMethod('')
    setShowModal(true)
  }

  const confirmRegister = () => {
    if (selectedService && selectedMethod) {
      navigate(`/service-registration/${selectedService.ServiceID}`, {
        state: {
          service: selectedService,
          method: selectedMethod, // 'home' hoặc 'center'
          type: activeTab // 'Civil' hoặc 'Administrative'
        }
      })
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedService(null)
    setSelectedMethod('')
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

      {/* Service list */}
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
        ) : services.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600'>Không có dịch vụ nào cho loại: {activeTab}.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {services.map((service) => {
              const basePrice = service.Price ?? 0
              return (
                <div
                  key={service.ServiceID}
                  className='bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg p-8 text-white'
                >
                  <div className='mb-6'>
                    <h2 className='text-2xl font-bold mb-2'>{service.ServiceName}</h2>
                    <p className='text-white/90'>{service.Description}</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div>
                      <h3 className='font-semibold mb-2'>Số mẫu</h3>
                      <p className='text-xl'>{service.SampleCount ?? 'Không xác định'}</p>
                    </div>

                    <div>
                      <h3 className='font-semibold mb-2'>Giá dịch vụ</h3>
                      <p className='text-xl font-bold'>{formatPrice(basePrice)}</p>
                    </div>
                    <div></div>
                    <div>
                      <h3 className='font-semibold mb-2'>Đăng ký</h3>
                      <button
                        onClick={() => handleRegisterClick(service)}
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

      {/* Modal chọn hình thức lấy mẫu */}
      {showModal && selectedService && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md shadow-xl'>
            <h2 className='text-xl font-semibold mb-4'>
              Chọn hình thức lấy mẫu - {activeTab === 'Civil' ? 'Dân sự' : 'Hành chính'}
            </h2>

            <p className='font-medium mb-4 text-gray-800'>
              Dịch vụ: <span className='font-bold'>{selectedService.ServiceName}</span>
            </p>

            <div className='mb-6 space-y-3'>
              <label className='flex items-center space-x-3'>
                <input
                  type='radio'
                  name='method'
                  value='home'
                  checked={selectedMethod === 'home'}
                  onChange={() => setSelectedMethod('home')}
                  className='form-radio text-teal-600'
                />
                <span>Tại nhà</span>
              </label>
              <label className='flex items-center space-x-3'>
                <input
                  type='radio'
                  name='method'
                  value='center'
                  checked={selectedMethod === 'center'}
                  onChange={() => setSelectedMethod('center')}
                  className='form-radio text-teal-600'
                />
                <span>Tại cơ sở</span>
              </label>
            </div>

            <div className='flex justify-end space-x-3'>
              <button onClick={closeModal} className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>
                Hủy
              </button>
              <button
                disabled={!selectedMethod}
                onClick={confirmRegister}
                className={`px-4 py-2 rounded text-white ${
                  selectedMethod ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
