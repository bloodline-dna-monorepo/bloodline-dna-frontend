import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline, IoMdSearch } from 'react-icons/io';
import { FiFilter, FiDownload, FiEye, FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import Sidebar from '../../components/Common/Sidebar';

const TestRequests = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('center');
    const [searchTerm, setSearchTerm] = useState('');

    // State để track các request đã được đảm nhận
    const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);

    // Data cho xét nghiệm tại trung tâm
    const centerRequests = [
        {
            id: 'TR001',
            customerName: 'Nguyen Van A',
            testType: 'Xét nghiệm ADN cha con',
            requestDate: '2/3/2024',
            status: 'pending',
            checkbox: true
        },
        {
            id: 'TR002',
            customerName: 'Tran Thi B',
            testType: 'Xét nghiệm huyết thống',
            requestDate: '5/3/2024',
            status: 'pending',
            checkbox: true
        },
        {
            id: 'TR003',
            customerName: 'Le Van C',
            testType: 'Xét nghiệm di truyền',
            requestDate: '8/3/2024',
            status: 'pending',
            checkbox: true
        }
    ];

    // Data cho lấy mẫu tại nhà
    const homeRequests = [
        {
            id: 'TH001',
            customerName: 'Hoang Thi E',
            testType: 'Lấy mẫu tại nhà - ADN',
            address: '123 Nguyen Trai, Q1',
            requestDate: '10/3/2024',
            status: 'pending'
        },
        {
            id: 'TH002',
            customerName: 'Vu Van F',
            testType: 'Lấy mẫu tại nhà - Huyết thống',
            address: '456 Le Loi, Q3',
            requestDate: '12/3/2024',
            status: 'pending'
        },
        {
            id: 'TH003',
            customerName: 'Do Thi G',
            testType: 'Lấy mẫu tại nhà - Di truyền',
            address: '789 Tran Hung Dao, Q5',
            requestDate: '15/3/2024',
            status: 'pending'
        }
    ];

    // Xử lý đảm nhận yêu cầu
    const handleAcceptRequest = (requestId: string, requestData: any) => {
        setAcceptedRequests(prev => [...prev, requestId]);

        // Lưu thông tin đầy đủ
        const processData = {
            id: `PROC${requestId.slice(2)}`,
            requestId: requestId,
            customerName: requestData.customerName,
            testType: requestData.testType,
            requestDate: requestData.requestDate,
            address: requestData.address || "",
            status: 'processing',
            progress: 10,
            acceptedAt: new Date().toISOString(),
            acceptedBy: 'Staff User'
        };

        const existingProcesses = JSON.parse(localStorage.getItem('testProcesses') || '[]');
        // Không thêm trùng
        if (!existingProcesses.some((p: any) => p.requestId === requestId)) {
            existingProcesses.push(processData);
            localStorage.setItem('testProcesses', JSON.stringify(existingProcesses));
        }
    };

    const getStatusBadge = (status: string, requestId: string) => {
        if (acceptedRequests.includes(requestId)) {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center space-x-1">
                    <FiCheck size={12} />
                    <span>Đã đảm nhận</span>
                </span>
            );
        }

        return (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Chờ đảm nhận
            </span>
        );
    };

    const TabButton = ({ tabKey, label, count, isActive, onClick }: any) => (
        <button
            onClick={() => onClick(tabKey)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${isActive
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
        >
            <span>{label}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                ({count})
            </span>
        </button>
    );

    // Filter requests để loại bỏ những cái đã đảm nhận
    const filterRequests = (requests: any[]) => {
        return requests.filter(request => !acceptedRequests.includes(request.id));
    };

    const pendingCenterRequests = filterRequests(centerRequests);
    const pendingHomeRequests = filterRequests(homeRequests);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Quản lý yêu cầu xét nghiệm</h1>
                            <p className="text-gray-600 text-sm">Đảm nhận và quản lý các yêu cầu xét nghiệm</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                                <span className="text-yellow-800 text-sm">💡 Tick vào "Đảm nhận" để chuyển yêu cầu vào Quy trình xét nghiệm</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow-sm border mb-6">
                        <div className="border-b">
                            <nav className="flex space-x-8 px-6">
                                <TabButton
                                    tabKey="center"
                                    label="🏥 Xét nghiệm tại trung tâm"
                                    count={pendingCenterRequests.length}
                                    isActive={activeTab === 'center'}
                                    onClick={setActiveTab}
                                />
                                <TabButton
                                    tabKey="home"
                                    label="🏠 Lấy mẫu tại nhà"
                                    count={pendingHomeRequests.length}
                                    isActive={activeTab === 'home'}
                                    onClick={setActiveTab}
                                />
                            </nav>
                        </div>

                        {/* Search and Filter */}
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <div className="relative flex-1 max-w-md">
                                    <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên hoặc mã yêu cầu..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Tất cả trạng thái</option>
                                        <option>Chờ đảm nhận</option>
                                        <option>Đã đảm nhận</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        {activeTab === 'center' && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ĐẢM NHẬN
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            MÃ YÊU CẦU
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            KHÁCH HÀNG
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            LOẠI XÉT NGHIỆM
                                        </th>
                                        {activeTab === 'home' && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ĐỊA CHỈ
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            NGÀY YÊU CẦU
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            TRẠNG THÁI
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            THAO TÁC
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(
                                        // Sắp xếp: chưa đảm nhận lên đầu
                                        (activeTab === 'center' ? centerRequests : homeRequests)
                                            .slice()
                                            .sort((a, b) => {
                                                const aAccepted = acceptedRequests.includes(a.id);
                                                const bAccepted = acceptedRequests.includes(b.id);
                                                if (aAccepted === bAccepted) return 0;
                                                return aAccepted ? 1 : -1;
                                            })
                                    ).map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            {/* Đảm nhận cho cả 2 tab */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {acceptedRequests.includes(request.id) ? (
                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                        <FiCheck size={16} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAcceptRequest(request.id, request)}
                                                        className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:border-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 group bg-white"
                                                        title="Click để đảm nhận"
                                                    >
                                                        <FiCheck size={14} className="text-gray-300 group-hover:text-white transition-colors" />
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {request.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {request.customerName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {request.testType}
                                            </td>
                                            {activeTab === 'home' && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {(request as any).address}
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {request.requestDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(request.status, request.id)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                                        <FiEye size={16} />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900 p-1 rounded">
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty state */}
                        {(activeTab === 'center' ? pendingCenterRequests : pendingHomeRequests).length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-lg mb-2">🎉</div>
                                <p className="text-gray-500">Không có yêu cầu nào chờ đảm nhận</p>
                                <p className="text-gray-400 text-sm">Tất cả yêu cầu đã được đảm nhận</p>
                            </div>
                        )}
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-yellow-600 text-xl">📋</span>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Chờ đảm nhận ({activeTab === 'center' ? 'Trung tâm' : 'Tại nhà'})</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {activeTab === 'center' ? pendingCenterRequests.length : pendingHomeRequests.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-yellow-600 text-xl">🏠</span>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Chờ đảm nhận (Tại nhà)</p>
                                    <p className="text-2xl font-bold text-gray-800">{pendingHomeRequests.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 text-xl">✅</span>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Đã đảm nhận</p>
                                    <p className="text-2xl font-bold text-gray-800">{acceptedRequests.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestRequests;