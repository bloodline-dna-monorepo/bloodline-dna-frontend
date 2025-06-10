'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ServiceData {
  name: string
  description: string
  pricing: {
    time: string
    twoSamples: string
    additionalSample: string
  }[]
}

const legalServices: ServiceData[] = [
  {
    name: 'Xét nghiệm ADN Cha – Con',
    description: 'Phân tích từ 24–33 loci với độ chính xác cao.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Mẹ – Con',
    description: 'Phân tích từ 24–33 loci với độ chính xác cao.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Họ hàng dòng cha',
    description: 'Phân tích 23 loci trên nhiễm sắc thể Y và 12 loci trên NST X, độ chính xác cao.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.000.000 đ', additionalSample: '1.000.000 đ' },
      { time: '24 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '4 giờ', twoSamples: '3.500.000 đ', additionalSample: '1.750.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)',
    description: 'Phân tích ADN ty thể, độ chính xác cao.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  }
]

const civilServices: ServiceData[] = [
  {
    name: 'Xét nghiệm ADN Cha – Con',
    description: 'Phân tích từ 24–33 loci với độ chính xác 99,999999%.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Mẹ – Con',
    description: 'Phân tích từ 24–33 loci với độ chính xác 99,999999%.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Họ hàng dòng cha',
    description: 'Phân tích 23 loci trên nhiễm sắc thể Y và 12 loci trên NST X, độ chính xác 99,9999%.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.000.000 đ', additionalSample: '1.000.000 đ' },
      { time: '24 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '4 giờ', twoSamples: '3.500.000 đ', additionalSample: '1.750.000 đ' }
    ]
  },
  {
    name: 'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)',
    description: 'Phân tích ADN ty thể, độ chính xác 99,9999%.',
    pricing: [
      { time: '48 giờ', twoSamples: '2.500.000 đ', additionalSample: '1.250.000 đ' },
      { time: '24 giờ', twoSamples: '3.000.000 đ', additionalSample: '1.500.000 đ' },
      { time: '4 giờ', twoSamples: '4.000.000 đ', additionalSample: '2.000.000 đ' }
    ]
  }
]

