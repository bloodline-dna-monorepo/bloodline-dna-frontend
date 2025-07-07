'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { SampleInfo, TestProcess } from '../../utils/types'
import DashboardSidebar from '../../components/Common/Sidebar'

const TestTracking: React.FC = () => {
  const [testRequests, setTestRequests] = useState<TestProcess[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTest, setSelectedTest] = useState<TestProcess | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAtHome, setIsAtHome] = useState(true)

  useEffect(() => {
    fetchTestRequests()
  }, [])

  const fetchTestRequests = async () => {
    try {
      setLoading(true)
      const requests = await testRequestService.getUserTestRequests()
      setTestRequests(requests)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách xét nghiệm:', error)
      setTestRequests([])
    } finally {
      setLoading(false)
    }
  }

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'Input Infor':
        return 0
      case 'Pending':
        return 25
      case 'Confirmed':
        return 50
      case 'In Progress':
        return 75
      case 'Completed':
        return 100
      default:
        return 0
    }
  }

  const handleViewDetails = (test: TestProcess, atHome: boolean) => {
    setSelectedTest(test)
    setIsAtHome(atHome)
    setIsDetailModalOpen(true)
  }

  if (loading) {
    return <div className='flex justify-center items-center h-64'>Đang tải...</div>
  }

  return (
    <div className='flex'>
      <DashboardSidebar />
      <div className='max-w-6xl mx-auto p-6'>
        {isDetailModalOpen && selectedTest && (
          <TestInfoForm
            sampleCount={selectedTest.SampleCount}
            onClose={() => setIsDetailModalOpen(false)}
            request={selectedTest}
            onSubmitted={fetchTestRequests}
          />
        )}

        <h1 className='text-2xl font-bold mb-8'>Theo dõi xét nghiệm</h1>

        <div className='space-y-6'>
          {testRequests.map((request) => (
            <div key={request.TestRequestID} className='bg-white rounded-lg border p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h3 className='font-semibold text-lg'>{request.ServiceName}</h3>
                  <div className='text-sm text-gray-600 mt-1'>
                    Mã kit: {request.KitID} • {request.SampleCount} mẫu
                  </div>
                </div>
                <div className='flex gap-2'>
                  <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm'>
                    {request.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                  </span>
                  <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>{request.Status}</span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                <div>
                  <div className='text-sm text-gray-600'>Ngày đặt:</div>
                  <div className='font-medium'>{request.CreatedAt.slice(0, 10) || ''}</div>
                </div>
                <div>
                  <div className='text-sm text-gray-600'>{request.CollectionMethod === 'Home' ? '' : 'Lịch hẹn:'}</div>
                  <div className='font-medium'>{request.Appointment.slice(0, 10) || ''}</div>
                </div>
                <div>
                  <div className='text-sm text-gray-600'>Địa điểm:</div>
                  <div className='font-medium text-green-600'>
                    {request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Cơ sở'}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-gray-600'>Kỹ thuật viên:</div>
                  <div className='font-medium'>{request.AssignedTo}</div>
                </div>
              </div>

              <div className='mb-4'>
                <div className='text-sm text-gray-600 mb-2'>Tiến độ</div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-teal-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${getProgressPercentage(String(request.Status))}%` }}
                  ></div>
                </div>
                <div className='text-right text-sm text-gray-600 mt-1'>
                  {getProgressPercentage(String(request.Status))}%
                </div>
              </div>

              {request.Status === 'Input Infor' ? (
                <button
                  onClick={() => handleViewDetails(request, request.CollectionMethod === 'Home')}
                  className='px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200'
                >
                  ✍️ Điền thông tin
                </button>
              ) : (
                <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'>
                  👁 Xem chi tiết
                </button>
              )}
            </div>
          ))}

          {testRequests.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-500 mb-4'>Không có yêu cầu xét nghiệm nào</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ✅ Component phụ TestInfoForm nằm ngoài
const TestInfoForm: React.FC<{
  sampleCount: number
  onClose: () => void
  request: TestProcess
  onSubmitted: () => void
}> = ({ sampleCount, onClose, request, onSubmitted }) => {
  const [samples, setSamples] = useState(
    Array.from({ length: sampleCount }, () => ({
      fullName: '',
      birthYear: '',
      gender: '',
      relation: '',
      sampleType: '',
      idNumber: '',
      file: ''
    }))
  )

  const handleChange = (index: number, field: keyof SampleInfo, value: SampleInfo[keyof SampleInfo]) => {
    const updated = [...samples]
    updated[index][field] = value
    setSamples(updated)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      for (let i = 0; i < samples.length; i++) {
        const sample = samples[i]

        // ⚠️ Kiểm tra thiếu trường
        if (
          !sample.fullName.trim() ||
          !sample.birthYear.trim() ||
          !sample.gender.trim() ||
          !sample.sampleType.trim() ||
          !sample.idNumber.trim()
        ) {
          alert(`⚠️ Vui lòng nhập đầy đủ thông tin cho mẫu số ${i + 1}`)
          return
        }

        if (!/^\d{12}$/.test(sample.idNumber)) {
          alert(`⚠️ CMND/CCCD mẫu số ${i + 1} phải đúng 12 chữ số`)
          return
        }

        const formData = new FormData()
        formData.append('TesterName', sample.fullName)
        formData.append('YOB', sample.birthYear)
        formData.append('Gender', sample.gender)
        formData.append('Relationship', sample.relation)
        formData.append('SampleType', sample.sampleType)
        formData.append('CMND', sample.idNumber)
        if (sample.file) {
          formData.append('File', sample.file)
        }

        await testRequestService.createSampleCategory(request.TestRequestID, formData)
      }

      alert('✅ Gửi mẫu thành công!')
      onClose()
      onSubmitted()
    } catch (err) {
      console.error('❌ Lỗi gửi mẫu:', err)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center'>
      <div className='bg-white w-full max-w-4xl rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Điền thông tin xét nghiệm</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-red-600 text-lg font-bold'>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {samples.map((sample, i) => (
            <div key={i} className='mb-6 border p-4 rounded'>
              <h4 className='font-semibold mb-4'>Mẫu {i + 1}</h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input
                  className='border p-2 rounded'
                  placeholder='Họ tên *'
                  value={sample.fullName}
                  onChange={(e) => handleChange(i, 'fullName', e.target.value)}
                  required
                />
                <input
                  className='border p-2 rounded'
                  placeholder='Năm sinh *'
                  value={sample.birthYear}
                  onChange={(e) => handleChange(i, 'birthYear', e.target.value)}
                  required
                />
                <select
                  className='border p-2 rounded'
                  value={sample.gender}
                  onChange={(e) => handleChange(i, 'gender', e.target.value)}
                  required
                >
                  <option value=''>Chọn giới tính *</option>
                  <option value='Male'>Nam</option>
                  <option value='Female'>Nữ</option>
                  <option value='Khác'>Khác</option>
                </select>

                <input
                  className='border p-2 rounded'
                  placeholder='VD: Con, Cha, Mẹ,...'
                  value={sample.relation}
                  onChange={(e) => handleChange(i, 'relation', e.target.value)}
                />
                <select
                  className='border p-2 rounded'
                  value={sample.sampleType}
                  onChange={(e) => handleChange(i, 'sampleType', e.target.value)}
                  required
                >
                  <option value=''>Chọn loại mẫu *</option>
                  <option value='Máu'>Máu</option>
                  <option value='Nước bọt'>Nước bọt</option>
                  <option value='Tóc'>Tóc</option>
                </select>
                <input
                  className='border p-2 rounded'
                  placeholder='CMND/CCCD/Passport *'
                  value={sample.idNumber}
                  onChange={(e) => handleChange(i, 'idNumber', e.target.value)}
                  required
                />

                <input
                  type='file'
                  className='border p-2 rounded'
                  value={sample.file}
                  onChange={(e) => handleChange(i, 'file', e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className='mt-6 flex justify-end gap-2'>
            <button type='button' onClick={onClose} className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'>
              Hủy
            </button>
            <button type='submit' className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'>
              Xác nhận thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TestTracking
