"use client"

import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    FileText,
    Settings,
    User,
    LogOut,
    Beaker
} from 'lucide-react'

const StaffSidebar: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const userData = localStorage.getItem("user")
        const role = localStorage.getItem("role")

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData)
                setUser({
                    ...parsedUser,
                    role: role
                })
            } catch (error) {
                console.error('Error parsing user data:', error)
            }
        }
    }, [])

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất?')) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("role")
            navigate("/")
        }
    }

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/staff-preview/dashboard',
            icon: LayoutDashboard
        },
        {
            name: 'Quản lý yêu cầu',
            path: '/staff-preview/requests',
            icon: FileText
        },
        {
            name: 'Quy trình xét nghiệm',
            path: '/staff-preview/process',
            icon: Beaker
        },
        {
            name: 'Profile',
            path: '/staff-preview/profile',
            icon: User
        },
        {
            name: 'Settings',
            path: '/staff-preview/settings',
            icon: Settings
        }
    ]

    return (
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col min-h-screen">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Beaker className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">GenUnity</h2>
                        <p className="text-sm text-gray-500">Staff Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    )
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {user?.name?.charAt(0)?.toUpperCase() ||
                                user?.fullName?.charAt(0)?.toUpperCase() ||
                                user?.email?.charAt(0)?.toUpperCase() || 'S'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || user?.fullName || user?.email || "Staff User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate capitalize">
                            {user?.role || "staff"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Đăng xuất</span>
                </button>
            </div>
        </div>
    )
}

export default StaffSidebar