'use client'

import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData((prev) => ({ ...prev, SignatureImage: base64String }))
    }
    reader.readAsDataURL(file)
  }

  const validationSchema = Yup.object({
    Email: Yup.string().email('Invalid email').required('Required'),
    PasswordHash: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref('PasswordHash')], 'Passwords must match')
      .required('Required'),
    FullName: Yup.string().required('Required'),
    PhoneNumber: Yup.string().required('Required'),
    Address: Yup.string().required('Required'),
    DateOfBirth: Yup.string().required('Required'),
    SignatureImage: Yup.string().required('Required')
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await validationSchema.validate(formData, { abortEarly: false })
      setFieldErrors({})
    } catch (err: any) {
      const errors: Record<string, string> = {}
      err.inner.forEach((e: Yup.ValidationError) => {
        if (e.path) errors[e.path] = e.message
      })
      setFieldErrors(errors)
      setLoading(false)
      return
    }

    try {
      const response = await register(formData)
      setSuccessMessage(response.message || 'Register successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (error) {
      setError('Registration failed. Please try again. ' + error)
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
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create your account</h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link to='/login' className='font-medium text-teal-600 hover:text-teal-500'>
              sign in
            </Link>
          </p>
        </div>

        {successMessage && (
          <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md'>
            {successMessage}
          </div>
        )}
        {error && <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>{error}</div>}

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            label='Email address'
            type='email'
            name='Email'
            value={formData.Email}
            onChange={handleChange}
            required
            placeholder='Enter your email'
            error={fieldErrors.Email}
          />
          <Input
            label='Password'
            type='password'
            name='PasswordHash'
            value={formData.PasswordHash}
            onChange={handleChange}
            required
            placeholder='Enter your password'
            error={fieldErrors.PasswordHash}
          />
          <Input
            label='Confirm Password'
            type='password'
            name='ConfirmPassword'
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
            placeholder='Confirm your password'
            error={fieldErrors.ConfirmPassword}
          />
          <Input
            label='Full Name'
            type='text'
            name='FullName'
            value={formData.FullName}
            onChange={handleChange}
            required
            placeholder='Full Name'
            error={fieldErrors.FullName}
          />
          <Input
            label='Phone Number'
            type='text'
            name='PhoneNumber'
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
            placeholder='Phone Number'
            error={fieldErrors.PhoneNumber}
          />
          <Input
            label='Address'
            type='text'
            name='Address'
            value={formData.Address}
            onChange={handleChange}
            required
            placeholder='Address'
            error={fieldErrors.Address}
          />
          <Input
            label='Date of Birth'
            type='date'
            name='DateOfBirth'
            value={formData.DateOfBirth}
            onChange={handleChange}
            required
            placeholder='Date of Birth'
            error={fieldErrors.DateOfBirth}
          />

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Signature Image</label>
            <input
              type='file'
              name='SignatureImage'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-md'
              required
            />
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
              I agree to the{' '}
              <Link to='/terms' className='text-teal-600 hover:text-teal-500'>
                Terms
              </Link>{' '}
              and{' '}
              <Link to='/privacy' className='text-teal-600 hover:text-teal-500'>
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button type='submit' className='w-full' loading={loading}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
