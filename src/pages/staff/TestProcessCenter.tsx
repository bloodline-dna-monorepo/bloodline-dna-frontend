import React, { useState } from 'react'
import {
    CheckCircleIcon,
    ClockIcon,
    XMarkIcon,
    CheckIcon
} from '@heroicons/react/24/outline'
import StaffSidebar from '../../components/StaffSidebar/StaffSidebar'
import { useParams, useNavigate } from 'react-router-dom'

const TestProcessCenter: React.FC = () => {
    const { requestId } = useParams()
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(1) // Start at step 2 (index 1)
    const [showResultModal, setShowResultModal] = useState(false)
    const [resultData, setResultData] = useState({
        conclusion: '',
        percentage: '',
        notes: '',
        testDate: new Date().toISOString().split('T')[0]
    })

    // Sample request data
    const requestData = {
        id: requestId || '1',
        customerName: 'Nguyễn Văn A',
        sampleCount: 2,
        testType: 'Xét nghiệm ADN Cha - Con',
        location: 'Tại trung tâm'
    }

    const initialSteps = [
        {
            id: 1,
            title: 'Đã hàng thành công',
            description: 'Khách hàng đã đến trung tâm và hoàn tất thủ tục',
            completedDate: '2024-03-01 14:30'
        },
        {
            id: 2,
            title: 'Lấy mẫu tại trung tâm',
            description: 'Đang tiến hành lấy mẫu tại trung tâm',
            completedDate: null
        },
        {
            id: 3,
            title: 'Đã thăng di xét nghiệm',
            description: 'Chuyển mẫu đến phòng xét nghiệm',
            completedDate: null
        },
        {
            id: 4,
            title: 'Xử lý và phân tích',
            description: 'Tiến hành xử lý và phân tích mẫu',
            completedDate: null
        },
        {
            id: 5,
            title: 'Nhập kết quả và có xác xác minh',
            description: 'Nhập kết quả và xác minh cuối cùng',
            completedDate: null
        }
    ]

    const [processSteps, setProcessSteps] = useState(initialSteps)

    const getStepStatus = (stepIndex: number) => {
        if (stepIndex < currentStepIndex) return 'completed'
        if (stepIndex === currentStepIndex) return 'current'
        return 'pending'
    }

    const getStepIcon = (stepIndex: number) => {
        const status = getStepStatus(stepIndex)
        switch (status) {
            case 'completed':
                return <CheckCircleIcon className="w-6 h-6 text-green-500" />
            case 'current':
                return <ClockIcon className="w-6 h-6 text-blue-500" />
            default:
                return <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white"></div>
        }
    }

    const getStepBgColor = (stepIndex: number) => {
        const status = getStepStatus(stepIndex)
        switch (status) {
            case 'completed':
                return 'bg-green-50 border-green-200'
            case 'current':
                return 'bg-blue-50 border-blue-200'
            default:
                return 'bg-gray-50 border-gray-200'
        }
    }

    const handleUpdateStep = (stepIndex: number) => {
        if (stepIndex === currentStepIndex && stepIndex < processSteps.length - 1) {
            // Mark current step as completed with current timestamp
            const updatedSteps = [...processSteps]
            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                completedDate: new Date().toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            setProcessSteps(updatedSteps)

            // Move to next step
            setCurrentStepIndex(stepIndex + 1)
        } else if (stepIndex === currentStepIndex && stepIndex === processSteps.length - 1) {
            // This is the last step
            const updatedSteps = [...processSteps]
            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                completedDate: new Date().toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            setProcessSteps(updatedSteps)

            // Mark all steps completed
            setCurrentStepIndex(processSteps.length)
        }
    }

    const allStepsCompleted = currentStepIndex >= processSteps.length

    const handleOpenResultModal = () => {
        setShowResultModal(true)
    }

    const handleCloseResultModal = () => {
        setShowResultModal(false)
    }

    const handleResultChange = (field: string, value: string) => {
        setResultData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmitResult = () => {
        // Here you would typically send the result to the backend
        console.log('Submitting result:', resultData)

        // Show success message and navigate back
        alert('Kết quả đã được lưu thành công!')
        setShowResultModal(false)
        navigate('/staff/manage-requests/confirmed')
    }

    const handleBackToRequests = () => {
        navigate('/staff/manage-requests/confirmed')
    }

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <StaffSidebar />

            <div className='flex-1 p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold text-gray-900'>Quy trình xét nghiệm</h1>
                        <button
                            onClick={handleBackToRequests}
                            className='text-gray-500 hover:text-gray-700'
                        >
                            <XMarkIcon className='w-6 h-6' />
                        </button>
                    </div>
                </div>

                {/* Request Info Card */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-8'>
                    <div className='p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg font-semibold text-gray-900'>
                                Yêu cầu {requestData.id}
                            </h2>
                        </div>

                        <div className='text-sm text-gray-600 mb-4'>
                            <div>🧑 Người gửi mẫu: {requestData.customerName}</div>
                            <div>Số lượng mẫu: {requestData.sampleCount} người</div>
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
                                        <div key={step.id} className={`relative p-4 rounded-lg border-2 ${getStepBgColor(index)}`}>
                                            <div className='flex items-start space-x-4'>
                                                <div className='flex-shrink-0'>
                                                    {getStepIcon(index)}
                                                </div>

                                                <div className='flex-1 min-w-0'>
                                                    <div className='flex items-center justify-between'>
                                                        <h4 className='text-sm font-medium text-gray-900'>
                                                            {step.title}
                                                        </h4>
                                                        {step.completedDate && (
                                                            <span className='text-xs text-gray-500'>
                                                                {step.completedDate}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className='text-sm text-gray-600 mt-1'>
                                                        {step.description}
                                                    </p>
                                                </div>

                                                <div className='flex-shrink-0'>
                                                    {getStepStatus(index) === 'current' && (
                                                        <div className='flex items-center space-x-2'>
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
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
                                        <h4 className='text-sm font-medium text-gray-700 mb-2'>Người liên hệ</h4>
                                        <div className='text-sm text-gray-900'>
                                            <div>Nguyễn Văn A</div>
                                            <div>0123456789</div>
                                        </div>
                                    </div>

                                    <div className='bg-gray-50 p-4 rounded-lg'>
                                        <h4 className='text-sm font-medium text-gray-700 mb-2'>Địa chỉ</h4>
                                        <div className='text-sm text-gray-900'>
                                            <div>Lấy mẫu tại trung tâm</div>
                                            <div>Cơ sở FPTU</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Final Result Section */}
                        <div className='mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                            <div className='text-center'>
                                <h4 className='text-lg font-medium text-gray-900 mb-2'>Nhập kết quả</h4>
                                <p className='text-sm text-gray-600 mb-4'>
                                    Vui lòng hoàn tất tất cả các bước trước khi nhập kết quả cuối cùng
                                </p>
                                <button
                                    onClick={handleOpenResultModal}
                                    className='px-6 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
                                    disabled={!allStepsCompleted}
                                >
                                    Nhập kết quả
                                </button>
                                <div className="text-xs text-gray-500 mt-2">
                                    Debug: currentStep={currentStepIndex}, total={processSteps.length}, completed={allStepsCompleted.toString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Entry Modal */}
            {showResultModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Nhập kết quả xét nghiệm
                                </h2>
                                <button
                                    onClick={handleCloseResultModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Request Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Thông tin yêu cầu</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Mã yêu cầu:</span>
                                        <span className="ml-2 font-medium">{requestData.id}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Khách hàng:</span>
                                        <span className="ml-2 font-medium">{requestData.customerName}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Loại xét nghiệm:</span>
                                        <span className="ml-2 font-medium">{requestData.testType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Số lượng mẫu:</span>
                                        <span className="ml-2 font-medium">{requestData.sampleCount} người</span>
                                    </div>
                                </div>
                            </div>

                            {/* Result Form */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kết luận xét nghiệm *
                                    </label>
                                    <select
                                        value={resultData.conclusion}
                                        onChange={(e) => handleResultChange('conclusion', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    >
                                        <option value="">Chọn kết luận</option>
                                        <option value="positive">Khẳng định quan hệ huyết thống</option>
                                        <option value="negative">Loại trừ quan hệ huyết thống</option>
                                        <option value="inconclusive">Chưa thể kết luận</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tỷ lệ khớp ADN (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={resultData.percentage}
                                        onChange={(e) => handleResultChange('percentage', e.target.value)}
                                        placeholder=" "
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày xét nghiệm *
                                    </label>
                                    <input
                                        type="date"
                                        value={resultData.testDate}
                                        onChange={(e) => handleResultChange('testDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ghi chú bổ sung
                                    </label>
                                    <textarea
                                        value={resultData.notes}
                                        onChange={(e) => handleResultChange('notes', e.target.value)}
                                        rows={4}
                                        placeholder="Nhập ghi chú về kết quả xét nghiệm..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleCloseResultModal}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmitResult}
                                    disabled={!resultData.conclusion || !resultData.testDate}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <CheckIcon className="w-4 h-4" />
                                        <span>Lưu kết quả</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TestProcessCenter