const ServiceTable = ({
  services,
  serviceType,
  onRegisterClick
}: {
  services: ServiceData[]
  serviceType: 'legal' | 'civil'
  onRegisterClick: (type: 'legal' | 'civil', serviceName: string, timing: string, packageType: string) => void
}) => {
  return (
    <div className='space-y-8'>
      {services.map((service, index) => (
        <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-4'>
            <h3 className='text-xl font-semibold'>{service.name}</h3>
            <p className='opacity-90'>{service.description}</p>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Thời gian trả kết quả
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Chi phí 2 mẫu
                  </th>
                  <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Chi phí mẫu thứ 3
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {service.pricing.map((price, priceIndex) => (
                  <tr key={priceIndex} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{price.time}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <div className='flex flex-col items-center space-y-2'>
                        <span className='text-sm text-gray-900 font-medium'>{price.twoSamples}</span>
                        <button
                          onClick={() => onRegisterClick(serviceType, service.name, price.time, '2-samples')}
                          className='inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-xs font-medium rounded-md hover:from-[var(--primary-dark)] hover:to-[var(--secondary-dark)] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                        >
                          <svg className='w-3 h-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                          </svg>
                          Đăng ký
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <div className='flex flex-col items-center space-y-2'>
                        <span className='text-sm text-gray-900 font-medium'>{price.additionalSample}</span>
                        <button
                          onClick={() => onRegisterClick(serviceType, service.name, price.time, '3-samples')}
                          className='inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-xs font-medium rounded-md hover:from-[var(--primary-dark)] hover:to-[var(--secondary-dark)] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                        >
                          <svg className='w-3 h-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                          </svg>
                          Đăng ký
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

const RegistrationForm = ({
  serviceType,
  selectedService,
  selectedTiming,
  selectedPackage,
  onBack
}: {
  serviceType: 'legal' | 'civil'
  selectedService: string
  selectedTiming: string
  selectedPackage: string
  onBack: () => void
}) => {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    sampleLocation: serviceType === 'legal' ? 'center' : 'home',
    selectedService: '',
    fullName: '',
    birthDate: '',
    gender: '',
    idNumber: '',
    phoneNumber: '',
    agreeToTerms: false,
    requesterSignature: null as File | null
  })

  // Khởi tạo số lượng người xét nghiệm dựa trên gói đã chọn
  const numberOfSubjects = selectedPackage === '2-samples' ? 2 : 3
  const [testSubjects, setTestSubjects] = useState(
    Array.from({ length: numberOfSubjects }, () => ({
      fullName: '',
      birthYear: '',
      gender: '',
      relationship: '',
      sampleType: ''
    }))
  )

  // Cập nhật selectedService khi prop thay đổi
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedService: selectedService
    }))
  }, [selectedService])

  const services =
    serviceType === 'legal'
      ? [
        'Xét nghiệm ADN Cha – Con (2 mẫu)',
        'Xét nghiệm ADN Cha – Con (3 mẫu)',
        'Xét nghiệm ADN Mẹ – Con (2 mẫu)',
        'Xét nghiệm ADN Mẹ – Con (3 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng cha (2 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng cha (3 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể) (2 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể) (3 mẫu)'
      ]
      : [
        'Xét nghiệm ADN Cha – Con (2 mẫu)',
        'Xét nghiệm ADN Cha – Con (3 mẫu)',
        'Xét nghiệm ADN Mẹ – Con (2 mẫu)',
        'Xét nghiệm ADN Mẹ – Con (3 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng cha (2 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng cha (3 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể) (2 mẫu)',
        'Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể) (3 mẫu)'
      ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubjectChange = (index: number, field: string, value: any) => {
    setTestSubjects((prev) => prev.map((subject, i) => (i === index ? { ...subject, [field]: value } : subject)))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    handleInputChange(field, file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      alert('Vui lòng đồng ý với các điều khoản và cam kết')
      return
    }

    // Validate required fields
    const requiredFields = [
      'appointmentDate',
      'selectedService',
      'fullName',
      'birthDate',
      'gender',
      'idNumber',
      'phoneNumber'
    ]

    // Add appointmentTime to required fields only if sampleLocation is 'home'
    if (formData.sampleLocation === 'home') {
      requiredFields.push('appointmentTime')
    }

    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    // Validate test subjects
    for (let i = 0; i < testSubjects.length; i++) {
      const subject = testSubjects[i]
      if (!subject.fullName || !subject.birthYear || !subject.gender || !subject.relationship || !subject.sampleType) {
        alert(`Vui lòng điền đầy đủ thông tin cho người xét nghiệm ${i + 1}`)
        return
      }
    }

    // Submit form
    console.log('Form submitted:', { formData, testSubjects })
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
    onBack()
  }

  // Generate time options from 6 AM to 7 PM
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 6; hour <= 19; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`
      options.push(timeString)
      if (hour < 19) {
        const halfHourString = `${hour.toString().padStart(2, '0')}:30`
        options.push(halfHourString)
      }
    }
    return options
  }

  return (
    <div className='pt-24 pb-16'>
      <div className='container'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'>
              <button onClick={onBack} className='text-white opacity-80 hover:opacity-100 mb-4'>
                ← Quay lại
              </button>
              <h2 className='text-2xl font-bold'>
                Đăng ký lịch xét nghiệm - {serviceType === 'legal' ? 'Hành chính pháp lý' : 'Dân sự tự nguyện'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              {/* Appointment Details */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Ngày đăng ký <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    value={formData.appointmentDate}
                    onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                    required
                  />
                </div>
                {formData.sampleLocation === 'home' && serviceType === 'civil' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Giờ đăng ký <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={formData.appointmentTime}
                      onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required={formData.sampleLocation === 'home'}
                    >
                      <option value=''>Chọn giờ</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Sample Location */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Hình thức lấy mẫu <span className='text-red-500'>*</span>
                </label>
                <div className='flex space-x-4'>
                  {serviceType === 'civil' && (
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='sampleLocation'
                        value='home'
                        checked={formData.sampleLocation === 'home'}
                        onChange={(e) => handleInputChange('sampleLocation', e.target.value)}
                        className='mr-2 text-[var(--primary)]'
                      />
                      <span>Tại nhà</span>
                    </label>
                  )}
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='sampleLocation'
                      value='center'
                      checked={formData.sampleLocation === 'center'}
                      onChange={(e) => handleInputChange('sampleLocation', e.target.value)}
                      className='mr-2 text-[var(--primary)]'
                    />
                    <span>Tại trung tâm</span>
                  </label>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Chọn dịch vụ <span className='text-red-500'>*</span>
                </label>
                <select
                  value={formData.selectedService}
                  onChange={(e) => handleInputChange('selectedService', e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                  required
                >
                  <option value=''>Chọn dịch vụ</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className='border-t pt-6'>
                <h3 className='text-lg font-semibold mb-4'>Thông tin người yêu cầu</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Họ tên <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Ngày tháng năm sinh <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='date'
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Giới tính <span className='text-red-500'>*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required
                    >
                      <option value=''>Chọn giới tính</option>
                      <option value='Nam'>Nam</option>
                      <option value='Nữ'>Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      CMND/CCCD/Passport <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Số điện thoại <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='tel'
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                      required
                    />
                  </div>
                </div>

                {/* Requester Signature Upload */}
                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Chữ ký/Vân tay người yêu cầu <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleFileUpload('requesterSignature', e.target.files?.[0] || null)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                    required
                  />
                </div>
              </div>

              {/* Test Subjects */}
              <div className='border-t pt-6'>
                <h3 className='text-lg font-semibold mb-4'>Thông tin người xét nghiệm</h3>

                {testSubjects.map((subject, index) => (
                  <div key={index} className='border rounded-lg p-4 mb-4 bg-gray-50'>
                    <div className='mb-4'>
                      <h4 className='font-medium'>Người xét nghiệm {index + 1}</h4>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Họ tên <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          value={subject.fullName}
                          onChange={(e) => handleSubjectChange(index, 'fullName', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                          required
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Năm sinh <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          min='1900'
                          max={new Date().getFullYear()}
                          value={subject.birthYear}
                          onChange={(e) => handleSubjectChange(index, 'birthYear', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                          required
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Giới tính <span className='text-red-500'>*</span>
                        </label>
                        <select
                          value={subject.gender}
                          onChange={(e) => handleSubjectChange(index, 'gender', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                          required
                        >
                          <option value=''>Chọn</option>
                          <option value='Nam'>Nam</option>
                          <option value='Nữ'>Nữ</option>
                        </select>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Mối quan hệ <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          value={subject.relationship}
                          onChange={(e) => handleSubjectChange(index, 'relationship', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                          placeholder='VD: Con, Cha, Mẹ...'
                          required
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Loại mẫu <span className='text-red-500'>*</span>
                        </label>
                        <select
                          value={subject.sampleType}
                          onChange={(e) => handleSubjectChange(index, 'sampleType', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                          required
                        >
                          <option value=''>Chọn loại mẫu</option>
                          <option value='Tóc'>Tóc</option>
                          <option value='Móng'>Móng</option>
                          <option value='Nước bọt'>Nước bọt</option>
                          <option value='Máu'>Máu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Commitment */}
              <div className='border-t pt-6'>
                <h3 className='text-lg font-semibold mb-4'>Tôi xin cam kết:</h3>
                <ol className='list-decimal list-inside space-y-2 text-sm text-gray-700 mb-4'>
                  <li>Tôi tự nguyện đề nghị xét nghiệm ADN và chấp nhận chi phí xét nghiệm.</li>
                  <li>Những thông tin tôi đã khai trên đây là đúng sự thật và không thay đổi.</li>
                  <li>Tôi không đề nghị nhà, người quen đến phiên nhiều, làm mất trật tự.</li>
                  <li>
                    Những trường hợp sinh đôi, người ghép tủy, nhận mẫu, nếu không khai báo trung thực sẽ bị phạt gấp 2
                    lần lệ phí đã nộp.
                  </li>
                  <li>
                    Tôi đã đọc và chấp nhận các{' '}
                    <Link to='/terms' target='_blank' className='text-[var(--primary)] hover:underline'>
                      điều khoản của trung tâm GenUnity
                    </Link>{' '}
                    và tôi đồng ý để Viện thực hiện các phân tích với các mẫu trên. Nếu vi phạm, tôi xin chịu hoàn toàn
                    trách nhiệm trước pháp luật.
                  </li>
                </ol>

                <div className='flex items-start'>
                  <input
                    type='checkbox'
                    id='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className='mt-1 mr-3 text-[var(--primary)]'
                    required
                  />
                  <label htmlFor='agreeToTerms' className='text-sm text-gray-700'>
                    <span className='text-red-500'>*</span> Tôi đồng ý với các điều khoản và cam kết nêu trên
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-6'>
                <button type='submit' className='w-full btn btn-primary'>
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

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'legal' | 'civil'>('legal')
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState<'legal' | 'civil'>('legal')
  const [selectedService, setSelectedService] = useState('')
  const [selectedTiming, setSelectedTiming] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')

  const handleTabClick = (tab: 'legal' | 'civil') => {
    setActiveTab(tab)
  }

  const handleRegisterClick = (
    type: 'legal' | 'civil',
    serviceName?: string,
    timing?: string,
    packageType?: string
  ) => {
    setSelectedServiceType(type)
    const serviceWithPackage = serviceName + (packageType === '2-samples' ? ' (2 mẫu)' : ' (3 mẫu)')
    setSelectedService(serviceWithPackage || '')
    setSelectedTiming(timing || '')
    setSelectedPackage(packageType || '')
    setShowRegistrationForm(true)
  }

  return (
    <div className='container mx-auto py-8'>
      {!showRegistrationForm ? (
        <>
          <h1 className='text-3xl font-semibold mb-4 text-center'>Dịch vụ Giám định ADN</h1>

          {/* Tabs */}
          <div className='flex justify-center mb-8'>
            <button
              className={`px-6 py-2 rounded-l-md ${activeTab === 'legal'
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              onClick={() => handleTabClick('legal')}
            >
              Hành chính pháp lý
            </button>
            <button
              className={`px-6 py-2 rounded-r-md ${activeTab === 'civil'
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              onClick={() => handleTabClick('civil')}
            >
              Dân sự tự nguyện
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'legal' && (
            <div>
              <ServiceTable services={legalServices} serviceType='legal' onRegisterClick={handleRegisterClick} />
            </div>
          )}

          {activeTab === 'civil' && (
            <div>
              <ServiceTable services={civilServices} serviceType='civil' onRegisterClick={handleRegisterClick} />
            </div>
          )}
        </>
      ) : (
        <RegistrationForm
          serviceType={selectedServiceType}
          selectedService={selectedService}
          selectedTiming={selectedTiming}
          selectedPackage={selectedPackage}
          onBack={() => setShowRegistrationForm(false)}
        />
      )}
    </div>
  )
}

export default ServicesPage
