'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { SampleInfo, TestProcess } from '../../utils/types'
import DashboardSidebar from '../../components/Common/Sidebar'

const TestTracking: React.FC = () => {
  const [testRequests, setTestRequests] = useState<TestProcess[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTest, setSelectedTest] = useState<TestProcess | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  useEffect(() => {
    fetchTestRequests()
  }, [])

  const fetchTestRequests = async () => {
    try {
      setLoading(true)
      const requests = await testRequestService.getUserTestRequests()
      console.log(requests)

      setTestRequests(requests)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách xét nghiệm:', error)
      setTestRequests([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (test: TestProcess) => {
    setSelectedTest(test)
    if (test.Status === 'Input Infor') {
      setIsDetailModalOpen(true)
    } else {
      setIsProgressModalOpen(true)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Input Infor':
        return 'bg-orange-100 text-orange-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'In Progress':
        return 'bg-purple-100 text-purple-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
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

  if (loading) {
    return (
      <div className='flex'>
        <DashboardSidebar />
        <div className='flex-1 flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 p-6'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold mb-2'>Theo dõi xét nghiệm</h1>
          <p className='text-gray-600 mb-8'>Xem chi tiết tiến độ và trạng thái các xét nghiệm của bạn</p>

          <div className='bg-white rounded-lg p-6 mb-6'>
            <h2 className='text-lg font-semibold mb-2'>Danh sách kết quả xét nghiệm</h2>
            <p className='text-gray-600 mb-6'>Xem chi tiết tiến độ và trạng thái các xét nghiệm của bạn</p>

            <div className='space-y-4'>
              {testRequests.map((request) => (
                <div key={request.TestRequestID} className='border rounded-lg p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>🧬</div>
                      <div>
                        <h3 className='font-semibold text-lg'>{request.ServiceName}</h3>
                        <div className='text-sm text-gray-600'>
                          Mã kit: {request.KitID || ''} 🔸 {request.SampleCount} mẫu
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>
                        {request.ServiceType === 'Civil' ? 'Loại Dân Sự' : 'Loại Hành Chính'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(request.Status)}`}>
                        {request.Status === 'Input Infor'
                          ? 'Cần thông tin'
                          : request.Status === 'Pending'
                            ? 'Đang chờ'
                            : request.Status === 'Confirmed'
                              ? 'Đã xác nhận'
                              : request.Status === 'In Progress'
                                ? 'Đang thực hiện'
                                : request.Status === 'Completed'
                                  ? 'Hoàn thành'
                                  : request.Status}
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                    <div>
                      <div className='text-sm text-gray-600'>Ngày đặt:</div>
                      <div className='font-medium'>{new Date(request.CreatedAt).toLocaleDateString('vi-VN')}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-600'>
                        {request.CollectionMethod === 'Home' ? '' : 'Lịch hẹn:'}
                      </div>
                      <div className='font-medium'>
                        {request.Appointment ? new Date(request.Appointment).toLocaleDateString('vi-VN') : ''}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-600'>Địa điểm:</div>
                      <div className='font-medium'>{request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Cơ sở'}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-600'>Kỹ thuật viên:</div>
                      <div className='font-medium'>{request.AssignedTo || 'Chưa phân công'}</div>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <div className='flex justify-between items-center mb-2'>
                      <div className='text-sm text-gray-600'>Tiến độ</div>
                      <div className='text-sm text-gray-600'>{getProgressPercentage(request.Status)}%</div>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-teal-600 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${getProgressPercentage(request.Status)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={() => handleViewDetails(request)}
                      className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors'
                    >
                      {request.Status === 'Input Infor' ? (
                        <>
                          <span>✏️</span>
                          Điền thông tin
                        </>
                      ) : (
                        <>
                          <span>👁</span>
                          Xem chi tiết
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {testRequests.length === 0 && (
                <div className='text-center py-12'>
                  <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    📋
                  </div>
                  <div className='text-gray-500 mb-2'>Không có yêu cầu xét nghiệm nào</div>
                  <div className='text-sm text-gray-400'>Các yêu cầu xét nghiệm của bạn sẽ hiển thị tại đây</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal điền thông tin */}
        {isDetailModalOpen && selectedTest && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <div className='flex items-center gap-2 text-sm text-gray-600 mb-2'>
                      <span>←</span>
                      <span>Quay lại</span>
                    </div>
                    <h2 className='text-xl font-bold'>
                      Điền thông tin xét nghiệm - {selectedTest.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className='text-gray-500 hover:text-gray-700 text-xl'
                  >
                    ×
                  </button>
                </div>
                <TestInfoForm
                  sampleCount={selectedTest.SampleCount}
                  onClose={() => setIsDetailModalOpen(false)}
                  request={selectedTest}
                  onSubmitted={fetchTestRequests}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal xem chi tiết tiến độ */}
        {isProgressModalOpen && selectedTest && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-bold'>Chi tiết tiến độ xét nghiệm</h2>
                  <button
                    onClick={() => setIsProgressModalOpen(false)}
                    className='text-gray-500 hover:text-gray-700 text-xl'
                  >
                    ×
                  </button>
                </div>
                <TestProgressTracker request={selectedTest} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component điền thông tin mẫu
const TestInfoForm: React.FC<{
  sampleCount: number
  onClose: () => void
  request: TestProcess
  onSubmitted: () => void
}> = ({ sampleCount, onClose, request, onSubmitted }) => {
  const [samples, setSamples] = useState<SampleInfo[]>(
    Array.from({ length: sampleCount }, () => ({
      fullName: '',
      birthYear: '',
      gender: '',
      relation: '',
      sampleType: '',
      idNumber: '',
      file: null // ✅ Đúng kiểu: File | null
    }))
  )

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) {
      const updated = [...samples]
      updated[index].file = null
      setSamples(updated)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string // dạng: "data:image/png;base64,..."
      const updated = [...samples]
      updated[index].file = base64
      setSamples(updated)
    }

    reader.readAsDataURL(file) // đọc file dưới dạng base64
  }

  const handleChange = (index: number, field: keyof SampleInfo, value: SampleInfo[keyof SampleInfo]) => {
    const updated = [...samples]
    updated[index] = { ...updated[index], [field]: value } // ✅ Cập nhật 1 trường duy nhất
    setSamples(updated)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      for (let i = 0; i < samples.length; i++) {
        const sample = samples[i]

        if (!sample.fullName || !sample.birthYear || !sample.gender || !sample.sampleType || !sample.idNumber) {
          alert(`⚠️ Vui lòng nhập đầy đủ thông tin cho mẫu số ${i + 1}`)
          return
        }

        if (!/^\d{12}$/.test(sample.idNumber)) {
          alert(`⚠️ CMND/CCCD mẫu số ${i + 1} phải đúng 12 chữ số`)
          return
        }

        if (request.ServiceType !== 'Civil' && !sample.file) {
          alert(`⚠️ Mẫu số ${i + 1} cần phải có file đính kèm đối với dịch vụ hành chính.`)
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
    <div>
      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>Thông tin người xét nghiệm</h3>
      </div>

      <form onSubmit={handleSubmit}>
        {samples.map((sample, i) => (
          <div key={i} className='mb-6 p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-semibold mb-4'>Mẫu {i + 1}</h4>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Họ tên <span className='text-red-500'>*</span>
                </label>
                <input
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Nhập họ tên'
                  value={sample.fullName}
                  onChange={(e) => handleChange(i, 'fullName', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Nhập năm sinh'
                  value={sample.birthYear}
                  onChange={(e) => handleChange(i, 'birthYear', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Giới tính <span className='text-red-500'>*</span>
                </label>
                <select
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  value={sample.gender}
                  onChange={(e) => handleChange(i, 'gender', e.target.value)}
                  required
                >
                  <option value=''>Chọn giới tính</option>
                  <option value='Male'>Nam</option>
                  <option value='Female'>Nữ</option>
                  <option value='Other'>Khác</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Mối quan hệ <span className='text-red-500'>*</span>
                </label>
                <input
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='VD: Con, Cha, Mẹ...'
                  value={sample.relation}
                  onChange={(e) => handleChange(i, 'relation', e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Loại mẫu <span className='text-red-500'>*</span>
                </label>
                <select
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  value={sample.sampleType}
                  onChange={(e) => handleChange(i, 'sampleType', e.target.value)}
                  required
                >
                  <option value=''>Chọn loại mẫu</option>
                  <option value='Máu'>Máu</option>
                  <option value='Nước Bọt'>Nước bọt</option>
                  <option value='Tóc'>Tóc</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  CMND/CCCD/Passport <span className='text-red-500'>*</span>
                </label>
                <input
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Nhập số CMND/CCCD'
                  value={sample.idNumber}
                  onChange={(e) => handleChange(i, 'idNumber', e.target.value)}
                  required
                />
              </div>

              {request.ServiceType !== 'Civil' && (
                <div className='md:col-span-3'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Hình ảnh chữ ký <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    className='border p-2 rounded'
                    onChange={(e) => handleFileChange(i, e.target.files?.[0] || null)}
                  />
                  <p className='text-sm text-gray-500 mt-1'>Không có tập tin nào được chọn</p>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className='mt-6 flex justify-center'>
          <button
            type='submit'
            className='w-full max-w-md bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition-colors font-medium'
          >
            Xác nhận thông tin
          </button>
        </div>
      </form>
    </div>
  )
}

// Component theo dõi tiến độ
const TestProgressTracker: React.FC<{
  request: TestProcess
}> = ({ request }) => {
  const stepDefs = ['Input Infor', 'Pending', 'Confirmed', 'In Progress', 'Completed']

  const currentIndex = stepDefs.indexOf(request.Status)

  const progressSteps = stepDefs.map((step, index) => ({
    id: step.toLowerCase().replace(/\s+/g, '_'),
    title:
      step === 'Input Infor'
        ? 'Điền thông tin'
        : step === 'Pending'
          ? 'Đang chờ xác nhận'
          : step === 'Confirmed'
            ? 'Đã xác nhận'
            : step === 'In Progress'
              ? 'Đang thực hiện'
              : 'Hoàn thành',
    description: '', // bạn có thể thêm mô tả tuỳ ý
    status: index < currentIndex ? 'completed' : index === currentIndex ? 'in_progress' : 'pending',
    date: '' // bạn có thể thêm nếu muốn
  }))

  const getProgressPercentage = () => {
    const completedSteps = progressSteps.filter((step) => step.status === 'completed').length
    return Math.round((completedSteps / progressSteps.length) * 100)
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='font-semibold'>{request.ServiceName}</h3>
          <p className='text-sm text-gray-600'>Mã kit: {request.KitID || ''}</p>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-600'>Địa điểm</p>
          <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm'>
            {request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Cơ sở'}
          </span>
        </div>
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium'>Tiến độ tổng thể</span>
          <span className='text-sm text-gray-600'>{getProgressPercentage()}%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-teal-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className='space-y-4'>
        {progressSteps.map((step, index) => (
          <div key={step.id} className='flex items-start gap-4'>
            <div className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : step.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.status === 'completed' ? '✓' : step.status === 'in_progress' ? '⏳' : '○'}
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`w-0.5 h-8 ${step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'}`}></div>
              )}
            </div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <div>
                  <h4 className='font-medium'>{step.title}</h4>
                  <p className='text-sm text-gray-600'>{step.description}</p>
                </div>
                <div className='text-right'>
                  {step.status === 'completed' && (
                    <span className='text-xs text-green-600 bg-green-50 px-2 py-1 rounded'>Hoàn thành</span>
                  )}
                  {step.status === 'in_progress' && (
                    <span className='text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded'>Đang thực hiện</span>
                  )}
                  {step.date && <p className='text-xs text-gray-500 mt-1'>{step.date}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
        <h4 className='font-medium mb-2'>Thông tin liên hệ</h4>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-sm'>
            <span>📞</span>
            <span>Hotline: 0123456789</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span>✉️</span>
            <span>Email: info@genunity.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestTracking
