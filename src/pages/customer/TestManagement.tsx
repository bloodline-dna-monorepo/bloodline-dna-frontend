"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { testRequestService } from "../../services/testRequestService"
import type { SampleInfo, TestProcess, TestResults } from "../../utils/types"
import DashboardSidebar from "../../components/Common/Sidebar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

interface TestDetailModalProps {
  isOpen: boolean
  onClose: () => void
  testRequest: TestProcess | null
}

const TestDetailModal: React.FC<TestDetailModalProps> = ({ isOpen, onClose, testRequest }) => {
  const [Result, setResult] = useState<TestResults>()
  const [, setLoading] = useState(true)

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setLoading(true)
        const { ...data } = await testRequestService.getTestResult(testRequest!.TestRequestID)
        console.log(data)
        setResult(data)
      } catch (error) {
        console.error("Error fetching result data:", error)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Chi tiết kết quả xét nghiệm</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Mã dịch vụ</div>
              <div className="font-semibold">{testRequest.ServiceID}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Mã kit</div>
              <div className="font-semibold">{testRequest.KitID || `K${testRequest.TestRequestID.toString()}`}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Tên xét nghiệm</div>
              <div className="font-semibold">{testRequest.ServiceName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Dịch vụ</div>
              <div className="font-semibold text-green-600">
                {testRequest.ServiceType === "Administrative" ? "Hành chính" : "Dân sự"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Số lượng mẫu</div>
<div className="font-semibold">{testRequest.SampleCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Trạng thái</div>
              <div className="font-semibold text-green-600">Hoàn thành</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Chi phí:</div>
              <div className="font-semibold text-green-600">{testRequest.Price?.toLocaleString() || "3.500.000"} đ</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Thanh toán</div>
              <div className="font-semibold">Chuyển khoản</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Ngày hoàn thành</div>
              <div className="font-semibold">{new Date(testRequest.UpdatedAt).toLocaleDateString("vi-VN")}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Địa điểm</div>
              <div className="font-semibold">{testRequest.CollectionMethod === "Home" ? "Tại nhà" : "Cơ sở"}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="font-semibold mb-2">Kết quả xét nghiệm</div>
          <div className="text-sm text-gray-700 mb-3">Kết quả: {Result?.Result}</div>

          <div className="font-semibold mb-2">Thông tin kỹ thuật viên</div>
          <div className="text-sm text-gray-700">{Result?.StaffName}</div>
        </div>
      </div>
    </div>
  )
}

const TestManagement: React.FC = () => {
  const [testRequests, setTestRequests] = useState<TestProcess[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedTest, setSelectedTest] = useState<TestProcess | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isResultDetailModalOpen, setIsResultDetailModalOpen] = useState(false)
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    totalCost: 0,
    pendingTests: 0,
  })
  const [loadingDownload, setLoadingDownload] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchTestRequests()
  }, [])

  const fetchTestRequests = async () => {
    try {
      setLoading(true)
      const requests = await testRequestService.getUserTestRequests()
      console.log(requests)
      setTestRequests(requests)

      const completedRequests = requests.filter((req) => req.Status === "Completed")
const pendingRequests = requests.filter((req) => req.Status !== "Completed")
      const totalCost = requests.reduce((sum, req) => sum + (req.Price || 0), 0)

      setStats({
        totalTests: requests.length,
        completedTests: completedRequests.length,
        pendingTests: pendingRequests.length,
        totalCost: totalCost,
      })
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xét nghiệm:", error)
      setTestRequests([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (test: TestProcess) => {
    setSelectedTest(test)
    if (test.Status === "Input Infor") {
      setIsDetailModalOpen(true)
    } else if (test.Status === "Completed") {
      setIsResultDetailModalOpen(true)
    } else {
      setIsProgressModalOpen(true)
    }
  }

  const handleDownloadResults = async (request: TestProcess) => {
    try {
      setLoadingDownload((prev) => new Set(prev).add(request.TestRequestID))

      const [resultsPdf, sampleFormPdf] = await Promise.all([
        testRequestService.downloadTestResultPDF(request.TestRequestID),
        testRequestService.downloadSampleFormPDF(request.TestRequestID),
      ])

      const resultsUrl = window.URL.createObjectURL(resultsPdf)
      const sampleFormUrl = window.URL.createObjectURL(sampleFormPdf)

      const resultsLink = document.createElement("a")
      resultsLink.href = resultsUrl
      resultsLink.download = `ket-qua-xet-nghiem-${request.TestRequestID}.pdf`
      document.body.appendChild(resultsLink)
      resultsLink.click()
      document.body.removeChild(resultsLink)

      setTimeout(() => {
        const sampleFormLink = document.createElement("a")
        sampleFormLink.href = sampleFormUrl
        sampleFormLink.download = `bien-ban-lay-mau-${request.TestRequestID}.pdf`
        document.body.appendChild(sampleFormLink)
        sampleFormLink.click()
        document.body.removeChild(sampleFormLink)

        window.URL.revokeObjectURL(resultsUrl)
        window.URL.revokeObjectURL(sampleFormUrl)
      }, 500)
    } catch (error) {
      console.error("Error downloading PDFs:", error)
      toast.error("Không thể tải xuống file PDF. Vui lòng thử lại sau.")
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

      const [resultsPdf] = await Promise.all([testRequestService.downloadTestResultPDF(request.TestRequestID)])

      const resultsUrl = window.URL.createObjectURL(resultsPdf)

      const resultsLink = document.createElement("a")
      resultsLink.href = resultsUrl
      resultsLink.download = `ket-qua-xet-nghiem-${request.TestRequestID}.pdf`
      document.body.appendChild(resultsLink)
resultsLink.click()
      document.body.removeChild(resultsLink)
    } catch (error) {
      console.error("Error downloading PDFs:", error)
      toast.error("Không thể tải xuống file PDF. Vui lòng thử lại sau.")
    } finally {
      setLoadingDownload((prev) => {
        const updated = new Set(prev)
        updated.delete(request.TestRequestID)
        return updated
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Input Infor":
        return "bg-orange-100 text-orange-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Confirmed":
        return "bg-blue-100 text-blue-700"
      case "In Progress":
        return "bg-purple-100 text-purple-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "Input Infor":
        return 0
      case "Pending":
        return 25
      case "Confirmed":
        return 50
      case "In Progress":
        return 75
      case "Completed":
        return 100
      default:
        return 0
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "Input Infor":
        return "Cần thông tin"
      case "Pending":
        return "Đang chờ"
      case "Confirmed":
        return "Đã xác nhận"
      case "In Progress":
        return "Đang thực hiện"
      case "Completed":
        return "Hoàn thành"
      default:
        return status
    }
  }

  const filteredRequests = testRequests.filter((request) => {
    const matchesSearch =
      request.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.TestRequestID.toString().includes(searchTerm)

    const matchesType =
      filterType === "all" ||
      (filterType === "civil" && request.ServiceType === "Civil") ||
      (filterType === "administrative" && request.ServiceType === "Administrative")

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && request.Status === "Completed") ||
      (filterStatus === "pending" && request.Status !== "Completed")

    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <div>Đang tải...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
<h1 className="text-2xl font-bold mb-2">Quản lý xét nghiệm</h1>
          <p className="text-gray-600 mb-8">Theo dõi tiến độ và quản lý tất cả các xét nghiệm DNA của bạn</p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tổng xét nghiệm</div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalTests}</div>
                  <div className="text-sm text-gray-500">Tất cả dịch vụ</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Đang thực hiện</div>
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingTests}</div>
                  <div className="text-sm text-gray-500">Chưa hoàn thành</div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Đã hoàn thành</div>
                  <div className="text-2xl font-bold text-green-600">{stats.completedTests}</div>
                  <div className="text-sm text-gray-500">Có kết quả</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tổng chi phí</div>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalCost.toLocaleString()} đ</div>
                  <div className="text-sm text-gray-500">Đã thanh toán</div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
</div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-sm border mb-6 p-6">
            <h2 className="text-lg font-semibold mb-2">Danh sách xét nghiệm</h2>
            <p className="text-gray-600 mb-4">Quản lý và theo dõi tất cả các xét nghiệm DNA của bạn</p>

            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo loại xét nghiệm hoặc mã đăng ký"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="civil">Dân sự</option>
                <option value="administrative">Hành chính</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Đang thực hiện</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
          </div>

          {/* Test Requests List */}
          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div key={request.TestRequestID} className="bg-white rounded-lg border p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600">🧬</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{request.ServiceName}</h3>
                          <div className="text-sm text-gray-600 mb-2">
                            Mã dịch vụ: {request.ServiceID} 🔸 Mã đăng ký: {request.TestRequestID} 🔸{" "}
{request.SampleCount} mẫu 🔸 Mã kit: {request.KitID || ""}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {request.ServiceType === "Civil" ? "Dân sự" : "Hành chính"}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(request.Status)}`}>
                            {getStatusText(request.Status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Ngày đặt:</div>
                      <div className="font-medium">{new Date(request.CreatedAt).toLocaleDateString("vi-VN")}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">
                        {request.Status === "Completed" ? "Ngày hoàn thành:" : "Lịch hẹn:"}
                      </div>
                      <div className="font-medium">
                        {request.Status === "Completed"
                          ? new Date(request.UpdatedAt).toLocaleDateString("vi-VN")
                          : request.Appointment
                            ? new Date(request.Appointment).toLocaleDateString("vi-VN")
                            : "Chưa có"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Chi phí:</div>
                      <div className="font-medium text-green-600">{(request.Price || 3500000).toLocaleString()} đ</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">
                        {request.Status === "Completed" ? "Địa điểm:" : "Kỹ thuật viên:"}
                      </div>
                      <div className="font-medium">
                        {request.Status === "Completed"
                          ? request.CollectionMethod === "Home"
                            ? "Tại nhà"
                            : "Cơ sở"
                          : request.StaffName || "Chưa phân công"}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-600">Tiến độ</div>
                      <div className="text-sm text-gray-600">{getProgressPercentage(request.Status)}%</div>
                    </div>
<div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(request.Status)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        {request.Status === "Input Infor" ? (
                          <>
                            <span>✏️</span> Điền thông tin
                          </>
                        ) : request.Status === "Completed" ? (
                          <>
                            <span>👁️</span> Xem kết quả
                          </>
                        ) : (
                          <>
                            <span>👁️</span> Xem tiến độ
                          </>
                        )}
                      </button>

                      {/* Download button chỉ hiện khi hoàn thành */}
                      {request.Status === "Completed" && (
                        <button
                          onClick={() =>
                            request.ServiceType === "Civil"
                              ? handleDownloadResults1(request)
                              : handleDownloadResults(request)
                          }
                          disabled={loadingDownload.has(request.TestRequestID)}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          {loadingDownload.has(request.TestRequestID) ? "⏳ Đang tải..." : "📄 Tải kết quả"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧬</span>
                </div>
                <div className="text-gray-500 mb-2">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "Không tìm thấy xét nghiệm nào"
                    : "Chưa có xét nghiệm nào"}
                </div>
                <div className="text-sm text-gray-400">
{searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "Thử lại với từ khóa tìm kiếm khác"
                    : "Các xét nghiệm của bạn sẽ hiển thị tại đây"}
                </div>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border">
            <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
            <p className="text-gray-600 mb-4">Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
            <div className="flex gap-4">
              <a
                href="tel:0123456789"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                📞 Gọi ngay: 0123 456 789
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=genunitycompany@gmail.com"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                rel="noreferrer"
              >
                ✉️ Email: genunitycompany@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Modal điền thông tin */}
        {isDetailModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <button
                        onClick={() => setIsDetailModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 text-sl"
                      >
                        <span>←</span>
                        <span>Quay lại</span>
                      </button>
                    </div>
                    <h2 className="text-xl font-bold">
                      Điền thông tin xét nghiệm - {selectedTest.ServiceType === "Civil" ? "Dân sự" : "Hành chính"}
                    </h2>
                  </div>
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
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Chi tiết tiến độ xét nghiệm</h2>
                  <button
                    onClick={() => setIsProgressModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <TestProgressTracker request={selectedTest} />
              </div>
            </div>
          </div>
        )}

        {/* Modal chi tiết kết quả */}
        <TestDetailModal
          isOpen={isResultDetailModalOpen}
          onClose={() => setIsResultDetailModalOpen(false)}
          testRequest={selectedTest}
        />
      </div>
    </div>
  )
}

// Component điền thông tin mẫu
const validationSchema = (serviceType: string, count: number) =>
  Yup.object().shape({
    samples: Yup.array()
      .of(
        Yup.object().shape({
          fullName: Yup.string().required("Họ tên là bắt buộc"),
          birthYear: Yup.number()
            .required("Năm sinh là bắt buộc")
            .min(1900, "Năm sinh không hợp lệ")
            .max(new Date().getFullYear() - 1, "Năm sinh không hợp lệ"),
          gender: Yup.string().required("Giới tính là bắt buộc"),
          relation: Yup.string().required("Mối quan hệ là bắt buộc"),
          sampleType: Yup.string().required("Loại mẫu là bắt buộc"),
          idNumber:
            serviceType === "Civil"
              ? Yup.string()
              : Yup.string()
                  .matches(/^\d{12}$/, "Phải đúng 12 chữ số")
                  .required("CMND/CCCD là bắt buộc"),
          file: serviceType === "Civil" ? Yup.mixed().nullable() : Yup.string().required("Cần có file đính kèm"),
        }),
      )
      .length(count)
      .test("unique-id-numbers", "CMND/CCCD không được trùng lặp trong cùng một yêu cầu", (samples) => {
        if (!samples) return true

        const idNumbers = samples.map((sample) => sample?.idNumber).filter((id) => id && id.trim() !== "")

        const uniqueIds = new Set(idNumbers)
        return uniqueIds.size === idNumbers.length
      }),
    acceptTerms: Yup.boolean().oneOf([true], "Bạn phải đồng ý với điều khoản và điều kiện"),
  })

const TestInfoForm: React.FC<{
  sampleCount: number
  onClose: () => void
  request: TestProcess
  onSubmitted: () => void
}> = ({ sampleCount, onClose, request, onSubmitted }) => {
  const initialSamples = Array.from({ length: sampleCount }, () => ({
    fullName: "",
    birthYear: "",
    gender: "",
    relation: "",
    sampleType: "",
    idNumber: "",
    file: null,
  }))
const initialValues = {
    samples: initialSamples,
    acceptTerms: false,
  }

  const handleSubmit = async (values: { samples: SampleInfo[]; acceptTerms: boolean }) => {
    try {
      for (let i = 0; i < values.samples.length; i++) {
        const sample = values.samples[i]
        const formData = new FormData()
        formData.append("TesterName", sample.fullName)
        formData.append("YOB", sample.birthYear.toString())
        formData.append("Gender", sample.gender)
        formData.append("Relationship", sample.relation)
        formData.append("SampleType", sample.sampleType)
        formData.append("CMND", sample.idNumber)
        if (sample.file) {
          formData.append("File", sample.file)
        }
        await testRequestService.createSampleCategory(request.TestRequestID, formData)
      }

      toast.success("✅ Gửi mẫu thành công!")
      onClose()
      onSubmitted()
    } catch (err) {
      console.error("❌ Lỗi gửi mẫu:", err)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(request.ServiceType, sampleCount)}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          {values.samples.map((sample, i) => (
            <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-4">Mẫu {i + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Họ tên *</label>
                  <Field name={`samples[${i}].fullName`} className="input" placeholder="Nhập họ tên" />
                  <ErrorMessage name={`samples[${i}].fullName`} component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Năm sinh *</label>
                  <Field type="number" name={`samples[${i}].birthYear`} className="input" placeholder="VD: 1990" />
                  <ErrorMessage name={`samples[${i}].birthYear`} component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Giới tính *</label>
                  <Field as="select" name={`samples[${i}].gender`} className="input">
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </Field>
                  <ErrorMessage name={`samples[${i}].gender`} component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Mối quan hệ *</label>
                  <Field name={`samples[${i}].relation`} className="input" placeholder="VD: Cha, Con..." />
<ErrorMessage name={`samples[${i}].relation`} component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Loại mẫu *</label>
                  <Field as="select" name={`samples[${i}].sampleType`} className="input">
                    <option value="">Chọn loại mẫu</option>
                    <option value="Máu">Máu</option>
                    <option value="Nước Bọt">Nước bọt</option>
                    <option value="Tóc">Tóc</option>
                  </Field>
                  <ErrorMessage name={`samples[${i}].sampleType`} component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">CMND/CCCD *</label>
                  <Field name={`samples[${i}].idNumber`} className="input" placeholder="12 chữ số" />
                  <ErrorMessage name={`samples[${i}].idNumber`} component="div" className="text-red-500 text-sm" />
                </div>

                {request.ServiceType !== "Civil" && (
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium">Hình ảnh chữ ký *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setFieldValue(`samples[${i}].file`, reader.result)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                    <ErrorMessage name={`samples[${i}].file`} component="div" className="text-red-500 text-sm" />
                  </div>
                )}
              </div>
            </div>
          ))}

          <ErrorMessage
            name="samples"
            render={(msg) => (typeof msg === "string" ? <div className="text-red-500 text-sm mb-4">{msg}</div> : null)}
          />

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Field type="checkbox" name="acceptTerms" className="mt-1" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900">
                  Tôi đồng ý với{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline"
                    rel="noreferrer"
                  >
                    Điều khoản và Điều kiện
                  </a>{" "}
                  của dịch vụ xét nghiệm DNA *
                </label>
<p className="text-xs text-gray-600 mt-1">
                  Bằng cách đánh dấu vào ô này, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với tất cả các điều khoản
                  và điều kiện của chúng tôi.
                </p>
              </div>
            </div>
            <ErrorMessage name="acceptTerms" component="div" className="text-red-500 text-sm mt-2" />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full max-w-md bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Xác nhận thông tin
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

// Component theo dõi tiến độ
const TestProgressTracker: React.FC<{
  request: TestProcess
}> = ({ request }) => {
  const stepDefs = ["Input Infor", "Pending", "Confirmed", "In Progress", "Completed"]

  const currentIndex = stepDefs.indexOf(request.Status)

  const progressSteps = stepDefs.map((step, index) => ({
    id: step,
    title:
      step === "Input Infor"
        ? "Điền thông tin"
        : step === "Pending"
          ? "Đang chờ xác nhận"
          : step === "Confirmed"
            ? "Đã xác nhận"
            : step === "In Progress"
              ? "Đang thực hiện"
              : "Hoàn thành",
    description: "",
    status:
      index < currentIndex
        ? "Completed"
        : index === currentIndex
          ? request.Status === "Completed"
            ? "Completed"
            : "In Progress"
          : "Pending",
    date: "",
  }))

  const getProgressPercentage = () => {
    const completedSteps = progressSteps.filter((step) => step.status === "Completed").length
    return Math.round((completedSteps / progressSteps.length) * 100)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">{request.ServiceName}</h3>
          <p className="text-sm text-gray-600">
            Mã đăng ký: {request.TestRequestID} 🔸 {request.SampleCount} mẫu 🔸Mã kit: {request.KitID || ""}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Địa điểm</p>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
            {request.CollectionMethod === "Home" ? "Tại nhà" : "Cơ sở"}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Tiến độ tổng thể</span>
          <span className="text-sm text-gray-600">{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {progressSteps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "in_progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "Completed" ? "✓" : step.status === "In Progress" ? "⏳" : "○"}
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`w-0.5 h-8 ${step.status === "Completed" ? "bg-green-200" : "bg-gray-200"}`}></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <div className="text-right">
                  {step.status === "Completed" && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Hoàn thành</span>
                  )}
                  {step.status === "In Progress" && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Đang thực hiện</span>
                  )}
                  {step.date && <p className="text-xs text-gray-500 mt-1">{step.date}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Thông tin liên hệ</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span>📞</span>
            <span>Hotline: 0123456789</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>✉️</span>
            <span>Email: genunitycompany@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestManagement
