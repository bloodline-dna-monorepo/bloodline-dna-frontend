"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { authService } from "../../services/authService"
import Button from "../Common/Button"
import Input from "../Common/Input"

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token")
    if (!tokenFromUrl) {
      setError("Token không hợp lệ")
      return
    }
    setToken(tokenFromUrl)
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 6 || formData.newPassword.length > 12) {
      setError("Mật khẩu phải có độ dài từ 6 đến 12 ký tự")
      setLoading(false)
      return
    }

    try {
      const response = await authService.resetPassword(token, formData.newPassword, formData.confirmPassword)
      if (response.success) {
        setIsSuccess(true)
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      } else {
        setError(response.message || "Có lỗi xảy ra")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu")
    } finally {
      setLoading(false)
    }
  }

  if (!token && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang xử lý...</p>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đặt lại mật khẩu thành công</h2>
            <div className="mt-8 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    Mật khẩu của bạn đã được đặt lại thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập trong 3
                    giây...
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đặt lại mật khẩu</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Nhập mật khẩu mới của bạn</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Mật khẩu mới (6-12 ký tự)"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Xác nhận mật khẩu mới"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              disabled={loading || !token}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Button>
          </div>

          <div className="text-center">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
