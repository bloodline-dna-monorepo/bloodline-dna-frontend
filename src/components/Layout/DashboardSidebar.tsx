"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  BeakerIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"

const DashboardSidebar: React.FC = () => {
  const { user, logout, isAdmin, isManager, isStaff, isCustomer } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Determine sidebar type based on current path
  const isStaffPath = location.pathname.startsWith('/staff')
  const isCustomerPath = location.pathname.startsWith('/customer')
  const isManagerPath = location.pathname.startsWith('/manager')
  const isAdminPath = location.pathname.startsWith('/admin')

  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/admin/users", label: "User Management", icon: UsersIcon },
    { path: "/admin/reports", label: "Reports", icon: ChartBarIcon },
    { path: "/admin/settings", label: "Settings", icon: CogIcon },
  ];

  const managerMenuItems = [
    { path: "/manager/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/manager/staff", label: "Staff Management", icon: UsersIcon },
    { path: "/manager/reports", label: "Reports", icon: ChartBarIcon },
    { path: "/manager/settings", label: "Settings", icon: CogIcon },
  ];

  const staffMenuItems = [
    { path: "/staff/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/staff/test-requests", label: "Quản lý yêu cầu", icon: DocumentTextIcon },
    { path: "/staff/test-process", label: "Quy trình xét nghiệm", icon: CogIcon },
    { path: "/staff/profile", label: "Profile", icon: UserIcon },
    { path: "/staff/settings", label: "Settings", icon: CogIcon },
  ];

  const customerMenuItems = [
    { path: "/customer/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/customer/profile", label: "Profile", icon: UserIcon },
    { path: "/customer/test-process", label: "Test Process", icon: CogIcon },
    { path: "/customer/history", label: "History & Results", icon: DocumentTextIcon },
  ];

  // Select menu items based on path first, then user role
  let menuItems = [];
  if (isStaffPath) {
    menuItems = staffMenuItems;
  } else if (isCustomerPath) {
    menuItems = customerMenuItems;
  } else if (isManagerPath) {
    menuItems = managerMenuItems;
  } else if (isAdminPath) {
    menuItems = adminMenuItems;
  } else {
    // Fallback based on user role
    if (isAdmin) menuItems = adminMenuItems;
    else if (isManager) menuItems = managerMenuItems;
    else if (isStaff) menuItems = staffMenuItems;
    else if (isCustomer) menuItems = customerMenuItems;
  }

  return (
    <div className="w-64 bg-teal-600 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-teal-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-teal-600 font-bold text-lg">G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Gen</span>
            <span className="text-sm font-bold text-teal-200">Unity</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? "bg-teal-700 text-white" : "text-teal-100 hover:bg-teal-500 hover:text-white"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-teal-500">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.profile?.fullName
                ? user.profile.fullName.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase() || "N"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.profile?.fullName || user?.email || "Nguyen Van A"}
            </p>
            <p className="text-xs text-teal-200 truncate">{user?.role || "Staff"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-teal-100 hover:bg-teal-500 hover:text-white rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardSidebar