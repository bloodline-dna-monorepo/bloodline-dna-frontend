'use client'

import type React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { CheckCircleIcon, ClockIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardSidebar from '../../components/Common/Sidebar'
import { type TestRequestFullDetail, type TestResultData } from '../../utils/types'
import { staffService } from '../../services/staffService'
import { toast } from 'react-toastify'

const TestProcessCenter: React.FC = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(1)
  const [showResultModal, setShowResultModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [requestData, setRequestData] = useState<TestRequestFullDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [resultData, setResultData] = useState<TestResultData>({
    result: ''
  })

  const initialSteps = useMemo(() => [
    {
      id: 1,
      title: 'Đặt hàng thành công',
      description: 'Đơn hàng đã được xác nhận',
      completedDate: null as string | null
    },
    {
      id: 2,
      title: 'Xử lý mẫu và phân tích',
      description: 'Lấy mẫu, chuyển đến phòng xét nghiệm và thực hiện phân tích',
      completedDate: null as string | null
    },
    {
      id: 3,
      title: 'Nhập kết quả và chờ xác minh',
      description: 'Nhập kết quả xét nghiệm và chờ manager xác minh',
      completedDate: null as string | null
    }
  ], [])

  const [processSteps, setProcessSteps] = useState(initialSteps)

  useEffect(() => {
    const fetchRequestData = async () => {
      if (!requestId) return

      try {
        const data = await staffService.getRequestFullDetail(Number.parseInt(requestId))
        console.log(data)
        setRequestData(data)

        // Set step 1 completed date from actual data
        const updatedSteps = [...initialSteps]

        // Format the actual creation date for step 1
        if (data.CreatedAt) {
          const createdDate = new Date(data.CreatedAt).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
          updatedSteps[0] = { ...updatedSteps[0], completedDate: createdDate }
        }

        if (data.Status === 'In Progress' || data.Status === 'Pending Review') {
          setCurrentStepIndex(2) // Chuyển từ step 4 thành step 2 (Xử lý mẫu và phân tích)
          if (data.Status === 'In Progress') {
            const currentTime = new Date().toLocaleString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })

            updatedSteps[1] = { ...updatedSteps[1], completedDate: currentTime } // Bước 2: Xử lý mẫu và phân tích
          }
        }

        setProcessSteps(updatedSteps)
      } catch (error) {
        console.error('Error fetching request data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestData()
  }, [requestId, initialSteps])

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed'
    if (stepIndex === currentStepIndex) return 'current'
    return 'pending'
  }

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className='w-6 h-6 text-green-500' />
      case 'current':
        return <ClockIcon className='w-6 h-6 text-blue-500' />
      default:
        return <div className='w-6 h-6 rounded-full border-2 border-gray-300 bg-white'></div>
    }
  }

  const getStepBgColor = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    switch (status) {
      case 'completed':
        return 'bg-green-50'
      case 'current':
        return 'bg-blue-50'
      default:
        return 'bg-gray-50'
    }
  }

  const handleUpdateStep = async (stepIndex: number) => {
    if (stepIndex === 1 && currentStepIndex === 1) {
      try {
        await staffService.confirmSample(Number.parseInt(requestId!))

        const currentTime = new Date().toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })

        const updatedSteps = [...processSteps]
        updatedSteps[1] = { ...updatedSteps[1], completedDate: currentTime }
        setProcessSteps(updatedSteps)

        setCurrentStepIndex(2)
      } catch (error) {
        console.error('Error confirming sample:', error)
        alert('Có lỗi xảy ra khi xác nhận mẫu!')
      }
    }
  }

  const canInputResult = currentStepIndex === 2

  const handleBackToRequests = () => {
    navigate('/staff/manage-requests/confirmed')
  }

  const handleOpenResultModal = () => {
    setShowResultModal(true)
  }

  const handleCloseResultModal = () => {
    setShowResultModal(false)
  }

  const handleOpenDetailModal = () => {
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
  }

  const handleResultChange = (field: string, value: string) => {
    setResultData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitResult = async () => {
    if (!requestId) return

    try {
      await staffService.createTestResult(Number.parseInt(requestId), resultData)
      toast.success('Kết quả đã được lưu thành công!')
      setShowResultModal(false)
      navigate('/staff/manage-requests/confirmed')
    } catch (error) {
      console.error('Error submitting result:', error)
      toast.error('Kết quả đã từng được tạo! Vui lòng chờ xác nhận từ quản lý.')
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <div className='flex-1 p-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mb-8'></div>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
              <div className='space-y-4'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='h-20 bg-gray-200 rounded'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!requestData) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <div className='flex-1 p-8'>
          <div className='text-center py-8'>
            <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy yêu cầu</h3>
            <button
              onClick={handleBackToRequests}
              className='mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700'
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />

      <div className='flex-1 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-gray-900'>Quy trình xét nghiệm</h1>
            <button onClick={handleBackToRequests} className='text-gray-500 hover:text-gray-700'>
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Request Info Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-8'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-gray-900'>Yêu cầu {requestData.TestRequestID}</h2>
              <button
                onClick={handleOpenDetailModal}
                className='flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md hover:bg-blue-50'
              >
                <EyeIcon className='w-4 h-4' />
                Xem chi tiết
              </button>
            </div>

            <div className='mb-4'>
              <div className='flex items-center text-sm text-gray-600 mb-1'>
                <span className='mr-2'>👤</span>
                <span>Người gửi mẫu: {requestData.CustomerName}</span>
              </div>
              <div className='text-sm text-gray-600'>Số lượng mẫu: {requestData.SampleCount} người</div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Left Column - Process Timeline */}
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-6'>Tiến trình</h3>

                <div className='space-y-4'>
                  {processSteps.map((step, index) => (
                    <div key={step.id} className={`relative p-4 rounded-lg border ${getStepBgColor(index)}`}>
                      <div className='flex items-start space-x-4'>
                        <div className='flex-shrink-0'>{getStepIcon(index)}</div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-gray-900'>{step.title}</h4>
                            {step.completedDate && <span className='text-xs text-gray-500'>{step.completedDate}</span>}
                          </div>
                          <p className='text-sm text-gray-600 mt-1'>{step.description}</p>
                        </div>

                        <div className='flex-shrink-0'>
                          {getStepStatus(index) === 'current' && index === 1 && (
                            <div className='flex items-center space-x-2'>
                              <input
                                type='checkbox'
                                className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
                                onChange={() => handleUpdateStep(index)}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connector line */}
                      {index < processSteps.length - 1 && (
                        <div className='absolute left-8 top-16 w-0.5 h-8 bg-gray-300'></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-6'>Thông tin liên hệ</h3>

                <div className='space-y-6'>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>Khách hàng:</h4>
                    <div className='text-sm text-gray-900'>
                      <div>{requestData.CustomerName}</div>
                      <div>{requestData.CustomerPhone || 'Chưa có số điện thoại'}</div>
                    </div>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>Địa điểm:</h4>
                    <div className='text-sm text-gray-900'>
                      <div>Cơ sở</div>
                      <div>Lấy mẫu tại:</div>
                      <div>Cơ sở FPTU</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Input Section */}
            <div className='mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200'>
              <div className='text-center'>
                <button
                  onClick={handleOpenResultModal}
                  className='px-6 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={!canInputResult}
                >
                  Nhập kết quả
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && requestData && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white'>
              <div className='mt-3'>
                {/* Modal Header */}
                <div className='flex items-center justify-between pb-4 border-b'>
                  <h3 className='text-xl font-bold text-gray-900'>BIÊN BẢN LẤY MẪU XÉT NGHIỆM</h3>
                  <button onClick={handleCloseDetailModal} className='text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='h-6 w-6' />
                  </button>
                </div>

                {/* Document Content */}
                <div className='mt-6 bg-white p-8 border border-gray-300'>
                  {/* Header */}
                  <div className='text-center mb-8'>
                    <div className='text-sm mb-2'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                    <div className='text-sm mb-4'>Độc lập – Tự do – Hạnh phúc</div>
                    <div className='text-lg font-bold'>BIÊN BẢN LẤY MẪU XÉT NGHIỆM</div>
                  </div>

                  {/* Basic Info */}
                  <div className='mb-6'>
                    <div className='text-sm mb-2'>
                      Ngày:{requestData.UpdatedAt.split('-')[2].split('T')[0]} Tháng:{' '}
                      {requestData.UpdatedAt.split('-')[1]} Năm:{requestData.UpdatedAt.split('-')[0]}
                    </div>
                    <div className='text-sm mb-4'>Chúng tôi gồm có:</div>
                    <div className='text-sm mb-2'>
                      1. Nhân viên thu mẫu: _________________________{requestData.staffData.FullName}
                      _______________________________
                    </div>
                    <div className='text-sm mb-4'>
                      2. Người yêu cầu xét nghiệm: ________{requestData.cusData.FullName}_________ Địa chỉ liên lạc:
                      ________{requestData.cusData.Address}____________
                    </div>
                    <div className='text-sm mb-4'>
                      Chúng tôi tiến hành lấy mẫu của những người để nghi xét nghiệm ADN. Các mẫu của từng người được
                      đóng riêng và có nhãn dán.
                    </div>
                  </div>

                  {/* Sample Information */}
                  <div className='grid grid-cols-1 gap-6'>
                    {requestData.samples && requestData.samples.length > 0 ? (
                      requestData.samples.map((sample, index) => (
                        <div key={sample.SampleCategoryID} className='border border-gray-300 p-4'>
                          <div className='flex justify-between items-start'>
                            <div className='flex-1'>
                              <div className='text-sm mb-2'>
                                <strong>Người cho mẫu thứ {index + 1}</strong>
                              </div>
                              <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                  <div>Họ và tên: {sample.TesterName}</div>
                                  <div>Năm sinh: {sample.YOB}</div>
                                  <div>CMND/CCCD/Passport: {sample.CMND}</div>
                                  <div>Loại mẫu: {sample.SampleType}</div>
                                </div>
                                <div>
                                  <div>Giới tính: {sample.Gender}</div>
                                  <div>Mối quan hệ: {sample.Relationship}</div>
                                </div>
                              </div>
                            </div>
                            <div className='ml-4 text-center'>
                              <div className='w-20 h-20 border border-gray-300 flex items-center justify-center text-xs'>
                                <img src={sample.SignatureImage || undefined} alt='' />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='text-center text-gray-500 py-8'>Chưa có thông tin mẫu</div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className='mt-8 text-sm'>
                    <div className='mb-2'>
                      * Biên bản này có điền đầy đủ các yêu cầu ADN và mỗi người chỉ được thể hiện một.
                    </div>
                    <div className='mb-6'>
                      * Mẫu xét nghiệm thu thập được đã được xét nghiệm ADN chỉ sử dụng cho mục đích yêu cầu xét nghiệm
                      cụng của các bên liên quan.
                    </div>

                    <div className='grid grid-cols-3 gap-8 text-center'>
                      <div>
                        <div className='font-bold mb-2'>NGƯỜI THU MẪU</div>
                        <div className='text-xs mb-4'>
                          <img
                            src={requestData.staffData.SignatureImage}
                            alt=''
                            className='w-32 h-32 border rounded object-contain mx-auto'
                          />
                        </div>
                      </div>

                      <div>
                        <div className='font-bold mb-2'>NGƯỜI YÊU CẦU XÉT NGHIỆM</div>
                        <div className='text-xs mb-4'>
                          <img
                            src={requestData.cusData.SignatureImage}
                            alt=''
                            className='w-32 h-32 border rounded object-contain mx-auto'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Input Modal */}
        {showResultModal && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white'>
              <div className='mt-3'>
                {/* Modal Header */}
                <div className='flex items-center justify-between pb-4 border-b'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>Yêu cầu {requestData.TestRequestID}</h3>
                    <div className='text-sm text-gray-600 mt-1'>
                      <div>👤 Người gửi mẫu: {requestData.CustomerName}</div>
                      <div>Số lượng mẫu: {requestData.SampleCount} người</div>
                    </div>
                  </div>
                  <button onClick={handleCloseResultModal} className='text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='h-6 w-6' />
                  </button>
                </div>

                {/* Timeline in Modal */}
                <div className='mt-4 mb-6'>
                  <h4 className='text-sm font-medium text-gray-700 mb-3'>Tiến trình</h4>
                  <div className='flex items-center space-x-4'>
                    {processSteps.slice(0, 2).map((step, index) => (
                      <div key={step.id} className='flex items-center'>
                        <div className='flex items-center space-x-2'>
                          <CheckCircleIcon className='w-5 h-5 text-green-500' />
                          <span className='text-sm text-gray-600'>{step.title}</span>
                          <span className='text-xs text-gray-400'>{step.completedDate}</span>
                        </div>
                        {index < 1 && <div className='w-8 h-0.5 bg-green-300 mx-2'></div>}
                      </div>
                    ))}
                    <div className='w-8 h-0.5 bg-blue-300 mx-2'></div>
                    <div className='flex items-center space-x-2'>
                      <ClockIcon className='w-5 h-5 text-blue-500' />
                      <span className='text-sm text-gray-600'>(đang thực hiện)</span>
                    </div>
                  </div>
                </div>

                {/* Result Input Form */}
                <div className='mt-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>Nhập kết quả</h4>

                  <div className='space-y-4'>
                    <div>
                      <textarea
                        placeholder='Nhập kết quả xét nghiệm...'
                        value={resultData.result}
                        onChange={(e) => handleResultChange('result', e.target.value)}
                        rows={8}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div className='flex justify-end'>
                      <button
                        onClick={handleSubmitResult}
                        className='px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors'
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestProcessCenter
