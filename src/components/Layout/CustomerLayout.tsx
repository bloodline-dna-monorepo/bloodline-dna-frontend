"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { CustomerSidebar } from "./CustomerSidebar"

interface CustomerLayoutProps {
    children: React.ReactNode
    title?: string
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DNA</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-800">GenUnity</span>
                        </div>

                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => navigate("/customer/test-process")}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Process
                            </button>

                            <button
                                onClick={() => navigate("/customer/profile")}
                                className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                            >
                                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">N</span>
                                </div>
                                <span className="text-gray-700 font-medium">Nguyen Van A</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex">
                    <CustomerSidebar />
                    <div className="flex-1 ml-8">
                        {title && (
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerLayout