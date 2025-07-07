import React, { useState } from 'react'
import {
    UserIcon,
    KeyIcon,
    XMarkIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline'
import StaffSidebar from '../../components/StaffSidebar/StaffSidebar'

const StaffProfile: React.FC = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })
    const [signatureFile, setSignatureFile] = useState<File | null>(null)
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
    const [isUploadingSignature, setIsUploadingSignature] = useState(false)

    // Sample staff data
    const staffData = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phone: '0123456789',
        birthDate: '01/01/1999',
        gender: 'Nam',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        signatureFile: 'chu-ky.png'
    }

    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const calculatePasswordStrength = (password: string) => {
        let score = 0
        let feedback = ''

        if (password.length === 0) {
            return { score: 0, feedback: '' }
        }

        if (password.length >= 6) score += 1
        if (password.length >= 8) score += 1
        if (/[a-z]/.test(password)) score += 1
        if (/[A-Z]/.test(password)) score += 1
        if (/[0-9]/.test(password)) score += 1
        if (/[^a-zA-Z0-9]/.test(password)) score += 1

        if (score < 3) {
            feedback = 'Yếu'
        } else if (score < 5) {
            feedback = 'Trung bình'
        } else {
            feedback = 'Mạnh'
        }

        return { score, feedback }
    }

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }))

        // Update password strength for new password
        if (field === 'newPassword') {
            const strength = calculatePasswordStrength(value)
            setPasswordStrength(strength)
        }
    }

    const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
        const errors: string[] = []

        if (password.length < 6) {
            errors.push('Mật khẩu phải có ít nhất 6 ký tự')
        }

        if (password.length > 50) {
            errors.push('Mật khẩu không được quá 50 ký tự')
        }

        if (!/[a-zA-Z]/.test(password)) {
            errors.push('Mật khẩu phải chứa ít nhất một chữ cái')
        }

        if (!/[0-9]/.test(password)) {
            errors.push('Mật khẩu phải chứa ít nhất một chữ số')
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    const handleSignatureFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(file.type)) {
            alert('Chỉ cho phép tải lên file ảnh định dạng JPG, JPEG hoặc PNG!')
            return
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            alert('Kích thước file không được vượt quá 5MB!')
            return
        }

        setSignatureFile(file)

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
            setSignaturePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleUploadSignature = async () => {
        if (!signatureFile) {
            alert('Vui lòng chọn file chữ ký!')
            return
        }

        try {
            setIsUploadingSignature(true)

            // Create FormData for file upload
            const formData = new FormData()
            formData.append('signature', signatureFile)

            // Here you would typically send to backend API
            console.log('Uploading signature:', signatureFile.name)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            alert('Tải lên chữ ký thành công!')

            // Reset upload state but keep preview
            setSignatureFile(null)

        } catch (error) {
            console.error('Error uploading signature:', error)
            alert('Có lỗi xảy ra khi tải lên chữ ký. Vui lòng thử lại!')
        } finally {
            setIsUploadingSignature(false)
        }
    }

    const handleRemoveSignature = () => {
        setSignatureFile(null)
        setSignaturePreview(null)
        // Reset file input
        const fileInput = document.getElementById('signature-upload') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ''
        }
    }

    const handleSubmitPassword = async () => {
        // Prevent multiple submissions
        if (isSubmitting) return

        // Validate required fields
        if (!passwordData.currentPassword.trim()) {
            alert('Vui lòng nhập mật khẩu hiện tại!')
            return
        }

        if (!passwordData.newPassword.trim()) {
            alert('Vui lòng nhập mật khẩu mới!')
            return
        }

        if (!passwordData.confirmPassword.trim()) {
            alert('Vui lòng xác nhận mật khẩu mới!')
            return
        }

        // Validate new password strength
        const passwordValidation = validatePassword(passwordData.newPassword)
        if (!passwordValidation.isValid) {
            alert('Mật khẩu không hợp lệ:\n' + passwordValidation.errors.join('\n'))
            return
        }

        // Check if new password is different from current password
        if (passwordData.currentPassword === passwordData.newPassword) {
            alert('Mật khẩu mới phải khác với mật khẩu hiện tại!')
            return
        }

        // Validate password confirmation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp!')
            return
        }

        // Here you would typically validate current password with backend
        // For demo purposes, let's simulate validation
        if (passwordData.currentPassword !== 'currentpassword123') {
            // In real app, this would be handled by backend API
            // alert('Mật khẩu hiện tại không đúng!')
            // return
        }

        try {
            setIsSubmitting(true)

            // Here you would typically send to backend API
            console.log('Changing password:', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.')
            setShowPasswordModal(false)
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
            setShowPasswords({
                current: false,
                new: false,
                confirm: false
            })
            setPasswordStrength({ score: 0, feedback: '' })

        } catch (error) {
            console.error('Error changing password:', error)
            alert('Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại!')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClosePasswordModal = () => {
        if (isSubmitting) return // Prevent closing while submitting

        setShowPasswordModal(false)
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
        setShowPasswords({
            current: false,
            new: false,
            confirm: false
        })
        setPasswordStrength({ score: 0, feedback: '' })
    }

    const togglePasswordVisibility = (field: string) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field as keyof typeof prev]
        }))
    }

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <StaffSidebar />

            <div className='flex-1 p-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2 flex items-center'>
                        <UserIcon className='w-6 h-6 mr-2' />
                        Thông tin cá nhân
                    </h1>
                    <p className='text-gray-600'>Cập nhật thông tin tài khoản của bạn</p>
                </div>

                {/* Main Content */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                    <div className='p-6'>
                        <form className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {/* Họ và tên */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Họ và tên <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={staffData.name}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                        readOnly
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Email <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='email'
                                        value={staffData.email}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                        readOnly
                                    />
                                </div>

                                {/* Số điện thoại */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Số điện thoại <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='tel'
                                        value={staffData.phone}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                        readOnly
                                    />
                                </div>

                                {/* Ngày sinh */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Ngày sinh
                                    </label>
                                    <input
                                        type='text'
                                        value={staffData.birthDate}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                        readOnly
                                    />
                                </div>

                                {/* Giới tính */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Giới tính
                                    </label>
                                    <select
                                        value={staffData.gender}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                        disabled
                                    >
                                        <option value='Nam'>Nam</option>
                                        <option value='Nữ'>Nữ</option>
                                        <option value='Khác'>Khác</option>
                                    </select>
                                </div>
                            </div>

                            {/* Địa chỉ */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Địa chỉ
                                </label>
                                <textarea
                                    value={staffData.address}
                                    rows={3}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                    readOnly
                                />
                            </div>

                            {/* Hình ảnh chữ ký */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Hình ảnh chữ ký <span className='text-red-500'>*</span>
                                </label>

                                {/* Current signature or preview */}
                                {(signaturePreview || staffData.signatureFile) && (
                                    <div className="mb-4">
                                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {signaturePreview ? 'Ảnh được chọn:' : 'Chữ ký hiện tại:'}
                                                </span>
                                                {signaturePreview && (
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveSignature}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Xóa ảnh đã chọn"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                            {signaturePreview ? (
                                                <img
                                                    src={signaturePreview}
                                                    alt="Preview chữ ký"
                                                    className="max-w-full h-32 object-contain border border-gray-200 rounded"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-16 h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">Chữ ký</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">{staffData.signatureFile}</p>
                                                        <p className="text-xs text-gray-500">100kb</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Upload controls */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="file"
                                            id="signature-upload"
                                            accept="image/jpeg,image/jpg,image/png"
                                            onChange={handleSignatureFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="signature-upload"
                                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        >
                                            Chọn file
                                        </label>
                                        {signatureFile && (
                                            <button
                                                type="button"
                                                onClick={handleUploadSignature}
                                                disabled={isUploadingSignature}
                                                className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUploadingSignature ? 'Đang tải lên...' : 'Tải lên'}
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG. Kích thước tối đa 5MB.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Security Section */}
                <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200'>
                    <div className='p-6'>
                        <div className='flex items-center mb-4'>
                            <KeyIcon className='w-5 h-5 text-gray-500 mr-2' />
                            <h2 className='text-lg font-semibold text-gray-900'>Bảo mật tài khoản</h2>
                        </div>
                        <p className='text-sm text-gray-600 mb-4'>Quản lý mật khẩu và cài đặt bảo mật</p>

                        <div className='border border-gray-200 rounded-lg p-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-sm font-medium text-gray-900'>Mật khẩu</h3>
                                    <p className='text-sm text-gray-500'>Thay đổi mật khẩu đăng nhập</p>
                                </div>
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change Modal */}
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Đổi mật khẩu
                                    </h2>
                                    <button
                                        onClick={handleClosePasswordModal}
                                        disabled={isSubmitting}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Password Form */}
                                <div className="space-y-4">
                                    {/* Current Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu hiện tại *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.current ? "text" : "password"}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('current')}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPasswords.current ? (
                                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu mới *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.new ? "text" : "password"}
                                                value={passwordData.newPassword}
                                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('new')}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPasswords.new ? (
                                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {/* Password Strength Indicator */}
                                        {passwordData.newPassword && (
                                            <div className="mt-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.score < 3 ? 'bg-red-500' :
                                                                    passwordStrength.score < 5 ? 'bg-yellow-500' :
                                                                        'bg-green-500'
                                                                }`}
                                                            style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-medium ${passwordStrength.score < 3 ? 'text-red-500' :
                                                            passwordStrength.score < 5 ? 'text-yellow-500' :
                                                                'text-green-500'
                                                        }`}>
                                                        {passwordStrength.feedback}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Xác nhận mật khẩu mới *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.confirm ? "text" : "password"}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${passwordData.confirmPassword && passwordData.newPassword &&
                                                        passwordData.confirmPassword !== passwordData.newPassword
                                                        ? 'border-red-300 bg-red-50'
                                                        : passwordData.confirmPassword && passwordData.newPassword &&
                                                            passwordData.confirmPassword === passwordData.newPassword
                                                            ? 'border-green-300 bg-green-50'
                                                            : 'border-gray-300'
                                                    }`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPasswords.confirm ? (
                                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {/* Password Match Indicator */}
                                        {passwordData.confirmPassword && passwordData.newPassword && (
                                            <div className="mt-1">
                                                {passwordData.confirmPassword === passwordData.newPassword ? (
                                                    <p className="text-xs text-green-600">✓ Mật khẩu khớp</p>
                                                ) : (
                                                    <p className="text-xs text-red-600">✗ Mật khẩu không khớp</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={handleClosePasswordModal}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleSubmitPassword}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            'Đổi mật khẩu'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StaffProfile
