'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import DashboardSidebar from '../../components/Common/Sidebar'
import { adminService } from '../../services/adminService'
import type { DashboardStats } from '../../utils/types'

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const COLORS = ['#2196f3', '#00bcd4', '#ffeb3b', '#ab47bc', '#f44336', '#4caf50', '#ff9800', '#9c27b0']

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardStats>({
    totalUsers: 0,
    totalTests: 0,
    totalServices: 0,
    revenue: 0,
    avgRating: 0,
    completed: 0,
    pending: 0,
    feedback: 0,
    monthlyRevenue: [0, 0, 0, 0, 0, 0],
    serviceDistribution: [],
    serviceNames: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const stats = await adminService.getDashboardStats()
      setData(stats)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const barData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [
      {
        label: 'Doanh thu',
        data: data.monthlyRevenue,
        backgroundColor: '#2196f3',
        borderRadius: 8,
        barThickness: 40
      }
    ]
  }

  const doughnutData = {
    labels: data.serviceNames,
    datasets: [
      {
        data: data.serviceDistribution,
        backgroundColor: COLORS.slice(0, data.serviceDistribution.length),
        borderWidth: 2
      }
    ]
  }

  const totalDoughnut = data.serviceDistribution.reduce((a, b) => a + b, 0)

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <main className='flex-1 p-8 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
        </main>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 p-8'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-4xl font-bold'>Dashboard</h1>
          <span className='text-gray-500 text-sm'>
            Last updated: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white rounded-xl shadow p-6 flex items-center gap-4'>
            <div className='flex-1'>
              <div className='text-gray-500 text-sm'>Tổng người dùng</div>
              <div className='text-2xl font-bold'>{data.totalUsers.toLocaleString()}</div>
              <div className='text-xs text-gray-400'>Tổng số tài khoản</div>
            </div>
            <div className='bg-blue-100 text-blue-600 rounded-full p-3'>
              <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
              </svg>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow p-6 flex items-center gap-4'>
            <div className='flex-1'>
              <div className='text-gray-500 text-sm'>Tổng xét nghiệm</div>
              <div className='text-2xl font-bold'>{data.totalTests.toLocaleString()}</div>
              <div className='text-xs text-gray-400'>Tổng số xét nghiệm</div>
            </div>
            <div className='bg-purple-100 text-purple-600 rounded-full p-3'>
              <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5v15C3 19.33 3.67 20 4.5 20h15c.83 0 1.5-.67 1.5-1.5v-15C21 2.67 20.33 2 19.5 2z' />
              </svg>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow p-6 flex items-center gap-4'>
            <div className='flex-1'>
              <div className='text-gray-500 text-sm'>Dịch vụ</div>
              <div className='text-2xl font-bold'>{data.totalServices}</div>
              <div className='text-xs text-gray-400'>Dịch vụ sẵn có</div>
            </div>
            <div className='bg-red-100 text-red-600 rounded-full p-3'>
              <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow p-6 flex items-center gap-4'>
            <div className='flex-1'>
              <div className='text-gray-500 text-sm'>Doanh thu tháng</div>
              <div className='text-2xl font-bold'>{data.revenue.toLocaleString()} ₫</div>
              <div className='text-xs text-gray-400'>Doanh thu tháng này</div>
            </div>
            <div className='bg-green-100 text-green-600 rounded-full p-3'>
              <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Bar chart */}
          <div className='bg-white rounded-xl shadow p-6'>
            <div className='font-semibold text-xl mb-4'>Doanh thu 6 tháng gần nhất</div>
            <div className='h-64'>
              <Bar
                data={barData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: {
                      grid: { display: false },
                      ticks: {
                        display: true,
                        callback: (value) => new Intl.NumberFormat('vi-VN').format(value as number) + ' ₫'
                      }
                    }
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className='flex justify-between mt-4 px-2'>
              {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((label, idx) => (
                <div key={label} className='text-center'>
                  <div className='text-xs text-gray-500'>{label}</div>
                  <div className='text-xs text-gray-400'>{(data.monthlyRevenue[idx] || 0).toLocaleString()} ₫</div>
                </div>
              ))}
            </div>
          </div>

          {/* Doughnut chart */}
          <div className='bg-white rounded-xl shadow p-6'>
            <div className='font-semibold text-xl mb-4'>Phân bổ dịch vụ</div>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='relative w-48 h-48'>
                <Doughnut
                  data={doughnutData}
                  options={{
                    plugins: { legend: { display: false } },
                    cutout: '75%'
                  }}
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                  <div className='font-bold text-2xl'>{totalDoughnut.toLocaleString()}</div>
                  <div className='text-xs text-gray-500'>Tổng xét nghiệm</div>
                </div>
              </div>
              <div className='ml-6 mt-4 md:mt-0'>
                {data.serviceNames?.map((serviceName, idx) => (
                  <div key={serviceName} className='flex items-center mb-2'>
                    <span
                      className='inline-block w-3 h-3 rounded-full mr-2'
                      style={{ backgroundColor: COLORS[idx] }}
                    ></span>
                    <span className='text-sm'>
                      {serviceName} <b>{data.serviceDistribution[idx] || 0}</b>
                      {totalDoughnut > 0 && (
                        <> ({Math.round(((data.serviceDistribution[idx] || 0) / totalDoughnut) * 100)}%)</>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
