"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Button from "./Button"

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold text-lg">G</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">Gen</span>
                <span className="text-sm font-bold text-purple-600">Unity</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              DNA Services
            </Link>
            <Link to="/guide-faq" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Guide & FAQ
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
                >
                  {user?.profile?.fullName
                    ? user.profile.fullName.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase() || "N"}
                </button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
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
