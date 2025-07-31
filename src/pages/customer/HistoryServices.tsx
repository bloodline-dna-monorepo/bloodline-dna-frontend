'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { TestProcess, TestResults } from '../../utils/types'
import DashboardSidebar from '../../components/Common/Sidebar'
import { toast } from 'react-toastify'

interface HistoryServiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  testRequest: TestProcess | null
}

const HistoryServiceDetailModal: React.FC<HistoryServiceDetailModalProps> = ({ isOpen, onClose, testRequest }) => {
  const [Result, setResult] = useState<TestResults>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setLoading(true)
        const { ...data } = await testRequestService.getTestResult(testRequest!.TestRequestID)
        console.log(data)

        setResult(data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (testRequest?.TestRequestID !== undefined) {
      fetchResultData()
    }
  }, [testRequest])

  if (!isOpen || !testRequest) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Chi tiết dịch vụ</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700 text-xl'>
            ✕
          </button>
        </div>

        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Mã dịch vụ</div>
              <div className='font-semibold'>{testRequest.ServiceID}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Mã kit</div>
              <div className='font-semibold'>{testRequest.KitID || `K${testRequest.TestRequestID.toString()}`}</div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Tên xét nghiệm</div>
              <div className='font-semibold'>{testRequest.ServiceName}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Dịch vụ</div>
              <div className='font-semibold text-green-600'>
                {testRequest.ServiceType === 'Administrative' ? 'Hành chính' : 'Dân sự'}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Số lượng mẫu</div>
              <div className='font-semibold'>{testRequest.SampleCount}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Trạng thái</div>
              <div className='font-semibold text-green-600'>
                {testRequest.Status === 'Completed' ? 'Hoàn thành' : testRequest.Status}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Chi phí:</div>
              <div className='font-semibold text-green-600'>{testRequest.Price?.toLocaleString() || '3.500.000'} đ</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Thanh toán</div>
              <div className='font-semibold'>Chuyển khoản</div>
            </div>
          </div>
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <div className='font-semibold mb-2'>Kết quả xét nghiệm</div>
          <div className='text-sm text-gray-700 mb-3'>Kết quả: {Result?.Result}</div>

          <div className='font-semibold mb-2'>Thông tin kỹ thuật viên</div>
          <div className='text-sm text-gray-700'>{Result?.StaffName}</div>
        </div>
      </div>
    </div>
  )
}

