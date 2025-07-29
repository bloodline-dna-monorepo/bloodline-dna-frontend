'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { userService } from '../../services/userService'
import type { UserProfile } from '../../utils/types'
import Button from '../../components/Common/Button'
import DashboardSidebar from '../../components/Common/Sidebar'
import { authService } from '../../services/authService'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (currentPassword: string, newPassword: string, confirmPassword: string) => void
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }
    onSubmit(currentPassword, newPassword, confirmPassword)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Thay đổi mật khẩu</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            ✕
          </button>
        </div>
        <p className='text-gray-600 mb-6'>Nhập mật khẩu hiện tại và mật khẩu mới</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {[
            {
              label: 'Mật khẩu hiện tại',
              value: currentPassword,
              setValue: setCurrentPassword,
              show: showCurrentPassword,
              toggle: () => setShowCurrentPassword(!showCurrentPassword)
            },
            {
              label: 'Mật khẩu mới',
              value: newPassword,
              setValue: setNewPassword,
              show: showNewPassword,
              toggle: () => setShowNewPassword(!showNewPassword)
            },
            {
              label: 'Xác nhận mật khẩu mới',
              value: confirmPassword,
              setValue: setConfirmPassword,
              show: showConfirmPassword,
              toggle: () => setShowConfirmPassword(!showConfirmPassword)
            }
          ].map((field, index) => (
            <div key={index} className='relative'>
              <label className='block text-sm font-medium mb-1'>{field.label}</label>
              <div className='relative'>
                <input
                  type={field.show ? 'text' : 'password'}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
                <button
                  type='button'
                  onClick={field.toggle}
                  className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'
                >
                  👁
                </button>
              </div>
            </div>
          ))}
          <div className='flex gap-3 pt-4'>
            <Button type='button' onClick={onClose} variant='secondary' className='flex-1'>
              Hủy
            </Button>
            <Button type='submit' className='flex-1 bg-black text-white hover:bg-gray-800'>
              Đổi mật khẩu
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const UserProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  // Form state
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      if (user?.accountId) {
        const profile = await userService.getProfile()
        setUserProfile(profile)
        setFullName(profile.FullName || '')
        setPhoneNumber(profile.PhoneNumber || '')
        setDateOfBirth(profile.DateOfBirth ? dayjs(profile.DateOfBirth).format('YYYY-MM-DD') : '')
        setAddress(profile.Address || '')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      const data = {
        password: currentPassword,
        NewPassword: newPassword,
        confirmNewPassword: confirmPassword
      }
      const res = await authService.changePassword(data)
      toast.success(res.message || 'Đổi mật khẩu thành công!')
      setIsPasswordModalOpen(false)
    } catch (error: any) {
      console.error('Error changing password:', error)
      toast.error(error?.response?.data?.message || 'Đổi mật khẩu thất bại')
    }
  }

  const handleUpdateProfile = async () => {
    const birthDate = dayjs(dateOfBirth, 'YYYY-MM-DD', true)
    const age = dayjs().diff(birthDate, 'year')

    if (!birthDate.isValid() || age < 18) {
      toast.error('Bạn phải từ 18 tuổi trở lên')
      return
    }

    try {
      const data = {
        FullName: fullName,
        PhoneNumber: phoneNumber,
        DateOfBirth: dateOfBirth,
        Address: address
      }
      await userService.updateProfile(data)
      toast.success('Cập nhật thông tin thành công!')
      fetchUserProfile()
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin')
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50'>
        <DashboardSidebar />
        <main className='flex-1 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
        </main>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 p-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl font-bold mb-2'>Thông tin cá nhân</h1>
          <p className='text-gray-600 mb-8'>Cập nhật thông tin hồ sơ của bạn</p>

          <div className='bg-white rounded-xl shadow p-8 mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* FullName */}
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Họ và tên <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              {/* Email (disabled) */}
              <div>
                <label className='block text-sm font-medium mb-2'>Email</label>
                <input
                  type='email'
                  value={user?.email || ''}
                  disabled
                  className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50'
                />
              </div>

              {/* Phone */}
              <div>
                <label className='block text-sm font-medium mb-2'>Số điện thoại</label>
                <input
                  type='text'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  required
                />
              </div>

              {/* DOB */}
              <div>
                <label className='block text-sm font-medium mb-2'>Ngày sinh</label>
                <input
                  type='date'
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>

              {/* Address */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium mb-2'>Địa chỉ</label>
                <input
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>
            </div>

            {/* Signature image */}
            {userProfile?.SignatureImage && (
              <div className='mt-6'>
                <label className='block text-sm font-medium mb-2'>Vân tay</label>
                <div className='border border-gray-200 rounded-md p-3 bg-gray-50 max-w-[126px]'>
                  <img src={userProfile.SignatureImage} alt='Chữ ký' className='w-auto h-auto max-w-full' />
                </div>
              </div>
            )}

            <div className='mt-6'>
              <Button onClick={handleUpdateProfile} className='bg-black text-white hover:bg-gray-800 px-6 py-2'>
                Cập nhật
              </Button>
            </div>
          </div>

          {/* Bảo mật tài khoản */}
          <div className='bg-white rounded-xl shadow p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                <svg width='16' height='16' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold'>Bảo mật tài khoản</h3>
                <p className='text-sm text-gray-600'>Quản lý mật khẩu và cài đặt bảo mật</p>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <div className='font-medium'>Mật khẩu</div>
                <div className='text-sm text-gray-600'>Thay đổi mật khẩu đăng nhập</div>
              </div>
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                variant='secondary'
                className='border border-gray-300 hover:bg-gray-50'
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>

          <PasswordChangeModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordChange}
          />
        </div>
      </main>
    </div>
  )
}

export default UserProfilePage
