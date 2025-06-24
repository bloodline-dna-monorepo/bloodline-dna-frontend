"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isLogin) {
        // Đăng nhập với MockAPI
        const response = await fetch('https://6858bca4138a18086dfbaef4.mockapi.io/users')

        if (!response.ok) {
          throw new Error('Không thể kết nối đến server')
        }

        const users = await response.json()

        // Tìm user theo username và password
        const foundUser = users.find((u: any) =>
          u.username === username && u.password === password
        )

        if (foundUser) {
          // Lưu thông tin đăng nhập
          localStorage.setItem("token", `fake-token-${foundUser.id}`)
          localStorage.setItem("role", foundUser.role || "customer")
          localStorage.setItem("user", JSON.stringify({
            id: foundUser.id,
            name: foundUser.name,        // Dùng tên thật từ API
            username: foundUser.username
          }))
          
          console.log(`Đăng nhập thành công với role: ${foundUser.role}`)
          console.log(`Tên user: ${foundUser.name}`) // Debug log
          
          // Dispatch event để Header cập nhật ngay lập tức
          window.dispatchEvent(new Event('authStateChanged'))
          
          // Chuyển hướng
          setTimeout(() => {
            navigate("/")
          }, 100)
        } else {
          setError("Tên đăng nhập hoặc mật khẩu không đúng")
        }
      } else {
        // Đăng ký (tạm thời giả lập)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setError("Chức năng đăng ký chưa được triển khai")
      }
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              <h2 className="text-2xl font-bold">{isLogin ? "Sign In" : "Create Account"}</h2>
              <p className="opacity-90">
                {isLogin
                  ? "Welcome back! Sign in to access your account"
                  : "Join us to access our DNA testing services"}
              </p>
            </div>

            {error && (
              <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                    />
                  </div>
                </div>

                {/* Hiển thị thông tin test users */}
                {isLogin && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs text-blue-600 font-medium mb-1">Test Users:</p>
                    <p className="text-xs text-blue-600">• Username: cus1, Password: 123 (Quang Thành - Customer)</p>
                    <p className="text-xs text-blue-600">• Username: cus2, Password: 123 (Bảo - Customer)</p>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)]">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn btn-primary flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>

              {/* Bỏ Google Auth để đơn giản */}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-1 font-medium text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
