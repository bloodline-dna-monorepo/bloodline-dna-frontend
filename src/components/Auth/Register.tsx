'use client'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import Button from '../Common/Button'
import Input from '../Common/Input'
import type { RegisterRequest } from '../../utils/types'

const Register: React.FC = () => {
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik<RegisterRequest>({
    initialValues: {
      Email: '',
      PasswordHash: '',
      ConfirmPassword: '',
      FullName: '',
      PhoneNumber: '',
      Address: '',
      DateOfBirth: '',
      SignatureImage: ''
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('')
      try {
        const response = await register(values)
        setSuccessMessage(response.message || 'Register successful! Redirecting...')
        setTimeout(() => navigate('/dashboard'), 2000)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  })

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
            <Link to='/login' className='font-medium text-teal-600 hover:text-teal-500'>sign in</Link>
          </p>
        </div>

        {successMessage && <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md'>{successMessage}</div>}
        {error && <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md'>{error}</div>}

        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          {Object.entries(formik.values).map(([key, val]) => (
            key !== 'SignatureImage' && (
              <Input
                key={key}
                label={key.replace(/([A-Z])/g, ' $1')}
                type={key.includes('Password') ? 'password' : key === 'DateOfBirth' ? 'date' : 'text'}
                name={key}
                value={val as string}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                placeholder={`Enter your ${key}`}
                error={
                  formik.touched[key as keyof RegisterRequest] && typeof formik.errors[key as keyof RegisterRequest] === 'string'
                    ? formik.errors[key as keyof RegisterRequest] as string
                    : undefined
                }
              />
            )
          ))}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Signature Image</label>
            <input
              type='file'
              name='SignatureImage'
              onChange={(e) => {
                const file = e.currentTarget.files?.[0]
                if (file) formik.setFieldValue('SignatureImage', file.name)
              }}
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
              I agree to the <Link to='/terms' className='text-teal-600 hover:text-teal-500'>Terms</Link> and{' '}
              <Link to='/privacy' className='text-teal-600 hover:text-teal-500'>Privacy Policy</Link>
            </label>
          </div>

          <Button type='submit' className='w-full' loading={formik.isSubmitting}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
