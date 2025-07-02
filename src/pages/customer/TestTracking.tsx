'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { TestRequests } from '../../utils/types'
import Button from '../../components/Common/Button'
import DashboardSidebar from '../../components/Common/Sidebar'

interface TestTrackingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  TestRequests: TestRequests | null
  isAtHome: boolean
}

interface InputInfoModalProps {
  isOpen: boolean
  onClose: () => void
  TestRequests: TestRequests | null
  sampleCount: number
}

const InputInfoModal: React.FC<InputInfoModalProps> = ({ isOpen, onClose, TestRequests, sampleCount }) => {
  const [samples, setSamples] = useState<
    Array<{
      fullName: string
      birthYear: string
      gender: string
      relationship: string
      idType: string
      idNumber: string
      photo: File | null
    }>
  >([])

  useEffect(() => {
    if (isOpen) {
      setSamples(
        Array(sampleCount)
          .fill(null)
          .map(() => ({
            fullName: '',
            birthYear: '',
            gender: '',
            relationship: '',
            idType: '',
            idNumber: '',
            photo: null
          }))
      )
    }
  }, [isOpen, sampleCount])

  const handleFileChange = (index: number, file: File | null) => {
    const newSamples = [...samples]
    newSamples[index].photo = file
    setSamples(newSamples)
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    const newSamples = [...samples]
    ;(newSamples[index] as any)[field] = value
    setSamples(newSamples)
  }

  const handleSubmit = async () => {
    try {
      // API call would go here - need backend endpoint
      console.log('Submit sample info API call needed:', samples)
      alert('Cần tạo API endpoint để lưu thông tin mẫu')
      onClose()
    } catch (error) {
      console.error('Error submitting sample info:', error)
    }
  }

  if (!isOpen) return null

  const isAdministrative = TestRequests?.ServiceType === 'Administrative'
  const title = isAdministrative ? 'Điền thông tin xét nghiệm - Hành chính' : 'Điền thông tin xét nghiệm - Dân sự'

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center gap-3 mb-6'>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            ← Quay lại
          </button>
          <h2 className='text-xl font-semibold'>{title}</h2>
        </div>

        <div className='text-center mb-6'>
          <p className='text-sm text-gray-600'>
            {isAdministrative
              ? 'Vì là 3 mẫu nên có 3 bảng để điền nên phụ thuộc vào thông tin mã tạo'
              : 'Nhập thông tin vào hết mấy chỗ có mũi tên đen này'}
          </p>
        </div>

        {samples.map((sample, index) => (
          <div key={index} className='bg-gray-100 rounded-lg p-4 mb-4'>
            <h3 className='font-medium mb-4'>Thông tin người xét nghiệm</h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Họ tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={sample.fullName}
                  onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Năm sinh <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={sample.birthYear}
                  onChange={(e) => handleInputChange(index, 'birthYear', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Giới tính <span className='text-red-500'>*</span>
                </label>
                <select
                  value={sample.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                >
                  <option value=''>Chọn giới tính</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Mối quan hệ <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={sample.relationship}
                  onChange={(e) => handleInputChange(index, 'relationship', e.target.value)}
                  placeholder='VD: Con, Cha, Mẹ...'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Loại mẫu <span className='text-red-500'>*</span>
                </label>
                <select
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                >
                  <option value=''>Chọn loại mẫu</option>
                  <option value='saliva'>Nước bọt</option>
                  <option value='blood'>Máu</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  CMND/CCCD/Passport <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={sample.idNumber}
                  onChange={(e) => handleInputChange(index, 'idNumber', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Hình ảnh chữ ký <span className='text-red-500'>*</span>
              </label>
              <div className='flex items-center gap-4'>
                <input
                  type='file'
                  onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  accept='image/*'
                  className='hidden'
                  id={`photo-upload-${index}`}
                />
                <label
                  htmlFor={`photo-upload-${index}`}
                  className='cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'
                >
                  Chọn File
                </label>
                <span className='text-sm text-gray-600'>
                  {sample.photo ? sample.photo.name : 'Không có tập tin nào được chọn'}
                </span>
              </div>
            </div>

           
          </div>
        ))}

        <Button onClick={handleSubmit} className='w-full bg-teal-600 text-white hover:bg-teal-700'>
          Xác nhận thông tin
        </Button>
      </div>
    </div>
  )
}

const TestTrackingDetailModal: React.FC<TestTrackingDetailModalProps> = ({
  isOpen,
  onClose,
  TestRequests,
  isAtHome
}) => {
  const [showInputModal, setShowInputModal] = useState(false)
  const [sampleCount, setSampleCount] = useState(2)

  if (!isOpen || !TestRequests) return null

  const handleInputInfo = (samples: number) => {
    setSampleCount(samples)
    setShowInputModal(true)
  }

  const steps = isAtHome
    ? [
        { id: 1, title: 'Đã hàng thành công', subtitle: 'Đơn hàng đã được xác nhận và hoàn toàn', status: 'completed' },
        { id: 2, title: 'Gửi kit xét nghiệm', subtitle: 'Kit đã được gửi đến địa chỉ của bạn', status: 'completed' },
        { id: 3, title: 'Thu thập mẫu tại nhà', subtitle: 'Nhân viên sẽ thu thập mẫu tại nhà', status: 'completed' },
        { id: 4, title: 'Đã nhận lại mẫu', subtitle: 'Mẫu đã được nhận và kiểm tra', status: 'in-progress' },
        { id: 5, title: 'Xử lý phân tích', subtitle: 'Đang tiến hành phân tích mẫu', status: 'pending' },
        {
          id: 6,
          title: 'Hoàn thành và gửi kết quả',
          subtitle: 'Kết quả sẽ được gửi qua email và SMS',
          status: 'pending'
        }
      ]
    : [
        { id: 1, title: 'Đã hàng thành công', subtitle: 'Đơn hàng đã được xác nhận và hoàn toàn', status: 'completed' },
        { id: 2, title: 'Lấy mẫu tại cơ sở', subtitle: 'Đã lấy mẫu tại trung tâm FPTU', status: 'completed' },
        { id: 3, title: 'Xử lý mẫu', subtitle: 'Đang tiến hành xử lý phân tích', status: 'in-progress' },
        { id: 4, title: 'Hoàn thành', subtitle: 'Kết quả sẽ sẵn sàng', status: 'pending' }
      ]

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold'>Chi tiết tiến độ xét nghiệm</h2>
            <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
              ✕
            </button>
          </div>

          <p className='text-gray-600 mb-6'>Theo dõi từng bước của quá trình xét nghiệm</p>

          <div className='flex justify-between items-center mb-6'>
            <div className='text-center'>
              <div className='text-sm text-gray-600'>Mã kit</div>
              <div className='font-semibold'>{TestRequests.KitID || 'KIT001'}</div>
              <div className='w-8 h-8 bg-gray-200 rounded mx-auto mt-2'>🏠</div>
              <div className='text-xs mt-1'>{isAtHome ? 'Xét nghiệm ADN cha con' : 'Xét nghiệm huyết thống'}</div>
            </div>

            <div className='text-center'>
              <div className='text-sm text-gray-600'>Địa điểm</div>
              <div className='font-semibold'>{isAtHome ? 'Tại nhà' : 'Cơ sở'}</div>
              <div className='w-8 h-8 bg-gray-200 rounded mx-auto mt-2'>🏠</div>
            </div>

            <div className='text-center'>
              <div className='text-sm text-gray-600'>Liên hệ</div>
              <div className='font-semibold'>{isAtHome ? '' : '18/1/2024'}</div>
              <div className='w-8 h-8 bg-gray-200 rounded mx-auto mt-2'>🏠</div>
            </div>
          </div>

          <div className='mb-6'>
            <div className='text-sm text-gray-600 mb-2'>Tiến độ</div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div className='bg-teal-600 h-2 rounded-full' style={{ width: '75%' }}></div>
            </div>
            <div className='text-right text-sm text-gray-600 mt-1'>75%</div>
          </div>

          <div className='space-y-4'>
            {steps.map((step, index) => (
              <div key={step.id} className='flex items-center gap-4 p-4 rounded-lg border'>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                    step.status === 'completed'
                      ? 'bg-green-500'
                      : step.status === 'in-progress'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                  }`}
                >
                  {step.status === 'completed' ? '✓' : step.status === 'in-progress' ? '⏳' : '⚠'}
                </div>

                <div className='flex-1'>
                  <div className='font-medium'>{step.title}</div>
                  <div className='text-sm text-gray-600'>{step.subtitle}</div>

                  
                </div>

                <div className='flex gap-2'>
                  {step.status === 'completed' && (
                    <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>Hoàn thành</span>
                  )}
                  {step.status === 'in-progress' && (
                    <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>Đang thực hiện</span>
                  )}
                  {step.id === 2 && step.status === 'completed' && (
                    <button
                      onClick={() => handleInputInfo(isAtHome ? 3 : 2)}
                      className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200'
                    >
                      Điền thông tin
                    </button>
                  )}
                  {step.id === 6 && step.status === 'pending' && (
                    <button className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>Chờ xử lý</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
      
            <div className='font-semibold mb-2'>Thông tin liên hệ</div>
            <div className='flex items-center gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                📞 <span>Hotline: 0123456789</span>
              </div>
              <div className='flex items-center gap-2'>
                ✉️ <span>Email: info@genunity.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InputInfoModal
        isOpen={showInputModal}
        onClose={() => setShowInputModal(false)}
        TestRequests={TestRequests}
        sampleCount={sampleCount}
      />
    </>
  )
}

const TestTracking: React.FC = () => {
  const [testRequests, setTestRequests] = useState<TestRequests[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTest, setSelectedTest] = useState<TestRequests | null>(null)
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
      console.error('Error fetching test requests:', error)
      // Show mock data if API fails
      setTestRequests([
        {
          id: '1',
          serviceId: 'service1',
          userId: 'user1',
          status: 'in_progress',
          kitId: 'KIT001',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15',
          serviceName: 'Xét nghiệm ADN cha con',
          serviceType: 'civil',
          location: 'at_home',
          appointmentDate: '2024-01-10',
          technician: 'BS. Nguyễn Văn A'
        },
        {
          id: '2',
          serviceId: 'service2',
          userId: 'user1',
          status: 'completed',
          kitId: 'KIT002',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-18',
          serviceName: 'Xét nghiệm ADN cha con',
          serviceType: 'administrative',
          location: 'facility',
          appointmentDate: '2024-01-10',
          technician: 'BS. Nguyễn Văn A'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (TestRequests: TestRequests, atHome: boolean) => {
    setSelectedTest(TestRequests)
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
        <h1 className='text-2xl font-bold mb-8'>Theo dõi xét nghiệm</h1>

        <div className='space-y-6'>
          {testRequests.map((request) => (
            <div key={request.RequestID} className='bg-white rounded-lg border p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h3 className='font-semibold text-lg'>{request.ServiceName}</h3>
                  <div className='text-sm text-gray-600 mt-1'>
                    Mã kit: {request.KitID} • Loại {request.ServiceType === 'Civil' ? 'Dân Sự' : 'Hành Chính'} •
                    {request.ServiceType === 'Civil' ? '2 mẫu' : '3 mẫu'}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm'>
                    {request.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                  </span>
                  <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>
                    {request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Cơ sở'}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                <div>
                  <div className='text-sm text-gray-600'>Ngày đặt:</div>
                  <div className='font-medium'>{request.CreatedAt}</div>
                </div>
                <div>
                  <div className='text-sm text-gray-600'>
                    {request.CollectionMethod === 'Home' ? 'Lịch hẹn:' : 'Ngày hoàn thành:'}
                  </div>
                  <div className='font-medium'>{request.Appointment}</div>
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
                    className='bg-teal-600 h-2 rounded-full'
                    style={{ width: request.Status === 'Completed' ? '100%' : '75%' }}
                  ></div>
                </div>
                <div className='text-right text-sm text-gray-600 mt-1'>
                  {request.Status === 'Completed' ? '100%' : '75%'}
                </div>
              </div>

              <div className='flex justify-between items-center'>
                
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleViewDetails(request, request.CollectionMethod === 'Home')}
                    className='px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
                  >
                    👁 Xem chi tiết
                  </button>
                 
                </div>
              </div>

             
            </div>
          ))}

          {testRequests.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-500 mb-4'>Không có yêu cầu xét nghiệm nào</div>
            </div>
          )}
        </div>

        <TestTrackingDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          TestRequests={selectedTest}
          isAtHome={isAtHome}
        />
      </div>
    </div>
  )
}

export default TestTracking
