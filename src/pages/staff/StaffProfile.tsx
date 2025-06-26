import React, { useState } from 'react';
import DashboardSidebar from '../../components/Layout/DashboardSidebar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

const StaffProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@genunity.com',
        phone: '+84 123 456 789',
        employeeId: 'EMP001',
        department: 'DNA Testing',
        position: 'Lab Technician',
        joinDate: '2024-01-15',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        emergencyContact: '+84 987 654 321',
        qualification: 'Cử nhân Sinh học',
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form if needed
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
                            <p className="text-gray-600 text-sm">Quản lý thông tin cá nhân của bạn</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <IoMdNotificationsOutline size={24} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        {/* Profile Header */}
                        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Thông tin cơ bản</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                    >
                                        <FiEdit size={16} />
                                        <span>Chỉnh sửa</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <FiSave size={16} />
                                            <span>Lưu</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <FiX size={16} />
                                            <span>Hủy</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-3xl font-medium">
                                        {profile.fullName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{profile.fullName}</h3>
                                    <p className="text-gray-600">{profile.position}</p>
                                    <p className="text-gray-500 text-sm">{profile.department}</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cá nhân</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profile.fullName}
                                                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Work Information */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin công việc</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mã nhân viên
                                        </label>
                                        <p className="text-gray-900">{profile.employeeId}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phòng ban
                                        </label>
                                        <p className="text-gray-900">{profile.department}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chức vụ
                                        </label>
                                        <p className="text-gray-900">{profile.position}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày bắt đầu làm việc
                                        </label>
                                        <p className="text-gray-900">{profile.joinDate}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Trình độ chuyên môn
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profile.qualification}
                                                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.qualification}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại khẩn cấp
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profile.emergencyContact}
                                                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.emergencyContact}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffProfile;