import React, { useEffect, useState } from 'react'
import {
  EyeIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import DashboardSidebar from '../../components/Common/Sidebar'
import axios from 'axios'

interface TestRequest {
  RequestID: number
  CustomerName: string
  ServiceName: string
  CreatedAt: string
  CollectionMethod: string
  Status: string
  Phone: string
  Email: string
  SampleCount: number
  StaffName: string
}

const ManageRequests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<TestRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [services, setServices] = useState<TestRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/services', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (Array.isArray(res.data.services)) {
          setServices(res.data.services)
        } else {
          setError('Dữ liệu trả về không hợp lệ')
          setServices([])
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const filteredRequests = services.filter(
    (req) =>
      req.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.ServiceName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewRequest = (id: number) => {
    const found = services.find((r) => r.RequestID === id)
    if (found) {
      setSelectedRequest(found)
      setShowModal(true)
    }
  }

  const handleConfirmRequest = (id: number) => {
    console.log('Confirming request:', id)
    // TODO: call backend confirm API here
  }

  const closeModal = () => {
    setSelectedRequest(null)
    setShowModal(false)
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
            <MagnifyingGlassIcon className='w-6 h-6 mr-2' />
            Quản lý yêu cầu xét nghiệm
          </h1>
        </div>

        {/* Main Content */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6'>
            <div className='mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                Danh sách yêu cầu chưa xác nhận
              </h2>

              {/* Search */}
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên khách hàng, loại dịch vụ...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                />
              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Mã yêu cầu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Khách hàng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Loại xét nghiệm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Ngày yêu cầu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Địa điểm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredRequests.map((r) => (
                    <tr key={r.RequestID} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900'>{r.RequestID}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{r.CustomerName}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{r.ServiceName}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{r.CreatedAt}</td>
                      <td className='px-6 py-4 text-sm text-gray-900'>{r.CollectionMethod}</td>
                      <td className='px-6 py-4'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                          {r.Status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm font-medium space-x-2'>
                        <button
                          onClick={() => handleViewRequest(r.RequestID)}
                          className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'
                          title='Xem chi tiết'
                        >
                          <EyeIcon className='h-5 w-5' />
                        </button>
                        <button
                          onClick={() => handleConfirmRequest(r.RequestID)}
                          className='text-green-400 hover:text-green-600 p-1 rounded-full hover:bg-green-100'
                          title='Xác nhận'
                        >
                          <CheckCircleIcon className='h-5 w-5' />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                    : 'Chưa có yêu cầu xét nghiệm nào.'}
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
                <div className='flex items-center justify-between pb-4 border-b'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Chi tiết yêu cầu xét nghiệm
                  </h3>
                  <button
                    onClick={closeModal}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <XMarkIcon className='h-6 w-6' />
                  </button>
                </div>

                <div className='mt-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Mã yêu cầu</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.RequestID}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Loại xét nghiệm</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.ServiceName}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Số điện thoại</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.Phone}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Số lượng mẫu</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.SampleCount}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Trạng thái</label>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                          {selectedRequest.Status}
                        </span>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Khách hàng</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CustomerName}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Ngày yêu cầu</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CreatedAt}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Email</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.Email}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Người xét nghiệm</label>
                        <p className='text-sm text-gray-900 whitespace-pre-line'>{selectedRequest.StaffName}</p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-500 mb-1 block'>Địa điểm</label>
                        <p className='text-sm text-gray-900'>{selectedRequest.CollectionMethod}</p>
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

export default ManageRequests
