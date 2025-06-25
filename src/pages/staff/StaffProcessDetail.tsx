// src/pages/staff/StaffProcessDetail.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar } from 'lucide-react'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffProcessDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <StaffLayout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/staff-preview/process')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Chi tiết quy trình #{id}</h1>
                        <p className="text-gray-600 mt-1">Thông tin chi tiết về quy trình xét nghiệm</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Thông tin quy trình</h2>
                    <p className="text-gray-600">Đây là trang chi tiết cho quy trình {id}</p>
                    {/* Thêm content chi tiết ở đây */}
                </div>
            </div>
        </StaffLayout>
    )
}

export default StaffProcessDetail