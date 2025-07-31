'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { EyeIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

import DashboardSidebar from '../../components/Common/Sidebar'
import { type TestRequestDetail } from '../../utils/types'
import { staffService } from '../../services/staffService'

const ManageRequests: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<TestRequestDetail | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [requests, setRequests] = useState<TestRequestDetail[]>([])
  const [loading, setLoading] = useState(true)

  // Helper functions
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Không rõ'
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedRequest(null)
  }

  // Data fetching and filtering
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await staffService.getUnconfirmedRequests()
        setRequests(data)
      } catch (error) {
        console.error('Error fetching unconfirmed requests:', error)
        toast.error('Lỗi khi tải danh sách yêu cầu!')
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

  // Event handlers
  const handleViewRequest = async (requestId: number) => {
    try {
      const request = await staffService.getRequestById(requestId)
      setSelectedRequest(request)
      setShowModal(true)
    } catch (error) {
      console.error('Error fetching request details:', error)
      toast.error('Lỗi khi tải chi tiết yêu cầu!')
    }
  }

  const handleConfirmRequest = async (requestId: number) => {
    try {
      await staffService.confirmRequest(requestId)
      setRequests(requests.filter((req) => req.TestRequestID !== requestId))
      toast.success('Yêu cầu đã được xác nhận thành công!')
    } catch (error) {
      console.error('Error confirming request:', error)
      toast.error('Có lỗi xảy ra khi xác nhận yêu cầu!')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <div className='flex-1 p-8'>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-200 rounded w-1/3'></div>
            <div className='bg-white rounded-lg shadow-sm border p-6'>
              <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
              <div className='h-10 bg-gray-200 rounded mb-6'></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='h-16 bg-gray-200 rounded mb-2'></div>
              ))}
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
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý yêu cầu xét nghiệm</h1>
          <p className='text-gray-600 mt-1'>Xác nhận các yêu cầu xét nghiệm mới từ khách hàng</p>
        </div>

        {/* Main Content */}
        <div className='bg-white rounded-lg shadow-sm border'>
          <div className='p-6'>
            {/* Search */}
            <div className='mb-6'>
              <div className='relative'>
                <MagnifyingGlassIcon className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên khách hàng, mã yêu cầu, tên dịch vụ...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    {['Mã yêu cầu', 'Khách hàng', 'Dịch vụ', 'Ngày đăng ký', 'Địa điểm', 'Trạng thái', 'Thao tác'].map(
                      (header) => (
                        <th
                          key={header}
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {filteredRequests.map((request) => (
                    <tr key={request.TestRequestID} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900'>#{request.TestRequestID}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{request.CustomerName}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {request.ServiceName}
                        <div className='text-xs text-gray-500'>
                          {request.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                        </div>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{formatDate(request.Appointment)}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Tại trung tâm'}
                      </td>
                      <td className='px-6 py-4'>
                        <span className='px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                          Chờ xác nhận
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm space-x-2'>
                        <button
                          onClick={() => handleViewRequest(request.TestRequestID)}
                          className='p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100'
                          title='Xem chi tiết'
                        >
                          <EyeIcon className='h-4 w-4' />
                        </button>
                        <button
                          onClick={() => handleConfirmRequest(request.TestRequestID)}
                          className='px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors'
                        >
                          Xác nhận
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className='text-center py-12'>
                <MagnifyingGlassIcon className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>Không có yêu cầu nào</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {searchQuery ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có yêu cầu nào cần xác nhận'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Request Detail Modal */}
        {showModal && selectedRequest && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b'>
                <h3 className='text-lg font-semibold text-gray-900'>Chi tiết yêu cầu xét nghiệm</h3>
                <button
                  onClick={closeModal}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </div>

              {/* Modal Content */}
              <div className='p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  {/* Left Column */}
                  <div className='space-y-6'>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-base font-medium text-gray-900 mb-4'>Thông tin yêu cầu</h4>
                      <div className='space-y-3'>
                        <div>
                          <span className='text-sm text-gray-600'>Mã yêu cầu:</span>
                          <p className='font-medium text-gray-900'>#{selectedRequest.TestRequestID}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Dịch vụ:</span>
                          <p className='font-medium text-gray-900'>
                            {selectedRequest.ServiceName} - {selectedRequest.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                          </p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Ngày đăng ký:</span>
                          <p className='font-medium text-gray-900'>{formatDate(selectedRequest.Appointment)}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Số lượng mẫu:</span>
                          <p className='font-medium text-gray-900'>{selectedRequest.SampleCount}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Trạng thái:</span>
                          <div className='mt-1'>
                            <span className='px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800'>
                              Chờ xác nhận
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Ngày tạo:</span>
                          <p className='font-medium text-gray-900'>{formatDate(selectedRequest.CreatedAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Test Subjects */}
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-base font-medium text-gray-900 mb-4'>Đối tượng xét nghiệm</h4>
                      <div className='text-sm text-gray-700 whitespace-pre-line'>
                        {selectedRequest.TestSubjects}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-6'>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-base font-medium text-gray-900 mb-4'>Thông tin khách hàng</h4>
                      <div className='space-y-3'>
                        <div>
                          <span className='text-sm text-gray-600'>Họ tên:</span>
                          <p className='font-medium text-gray-900'>{selectedRequest.CustomerName}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Email:</span>
                          <p className='font-medium text-gray-900'>{selectedRequest.CustomerEmail}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Số điện thoại:</span>
                          <p className='font-medium text-gray-900'>{selectedRequest.CustomerPhone || 'Chưa cập nhật'}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Địa chỉ:</span>
                          <p className='font-medium text-gray-900'>{selectedRequest.CustomerAddress || 'Chưa cập nhật'}</p>
                        </div>
                        <div>
                          <span className='text-sm text-gray-600'>Phương thức lấy mẫu:</span>
                          <p className='font-medium text-gray-900'>
                            {selectedRequest.CollectionMethod === 'Home' ? 'Tại nhà' : 'Tại trung tâm'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                      <h4 className='text-base font-medium text-blue-900 mb-2'>Lưu ý quan trọng</h4>
                      <p className='text-sm text-blue-700'>
                        Sau khi xác nhận, yêu cầu sẽ được chuyển sang trạng thái "Đã xác nhận" và khách hàng sẽ nhận được thông báo qua email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='flex justify-end space-x-3 p-6 border-t bg-gray-50'>
                <button
                  onClick={closeModal}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleConfirmRequest(selectedRequest.TestRequestID)
                    closeModal()
                  }}
                  className='px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors'
                >
                  Xác nhận yêu cầu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageRequests
