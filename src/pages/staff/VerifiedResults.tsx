"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { EyeIcon, MagnifyingGlassIcon, XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import DashboardSidebar from "../../components/Common/Sidebar"
import type { VerifiedResult, VerifiedResultDetail } from "../../utils/types"
import { staffService } from "../../services/staffService"

const VerifiedResults: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedResult, setSelectedResult] = useState<VerifiedResultDetail | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [results, setResults] = useState<VerifiedResult[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await staffService.getVerifiedResults()
                setResults(data)
            } catch (error) {
                console.error("Error fetching verified results:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [])

    const filteredResults = results.filter(
        (result) =>
            result.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.TestRequestID.toString().includes(searchQuery.toLowerCase()) ||
            result.ServiceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.KitID?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleViewResult = async (resultId: number) => {
        try {
            const result = await staffService.getVerifiedResultDetail(resultId)
            setSelectedResult(result)
            setShowModal(true)
        } catch (error) {
            console.error("Error fetching result details:", error)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedResult(null)
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Không rõ"
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return "Không rõ"
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar />
                <div className="flex-1 p-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded mb-6"></div>
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar />

            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                        <DocumentTextIcon className="w-6 h-6 mr-2" />
                        Lịch sử kết quả đã xác nhận
                    </h1>
                    <p className="text-gray-600">Xem lại các kết quả xét nghiệm đã được manager xác nhận</p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách kết quả đã xác nhận</h2>

                            {/* Search Bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên khách hàng, mã yêu cầu, mã kit..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mã yêu cầu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mã Kit
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dịch vụ
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Địa điểm
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày xác nhận
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredResults.map((result) => (
                                        <tr key={result.TestResultID} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {result.TestRequestID}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.KitID || "N/A"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.CustomerName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {result.ServiceName} - {result.ServiceType === "Civil" ? "Dân sự" : "Hành chính"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {result.CollectionMethod === "Home" ? "Tại Nhà" : "Tại Trung Tâm"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDateTime(result.VerifiedDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleViewResult(result.TestResultID)}
                                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                                    title="Xem chi tiết"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredResults.length === 0 && (
                            <div className="text-center py-8">
                                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Không có kết quả nào</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchQuery
                                        ? "Không tìm thấy kết quả phù hợp với từ khóa tìm kiếm."
                                        : "Chưa có kết quả xét nghiệm nào được xác nhận."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && selectedResult && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">Chi tiết kết quả xét nghiệm</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Mã yêu cầu</label>
                                                <p className="text-sm text-gray-900">{selectedResult.TestRequestID}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Mã Kit</label>
                                                <p className="text-sm text-gray-900">{selectedResult.KitID || "N/A"}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Khách hàng</label>
                                                <p className="text-sm text-gray-900">{selectedResult.CustomerName}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                                <p className="text-sm text-gray-900">{selectedResult.CustomerEmail}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                                                <p className="text-sm text-gray-900">{selectedResult.CustomerPhone || "Không có"}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                                                <p className="text-sm text-gray-900">{selectedResult.CustomerAddress || "Không có"}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Dịch vụ</label>
                                                <p className="text-sm text-gray-900">
                                                    {selectedResult.ServiceName} -{" "}
                                                    {selectedResult.ServiceType === "Civil" ? "Dân sự" : "Hành chính"}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Số lượng mẫu</label>
                                                <p className="text-sm text-gray-900">{selectedResult.SampleCount}</p>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Địa điểm lấy mẫu</label>
                                                <p className="text-sm text-gray-900">
                                                    {selectedResult.CollectionMethod === "Home" ? "Tại Nhà" : "Tại Trung Tâm"}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Ngày đăng ký</label>
                                                <p className="text-sm text-gray-900">{formatDate(selectedResult.RegistrationDate)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Ngày lấy mẫu</label>
                                                <p className="text-sm text-gray-900">{formatDate(selectedResult.SampleDate)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Ngày nhập kết quả</label>
                                                <p className="text-sm text-gray-900">{formatDateTime(selectedResult.EnterDate)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Ngày xác nhận</label>
                                                <p className="text-sm text-gray-900">{formatDateTime(selectedResult.VerifiedDate)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Nhân viên thực hiện</label>
                                                <p className="text-sm text-gray-900">{selectedResult.StaffName}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Manager xác nhận</label>
                                                <p className="text-sm text-gray-900">{selectedResult.ManagerName || "Không có"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Test Subjects */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Người xét nghiệm</label>
                                        <p className="text-sm text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-md">
                                            {selectedResult.TestSubjects}
                                        </p>
                                    </div>

                                    {/* Test Result */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Kết quả xét nghiệm</label>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p className="text-sm text-gray-900 whitespace-pre-line">{selectedResult.Result}</p>
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

export default VerifiedResults