'use client'

import type React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  BeakerIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const DashboardSidebar: React.FC = () => {
  const { user, logout, isAdmin, isManager, isStaff, isCustomer } = useAuth()
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
  const customerMenuItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { path: '/profile', label: 'Hồ sơ cá nhân', icon: UserIcon },
    { path: '/customer/test-process', label: 'Quy trình xét nghiệm', icon: BeakerIcon },
    { path: '/customer/history', label: 'Lịch sử & Kết quả', icon: DocumentTextIcon }
  ]

  const staffMenuItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { path: '/test-requests', label: 'Yêu cầu xét nghiệm', icon: BeakerIcon },
    { path: '/profile', label: 'Hồ sơ cá nhân', icon: UserIcon }
  ]

  const managerMenuItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { path: '/test-requests', label: 'Yêu cầu xét nghiệm', icon: BeakerIcon },
    { path: '/reports', label: 'Báo cáo', icon: ChartBarIcon },
    { path: '/profile', label: 'Hồ sơ cá nhân', icon: UserIcon }
  ]

  const adminMenuItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { path: '/user-management', label: 'Quản lý người dùng', icon: UsersIcon },
    { path: '/service-management', label: 'Quản lý dịch vụ', icon: CogIcon },
    { path: '/reports', label: 'Báo cáo & Thống kê', icon: ChartBarIcon },
    { path: '/settings', label: 'Cài đặt', icon: CogIcon }
  ]

  let menuItems = customerMenuItems
  if (isAdmin) menuItems = adminMenuItems
  else if (isManager) menuItems = managerMenuItems
  else if (isStaff) menuItems = staffMenuItems

  return (
    <div className='w-64 bg-teal-600 text-white min-h-screen flex flex-col'>
      {/* Logo */}
      <div className='p-6 border-b border-teal-500'>
        <Link to='/' className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
            <span className='text-teal-600 font-bold text-lg'>G</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-bold'>Gen</span>
            <span className='text-sm font-bold text-teal-200'>Unity</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-6'>
        <ul className='space-y-2 px-4'>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) ? 'bg-teal-700 text-white' : 'text-teal-100 hover:bg-teal-500 hover:text-white'
                  }`}
                >
                  <Icon className='w-5 h-5' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className='p-4 border-t border-teal-500'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center'>
            <span className='text-white font-medium'>
              {user?.profile?.FullName
                ? user.profile.FullName.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase() || 'N'}
            </span>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-white truncate'>
              {user?.profile?.FullName || user?.email || 'Người dùng'}
            </p>
            <p className='text-xs text-teal-200 truncate'>{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-teal-100 hover:bg-teal-500 hover:text-white rounded-lg transition-colors'
        >
          <ArrowRightOnRectangleIcon className='w-4 h-4' />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardSidebar
