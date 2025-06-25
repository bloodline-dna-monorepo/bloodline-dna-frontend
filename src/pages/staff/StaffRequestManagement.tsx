import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Search, Trash2, Check, Home, Building2, FileText } from 'lucide-react'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffRequestManagement = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [activeTab, setActiveTab] = useState('center')

    // Data đơn giản - không dùng localStorage phức tạp
    const [centerRequests, setCenterRequests] = useState([
        { id: 'TR001', customerName: 'Nguyen Van A', testType: 'Xét nghiệm ADN cha con', requestDate: '2/3/2024', status: 'pending' },
        { id: 'TR002', customerName: 'Tran Thi B', testType: 'Xét nghiệm huyết thống', requestDate: '5/3/2024', status: 'pending' },
        { id: 'TR003', customerName: 'Le Van C', testType: 'Xét nghiệm di truyền', requestDate: '8/3/2024', status: 'assigned' }
    ])

    const [homeRequests, setHomeRequests] = useState([
        { id: 'TH001', customerName: 'Hoang Thi E', testType: 'Lấy mẫu tại nhà - ADN', requestDate: '10/3/2024', status: 'pending', address: '123 Nguyen Trai, Q1' },
        { id: 'TH002', customerName: 'Vu Van F', testType: 'Lấy mẫu tại nhà - Huyết thống', requestDate: '12/3/2024', status: 'assigned', address: '456 Le Loi, Q3' },
        { id: 'TH003', customerName: 'Do Thi G', testType: 'Lấy mẫu tại nhà - Di truyền', requestDate: '15/3/2024', status: 'pending', address: '789 Tran Hung Dao, Q5' }
    ])

    // Hàm đơn giản để đảm nhận
    const handleAssign = (requestId, type) => {
        if (type === 'center') {
            setCenterRequests(prev =>
                prev.map(req =>
                    req.id === requestId
                        ? { ...req, status: req.status === 'pending' ? 'assigned' : 'pending' }
                        : req
                )
            )
        } else {
            setHomeRequests(prev =>
                prev.map(req =>
                    req.id === requestId
                        ? { ...req, status: req.status === 'pending' ? 'assigned' : 'pending' }
                        : req
                )
            )
        }
        alert('Cập nhật trạng thái thành công!')
    }

    // Hàm đơn giản để xóa
    const handleDelete = (requestId, type) => {
        if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
            if (type === 'center') {
                setCenterRequests(prev => prev.filter(req => req.id !== requestId))
            } else {
                setHomeRequests(prev => prev.filter(req => req.id !== requestId))
            }
            alert('Xóa thành công!')
        }
    }

    // Chọn data hiện tại
    const currentRequests = activeTab === 'center' ? centerRequests : homeRequests

    // Lọc data đơn giản
    const filteredRequests = currentRequests.filter(req => {
        const matchSearch = req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchStatus = statusFilter === 'all' || req.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <StaffLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý yêu cầu xét nghiệm</h1>
                    <p className="text-gray-600 mt-2">Đảm nhận và quản lý các yêu cầu xét nghiệm</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('center')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'center'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500'
                                }`}
                        >
                            <Building2 className="w-4 h-4 mr-2" />
                            Trung tâm ({centerRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'home'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500'
                                }`}
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Tại nhà ({homeRequests.length})
                        </button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc mã yêu cầu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ đảm nhận</option>
                        <option value="assigned">Đã đảm nhận</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đảm nhận</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã yêu cầu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại xét nghiệm</th>
                                {activeTab === 'home' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa chỉ</th>
                                )}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày yêu cầu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map(request => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleAssign(request.id, activeTab)}
                                            className={`p-2 rounded-full transition-colors ${request.status === 'assigned'
                                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                }`}
                                            title={request.status === 'assigned' ? 'Bỏ đảm nhận' : 'Đảm nhận'}
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{request.customerName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{request.testType}</td>
                                    {activeTab === 'home' && request.address && (
                                        <td className="px-6 py-4 text-sm text-gray-600">{request.address}</td>
                                    )}
                                    <td className="px-6 py-4 text-sm text-gray-900">{request.requestDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${request.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {request.status === 'pending' ? 'Chờ đảm nhận' : 'Đã đảm nhận'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/staff-preview/request/${request.id}`)}
                                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(request.id, activeTab)}
                                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                                title="Xóa yêu cầu"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy yêu cầu nào</h3>
                        <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                    </div>
                )}
            </div>
        </StaffLayout>
    )
}

export default StaffRequestManagement
