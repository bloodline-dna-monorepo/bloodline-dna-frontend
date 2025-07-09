'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Common/Sidebar'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { managerService } from '../../services/managerService'
import type { DashboardStats } from '../../utils/types'

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const ManagerDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardStats>({
    totalUsers: 0,
    totalTests: 0,
    totalServices: 0,
    revenue: 0,
    avgRating: 0,
    completed: 0,
    pending: 0,
    feedback: 0,
    monthlyRevenue: [], // hoặc [0, 0, 0, 0, 0, 0] nếu cần 6 tháng
    serviceDistribution: {} // hoặc { Civil: 0, Administrative: 0 }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const stats = await managerService.getDashboardStats()
        setData(stats)
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu dashboard')
        console.error('Lỗi lấy dữ liệu dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const barData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [
      {
        label: 'Doanh thu',
        data: data.monthlyRevenue,
        backgroundColor: '#42a5f5',
        borderRadius: 8,
        barThickness: 32
      }
    ]
  }

  const doughnutData = {
    labels: ['ADN cha con', 'ADN 2', 'ADN 3', 'ADN 4', 'Khác'],
    datasets: [
      {
        data: data.serviceDistribution,
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#bdbdbd'],
        borderWidth: 2
      }
    ]
  }
  const totalDoughnut = Object.values(data.serviceDistribution).reduce((a, b) => a + b, 0)

  const serviceDetails = [
    {
      color: '#42a5f5',
      label: 'ADN cha con',
      value: data.serviceDistribution[0] || 0,
      percent: totalDoughnut ? `${Math.round((data.serviceDistribution[0] / totalDoughnut) * 100)}%` : '0%'
    },
    {
      color: '#66bb6a',
      label: 'ADN 2',
      value: data.serviceDistribution[1] || 0,
      percent: totalDoughnut ? `${Math.round((data.serviceDistribution[1] / totalDoughnut) * 100)}%` : '0%'
    },
    {
      color: '#ffa726',
      label: 'ADN 3',
      value: data.serviceDistribution[2] || 0,
      percent: totalDoughnut ? `${Math.round((data.serviceDistribution[2] / totalDoughnut) * 100)}%` : '0%'
    },
    {
      color: '#ab47bc',
      label: 'ADN 4',
      value: data.serviceDistribution[3] || 0,
      percent: totalDoughnut ? `${Math.round((data.serviceDistribution[3] / totalDoughnut) * 100)}%` : '0%'
    },
    {
      color: '#bdbdbd',
      label: 'Khác',
      value: data.serviceDistribution[4] || 0,
      percent: totalDoughnut ? `${Math.round((data.serviceDistribution[4] / totalDoughnut) * 100)}%` : '0%'
    }
  ]

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-100'>
        <DashboardSidebar />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <DashboardSidebar />
      <div className='flex-1 p-8 bg-gray-100'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <span className='text-gray-500 text-sm'>
            Last updated: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
          </span>
        </div>

        {error && (
          <div className='bg-red-100 p-4 rounded-xl mb-4'>
            <p className='text-red-600 font-semibold'>{error}</p>
          </div>
        )}

        <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mb-4'>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Tổng xét nghiệm</span>
            <span className='text-2xl font-bold mt-2'>{data.totalTests.toLocaleString()}</span>
          </div>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Doanh thu</span>
            <span className='text-2xl font-bold mt-2'>{data.revenue.toLocaleString()} ₫</span>
          </div>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Đánh giá trung bình</span>
            <span className='text-2xl font-bold mt-2 text-orange-400'>{data.avgRating}/5</span>
          </div>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Đã hoàn thành</span>
            <span className='text-2xl font-bold mt-2 text-green-600'>{data.completed}</span>
          </div>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Kết quả chờ duyệt</span>
            <span className='text-2xl font-bold mt-2 text-yellow-600'>{data.pending}</span>
          </div>
          <div className='bg-white rounded-2xl p-4 flex flex-col items-center shadow'>
            <span className='text-gray-500 text-sm'>Tổng phản hồi từ khách hàng</span>
            <span className='text-2xl font-bold mt-2 text-blue-700'>{data.feedback}</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
          <div className='bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-4 flex flex-col'>
            <span className='font-semibold mb-2'>Doanh thu 6 tháng gần nhất</span>
            <div className='flex-1'>
              <Bar
                key={JSON.stringify(barData)}
                data={barData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: false }, ticks: { display: false } }
                  }
                }}
              />
            </div>
            <div className='flex justify-between mt-2 px-2'>
              {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((label, idx) => (
                <div key={label} className='text-center'>
                  <div className='text-xs text-gray-500'>{label}</div>
                  <div className='text-xs text-gray-400'>{18 + idx * 4} test</div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-3 flex flex-col'>
            <span className='font-semibold mb-2'>Phân bổ dịch vụ</span>
            <div className='flex items-center h-52'>
              <div className='relative w-40 h-40'>
                <Doughnut
                  key={JSON.stringify(doughnutData)}
                  data={doughnutData}
                  options={{
                    plugins: { legend: { display: false } },
                    cutout: '75%'
                  }}
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                  <div className='font-bold text-xl'>{totalDoughnut.toLocaleString()}</div>
                  <div className='text-xs text-gray-500'>Tổng xét nghiệm</div>
                </div>
              </div>
              <div className='ml-4'>
                {serviceDetails.map((item) => (
                  <div key={item.label} className='flex items-center mb-2'>
                    <span
                      className='inline-block w-3 h-3 rounded-full mr-2'
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className='text-sm'>
                      {item.label} <b>{item.value}</b> ({item.percent})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard
