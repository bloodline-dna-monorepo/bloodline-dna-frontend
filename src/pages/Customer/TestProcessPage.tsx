"use client"

import React, { useState } from "react"
import CustomerLayout from "../../components/Layout/CustomerLayout"

const TestProcessPage = () => {
    const [testingType, setTestingType] = useState<'home' | 'facility'>('home')

    const steps = [
        { id: 1, name: "Confirmed", status: "completed", icon: "✓" },
        { id: 2, name: "Kit Sent", status: "completed", icon: "📦" },
        { id: 3, name: "Kit Received", status: "completed", icon: "🏆" },
        { id: 4, name: "In Testing", status: "current", icon: "🧪" },
        { id: 5, name: "Result Delivered", status: "pending", icon: "📋" }
    ]

    return (
        <CustomerLayout title="Test Process">
            <div className="bg-white rounded-lg shadow-sm border p-4">
                {/* Testing Type Toggle */}
                <div className="mb-6">
                    <div className="flex bg-gray-100 rounded-lg p-1 max-w-sm">
                        <button
                            onClick={() => setTestingType('home')}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${testingType === 'home'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Home Testing Service
                        </button>
                        <button
                            onClick={() => setTestingType('facility')}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${testingType === 'facility'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Facility-Based Testing
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center z-10">
                                    {/* Step Circle */}
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium border-2 ${step.status === 'completed'
                                            ? 'bg-teal-600 border-teal-600 text-white'
                                            : step.status === 'current'
                                                ? 'bg-white border-teal-600 text-teal-600 ring-4 ring-teal-100'
                                                : 'bg-gray-100 border-gray-300 text-gray-400'
                                        }
                                    `}>
                                        <span className="text-sm">{step.icon}</span>
                                    </div>

                                    {/* Step Label */}
                                    <div className="mt-2 text-center">
                                        <p className={`text-xs font-medium ${step.status === 'completed' || step.status === 'current'
                                            ? 'text-gray-900'
                                            : 'text-gray-500'
                                            }`}>
                                            {step.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className={`
                                        flex-1 h-0.5 mx-4 ${step.status === 'completed'
                                            ? 'bg-teal-600'
                                            : 'bg-gray-300'
                                        }
                                    `} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Current Status */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h3 className="text-base font-semibold text-teal-900 mb-2">Current Status</h3>
                    <p className="text-sm text-teal-700">
                        Your sample is currently being processed in our laboratory. Results will be available soon.
                    </p>
                </div>

                {/* Additional Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Estimated Completion</h4>
                        <p className="text-sm text-gray-600">3-5 business days</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Test Type</h4>
                        <p className="text-sm text-gray-600">
                            {testingType === 'home' ? 'Home Collection Kit' : 'Laboratory Visit'}
                        </p>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    )
}

export default TestProcessPage