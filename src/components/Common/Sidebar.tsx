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
  ArrowRightOnRectangleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon, PlusCircleIcon, StarIcon } from 'lucide-react' // Import StarIcon
import { useAuth } from '../../hooks/useAuth'
import type { MenuItem } from '../../utils/types'
import Logo from '../../assets/logo.png'

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

  const isActive = (path: string) => location.pathname === path

  const customerMenuItems: MenuItem[] = [
    { path: '/profile', label: 'Thông tin cá nhân', icon: UserIcon },
    { path: '/customer/test-process', label: 'Theo dõi xét nghiệm', icon: BeakerIcon },
    { path: '/customer/feedback', label: 'Đánh giá', icon: StarIcon }, // Added Feedback item with StarIcon
    { path: '/customer/history', label: 'Lịch sử', icon: DocumentTextIcon }
  ]

  const staffMenuItems: MenuItem[] = [
    { path: '/staff/dashboard', label: 'Dashboard', icon: HomeIcon },
    {
      path: '/staff/manage-requests',
      label: 'Test Requests',
      icon: BeakerIcon,
      subItems: [
        { path: '/staff/manage-requests/not-confirmed', label: '+ Chưa xác nhận', icon: PlusCircleIcon },
        { path: '/staff/manage-requests/confirmed', label: '+ Đã xác nhận', icon: CheckCircleIcon }
      ]
    },
    { path: '/profile', label: 'Profile', icon: UserIcon }
  ]

  const managerMenuItems: MenuItem[] = [
    { path: '/manager/manager-dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/manager/test-results', label: 'Quản lý kết quả xét nghiệm', icon: BeakerIcon },
    { path: '/manager/view-feedback', label: 'Xem phản hồi', icon: ChartBarIcon },
    { path: '/manager/blog-management', label: 'Quản lý Blog', icon: PencilSquareIcon },
    { path: '/profile', label: 'Thông tin cá nhân', icon: UserIcon }
  ]

  const adminMenuItems: MenuItem[] = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/user-management', label: 'User Management', icon: UsersIcon },
    { path: '/service-management', label: 'Service Management', icon: CogIcon },
    { path: '/profile', label: 'Profile', icon: CogIcon }
  ]

  // ✅ Chỉ khai báo duy nhất 1 lần menuItems
  let menuItems: MenuItem[] = []

  if (isAdmin) menuItems = adminMenuItems
  else if (isManager) menuItems = managerMenuItems
  else if (isStaff) menuItems = staffMenuItems
  else menuItems = customerMenuItems

  return (
    <div className='w-64 bg-teal-600 text-white h-screen fixed top-0 left-0 flex flex-col'>
      <div className='p-6 border-b border-teal-500'>
        <Link to='/' className='flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white'>
            <img src={Logo} alt='Logo' className='w-full h-full object-contain' />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-6 overflow-y-auto'>
        {' '}
        {/* Cho phép cuộn nếu nội dung dài */}
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

                {/* Render subItems nếu có */}
                {item.subItems && (
                  <ul className='ml-8 mt-1 space-y-1'>
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon
                      return (
                        <li key={sub.path}>
                          <Link
                            to={sub.path}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive(sub.path)
                                ? 'bg-teal-700 text-white'
                                : 'text-teal-100 hover:bg-teal-500 hover:text-white'
                            }`}
                          >
                            <SubIcon className='w-4 h-4' />
                            <span>{sub.label}</span>
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

      {/* User Profile + Logout */}
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
              {user?.profile?.FullName || user?.email || 'User'}
            </p>
            <p className='text-xs text-teal-200 truncate'>{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-teal-100 hover:bg-teal-500 hover:text-white rounded-lg transition-colors'
        >
          <ArrowRightOnRectangleIcon className='w-4 h-4' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardSidebar
