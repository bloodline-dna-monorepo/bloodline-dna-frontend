'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { testRequestService } from '../../services/testRequestService'
import type { History, test, TestRequests, TestResults } from '../../utils/types'
import DashboardSidebar from '../../components/Common/Sidebar'

interface HistoryServiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  TestRequests: TestRequests | null
}

const HistoryServiceDetailModal: React.FC<HistoryServiceDetailModalProps> = ({ isOpen, onClose, TestRequests }) => {
  if (!isOpen || !TestRequests) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Chi tiết dịch vụ</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            ✕
          </button>
        </div>

        <p className='text-gray-600 mb-6'>Thông tin chi tiết về dịch vụ</p>

        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Mã dịch vụ</div>
              <div className='font-semibold'>{TestRequests.ServiceID || '2'}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Mã kit</div>
              <div className='font-semibold'>{TestRequests.KitID || 'KIT002'}</div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Tên xét nghiệm</div>
              <div className='font-semibold'>{TestRequests.ServiceName || 'Xét nghiệm ADN cha con'}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Dịch vụ</div>
              <div className='font-semibold text-green-600'>Hành chính</div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Số lượng mẫu</div>
              <div className='font-semibold'>{TestRequests.ServiceType === 'Administrative' ? '3' : '2'}</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Trạng thái</div>
              <div className='font-semibold text-green-600'>Hoàn thành</div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm text-gray-600'>Chi phí:</div>
              <div className='font-semibold text-green-600'>3.500.000 đ</div>
            </div>
            <div>
              <div className='text-sm text-gray-600'>Thanh toán</div>
<div className='font-semibold'>Chuyển khoản</div>
            </div>
          </div>
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <div className='font-semibold mb-2'>Kết quả xét nghiệm</div>
          <div className='text-sm text-gray-700 mb-3'>Kết quả cho thấy mối quan hệ huyết thống với xác suất 99.9%</div>

          <div className='font-semibold mb-2'>Thông tin kỹ thuật viên</div>
          <div className='text-sm text-gray-700'>{TestRequests.AssignedTo || 'BS. Nguyễn Văn A'}</div>
        </div>

        <div className='mt-4 text-xs text-gray-500'>
          tất cả dữ liệu mũi tên đen chỉ vào đều có thể lấy được ở database theo các bảng
          Services,TestRequests,TestAtHome,TestResults qua api backend nếu không thấy thì mới tạo rồi tôi sẽ tạo ở
          backend sau
        </div>
      </div>
    </div>
  )
}

// Modal hiển thị biên bản kết quả xét nghiệm
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: TestResults | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;
  // Lấy thông tin từ request, fallback nếu thiếu
  const fatherName = request.CustomerName || 'Nguyễn Văn A';
  const motherName = request.CustomerName || 'Nguyễn Thị B';
  const childName = request.CustomerName || 'Nguyễn Văn C'; // Nếu backend có trường riêng cho tên con thì thay vào đây
  const testDate = request.CreatedAt || '10/1/2024';
  const serviceName = request.ServiceName || 'Xét nghiệm ADN cha con';
  const kitId = request.KitID || 'KIT001';
  const cost = '';

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl'>✕</button>
        <h2 className='text-center font-bold uppercase text-sm mb-1'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
        <h3 className='text-center underline text-sm mb-2'>Độc lập – Tự do – Hạnh phúc</h3>
        <h1 className='text-center font-bold text-xl my-4'>KẾT QUẢ XÉT NGHIỆM ADN</h1>
        <p className='mb-2'>
          Theo Đơn yêu cầu xét nghiệm ADN ngày {testDate} của {fatherName} (SĐT: {request.CustomerName || '0123456789'}), Công ty Gen Unity đã tiến hành lấy mẫu xét nghiệm ADN cho những người sau:
        </p>
        <ol className='list-decimal list-inside mb-2'>
          <li>Mẫu móng tay, ghi tên {fatherName}.</li>
          <li>Mẫu móng tay, ghi tên {motherName}.</li>
          <li>Mẫu móng tay, ghi tên {childName}.</li>
        </ol>
        <p className='mb-2'>Mã dịch vụ: <b>{serviceName}</b> &nbsp; | &nbsp; Mã kit: <b>{kitId}</b></p>
        <p className='font-bold mb-1'>Kết quả phân tích ADN như sau:</p>
<p className='mb-2'>
          Phân tích ADN cho thấy các trình tự di truyền (gen) của <b>{childName}</b> có sự trùng khớp với trình tự ADN của <b>{fatherName}</b> và <b>{motherName}</b> tại nhiều vị trí đặc trưng trong giảm định quan hệ huyết thống.
        </p>
        <p className='mb-2'>Mức độ trùng khớp giữa các mẫu cho thấy có <b>quan hệ huyết thống cha – mẹ – con</b> với độ chính xác rất cao.</p>
        <p className='font-bold mb-1'>KẾT LUẬN:</p>
        <p className='mb-2'>Căn cứ vào kết quả phân tích ADN, chúng tôi kết luận:</p>
        <p className='mb-2'><b>{fatherName}</b> là cha ruột và <b>{motherName}</b> là mẹ ruột của <b>{childName}</b>.</p>
        <p className='mb-2'>Mức độ chính xác của kết luận lên đến <b>99,9999%</b>.</p>
        <p className='font-bold mb-1'>XÁC NHẬN CỦA ĐƠN VỊ XÉT NGHIỆM</p>
        <div className='flex justify-between mt-8'>
          <div>
            Đại diện đơn vị xét nghiệm<br/>
            <span className='italic'>(Ký, ghi rõ họ tên)</span>
          </div>
          <div className='text-right'>
            Manager – Gen Unity<br/>
            Ngày 1 tháng 10 năm 2024
          </div>
        </div>
      </div>
    </div>
  );
}

