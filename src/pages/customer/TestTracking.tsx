'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { TestProcess } from '../../utils/types'
import Button from '../../components/Common/Button'
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

  const handleViewDetails = (TestRequests: TestProcess, atHome: boolean) => {
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
            <div key={request.TestRequestID} className='bg-white rounded-lg border p-6'>
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
                <button
                  onClick={() => handleViewDetails(request, request.CollectionMethod === 'Home')}
                  className='px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
                >
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

export default TestTracking
