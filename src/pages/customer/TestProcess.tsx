"use client"

import type React from "react"
import { useState } from "react"
import DashboardSidebar from "../../components/Layout/DashboardSidebar"

const TestProcess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "facility">("home")

  const homeProcessSteps = [
    { id: 1, name: "Confirmed", status: "completed", icon: "✓" },
    { id: 2, name: "Kit Sent", status: "completed", icon: "📦" },
    { id: 3, name: "Kit Received", status: "completed", icon: "📥" },
    { id: 4, name: "In Testing", status: "current", icon: "⚗️" },
    { id: 5, name: "Result Delivered", status: "pending", icon: "📋" },
  ]

  const facilityProcessSteps = [
    { id: 1, name: "Confirmed", status: "completed", icon: "✓" },
    { id: 2, name: "Sample Collected", status: "completed", icon: "🧪" },
    { id: 3, name: "In Testing", status: "current", icon: "⚗️" },
    { id: 4, name: "Result Delivered", status: "pending", icon: "📋" },
  ]

  const processSteps = activeTab === "home" ? homeProcessSteps : facilityProcessSteps

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Test Process</h1>
            <div className="h-1 w-16 bg-teal-600 mt-2"></div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "home" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Home Testing Service
              </button>
              <button
                onClick={() => setActiveTab("facility")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "facility" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Facility-Based Testing
              </button>
            </div>
          </div>

          {/* Process Flow */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        step.status === "completed"
                          ? "bg-teal-600"
                          : step.status === "current"
                            ? "bg-teal-400 animate-pulse"
                            : "bg-gray-300"
                      }`}
                    >
                      {step.status === "completed" ? "✓" : step.icon}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-900">{step.name}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${step.status === "completed" ? "bg-teal-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Current Status</h3>
            <p className="text-blue-800">
              {activeTab === "home"
                ? "Your sample is currently being processed in our laboratory. Results will be available soon."
                : "Your sample has been collected at our facility and is currently being processed. Results will be available soon."}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Completion</h3>
              <p className="text-2xl font-bold text-teal-600 mb-2">3-5 business days</p>
              <p className="text-gray-600">From sample receipt date</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Type</h3>
              <p className="text-2xl font-bold text-purple-600 mb-2">
                {activeTab === "home" ? "Home Collection Kit" : "Facility Collection"}
              </p>
              <p className="text-gray-600">Paternity DNA Testing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestProcess
