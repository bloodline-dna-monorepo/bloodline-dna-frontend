import React from 'react'
import {
    DocumentTextIcon,
    UserIcon,
    CheckCircleIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import DashboardSidebar from 'components/Common/Sidebar'

const StaffDashboard: React.FC = () => {
    // Sample data - replace with actual data from your API
    const dashboardStats = [
        {
            title: 'Tổng yêu cầu',
            value: '24',
            icon: DocumentTextIcon,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Đang xử lý',
            value: '8',
            icon: UserIcon,
            color: 'bg-yellow-500',
            bgColor: 'bg-yellow-50'
        },
        {
            title: 'Đã hoàn thành',
            value: '16',
            icon: CheckCircleIcon,
            color: 'bg-green-500',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Khách hàng',
            value: '18',
            icon: UsersIcon,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
        }
    ]

    const recentActivities = [
        {
            id: 1,
            type: 'success',
            title: 'Hoàn thành xét nghiệm DNA',
            customer: 'Khách hàng: Nguyễn Văn A',
            time: '2 phút trước',
            color: 'bg-green-100 text-green-800'
        },
        {
            id: 2,
            type: 'processing',
            title: 'Bắt đầu quy trình xét nghiệm',
            customer: 'Khách hàng: Trần Thị B',
            time: '15 phút trước',
            color: 'bg-blue-100 text-blue-800'
        },
        {
            id: 3,
            type: 'new',
            title: 'Nhận yêu cầu mới',
            customer: 'Khách hàng: Lê Văn C',
            time: '1 giờ trước',
            color: 'bg-gray-100 text-gray-800'
        }
    ]

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <DashboardSidebar />

            <div className='flex-1 p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
                    <p className='text-gray-600'>Tổng quan về hoạt động và trạng thái công việc</p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {dashboardStats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className={`${stat.bgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm font-medium text-gray-600 mb-1'>{stat.title}</p>
                                        <p className='text-3xl font-bold text-gray-900'>{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-full`}>
                                        <Icon className='w-6 h-6 text-white' />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Recent Activities */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                    <div className='p-6 border-b border-gray-200'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-1'>Hoạt động gần đây</h2>
                        <p className='text-gray-600 text-sm'>Các hành động được thực hiện trong thời gian gần đây</p>
                    </div>

                    <div className='p-6'>
                        <div className='space-y-4'>
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className='flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors'>
                                    <div className={`w-3 h-3 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' :
                                        activity.type === 'processing' ? 'bg-blue-500' :
                                            'bg-gray-500'
                                        }`} />
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-sm font-medium text-gray-900'>{activity.title}</h3>
                                            <span className='text-xs text-gray-500'>{activity.time}</span>
                                        </div>
                                        <p className='text-sm text-gray-600 mt-1'>{activity.customer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffDashboard