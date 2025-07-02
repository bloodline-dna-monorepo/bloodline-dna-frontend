'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { userService } from '../../services/userService'
import type { UserProfile } from '../../utils/types'
import Button from '../../components/Common/Button'
import DashboardSidebar from '../../components/Common/Sidebar'

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
      alert('Mật khẩu mới không khớp')
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
          <div className='relative'>
            <label className='block text-sm font-medium mb-1'>Mật khẩu hiện tại</label>
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
              />
              <button
                type='button'
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'
              >
                👁
              </button>
            </div>
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium mb-1'>Mật khẩu mới</label>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
              />
              <button
                type='button'
                onClick={() => setShowNewPassword(!showNewPassword)}
                className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'
              >
                👁
              </button>
            </div>
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium mb-1'>Xác nhận mật khẩu mới</label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'
              >
                👁
              </button>
            </div>
          </div>

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      if (user?.accountId) {
        const profile = await userService.getProfile()
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      // API call would go here - need backend endpoint
      console.log('Password change API call needed:', { currentPassword, newPassword, confirmPassword })
      alert('Cần tạo API endpoint để đổi mật khẩu')
      setIsPasswordModalOpen(false)
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Có lỗi xảy ra khi đổi mật khẩu')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpdateProfile = async () => {
    try {
      // API call would go here - need backend endpoint for profile update
      console.log('Profile update API call needed')
      alert('Cần tạo API endpoint để cập nhật profile')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center h-64'>Đang tải...</div>
  }

  return (
    <div className='flex '>
      <DashboardSidebar />
      <div className='max-w-full mx-auto p-6 ml-20'>
        <h1 className='text-2xl font-bold mb-8'>Thông tin cá nhân</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Họ và tên <span className='text-red-500'>*</span>
            </label>
            <div className='text-lg font-medium'>{userProfile?.FullName || 'Nguyễn Văn A'}</div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>
              Email <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>{userProfile?.Email || 'nguyenvana@gmail.com'}</span>
              <span className='text-green-500 text-sm'>Can't update</span>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>
              Số điện thoại <span className='text-red-500'>*</span>
            </label>
            <div className='text-lg'>{userProfile?.PhoneNumber || '0123456789'}</div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Ngày sinh</label>
            <div className='text-lg'>{userProfile?.DateOfBirth || '01/01/1999'}</div>
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-medium mb-2'>Địa chỉ</label>
            <div className='text-lg'>{userProfile?.Address || '123 Đường ABC, Quận 1, TP.HCM'}</div>
            
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-medium mb-2'>
              Hình ảnh chữ ký <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center gap-4'>
              {selectedFile ? (
                <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                  <span>{selectedFile.name}</span>
                  <button onClick={() => setSelectedFile(null)} className='text-red-500 hover:text-red-700'>
                    ✕
                  </button>
                </div>
              ) : (
                <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded'>
                  <span>chu-ky.png (100kb)</span>
                  <button className='text-red-500 hover:text-red-700'>✕</button>
                </div>
              )}
              <input
                type='file'
                onChange={handleFileChange}
                accept='image/*'
                className='hidden'
                id='signature-upload'
              />
              <label htmlFor='signature-upload' className='cursor-pointer text-blue-500 hover:text-blue-700'>
                Chọn file
              </label>
            </div>
           
            <Button onClick={handleUpdateProfile} className='mt-3 bg-black text-white hover:bg-gray-800'>
              Cập nhật
            </Button>
          </div>
        </div>

        <div className='bg-gray-50 rounded-lg p-6'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>🔒</div>
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
            <Button onClick={() => setIsPasswordModalOpen(true)} variant='secondary' className='border border-gray-300'>
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
    </div>
  )
}

export default UserProfilePage