const HistoryServices: React.FC = () => {
  const [testRequests, setTestRequests] = useState<TestProcess[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedTest, setSelectedTest] = useState<TestProcess | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    totalCost: 0
  })
  const [loadingDownload, setLoadingDownload] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchHistoryData()
  }, [])

  const fetchHistoryData = async () => {
    try {
      setLoading(true)
      console.log('Fetching customer test history...')
      const requests = await testRequestService.getUserTestRequests()
      console.log('Customer test requests:', requests)

      const completedRequests = requests.filter((req) => req.Status === 'Completed')
      console.log('Completed requests:', completedRequests)

      setTestRequests(requests)

      // Calculate total cost from actual data
      const totalCost = requests.reduce((sum, req) => sum + (req.Price || 0), 0)

      setStats({
        totalTests: requests.length,
        completedTests: completedRequests.length,
        totalCost: totalCost
      })
    } catch (error) {
      console.error('Error fetching history data:', error)
      toast.error('Không thể tải lịch sử xét nghiệm. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = (testRequest: TestProcess) => {
    setSelectedTest(testRequest)
    setIsDetailModalOpen(true)
  }

  const handleDownloadResults = async (request: TestProcess) => {
    try {
      setLoadingDownload((prev) => new Set(prev).add(request.TestRequestID))

      // Download both PDFs

      const [resultsPdf, sampleFormPdf] = await Promise.all([
        testRequestService.downloadTestResultPDF(request.TestRequestID),
        testRequestService.downloadSampleFormPDF(request.TestRequestID)
      ])

      // Create download links for both files
      const resultsUrl = window.URL.createObjectURL(resultsPdf)
      const sampleFormUrl = window.URL.createObjectURL(sampleFormPdf)

      // Download results PDF
      const resultsLink = document.createElement('a')
      resultsLink.href = resultsUrl
      resultsLink.download = `ket-qua-xet-nghiem-${request.TestRequestID}.pdf`
      document.body.appendChild(resultsLink)
      resultsLink.click()
      document.body.removeChild(resultsLink)

      // Download sample form PDF with a slight delay
      setTimeout(() => {
        const sampleFormLink = document.createElement('a')
        sampleFormLink.href = sampleFormUrl
        sampleFormLink.download = `bien-ban-lay-mau-${request.TestRequestID}.pdf`
        document.body.appendChild(sampleFormLink)
        sampleFormLink.click()
        document.body.removeChild(sampleFormLink)

        // Clean up URLs
        window.URL.revokeObjectURL(resultsUrl)
        window.URL.revokeObjectURL(sampleFormUrl)
      }, 500)
    } catch (error) {
      console.error('Error downloading PDFs:', error)
      toast.error('Không thể tải xuống file PDF. Vui lòng thử lại sau.')
    } finally {
      setLoadingDownload((prev) => {
        const updated = new Set(prev)
        updated.delete(request.TestRequestID)
        return updated
      })
    }
  }
  const handleDownloadResults1 = async (request: TestProcess) => {
    try {
      setLoadingDownload((prev) => new Set(prev).add(request.TestRequestID))

      // Download both PDFs

      const [resultsPdf] = await Promise.all([testRequestService.downloadTestResultPDF(request.TestRequestID)])

      // Create download links for both files
      const resultsUrl = window.URL.createObjectURL(resultsPdf)

      // Download results PDF
      const resultsLink = document.createElement('a')
      resultsLink.href = resultsUrl
      resultsLink.download = `ket-qua-xet-nghiem-${request.TestRequestID}.pdf`
      document.body.appendChild(resultsLink)
      resultsLink.click()
      document.body.removeChild(resultsLink)

      // Download sample form PDF with a slight delay
    } catch (error) {
      console.error('Error downloading PDFs:', error)
      toast.error('Không thể tải xuống file PDF. Vui lòng thử lại sau.')
    } finally {
      setLoadingDownload((prev) => {
        const updated = new Set(prev)
        updated.delete(request.TestRequestID)
        return updated
      })
    }
  }

  const filteredRequests = testRequests.filter((request) => {
    const matchesSearch =
      request.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.TestRequestID.toString().includes(searchTerm)

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'civil' && request.ServiceType === 'Civil') ||
      (filterType === 'administrative' && request.ServiceType === 'Administrative')

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className='flex'>
        <DashboardSidebar />
        <div className='flex-1 flex justify-center items-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4'></div>
            <div>Đang tải...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 p-6'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold mb-8'>Lịch sử</h1>

          {/* Statistics Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div className='bg-white rounded-lg p-6 shadow-sm border'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm text-gray-600 mb-1'>Tổng xét nghiệm</div>
                  <div className='text-2xl font-bold text-blue-600'>{stats.totalTests}</div>
                  <div className='text-sm text-gray-500'>Tất cả dịch vụ</div>
                </div>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>📝</span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg p-6 shadow-sm border'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm text-gray-600 mb-1'>Đã hoàn thành</div>
                  <div className='text-2xl font-bold text-green-600'>{stats.completedTests}</div>
                  <div className='text-sm text-gray-500'>Có kết quả</div>
                </div>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>✅</span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg p-6 shadow-sm border'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm text-gray-600 mb-1'>Tổng chi phí</div>
                  <div className='text-2xl font-bold text-purple-600'>{stats.totalCost.toLocaleString()} đ</div>
                  <div className='text-sm text-gray-500'>Đã thanh toán</div>
                </div>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className='bg-white rounded-lg p-6 mb-6 shadow-sm border'>
            <h2 className='text-lg font-semibold mb-2'>Lịch sử dịch vụ</h2>
            <p className='text-gray-600 mb-4'>Xem lại tất cả các dịch vụ xét nghiệm đã sử dụng</p>

            <div className='flex gap-4 mb-4'>
              <div className='flex-1 relative'>
                <input
                  type='text'
                  placeholder='Tìm kiếm theo loại xét nghiệm'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
                <div className='absolute left-3 top-2.5 text-gray-400'>🔍</div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                <option value='all'>Loại</option>
                <option value='civil'>Dân sự</option>
                <option value='administrative'>Hành chính</option>
              </select>
            </div>
          </div>

          {/* History List */}
          <div className='space-y-4'>
            {filteredRequests.length > 0 ? (
              filteredRequests
                .filter((req) => req.Status === 'Completed')
                .map((request) => (
                  <div key={request.TestRequestID} className='bg-white rounded-lg border p-6 shadow-sm'>
                    <div className='flex items-start gap-4 mb-4'>
                      <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                        <span className='text-blue-600'>🧬</span>
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-start justify-between'>
                          <div>
                            <h3 className='font-semibold text-lg mb-1'>{request.ServiceName}</h3>
                            <div className='text-sm text-gray-600 mb-2'>
                              Mã dịch vụ: {request.ServiceID} 🔸 Mã đăng ký: {request.TestRequestID}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${request.Status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                              }`}
                          >
                            {request.Status === 'Completed' ? 'Hoàn thành' : request.Status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm'>
                      <div>
                        <div className='text-gray-600 mb-1'>Ngày đặt:</div>
                        <div className='font-medium'>{new Date(request.CreatedAt).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <div>
                        <div className='text-gray-600 mb-1'>Ngày hoàn thành:</div>
                        <div className='font-medium'>{new Date(request.UpdatedAt).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <div>
                        <div className='text-gray-600 mb-1'>Chi phí:</div>
                        <div className='font-medium text-green-600'>
                          {(request.Price || 3500000).toLocaleString()} đ
                        </div>
                      </div>
                      <div>
                        <div className='text-gray-600 mb-1'>Địa điểm:</div>
                        <div className='font-medium'>{request.CollectionMethod === 'Home' ? 'Tại nhà' : 'Cơ sở'}</div>
                      </div>
                    </div>

                    <div className='flex justify-between items-center pt-4 border-t'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleViewDetail(request)}
                          className='px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium'
                        >
                          👁️ Xem chi tiết
                        </button>
                        {request.Status === 'Completed' && (
                          <button
                            onClick={() =>
                              request.ServiceType === 'Civil'
                                ? handleDownloadResults1(request)
                                : handleDownloadResults(request)
                            }
                            disabled={loadingDownload.has(request.TestRequestID)}
                            className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50'
                          >
                            {loadingDownload.has(request.TestRequestID) ? '⏳ Đang tải...' : '📄 Tải kết quả'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className='text-center py-12 bg-white rounded-lg border'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>📋</span>
                </div>
                <div className='text-gray-500 mb-2'>
                  {searchTerm || filterType !== 'all' ? 'Không tìm thấy dịch vụ nào' : 'Chưa có lịch sử dịch vụ'}
                </div>
                <div className='text-sm text-gray-400'>
                  {searchTerm || filterType !== 'all'
                    ? 'Thử lại với từ khóa tìm kiếm khác'
                    : 'Các dịch vụ đã sử dụng sẽ hiển thị tại đây'}
                </div>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className='mt-12 bg-gray-50 rounded-lg p-6 border'>
            <h3 className='font-semibold mb-2'>Cần hỗ trợ?</h3>
            <p className='text-gray-600 mb-4'>Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
            <div className='flex gap-4'>
              <a
                href='tel:0123456789'
                className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
              >
                📞 Gọi ngay: 0123 456 789
              </a>
              <a
                href='https://mail.google.com/mail/?view=cm&fs=1&to=genunitycompany@gmail.com'
                target='_blank'
                className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
              >
                ✉️ Email: genunitycompany@gmail.com
              </a>
            </div>
          </div>
        </div>

        <HistoryServiceDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          testRequest={selectedTest}
        />
      </div>
    </div>
  )
}

export default HistoryServices
