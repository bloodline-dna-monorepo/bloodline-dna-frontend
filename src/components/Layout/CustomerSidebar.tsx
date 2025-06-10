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

export const CustomerSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        // Handle logout logic
        localStorage.removeItem("authToken")
        navigate("/")
    }

    return (
        <div className="w-64 bg-teal-600 text-white rounded-lg p-6 h-fit">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-bold">N</span>
                </div>
                <div>
                    <p className="font-medium">Nguyen Van A</p>
                    <p className="text-teal-200 text-sm">nguyen.vana@gmail.com</p>
                </div>
            </div>

            <nav className="space-y-2">
                {sidebarItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center space-x-3 p-2 rounded w-full text-left transition-colors ${location.pathname === item.path
                            ? "bg-teal-700 font-medium"
                            : "hover:bg-teal-700"
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-teal-700 w-full text-left"
                >
                    <span>🚪</span>
                    <span>Logout</span>
                </button>
            </nav>
        </div>
    )
}
