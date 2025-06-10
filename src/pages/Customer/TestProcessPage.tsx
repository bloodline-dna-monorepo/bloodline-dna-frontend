"use client"

import React, { useState } from "react"
import CustomerLayout from "../../components/Layout/CustomerLayout"

interface ProcessStep {
    id: number
    title: string
    icon: string
    isCompleted: boolean
    isActive: boolean
}

const TestProcessPage = () => {
    const [serviceType, setServiceType] = useState<'home' | 'facility'>('home')

    const homeSteps: ProcessStep[] = [
        { id: 1, title: "Confirmed", icon: "✓", isCompleted: true, isActive: false },
        { id: 2, title: "Kit Sent", icon: "📦", isCompleted: true, isActive: false },
        { id: 3, title: "Kit Received", icon: "🤝", isCompleted: true, isActive: false },
        { id: 4, title: "In Testing", icon: "🧪", isCompleted: false, isActive: true },
        { id: 5, title: "Result Delivered", icon: "📋", isCompleted: false, isActive: false }
    ]

    const facilitySteps: ProcessStep[] = [
        { id: 1, title: "Confirmed", icon: "✓", isCompleted: true, isActive: false },
        { id: 2, title: "Sample Collection", icon: "🤝", isCompleted: true, isActive: false },
        { id: 3, title: "Testing in Progress", icon: "🧪", isCompleted: false, isActive: true },
        { id: 4, title: "Result Processing", icon: "📋", isCompleted: false, isActive: false }
    ]

    const currentSteps = serviceType === 'home' ? homeSteps : facilitySteps

    return (
        <CustomerLayout title={`${serviceType === 'home' ? 'Home' : 'Facility-Based'} Testing Service`}>
            <div className="bg-white rounded-lg shadow p-8">
                {/* Service Type Toggle */}
                <div className="mb-8 flex justify-center">
                    <div className="bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setServiceType('home')}
                            className={`px-4 py-2 rounded-md transition-colors ${serviceType === 'home'
                                ? 'bg-white shadow text-teal-600 font-medium'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Home Testing Service
                        </button>
                        <button
                            onClick={() => setServiceType('facility')}
                            className={`px-4 py-2 rounded-md transition-colors ${serviceType === 'facility'
                                ? 'bg-white shadow text-teal-600 font-medium'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Facility-Based Testing
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200">
                        <div
                            className="h-full bg-teal-500 transition-all duration-500"
                            style={{
                                width: `${(currentSteps.filter(step => step.isCompleted).length / (currentSteps.length - 1)) * 100}%`
                            }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="flex justify-between relative">
                        {currentSteps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div className={`
                  w-24 h-24 rounded-full flex items-center justify-center text-2xl mb-4 border-4 transition-all
                  ${step.isCompleted
                                        ? 'bg-teal-500 border-teal-500 text-white'
                                        : step.isActive
                                            ? 'bg-white border-teal-500 text-teal-500'
                                            : 'bg-white border-gray-300 text-gray-400'
                                    }
                `}>
                                    <span>{step.icon}</span>
                                </div>

                                {/* Step Title */}
                                <h3 className={`text-sm font-medium text-center max-w-20 ${step.isCompleted || step.isActive ? 'text-teal-600' : 'text-gray-400'
                                    }`}>
                                    {step.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Status */}
                <div className="mt-12 p-6 bg-teal-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Current Status</h3>
                    <p className="text-teal-600">
                        {currentSteps.find(step => step.isActive)?.title === "In Testing" ||
                            currentSteps.find(step => step.isActive)?.title === "Testing in Progress"
                            ? "Your sample is currently being processed in our laboratory. Results will be available soon."
                            : `Your test is currently in the "${currentSteps.find(step => step.isActive)?.title}" phase.`
                        }
                    </p>
                </div>
            </div>
        </CustomerLayout>
    )
}

export default TestProcessPage