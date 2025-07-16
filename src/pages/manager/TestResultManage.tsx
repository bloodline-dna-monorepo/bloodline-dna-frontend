'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { EyeIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { TestResults } from '../../utils/types'
import DashboardSidebar from '../../components/Common/Sidebar'
import { managerService } from '../../services/managerService'

const TestResultManage: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [dataSource, setDataSource] = useState<TestResults[]>([])
  const [loading, setLoading] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<TestResults | null>(null)

  useEffect(() => {
    fetchTestResults()
  }, [])

  const fetchTestResults = async () => {
    try {
      setLoading(true)
      const results = await managerService.getTestResults()
      console.log(results)

      setDataSource(results)
    } catch (error) {
      console.error('Error fetching test results:', error)
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }

  const filteredData = Array.isArray(dataSource)
    ? dataSource.filter(
        (item) =>
          item.CustomerName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.TestRequestID.toString().includes(searchText)
      )
    : []

  const handleView = async (item: TestResults) => {
    try {
      const detailResult = await managerService.getTestResultById(item.TestResultID)
      setSelected(detailResult)
      setModalOpen(true)
    } catch (error) {
      console.error('Error fetching test result details:', error)
    }
  }

  const handleApprove = async (testResultId: number) => {
    try {
      await managerService.approveTestResult(testResultId)
      await fetchTestResults() // Refresh data
      alert('Kết quả đã được duyệt thành công')
    } catch (error) {
      console.error('Error approving test result:', error)
      alert('Có lỗi xảy ra khi duyệt kết quả')
    }
  }

  const handleReject = async (testResultId: number) => {
    if (
      window.confirm('Bạn có chắc chắn muốn từ chối và xóa kết quả này? Đơn sẽ được đưa về trạng thái "Đang xử lý".')
    ) {
      try {
        await managerService.rejectTestResult(testResultId)
        await fetchTestResults() // Refresh data
        alert('Kết quả đã được từ chối và xóa thành công')
      } catch (error) {
        console.error('Error rejecting test result:', error)
        alert('Có lỗi xảy ra khi từ chối kết quả')
      }
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelected(null)
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Verified':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statusText = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'Chờ duyệt'
      case 'Verified':
        return 'Đã duyệt'
      default:
        return status
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 p-8'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='font-bold text-3xl mb-8'>Quản lý kết quả xét nghiệm</h1>

          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='mb-6'>
              <h2 className='font-semibold text-xl mb-4'>Danh sách kết quả xét nghiệm</h2>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên bệnh nhân hoặc mã xét nghiệm...'
                  className='w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Mã yêu cầu
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Bệnh nhân
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Loại xét nghiệm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Nhân viên
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                        <div className='flex items-center justify-center'>
                          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600'></div>
                          <span className='ml-2'>Đang tải dữ liệu...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.TestResultID} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {item.TestRequestID}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.CustomerName}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {item.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor(item.Status)}`}
                          >
                            {statusText(item.Status)}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.StaffName}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => handleView(item)}
                              className='text-gray-600 hover:text-blue-600 p-1 rounded'
                              title='Xem chi tiết'
                            >
                              <EyeIcon className='h-5 w-5' />
                            </button>
                            {item.Status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(item.TestResultID)}
                                  className='text-green-600 hover:text-green-800 p-1 rounded'
                                  title='Duyệt'
                                >
                                  <CheckCircleIcon className='h-5 w-5' />
                                </button>
                                <button
                                  onClick={() => handleReject(item.TestResultID)}
                                  className='text-red-600 hover:text-red-800 p-1 rounded'
                                  title='Từ chối'
                                >
                                  <XMarkIcon className='h-5 w-5' />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal hiển thị chi tiết */}
        {modalOpen && selected && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative mx-4'>
              <button
                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl'
                onClick={handleCloseModal}
                aria-label='Đóng'
              >
                ×
              </button>

              <div className='mb-6'>
                <h2 className='text-2xl font-bold mb-2'>Chi tiết kết quả xét nghiệm</h2>
                <p className='text-gray-600 text-sm'>
                  Thông tin chi tiết về kết quả xét nghiệm {selected.TestRequestID}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Mã yêu cầu</label>
                  <p className='text-lg font-semibold'>{selected.TestRequestID}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Bệnh nhân</label>
                  <p className='text-lg font-semibold'>{selected.CustomerName}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Loại xét nghiệm</label>
                  <p className='text-lg font-semibold'>{selected.ServiceType === 'Civil' ? 'Dân sự' : 'Hành chính'}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Ngày lấy mẫu</label>
                  <p className='text-lg font-semibold'>
                    {selected.SampleDate ? new Date(selected.SampleDate).toLocaleDateString('vi-VN') : '--'}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Kỹ thuật viên</label>
                  <p className='text-lg font-semibold'>{selected.StaffName}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>Trạng thái</label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${statusColor(selected.Status)}`}
                  >
                    {statusText(selected.Status)}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-500 block mb-2'>Kết quả</label>
                <div className='bg-gray-50 border rounded-lg px-4 py-3 min-h-[100px]'>
                  <p className='text-gray-900 whitespace-pre-wrap'>{selected.Result || 'Chưa có kết quả'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default TestResultManage
