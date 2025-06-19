'use client'

import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../Common/Button'
import Input from '../Common/Input'
import type { RegisterRequest } from '../../types/types'

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      await register(formData)
      navigate('/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.')
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
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>{error}</div>}

          <div className='space-y-4'>
            <Input
              label='Email address'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete='email'
              placeholder='Enter your email'
            />

            <Input
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete='new-password'
              placeholder='Enter your password'
            />

            <Input
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete='new-password'
              placeholder='Confirm your password'
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
                Terms and Conditions
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
