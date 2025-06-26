'use client'

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Service } from 'types/types'

const RegistrationPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  const service: Service = state?.service // Lấy dữ liệu service từ state

  const [formData, setFormData] = useState({
    requesterName: '',
    requesterPhone: '',
    appointmentDate: '',
    sampleType: ''
  })

  useEffect(() => {
    if (!service) {
      navigate('/') // Nếu không có service, quay lại trang trước
    }
  }, [service, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    alert('Đăng ký thành công!')
    navigate('/') // Sau khi đăng ký, quay lại trang dịch vụ
  }

  return (
    <div className='pt-24 pb-16'>
      <div className='container'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'>
              <h2 className='text-2xl font-bold mb-4'>Đăng ký dịch vụ: {service?.serviceName}</h2>
              <p className='opacity-90'>Vui lòng điền đầy đủ thông tin để đăng ký lịch hẹn</p>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Họ và tên</label>
                <input
                  type='text'
                  name='requesterName'
                  value={formData.requesterName}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
                <input
                  type='text'
                  name='requesterPhone'
                  value={formData.requesterPhone}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày hẹn</label>
                <input
                  type='date'
                  name='appointmentDate'
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Loại mẫu</label>
                <select
                  name='sampleType'
                  value={formData.sampleType}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  required
                >
                  <option value=''>Chọn loại mẫu</option>
                  <option value='saliva'>Nước bọt</option>
                  <option value='blood'>Máu</option>
                  <option value='hair'>Tóc</option>
                  <option value='nail'>Móng tay</option>
                </select>
              </div>

              <div className='mt-4 flex justify-between'>
                <button type='button' onClick={() => navigate('/')} className='px-4 py-2 bg-gray-300 rounded-md'>
                  Quay lại
                </button>
                <button type='submit' className='px-4 py-2 bg-teal-600 text-white rounded-md'>
                  Gửi đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
