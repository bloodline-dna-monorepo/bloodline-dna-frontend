<<<<<<< Updated upstream
import React from 'react';
import DashboardSidebar from '../../components/Layout/DashboardSidebar';
import { IoMdNotificationsOutline, IoMdSearch } from 'react-icons/io';
import { FiFileText, FiClock, FiCheckCircle, FiUsers, FiUser, FiActivity } from 'react-icons/fi';

const StaffDashboard = () => {
    const statsCards = [
        {
            title: 'Yêu cầu chờ',
            value: '24',
=======
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline, IoMdSearch } from 'react-icons/io';
import {
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiUsers,
    FiUser,
    FiActivity
} from 'react-icons/fi';

// Define interface for process data
interface ProcessData {
    status: string;
    customerName: string;
}

const StaffDashboard = () => {
    const navigate = useNavigate();

    // Lấy dữ liệu từ localStorage để hiển thị stats thực tế
    const testProcesses = JSON.parse(localStorage.getItem('testProcesses') || '[]');

    // Tính toán stats dựa trên dữ liệu thực
    const stats = useMemo(() => {
        const pendingCount = testProcesses.filter((p: ProcessData) => p.status === 'pending').length;
        const processingCount = testProcesses.filter((p: ProcessData) => p.status === 'processing').length;
        const completedCount = testProcesses.filter((p: ProcessData) => p.status === 'completed').length;
        const totalCustomers = new Set(testProcesses.map((p: ProcessData) => p.customerName)).size;

        return {
            pending: pendingCount,
            processing: processingCount,
            completed: completedCount,
            customers: totalCustomers
        };
    }, [testProcesses]);

    const statsCards = [
        {
            title: 'Yêu cầu chờ',
            value: stats.pending.toString(),
>>>>>>> Stashed changes
            color: 'bg-white',
            iconBg: 'bg-blue-500',
            icon: <FiFileText className="text-white" size={20} />
        },
        {
            title: 'Đang xử lý',
<<<<<<< Updated upstream
            value: '8',
=======
            value: stats.processing.toString(),
>>>>>>> Stashed changes
            color: 'bg-white',
            iconBg: 'bg-yellow-500',
            icon: <FiClock className="text-white" size={20} />
        },
        {
            title: 'Đã hoàn thành',
<<<<<<< Updated upstream
            value: '16',
=======
            value: stats.completed.toString(),
>>>>>>> Stashed changes
            color: 'bg-white',
            iconBg: 'bg-green-500',
            icon: <FiCheckCircle className="text-white" size={20} />
        },
        {
            title: 'Khách hàng',
<<<<<<< Updated upstream
            value: '18',
=======
            value: stats.customers.toString(),
>>>>>>> Stashed changes
            color: 'bg-white',
            iconBg: 'bg-purple-500',
            icon: <FiUsers className="text-white" size={20} />
        }
    ];

    const recentActivities = [
        {
            title: 'Hoàn thành xét nghiệm DNA',
            customer: 'Khách hàng: Nguyễn Văn A',
            time: '2 phút trước',
            status: 'completed'
        },
        {
            title: 'Bắt đầu quy trình xét nghiệm',
            customer: 'Khách hàng: Trần Thị B',
            time: '15 phút trước',
            status: 'processing'
        },
        {
            title: 'Nhận yêu cầu mới',
            customer: 'Khách hàng: Lê Văn C',
            time: '1 giờ trước',
            status: 'new'
        }
    ];

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'processing':
                return 'bg-blue-500';
            case 'new':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
<<<<<<< Updated upstream
        <div className="flex h-screen bg-gray-50">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                            <p className="text-gray-600 text-sm">Last updated: 19:37:02 06/11/2025</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                                />
                            </div>
                            {/* Notification */}
                            <div className="relative">
                                <IoMdNotificationsOutline size={24} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsCards.map((card, index) => (
                            <div key={index} className={`${card.color} rounded-lg p-6 shadow-sm border`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                                        {card.icon}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Hoạt động gần đây */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hoạt động gần đây</h3>
                            <p className="text-gray-500 text-sm mb-6">Các hành động được thực hiện trong hôm nay</p>

                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className={`w-2 h-2 ${getStatusDot(activity.status)} rounded-full mt-2 flex-shrink-0`}></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                                            <p className="text-gray-600 text-sm">{activity.customer}</p>
                                            <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Thao tác nhanh */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Thao tác nhanh</h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <FiUser className="text-gray-600" size={18} />
                                        <span className="text-gray-700">Quản lý yêu cầu</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <FiActivity className="text-gray-600" size={18} />
                                        <span className="text-gray-700">Quy trình xét nghiệm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
=======
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600 text-sm">Last updated: 19:37:02 06/11/2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                            />
                        </div>
                        {/* Notification */}
                        <div className="relative">
                            <IoMdNotificationsOutline size={24} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsCards.map((card, index) => (
                        <div key={index} className={`${card.color} rounded-lg p-6 shadow-sm border`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                                    {card.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Hoạt động gần đây */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Hoạt động gần đây</h3>
                        <p className="text-gray-500 text-sm mb-6">Các hành động được thực hiện trong hôm nay</p>

                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className={`w-2 h-2 ${getStatusDot(activity.status)} rounded-full mt-2 flex-shrink-0`}></div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                                        <p className="text-gray-600 text-sm">{activity.customer}</p>
                                        <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thao tác nhanh */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Thao tác nhanh</h3>

                        <div className="space-y-3">
                            <div
                                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100"
                                onClick={() => navigate('/staff/requests')}
                            >
                                <div className="flex items-center space-x-3">
                                    <FiUser className="text-gray-600" size={18} />
                                    <span className="text-gray-700">Quản lý yêu cầu</span>
                                </div>
                                <span className="text-blue-600">→</span>
                            </div>

                            <div
                                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100"
                                onClick={() => navigate('/staff/tests')}
                            >
                                <div className="flex items-center space-x-3">
                                    <FiActivity className="text-gray-600" size={18} />
                                    <span className="text-gray-700">Quy trình xét nghiệm</span>
                                </div>
                                <span className="text-blue-600">→</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
>>>>>>> Stashed changes
        </div>
    );
};

export default StaffDashboard;