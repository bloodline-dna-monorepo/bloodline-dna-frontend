import React, { useState } from 'react'
import {
    EyeIcon,
    MagnifyingGlassIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import StaffSidebar from '../../components/StaffSidebar/StaffSidebar'
import { useNavigate } from 'react-router-dom'

const ConfirmedRequests: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRequest, setSelectedRequest] = useState<typeof confirmedRequests[0] | null>(null)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    // Sample data for confirmed requests
    const confirmedRequests = [
        {
            id: 2,
            customerName: 'Nguyễn Văn A',
            testType: 'Xét nghiệm huyết thống',
            requestDate: '2/3/2024',
            location: 'Tại Trung Tâm',
            status: 'Đã xác nhận',
            priority: 'Cao',
            phone: '0123456789',
            email: 'nguyenvana@gmail.com',
            sampleCount: 1,
            testSubjects: 'Nguyễn Văn A',
            currentStatus: 'Đã xác nhận',
            testLocation: 'Tại trung tâm',
            confirmDate: '3/3/2024',
            staffConfirmed: 'Nhân viên Y tế'
        },
        {
            id: 3,
            customerName: 'Trần Thị B',
            testType: 'Xét nghiệm ADN Cha Con',
            requestDate: '1/3/2024',
            location: 'Tại Nhà',
            status: 'Đã xác nhận',
            priority: 'Trung bình',
            phone: '0987654321',
            email: 'tranthib@gmail.com',
            sampleCount: 2,
            testSubjects: 'Trần Thị B (Mẹ)\nTrần Văn C (Con)',
            currentStatus: 'Đã xác nhận',
            testLocation: 'Tại nhà',
            confirmDate: '2/3/2024',
            staffConfirmed: 'Nhân viên Y tế'
        }
    ]

    const filteredRequests = confirmedRequests.filter(request =>
        request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.testType.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleViewRequest = (requestId: number) => {
        const request = confirmedRequests.find(req => req.id === requestId)
        if (request) {
            setSelectedRequest(request)
            setShowModal(true)
        }
    }

    const handleStartProcess = (requestId: number) => {
        const request = confirmedRequests.find(req => req.id === requestId)
        if (request) {
            if (request.location === 'Tại Trung Tâm') {
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

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <StaffSidebar />

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
                                    className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
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
                                    {filteredRequests.map((request) => (
                                        <tr key={request.id} className='hover:bg-gray-50'>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                {request.id}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {request.customerName}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {request.testType}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {request.requestDate}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {request.location}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                                                <button
                                                    onClick={() => handleViewRequest(request.id)}
                                                    className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100'
                                                    title='Xem chi tiết'
                                                >
                                                    <EyeIcon className='h-5 w-5' />
                                                </button>
                                                <button
                                                    onClick={() => handleStartProcess(request.id)}
                                                    className='px-3 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition-colors'
                                                    title='Bắt đầu'
                                                >
                                                    Bắt đầu
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
                                    {searchQuery ? 'Không tìm thấy yêu cầu phù hợp với từ khóa tìm kiếm.' : 'Chưa có yêu cầu xét nghiệm nào được xác nhận.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && selectedRequest && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Chi tiết yêu cầu xét nghiệm
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Mã yêu cầu
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.id}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Loại xét nghiệm
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.testType}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Số điện thoại
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.phone}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Số lượng mẫu
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.sampleCount}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Trạng thái
                                                </label>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {selectedRequest.currentStatus}
                                                </span>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Ngày xác nhận
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.confirmDate}</p>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Khách hàng
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.customerName}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Ngày yêu cầu
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.requestDate}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Email
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.email}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Người xét nghiệm
                                                </label>
                                                <p className="text-sm text-gray-900 whitespace-pre-line">
                                                    {selectedRequest.testSubjects}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Địa điểm
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.testLocation}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Nhân viên xác nhận
                                                </label>
                                                <p className="text-sm text-gray-900">{selectedRequest.staffConfirmed}</p>
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
