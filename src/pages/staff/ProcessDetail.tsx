import React, { useState } from 'react';
import DashboardSidebar from '../../components/Layout/DashboardSidebar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiCheckCircle, FiClock, FiAlertCircle, FiDownload, FiEdit, FiUpload } from 'react-icons/fi';

const ProcessDetail = () => {
    const [processData] = useState({
        id: 'PROC001',
        requestId: 'REQ001',
        customerName: 'Nguyễn Văn A',
        testType: 'Xét nghiệm ADN cha con',
        status: 'processing',
        progress: 60,
        steps: [
            {
                id: 1,
                name: 'Tiếp nhận mẫu vật',
                status: 'completed',
                completedAt: '2024-06-20 09:00',
                assignedTo: 'Nguyễn Văn B',
                description: 'Mẫu đã được tiếp nhận và kiểm tra chất lượng'
            },
            {
                id: 2,
                name: 'Chuẩn bị mẫu xét nghiệm',
                status: 'completed',
                completedAt: '2024-06-20 10:30',
                assignedTo: 'Trần Thị C',
                description: 'Mẫu đã được chuẩn bị và đóng gói theo quy trình'
            },
            {
                id: 3,
                name: 'Xét nghiệm PCR',
                status: 'processing',
                startedAt: '2024-06-20 14:00',
                assignedTo: 'Lê Văn D',
                description: 'Đang tiến hành xét nghiệm PCR, dự kiến hoàn thành trong 2 giờ'
            },
            {
                id: 4,
                name: 'Phân tích kết quả',
                status: 'pending',
                assignedTo: 'Phạm Thị E',
                description: 'Chờ hoàn thành bước trước để bắt đầu phân tích'
            },
            {
                id: 5,
                name: 'Kiểm tra chất lượng',
                status: 'pending',
                assignedTo: 'Nguyễn Văn F',
                description: 'Kiểm tra và xác nhận độ chính xác của kết quả'
            },
            {
                id: 6,
                name: 'Hoàn thành báo cáo',
                status: 'pending',
                assignedTo: 'Trần Thị G',
                description: 'Tạo báo cáo cuối cùng và gửi cho khách hàng'
            }
        ]
    });

    const [selectedStep, setSelectedStep] = useState(null);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <FiCheckCircle className="text-green-500" size={20} />;
            case 'processing':
                return <FiClock className="text-blue-500" size={20} />;
            case 'pending':
                return <FiAlertCircle className="text-gray-400" size={20} />;
            default:
                return <FiClock className="text-gray-400" size={20} />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Hoàn thành';
            case 'processing':
                return 'Đang thực hiện';
            case 'pending':
                return 'Chờ thực hiện';
            default:
                return 'Không xác định';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Chi tiết quy trình {processData.id}</h1>
                            <p className="text-gray-600 text-sm">Theo dõi chi tiết từng bước thực hiện</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                <FiUpload size={16} />
                                <span>Cập nhật kết quả</span>
                            </button>
                            <div className="relative">
                                <IoMdNotificationsOutline size={24} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Process Timeline */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Tiến trình thực hiện</h3>

                                    <div className="space-y-6">
                                        {processData.steps.map((step, index) => (
                                            <div key={step.id} className="flex items-start space-x-4">
                                                <div className="flex flex-col items-center">
                                                    {getStatusIcon(step.status)}
                                                    {index < processData.steps.length - 1 && (
                                                        <div className="w-px h-16 bg-gray-200 mt-2"></div>
                                                    )}
                                                </div>

                                                <div className="flex-1 pb-4">
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-800">{step.name}</h4>
                                                            <button
                                                                onClick={() => setSelectedStep(step)}
                                                                className="text-teal-600 hover:text-teal-800"
                                                            >
                                                                <FiEdit size={16} />
                                                            </button>
                                                        </div>

                                                        <p className="text-sm text-gray-600 mb-2">
                                                            Phụ trách: <span className="font-medium">{step.assignedTo}</span>
                                                        </p>

                                                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                {step.completedAt && (
                                                                    <p className="text-green-600 text-xs">
                                                                        ✓ Hoàn thành: {step.completedAt}
                                                                    </p>
                                                                )}

                                                                {step.startedAt && step.status === 'processing' && (
                                                                    <p className="text-blue-600 text-xs">
                                                                        🔄 Bắt đầu: {step.startedAt}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${step.status === 'completed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : step.status === 'processing'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {getStatusText(step.status)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Process Info */}
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cơ bản</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600">Mã quy trình</p>
                                            <p className="font-medium text-gray-800">{processData.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Mã yêu cầu</p>
                                            <p className="font-medium text-gray-800">{processData.requestId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Khách hàng</p>
                                            <p className="font-medium text-gray-800">{processData.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Loại xét nghiệm</p>
                                            <p className="font-medium text-gray-800">{processData.testType}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tiến độ</h3>
                                    <div className="text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-4">
                                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    className="text-gray-200"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeDasharray={`${processData.progress * 0.628} 62.8`}
                                                    className="text-teal-600"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xl font-bold text-gray-800">{processData.progress}%</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">Hoàn thành</p>
                                    </div>
                                </div>

                                {/* Sample Info */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin mẫu</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Mẫu 1 (Cha):</span>
                                            <span className="text-green-600 font-medium">Chất lượng tốt</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Mẫu 2 (Con):</span>
                                            <span className="text-green-600 font-medium">Chất lượng tốt</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Bảo quản:</span>
                                            <span className="text-gray-800">-20°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Ngày nhận:</span>
                                            <span className="text-gray-800">20/06/2024</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="bg-white rounded-lg p-6 shadow-sm border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Thao tác</h3>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                            <FiEdit size={16} />
                                            <span>Cập nhật tiến độ</span>
                                        </button>
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                            <FiDownload size={16} />
                                            <span>Tải xuống báo cáo</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProcessDetail;