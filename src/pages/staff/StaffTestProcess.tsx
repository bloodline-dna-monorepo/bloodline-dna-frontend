import React, { useState, useEffect } from 'react'
import { Play, CheckCircle, Home, Building2, User, Calendar, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffTestProcess = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('center')
    type Process = {
        id: string | number
        processStatus?: string
        customerName?: string
        requestDate?: string
        testType?: string
        address?: string
    }

    const [centerProcesses, setCenterProcesses] = useState<Process[]>([])
    const [homeProcesses, setHomeProcesses] = useState<Process[]>([])

    // Lấy data từ localStorage khi component mount
    useEffect(() => {
        const assignedRequests = JSON.parse(localStorage.getItem('assignedRequests') || '{"center": [], "home": []}')
        setCenterProcesses(assignedRequests.center || [])
        setHomeProcesses(assignedRequests.home || [])
    }, [])

    type ProcessStatus = 'pending' | 'in-progress' | 'completed';

    const updateProcessStatus = (
        requestId: string | number,
        newStatus: ProcessStatus,
        type: string
    ) => {
        // Update state
        if (type === 'center') {
            setCenterProcesses(prev => {
                const updated = prev.map(req =>
                    req.id === requestId ? { ...req, processStatus: newStatus } : req
                )

                // Sync localStorage
                const currentData = JSON.parse(localStorage.getItem('assignedRequests') || '{"center": [], "home": []}')
                currentData.center = updated
                localStorage.setItem('assignedRequests', JSON.stringify(currentData))

                return updated
            })
        } else {
            setHomeProcesses(prev => {
                const updated = prev.map(req =>
                    req.id === requestId ? { ...req, processStatus: newStatus } : req
                )

                // Sync localStorage
                const currentData = JSON.parse(localStorage.getItem('assignedRequests') || '{"center": [], "home": []}')
                currentData.home = updated
                localStorage.setItem('assignedRequests', JSON.stringify(currentData))

                return updated
            })
        }

        // Success message
        const statusText: Record<ProcessStatus, string> = {
            'pending': 'Chờ xử lý',
            'in-progress': 'Đang xử lý',
            'completed': 'Hoàn thành'
        }
        alert(`Cập nhật trạng thái ${requestId} thành "${statusText[newStatus]}" thành công!`)
    }

    const getStatusColor = (status: 'pending' | 'in-progress' | 'completed' | string) => {
        const colors: Record<'pending' | 'in-progress' | 'completed', string> = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800'
        }
        return colors[status as 'pending' | 'in-progress' | 'completed'] || 'bg-gray-100 text-gray-800'
    }

    const getStatusText = (status: string) => {
        const texts: Record<'pending' | 'in-progress' | 'completed', string> = {
            'pending': 'Chờ xử lý',
            'in-progress': 'Đang xử lý',
            'completed': 'Hoàn thành'
        }
        return texts[status as 'pending' | 'in-progress' | 'completed'] || 'Không xác định'
    }

    const currentProcesses = activeTab === 'center' ? centerProcesses : homeProcesses

    return (
        <StaffLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quy trình xét nghiệm</h1>
                        <p className="text-gray-600 mt-2">Theo dõi và quản lý tiến độ xét nghiệm</p>
                    </div>
                    <div className="text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                        🔄 Chỉ hiển thị các yêu cầu đã được đảm nhận
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('center')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'center'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Building2 className="w-4 h-4 mr-2" />
                            Xử lý tại trung tâm ({centerProcesses.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'home'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Lấy mẫu tại nhà ({homeProcesses.length})
                        </button>
                    </div>
                </div>

                {/* Process List */}
                {currentProcesses.length > 0 ? (
                    <div className="space-y-4">
                        {currentProcesses.map((process) => (
                            <div key={process.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-gray-900">#{process.id}</span>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(process.processStatus || 'pending')
                                                }`}>
                                                {getStatusText(process.processStatus || 'pending')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/staff-preview/process/${process.id}`)}
                                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                            title="Xem chi tiết"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => updateProcessStatus(process.id, 'in-progress', activeTab)}
                                            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                                            disabled={process.processStatus === 'completed'}
                                        >
                                            <Play className="w-3 h-3 mr-1" />
                                            Bắt đầu
                                        </button>
                                        <button
                                            onClick={() => updateProcessStatus(process.id, 'completed', activeTab)}
                                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
                                            disabled={process.processStatus === 'completed'}
                                        >
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Hoàn thành
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <User className="w-4 h-4 mr-2" />
                                            Khách hàng: <span className="font-medium ml-1">{process.customerName}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Ngày yêu cầu: <span className="font-medium ml-1">{process.requestDate}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Loại xét nghiệm: <span className="font-medium">{process.testType}</span>
                                        </p>
                                        {activeTab === 'home' && process.address && (
                                            <p className="text-sm text-gray-600">
                                                Địa chỉ: <span className="font-medium">{process.address}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            {activeTab === 'center' ?
                                <Building2 className="w-10 h-10 text-gray-400" /> :
                                <Home className="w-10 h-10 text-gray-400" />
                            }
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-3">
                            Chưa có quy trình {activeTab === 'center' ? 'xử lý tại trung tâm' : 'lấy mẫu tại nhà'} nào
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Các yêu cầu sẽ xuất hiện ở đây sau khi bạn đảm nhận chúng từ trang "Quản lý yêu cầu xét nghiệm".
                        </p>
                    </div>
                )}
            </div>
        </StaffLayout>
    )
}

export default StaffTestProcess