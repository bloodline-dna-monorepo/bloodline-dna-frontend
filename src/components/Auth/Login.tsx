'use client'

import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../Common/Button'
import Input from '../Common/Input'
import type { LoginRequest } from '../../types/types'

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
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

    try {
      await login(formData)
      // Navigation will be handled by the AuthContext after successful login
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='mx-auto h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center'>
            <span className='text-2xl'>🧬</span>
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Sign in to your account</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Or{' '}
            <Link to='/register' className='font-medium text-teal-600 hover:text-teal-500'>
              create a new account
            </Link>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>{error}</div>
          )}

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
              autoComplete='current-password'
              placeholder='Enter your password'
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <Link to='/forgot-password' className='font-medium text-teal-600 hover:text-teal-500'>
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type='submit' className='w-full' loading={loading} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
