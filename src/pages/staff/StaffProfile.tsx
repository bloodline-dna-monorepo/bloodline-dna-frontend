import React from 'react'
import { User, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffProfile = () => {
    const profile = {
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@genunity.com',
        phone: '0123456789',
        position: 'Chuyên viên xét nghiệm',
        department: 'Phòng phân tích DNA',
        address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
        joinDate: '15/01/2023',
        experience: '3 năm'
    }

    return (
        <StaffLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Thông tin cá nhân</h1>
                    <p className="text-gray-600 mt-2">Xem thông tin tài khoản của bạn</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                                <span className="text-white text-3xl font-bold">{profile.name.charAt(0)}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{profile.name}</h3>
                            <p className="text-blue-600 font-medium mb-1">{profile.position}</p>
                            <p className="text-sm text-gray-500 mb-4">{profile.department}</p>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Tham gia: {profile.joinDate}
                                </div>
                                <div className="flex items-center justify-center">
                                    <Award className="w-4 h-4 mr-2" />
                                    Kinh nghiệm: {profile.experience}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information Display */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h2>
                                <p className="text-sm text-gray-500 mt-1">Thông tin được quản lý bởi hệ thống</p>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Họ và tên
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.name}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Số điện thoại
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.phone}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Địa chỉ
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.address}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Chức vụ
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.position}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phòng ban
                                        </label>
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profile.department}</p>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-md font-medium text-gray-900 mb-4">Thông tin bổ sung</h3>
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-center space-x-4 text-sm text-blue-800">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Ngày tham gia: <strong>{profile.joinDate}</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-4 h-4 mr-2" />
                                                <span>Kinh nghiệm: <strong>{profile.experience}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Admin */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Lưu ý:</strong> Để thay đổi thông tin cá nhân, vui lòng liên hệ với quản trị viên hệ thống.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
    )
}

export default StaffProfile