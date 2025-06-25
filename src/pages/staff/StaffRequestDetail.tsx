import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, FileText, Clock } from 'lucide-react'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffRequestDetail = () => {
    const { requestId } = useParams()
    const navigate = useNavigate()

    // Mock data - trong thực tế sẽ fetch từ API
    const requestDetails = {
        id: requestId,
        customerName: 'Nguyen Van A',
        phone: '0123456789',
        email: 'nguyenvana@email.com',
        address: '123 Nguyen Trai, Q1, TP.HCM',
        testType: 'Xét nghiệm ADN cha con',
        requestDate: '2/3/2024',
        status: 'pending',
        notes: 'Khách hàng muốn lấy mẫu vào buổi sáng',
        testDescription: 'Xét nghiệm ADN để xác định mối quan hệ cha con',
        sampleType: 'Mẫu nước bọt',
        expectedResult: '5-7 ngày làm việc'
    }

    return (
        <StaffLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Chi tiết yêu cầu #{requestId}</h1>
                            <p className="text-gray-600 mt-1">Thông tin chi tiết về yêu cầu xét nghiệm</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Chờ đảm nhận
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Thông tin khách hàng
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-600">Họ tên:</span>
                                <span className="ml-2 font-medium">{requestDetails.customerName}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-600">Điện thoại:</span>
                                <span className="ml-2 font-medium">{requestDetails.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-600">Email:</span>
                                <span className="ml-2 font-medium">{requestDetails.email}</span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                                <span className="text-gray-600">Địa chỉ:</span>
                                <span className="ml-2 font-medium">{requestDetails.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Test Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Thông tin xét nghiệm
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <span className="text-gray-600">Loại xét nghiệm:</span>
                                <p className="font-medium">{requestDetails.testType}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Mô tả:</span>
                                <p className="font-medium">{requestDetails.testDescription}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Loại mẫu:</span>
                                <p className="font-medium">{requestDetails.sampleType}</p>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">Ngày yêu cầu:</span>
                                <span className="ml-2 font-medium">{requestDetails.requestDate}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">Thời gian dự kiến:</span>
                                <span className="ml-2 font-medium">{requestDetails.expectedResult}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {requestDetails.notes && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú</h2>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{requestDetails.notes}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Quay lại
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Đảm nhận yêu cầu
                    </button>
                </div>
            </div>
        </StaffLayout>
    )
}

export default StaffRequestDetail