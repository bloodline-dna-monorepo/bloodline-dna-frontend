'use client'

import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../Common/Button'
import Input from '../Common/Input'
import type { RegisterRequest } from '../../utils/types'

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    Email: '',
    PasswordHash: '',
    ConfirmPassword: '',
    FullName: '',
    PhoneNumber: '',
    Address: '',
    DateOfBirth: '',
    SignatureImage: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.PasswordHash !== formData.ConfirmPassword) {
      setError('Mật khẩu không khớp')
      setLoading(false)
      return
    }

    if (formData.PasswordHash.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự')
      setLoading(false)
      return
    }

    try {
      const response = await register(formData) // response.message

      setSuccessMessage(response.message || 'Đăng ký thành công! Đang chuyển hướng...')

      // Chờ 2 giây rồi chuyển trang
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error: any) {
      setError(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className='mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-teal-100'>
            <span className='text-2xl'>🧬</span>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Tạo tài khoản của bạn</h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Hoặc{' '}
            <Link to='/login' className='font-medium text-teal-600 hover:text-teal-500'>
              đăng nhập vào tài khoản đã có
            </Link>
          </p>
        </div>
        {successMessage && (
          <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md'>
            {successMessage}
          </div>
        )}
        {error && <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>{error}</div>}
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>{error}</div>}

          <div className='space-y-4'>
            <Input
              label='Địa chỉ email'
              type='email'
              name='Email'
              value={formData.Email}
              onChange={handleChange}
              required
              autoComplete='email'
              placeholder='Nhập email của bạn'
            />

            <Input
              label='Mật khẩu'
              type='password'
              name='PasswordHash'
              value={formData.PasswordHash}
              onChange={handleChange}
              required
              autoComplete='new-password'
              placeholder='Nhập mật khẩu của bạn'
            />

            <Input
              label='Xác nhận mật khẩu'
              type='password'
              name='ConfirmPassword'
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
              autoComplete='new-password'
              placeholder='Xác nhận lại mật khẩu'
            />

            <Input
              label='Họ và tên'
              type='text'
              name='FullName'
              value={formData.FullName}
              onChange={handleChange}
              required
              autoComplete='on'
              placeholder='Họ và tên'
            />

            <Input
              label='Số điện thoại'
              type='text'
              name='PhoneNumber'
              value={formData.PhoneNumber}
              onChange={handleChange}
              required
              autoComplete='off'
              placeholder='Số điện thoại'
            />

            <Input
              label='Địa chỉ'
              type='text'
              name='Address'
              value={formData.Address}
              onChange={handleChange}
              required
              autoComplete='on'
              placeholder='Địa chỉ'
            />

            <Input
              label='Ngày sinh'
              type='date'
              name='DateOfBirth'
              value={formData.DateOfBirth}
              onChange={handleChange}
              required
              autoComplete='off'
              placeholder='Ngày sinh'
            />

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Ảnh chữ ký</label>
              <input
                type='file'
                name='SignatureImage'
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
          </div>

          <div className='flex items-center'>
            <input
              id='agree-terms'
              name='agree-terms'
              type='checkbox'
              required
              className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
            />
            <label htmlFor='agree-terms' className='ml-2 block text-sm text-gray-900'>
              Tôi đồng ý với{' '}
              <Link to='/terms' className='text-teal-600 hover:text-teal-500'>
                Điều khoản sử dụng
              </Link>{' '}
              và{' '}
              <Link to='/privacy' className='text-teal-600 hover:text-teal-500'>
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <Button type='submit' className='w-full' loading={loading}>
            Tạo tài khoản
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
