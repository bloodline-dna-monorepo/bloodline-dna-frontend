import React, { useState } from 'react';
import Sidebar from '../../components/Common/Sidebar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiSave } from 'react-icons/fi';

const StaffSettings = () => {
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            sms: true,
            push: false
        },
        security: {
            twoFactor: false,
            loginNotifications: true,
            sessionTimeout: '30'
        },
        privacy: {
            profileVisibility: 'team',
            dataSharing: false
        }
    });

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSaveSettings = () => {
        // Handle save settings logic
        console.log('Settings saved:', settings);
    };

    const handlePasswordChange = () => {
        // Handle password change logic
        setShowPasswordModal(false);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                            <p className="text-gray-600 text-sm">Quản lý cài đặt tài khoản của bạn</p>
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
                    <div className="max-w-4xl mx-auto space-y-6">

                        {/* Cài đặt thông báo */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt thông báo</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-700">Nhận thông báo qua Email</p>
                                        <p className="text-sm text-gray-500">Nhận thông báo về các yêu cầu mới qua email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={settings.notifications.email}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                notifications: { ...settings.notifications, email: e.target.checked }
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-700">SMS</p>
                                        <p className="text-sm text-gray-500">Nhận thông báo khẩn cấp qua SMS</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={settings.notifications.sms}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                notifications: { ...settings.notifications, sms: e.target.checked }
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-700">Lưu thông báo</p>
                                        <p className="text-sm text-gray-500">Lưu các thông báo trong hệ thống</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={settings.notifications.push}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                notifications: { ...settings.notifications, push: e.target.checked }
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-700">Gửi thông báo thống kê</p>
                                        <p className="text-sm text-gray-500">Nhận báo cáo thống kê định kỳ</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={settings.security.loginNotifications}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                security: { ...settings.security, loginNotifications: e.target.checked }
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Bảo mật tài khoản */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔒 Bảo mật tài khoản</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-700">Mật khẩu</p>
                                        <p className="text-sm text-gray-500">Thay đổi mật khẩu đăng nhập</p>
                                    </div>
                                    <button
                                        onClick={() => setShowPasswordModal(true)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveSettings}
                                className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                <FiSave size={16} />
                                <span>Lưu cài đặt</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thay đổi mật khẩu</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffSettings;