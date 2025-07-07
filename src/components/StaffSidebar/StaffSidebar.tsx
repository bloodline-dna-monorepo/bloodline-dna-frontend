import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    HomeIcon,
    UsersIcon,
    InformationCircleIcon,
    ArrowRightOnRectangleIcon,
    PlusCircleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const StaffSidebar: React.FC = () => {
    const { user, logout } = useAuth()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    const isActive = (path: string) => {
        return location.pathname === path
    }

    const staffMenuItems = [
        {
            path: '/staff/dashboard',
            label: 'Dashboard',
            icon: HomeIcon,
            isMain: true
        },
        {
            path: '/staff/manage-requests',
            label: 'Quản lý yêu cầu',
            icon: UsersIcon,
            isMain: true,
            subItems: [
                { path: '/staff/manage-requests/not-confirmed', label: '+ Chưa xác nhận', icon: PlusCircleIcon },
                { path: '/staff/manage-requests/confirmed', label: '+ Đã xác nhận', icon: CheckCircleIcon }
            ]
        },
        {
            path: '/staff/profile',
            label: 'Thông tin cá nhân',
            icon: InformationCircleIcon,
            isMain: true
        }
    ]

    return (
        <div className='w-64 bg-teal-600 text-white min-h-screen flex flex-col'>
            {/* Logo */}
            <div className='p-6 border-b border-teal-500'>
                <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                        <div className='text-teal-600 font-bold text-lg'>
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path d="M4 2v20l4-4h12l-4-4-4 4-4-4 4-4-4-4z" />
                                <path d="M8 6l4 4-4 4" />
                                <path d="M16 6l-4 4 4 4" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-lg font-bold'>Gen</span>
                        <span className='text-sm font-bold text-teal-200'>Unity</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className='flex-1 py-6'>
                <ul className='space-y-2 px-4'>
                    {staffMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? 'bg-teal-700 text-white' : 'text-teal-100 hover:bg-teal-500 hover:text-white'
                                        }`}
                                >
                                    <Icon className='w-5 h-5' />
                                    <span className='font-medium'>{item.label}</span>
                                </Link>

                                {/* Sub-menu items */}
                                {item.subItems && (
                                    <ul className='mt-2 ml-4 space-y-1'>
                                        {item.subItems.map((subItem) => {
                                            const SubIcon = subItem.icon
                                            return (
                                                <li key={subItem.path}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm ${isActive(subItem.path) ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-500 hover:text-white'
                                                            }`}
                                                    >
                                                        <SubIcon className='w-4 h-4' />
                                                        <span>{subItem.label}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className='p-4 border-t border-teal-500'>
                <button
                    onClick={handleLogout}
                    className='flex items-center space-x-2 w-full px-4 py-3 text-sm text-teal-100 hover:bg-teal-500 hover:text-white rounded-lg transition-colors'
                >
                    <ArrowRightOnRectangleIcon className='w-5 h-5' />
                    <span>Logout</span>
                </button>
            </div>

            {/* User Profile */}
            <div className='p-4 border-t border-teal-500'>
                <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center'>
                        <span className='text-white font-medium'>
                            {user?.profile?.FullName
                                ? user.profile.FullName.charAt(0).toUpperCase()
                                : user?.email?.charAt(0).toUpperCase() || 'N'}
                        </span>
                    </div>
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-white truncate'>
                            {user?.profile?.FullName || 'Nguyễn Văn A'}
                        </p>
                        <p className='text-xs text-teal-200 truncate'>
                            {user?.email || 'NguyenVanA@gmail.com'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffSidebar