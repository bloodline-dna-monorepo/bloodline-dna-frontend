"use client"

import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface SidebarItem {
    icon: string
    label: string
    path: string
}

const sidebarItems: SidebarItem[] = [
    { icon: "👤", label: "My Profile", path: "/customer/profile" },
    { icon: "🔬", label: "Services", path: "/customer/services" },
    { icon: "🧬", label: "Test Process", path: "/customer/test-process" },
    { icon: "📊", label: "History Services", path: "/customer/history" },
]

const CustomerSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/")
    }

    return (
        <div className="w-60 bg-gradient-to-b from-teal-600 to-teal-700 text-white rounded-lg shadow-lg p-4 h-fit sticky top-20"> {/* Giảm width, padding, top */}
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 mb-6 p-3 bg-white/10 rounded-lg"> {/* Giảm spacing và padding */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"> {/* Giảm size */}
                    <span className="text-teal-600 font-bold text-sm">N</span> {/* Giảm font size */}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">Nguyen Van A</p> {/* Giảm font size */}
                    <p className="text-teal-200 text-xs truncate">user@example.com</p> {/* Giảm font size */}
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-6"> {/* Giảm spacing */}
                {sidebarItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center space-x-2 w-full p-2.5 rounded-md transition-all duration-200 text-sm ${location.pathname === item.path
                                ? "bg-white/20 font-semibold shadow-sm"
                                : "hover:bg-white/10"
                            }`}
                    >
                        <span className="text-base">{item.icon}</span> {/* Giảm icon size */}
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="border-t border-white/20 pt-3"> {/* Giảm padding */}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full p-2.5 rounded-md hover:bg-red-500/20 transition-all duration-200 text-red-200 hover:text-white text-sm"
                >
                    <span className="text-base">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default CustomerSidebar
