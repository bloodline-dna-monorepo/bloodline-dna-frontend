import React, { useEffect, useState } from 'react'
import AdminCard from '../components/NavAdmin/AdminCard'
import CustomerList from '../components/NavAdmin/CustomerList'

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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
      <AdminCard onMenuSelect={setSelectedMenu} />
      <div style={{ marginLeft: 220, flex: 1, padding: '32px 40px' }}>
        {selectedMenu === 'customers' ? (
          <CustomerList />
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Dashboard</h1>
              <span style={{ color: '#888', fontSize: 14 }}>
                Last updated: {currentTime}
              </span>
            </div>
            {/* Stats Cards */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontSize: 14, color: '#888' }}>Total DNA Tests</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{stats.totalTests}</div>
                <div style={{ color: 'green', fontSize: 13 }}>+{stats.totalTestsChange}% compared to last month</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontSize: 14, color: '#888' }}>Samples in Processing</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{stats.processing}</div>
                <div style={{ color: 'green', fontSize: 13 }}>+{stats.processingChange}% compared to last month</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontSize: 14, color: '#888' }}>Pending Results</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{stats.pending}</div>
                <div style={{ color: 'red', fontSize: 13 }}>{stats.pendingChange}% compared to last month</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontSize: 14, color: '#888' }}>Urgent Cases</div>
                <div style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{stats.urgent}</div>
                <div style={{ color: 'red', fontSize: 13 }}>+{stats.urgentChange} compared to last month</div>
              </div>
            </div>
            {/* Charts */}
            <div style={{ display: 'flex', gap: 32 }}>
              {/* Bar Chart Placeholder */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontWeight: 600, marginBottom: 16 }}>DNA Testing Trend (Last 6 Months)</div>
                <svg width="100%" height="180" viewBox="0 0 300 180">
                  <rect x="30" y={getRandomInt(60, 100)} width="30" height={getRandomInt(60, 100)} fill="#ff595e" />
                  <rect x="80" y={getRandomInt(100, 140)} width="30" height={getRandomInt(30, 60)} fill="#1982c4" />
                  <rect x="130" y={getRandomInt(80, 120)} width="30" height={getRandomInt(40, 80)} fill="#6a4c93" />
                  <rect x="180" y={getRandomInt(40, 80)} width="30" height={getRandomInt(80, 120)} fill="#8ac926" />
                  <rect x="230" y={getRandomInt(70, 110)} width="30" height={getRandomInt(50, 90)} fill="#ffca3a" />
                </svg>
              </div>
              {/* Pie Chart Placeholder */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                <div style={{ fontWeight: 600, marginBottom: 16 }}>Request Status Breakdown</div>
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