const HistoryServices: React.FC = () => {
  const [testRequests, setTestRequests] = useState<test[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedTest, setSelectedTest] = useState<TestRequests | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    totalCost: 0
  })
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<TestResults | null>(null)
  const [loadingReport, setLoadingReport] = useState(false)

  useEffect(() => {
    fetchHistoryData()
  }, [])

  const fetchHistoryData = async () => {
    try {
      setLoading(true)
      // API calls would go here - need backend endpoints
      const requests = await testRequestService.getUserTestRequests()
      const completedRequests = requests.filter((req) => req.Status === 'completed')

      setTestRequests(completedRequests)
      setStats({
        totalTests: requests.length,
        completedTests: completedRequests.length,
        totalCost: 7000000 // This should come from API
      })
    } catch (error) {
      console.error('Error fetching history data:', error)
      // Show mock data if API fails
      const mockRequests = [
        {
          id: '1',
          serviceId: 'service1',
          userId: 'user1',
          status: 'completed' as const,
          kitId: 'KIT001',
          createdAt: '10/1/2024',
          updatedAt: '15/1/2024',
          serviceName: 'Xét nghiệm ADN cha con',
serviceType: 'civil' as const,
          location: 'at_home' as const,
          appointmentDate: '10/1/2024',
          technician: 'BS. Nguyễn Văn A',
          cost: 3500000
        },
        {
          id: '2',
          serviceId: 'service2',
          userId: 'user1',
          status: 'completed' as const,
          kitId: 'KIT002',
          createdAt: '10/1/2024',
          updatedAt: '17/1/2024',
          serviceName: 'Xét nghiệm ADN cha con',
          serviceType: 'administrative' as const,
          location: 'facility' as const,
          appointmentDate: '10/1/2024',
          technician: 'BS. Nguyễn Văn A',
          cost: 2500000
        }
      ]

      setTestRequests(mockRequests)
      setStats({
        totalTests: 2,
        completedTests: 1,
        totalCost: 7000000
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = (TestRequests: History) => {
    setSelectedTest(TestRequests)
    setIsDetailModalOpen(true)
  }

  const handleShowReport = async (request: test) => {
    setLoadingReport(true)
    try {
      // Giả lập lấy TestResults từ backend bằng TestRequestID hoặc serviceId
      // Thay thế bằng API thực tế của bạn
      const testResult: TestResults = {
        TestResultID: 1,
        TestRequestID: request.id,
        CustomerName: 'Nguyễn Văn A',
        KitID: request.kitId,
        ServiceID: 1,
        ServiceType: request.serviceType,
        SampleCount: 3,
        Result: 'Nguyễn Văn C',
        EnterBy: 1,
        SampleDate: request.createdAt,
        StaffName: request.technician,
        Status: 'Verified',
        CreatedAt: request.createdAt,
        UpdatedAt: request.confirmAt,
      }
      setSelectedReport(testResult)
      setIsReportModalOpen(true)
    } finally {
      setLoadingReport(false)
    }
  }

  const filteredRequests = testRequests.filter((request) => {
    const matchesSearch =
      request.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.kitId?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'civil' && request.serviceType === 'Civil') ||
      (filterType === 'administrative' && request.serviceType === 'Administrative')

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return <div className='flex justify-center items-center h-64'>Đang tải...</div>
  }

  return (
    <div className='flex '>
      <DashboardSidebar />
      <div className='max-w-6xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-8'>Lịch sử</h1>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-blue-50 rounded-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm text-gray-600'>Tổng xét nghiệm</div>
                  <div className='text-2xl font-bold'>{stats.totalTests}</div>
                <div className='text-sm text-gray-500'>Tất cả dịch vụ</div>
              </div>
              <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>✏️</div>
            </div>
          </div>

          <div className='bg-green-50 rounded-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm text-gray-600'>Đã hoàn thành</div>
                <div className='text-2xl font-bold'>{stats.completedTests}</div>
                <div className='text-sm text-gray-500'>Có kết quả</div>
              </div>
              <div className='w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center'>✓</div>
            </div>
          </div>

          <div className='bg-purple-50 rounded-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm text-gray-600'>Tổng chi phí</div>
                <div className='text-2xl font-bold text-purple-600'>{stats.totalCost.toLocaleString()} đ</div>
                <div className='text-sm text-gray-500'>Đã thanh toán</div>
              </div>
              <div className='w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center'>💰</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='bg-white rounded-lg p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4'>Lịch sử dịch vụ</h2>
          <p className='text-gray-600 mb-4'>Xem lại tất cả các dịch vụ xét nghiệm đã sử dụng</p>

          <div className='flex gap-4 mb-4'>
            <div className='flex-1 relative'>
              <input
                type='text'
                placeholder='Tìm kiếm theo loại xét nghiệm, mã kit, mã dịch vụ...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
              <div className='absolute right-3 top-2.5 text-gray-400'>🔍</div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
            >
              <option value='all'>Tất cả thời gian</option>
              <option value='civil'>Dân sự</option>
              <option value='administrative'>Hành chính</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className='space-y-4'>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
<div key={request.serviceId} className='bg-white rounded-lg border p-6'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>🧬</div>
                  <div className='flex-1'>
                    <h3 className='font-semibold'>{request.serviceName}</h3>
                    <div className='text-sm text-gray-600'>
                      Mã dịch vụ: {request.serviceId} • Mã kit: {request.kitId}
                    </div>
                  </div>
                  <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>Hoàn thành</span>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                  <div>
                    <div className='text-sm text-gray-600'>Ngày đặt:</div>
                    <div className='font-medium'>{request.createdAt}</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600'>Ngày hoàn thành:</div>
                    <div className='font-medium'>{request.confirmAt}</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600'>Chi phí:</div>
                    <div className='font-medium text-green-600'>{request.cost?.toLocaleString() || '3.500.000'} đ</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-600'>Địa điểm:</div>
                    <div className='font-medium'>{request.location === 'Home' ? 'Tại nhà' : 'Cơ sở'}</div>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleViewDetail(request)}
                      className='px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200'
                    >
                      Xem chi tiết 
                    </button>
                    <button
                      onClick={() => handleShowReport(request)}
                      className='px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200'
                      disabled={loadingReport}>
                      {loadingReport ? 'Đang tải...' : 'Tải kết quả xét nghiệm'}
                    </button>
                  </div>

                  <div className='flex gap-2'>
                    
                    {/* <button
                    onClick={() => handleDownloadReport(request)}
                    className='px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200'
                  >
                    click để tải pdf về
                  </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>📋</div>
              <div className='text-gray-500 mb-2'>
                {searchTerm || filterType !== 'all'
                  ? 'Không tìm thấy dịch vụ nào'
                  : 'Hiện ra 3 dịch vụ mà ở TestResults trong database có status là Verified gần nhất hoặc hiện ra danh sách nếu click xem thêm'}
              </div>
              <div className='text-sm text-gray-400'>Thử lại với từ khóa tìm kiếm khác</div>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className='mt-12 bg-gray-50 rounded-lg p-6'>
          <h3 className='font-semibold mb-2'>Cần hỗ trợ?</h3>
          <p className='text-gray-600 mb-4'>Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
          <div className='flex gap-4'>
            <button className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
              📞 Gọi ngay: 1900-1234
            </button>
            <button className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'>
              ✉️ Email: info@genunity.com
            </button>
          </div>
        </div>

        <HistoryServiceDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          TestRequests={selectedTest}
        />
        <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} request={selectedReport} />
      </div>
    </div>
  )
}

export default HistoryServices