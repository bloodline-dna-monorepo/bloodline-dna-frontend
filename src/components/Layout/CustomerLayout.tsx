"use client"

import React from "react"
import CustomerSidebar from "./CustomerSidebar"

interface CustomerLayoutProps {
    children: React.ReactNode
    title?: string
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <div className="flex-shrink-0">
                            <CustomerSidebar />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">
                            {title && (
                                <div className="mb-6">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"> {/* Giảm padding */}
                                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1> {/* Giảm font size */}
                                        <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div> {/* Giảm width và height */}
                                    </div>
                                </div>
                            )}

                            {/* Content với better styling */}
                            <div className="space-y-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerLayout