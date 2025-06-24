import React, { useEffect, useState } from 'react'
import AdminCard from '../components/NavAdmin/AdminCard'
import CustomerList from '../components/NavAdmin/CustomerList'
import ManagerList from '../components/NavAdmin/ManagerList'
import SettingAdmin from '../components/NavAdmin/SettingAdmin'
import StaffList from '../components/NavAdmin/StaffList'

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function AdminPage() {
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-GB', { hour12: false }) + ' ' +
      now.toLocaleDateString('en-GB')
  })

  const [stats, setStats] = useState({
    totalTests: 1999,
    totalTestsChange: 37,
    processing: 69,
    processingChange: 6,
    pending: 5,
    pendingChange: -9,
    urgent: 3,
    urgentChange: 2,
  })

  // State để xác định menu đang chọn
  const [selectedMenu, setSelectedMenu] = useState<string>('dashboard')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-GB', { hour12: false }) + ' ' +
        now.toLocaleDateString('en-GB')
      )
      setStats(prev => ({
        totalTests: prev.totalTests + getRandomInt(-2, 5),
        totalTestsChange: getRandomInt(30, 45),
        processing: prev.processing + getRandomInt(-1, 2),
        processingChange: getRandomInt(3, 10),
        pending: Math.max(0, prev.pending + getRandomInt(-2, 2)),
        pendingChange: getRandomInt(-15, 0),
        urgent: Math.max(0, prev.urgent + getRandomInt(-1, 1)),
        urgentChange: getRandomInt(0, 5),
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminCard onMenuSelect={setSelectedMenu} />
      <div className="ml-[220px] flex-1 p-8">
        {selectedMenu === 'customers' && <CustomerList />}
        {selectedMenu === 'managers' && <ManagerList />}
        {selectedMenu === 'staff' && <StaffList />}
        {selectedMenu === 'settings' && <SettingAdmin />}
        {selectedMenu === 'dashboard' && (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold m-0">Dashboard</h1>
              <span className="text-gray-500 text-sm">
                Last updated: {currentTime}
              </span>
            </div>
            {/* Stats Cards */}
            <div className="flex gap-6 mb-8 flex-wrap">
              <div className="bg-white rounded-xl shadow p-6 min-w-[220px] flex-1">
                <div className="text-gray-500 text-sm">Total DNA Tests</div>
                <div className="text-2xl font-bold my-2">{stats.totalTests}</div>
                <div className="text-green-600 text-xs">+{stats.totalTestsChange}% compared to last month</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 min-w-[220px] flex-1">
                <div className="text-gray-500 text-sm">Samples in Processing</div>
                <div className="text-2xl font-bold my-2">{stats.processing}</div>
                <div className="text-green-600 text-xs">+{stats.processingChange}% compared to last month</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 min-w-[220px] flex-1">
                <div className="text-gray-500 text-sm">Pending Results</div>
                <div className="text-2xl font-bold my-2">{stats.pending}</div>
                <div className="text-red-500 text-xs">{stats.pendingChange}% compared to last month</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 min-w-[220px] flex-1">
                <div className="text-gray-500 text-sm">Urgent Cases</div>
                <div className="text-2xl font-bold my-2">{stats.urgent}</div>
                <div className="text-red-500 text-xs">+{stats.urgentChange} compared to last month</div>
              </div>
            </div>
            {/* Charts */}
            <div className="flex gap-8 flex-wrap">
              {/* Bar Chart Placeholder */}
              <div className="flex-1 bg-white rounded-xl shadow p-6 min-w-[320px]">
                <div className="font-semibold mb-4">DNA Testing Trend (Last 6 Months)</div>
                <svg width="100%" height="180" viewBox="0 0 300 180">
                  <rect x="30" y={getRandomInt(60, 100)} width="30" height={getRandomInt(60, 100)} fill="#ff595e" />
                  <rect x="80" y={getRandomInt(100, 140)} width="30" height={getRandomInt(30, 60)} fill="#1982c4" />
                  <rect x="130" y={getRandomInt(80, 120)} width="30" height={getRandomInt(40, 80)} fill="#6a4c93" />
                  <rect x="180" y={getRandomInt(40, 80)} width="30" height={getRandomInt(80, 120)} fill="#8ac926" />
                  <rect x="230" y={getRandomInt(70, 110)} width="30" height={getRandomInt(50, 90)} fill="#ffca3a" />
                </svg>
              </div>
              {/* Pie Chart Placeholder */}
              <div className="flex-1 bg-white rounded-xl shadow p-6 min-w-[320px]">
                <div className="font-semibold mb-4">Request Status Breakdown</div>
                <svg width="100%" height="180" viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r="80" fill="#f25f5c" />
                  <path d="M90,90 L90,10 A80,80 0 0,1 170,90 Z" fill="#ffe066" />
                  <path d="M90,90 L170,90 A80,80 0 0,1 90,170 Z" fill="#247ba0" />
                  <path d="M90,90 L90,170 A80,80 0 0,1 10,90 Z" fill="#43aa8b" />
                  <path d="M90,90 L10,90 A80,80 0 0,1 90,10 Z" fill="#f9c74f" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}