'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { EyeIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../../components/Common/Sidebar'
import { type TestRequestDetail } from '../../utils/types'
import { staffService } from '../../services/staffService'

const ConfirmedRequests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<TestRequestDetail | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [requests, setRequests] = useState<TestRequestDetail[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await staffService.getConfirmedRequests()
        setRequests(data)
      } catch (error) {
        console.error('Error fetching confirmed requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const filteredRequests = requests.filter(
    (request) =>
      request.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.TestRequestID.toString().includes(searchQuery.toLowerCase()) ||
      request.ServiceName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewRequest = async (requestId: number) => {
    try {
      const request = await staffService.getRequestById(requestId)
      setSelectedRequest(request)
      setShowModal(true)
    } catch (error) {
      console.error('Error fetching request details:', error)
    }
  }

  const handleStartProcess = (requestId: number) => {
    const request = requests.find((req) => req.TestRequestID === requestId)
    if (request) {
      if (request.CollectionMethod === 'Facility') {
        navigate(`/staff/test-process-center/${requestId}`)
      } else {
        navigate(`/staff/test-process/${requestId}`)
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedRequest(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return { text: 'Đã xác nhận', color: 'bg-green-100 text-green-800' }
      case 'In Progress':
        return { text: 'Đang đợi kết quả', color: 'bg-blue-100 text-blue-800' }
      case 'Pending':
        return { text: 'Đang xác nhận kết quả', color: 'bg-blue-100 text-blue-800' }
      case 'Verified':
        return { text: 'Kết quả được duyệt', color: 'bg-purple-100 text-purple-800' }
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' }
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <div className='flex-1 p-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mb-8'></div>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
              <div className='h-10 bg-gray-200 rounded mb-6'></div>
              <div className='space-y-4'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='h-16 bg-gray-200 rounded'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='flex-1 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2 flex items-center'>
            <XMarkIcon className='w-6 h-6 mr-2' />
            Quản lý yêu cầu xét nghiệm
          </h1>
        </div>

        {/* Main Content */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6'>
            <div className='mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Danh sách yêu cầu đã xác nhận</h2>

              {/* Search Bar */}
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên khách hàng, mã yêu cầu...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                />
              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Mã yêu cầu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Khách hàng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Loại xét nghiệm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Ngày yêu cầu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Địa điểm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredRequests.map((request) => {
                    const statusDisplay = getStatusDisplay(request.Status)
                    return (
                      <tr key={request.TestRequestID} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {request.TestRequestID}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {request.CustomerName || 'Nguyen Van A'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {request.ServiceName} - {request.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {formatDate(request.CreatedAt)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {request.CollectionMethod === 'Home' ? 'Tại Nhà' : 'Tại Trung Tâm'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}
                          >
                            {statusDisplay.text}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                          <button
                            onClick={() => handleViewRequest(request.TestRequestID)}
                            className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'
                            title='Xem chi tiết'
                          >
                            <EyeIcon className='h-5 w-5' />
                          </button>
                          {request.Status !== 'Verified' && (
                            <button
                              onClick={() => handleStartProcess(request.TestRequestID)}
                              className='px-3 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition-colors'
                              title='Bắt đầu'
                            >
                              Bắt đầu
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className='text-center py-8'>
                <MagnifyingGlassIcon className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>Không có yêu cầu nào</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {searchQuery
                    ? 'Không tìm thấy yêu cầu phù hợp với từ khóa tìm kiếm.'
                    : 'Chưa có yêu cầu xét nghiệm nào được xác nhận.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedRequest && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white'>
              <div className='mt-3'>
                {/* Modal Header */}
                <div className='flex items-center justify-between pb-4 border-b'>
                  <h3 className='text-lg font-semibold text-gray-900'>Chi tiết yêu cầu xét nghiệm</h3>
                  <button onClick={closeModal} className='text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='h-6 w-6' />
                  </button>
                </div>

                {/* Modal Content */}
                <div className='mt-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Left Column */}
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Mã yêu cầu</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.TestRequestID}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Loại xét nghiệm</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.ServiceName}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Số điện thoại</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CustomerPhone || '0123456789'}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Số lượng mẫu</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.SampleCount}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Trạng thái</label>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusDisplay(selectedRequest.Status).color}`}
                        >
                          {getStatusDisplay(selectedRequest.Status).text}
                        </span>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Ngày xác nhận</label>
                        <p className='text-sm text-gray-900'>{formatDate(selectedRequest.UpdatedAt)}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Khách hàng</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CustomerName}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Ngày yêu cầu</label>
                        <p className='text-sm text-gray-900'>{formatDate(selectedRequest.CreatedAt)}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Email</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CustomerEmail}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Người xét nghiệm</label>
                        <p className='text-sm text-gray-900 whitespace-pre-line'>{selectedRequest.TestSubjects}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Địa chỉ</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CustomerAddress || 'chung cư an phúc'}</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>Nhân viên xác nhận</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.StaffName || 'vua dang toi'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmedRequests
