"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Button from "./Button" // Đảm bảo Button component của bạn hỗ trợ các variant màu sắc này
import Logo from '../../assets/logo.png'
const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Lỗi đăng xuất:", error)
    }
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-20 h-20 white rounded-full flex items-center justify-center">
               <img src={Logo} alt="" />
              </div>
           
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Trang Chủ
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Về Chúng Tôi
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Dịch Vụ DNA
            </Link>
            <Link to="/guide-faq" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Hướng Dẫn & FAQ
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Blog
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleProfileClick}
                  className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium hover:bg-teal-700 transition-colors"
                  aria-label="Xem hồ sơ"
                >
                  {user?.profile?.FullName
                    ? user.profile.FullName.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase() || "N"}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                >
                  Đăng Xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100 hover:text-teal-600">
                    Đăng Nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                    Đăng Ký
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
