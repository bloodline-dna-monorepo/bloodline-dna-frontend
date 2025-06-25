import React, { useState } from 'react'
import { Settings as SettingsIcon, Bell, Save, Shield, Key } from 'lucide-react'
import StaffLayout from '../../components/Layout/StaffLayout'

const StaffSettings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
        reports: true
    })

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleSave = () => {
        alert('Cài đặt đã được lưu thành công!')
    }

    const handleChangePassword = () => {
        alert('Chức năng đổi mật khẩu sẽ được triển khai sau!')
    }

    return (
        <StaffLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
                    <p className="text-gray-600 mt-2">Quản lý cài đặt và tùy chọn cá nhân</p>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Bell className="w-5 h-5 mr-2" />
                            Cài đặt thông báo
                        </h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">Thông báo Email</h3>
                                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                            </div>
                            <button
                                onClick={() => toggleNotification('email')}
                                className={`relative inline-flex h-6 w-11 rounded-full ${notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 rounded-full bg-white mt-1 transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                                <p className="text-sm text-gray-600">Nhận cảnh báo khẩn cấp</p>
                            </div>
                            <button
                                onClick={() => toggleNotification('sms')}
                                className={`relative inline-flex h-6 w-11 rounded-full ${notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 rounded-full bg-white mt-1 transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">Thông báo Push</h3>
                                <p className="text-sm text-gray-600">Nhận thông báo trên trình duyệt</p>
                            </div>
                            <button
                                onClick={() => toggleNotification('push')}
                                className={`relative inline-flex h-6 w-11 rounded-full ${notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 rounded-full bg-white mt-1 transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">Báo cáo định kỳ</h3>
                                <p className="text-sm text-gray-600">Nhận báo cáo hàng tuần</p>
                            </div>
                            <button
                                onClick={() => toggleNotification('reports')}
                                className={`relative inline-flex h-6 w-11 rounded-full ${notifications.reports ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 rounded-full bg-white mt-1 transition-transform ${notifications.reports ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Bảo mật tài khoản
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <Key className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Đổi mật khẩu</h3>
                                    <p className="text-sm text-gray-600">Cập nhật mật khẩu</p>
                                </div>
                            </div>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Lưu tất cả cài đặt
                    </button>
                </div>
            </div>
        </StaffLayout>
    )
}

export default StaffSettings