"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService"
import type { LoginRequest, RegisterRequest, ChangePasswordRequest, User } from "../types/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  changePassword: (data: ChangePasswordRequest) => Promise<void>
  refreshUserData: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isManager: boolean
  isStaff: boolean
  isCustomer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (token) {
        const userData = await authService.getProfile()
        setUser(userData)
      }
    } catch (error) {
      console.error("Initialize auth error:", error)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data)

      // Store tokens
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)

      // Set user data
      setUser(response.user)

      // Navigate based on role
      const role = response.user.role
      switch (role) {
        case "Admin":
          navigate("/admin/dashboard")
          break
        case "Manager":
          navigate("/manager/dashboard")
          break
        case "Staff":
          navigate("/staff/dashboard")
          break
        case "Customer":
        default:
          navigate("/customer/dashboard")
          break
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data)

      // Store tokens
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)

      // Set user data
      setUser(response.user)

      // Navigate to customer dashboard (default role)
      navigate("/customer/dashboard")
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) {
        await authService.logout(refreshToken)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage and state
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setUser(null)
      navigate("/login")
    }
  }

  const changePassword = async (data: ChangePasswordRequest) => {
    try {
      await authService.changePassword(data)
    } catch (error) {
      console.error("Change password error:", error)
      throw error
    }
  }

  const refreshUserData = async () => {
    try {
      const userData = await authService.getProfile()
      setUser(userData)
    } catch (error) {
      console.error("Refresh user data error:", error)
      throw error
    }
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === "Admin"
  const isManager = user?.role === "Manager"
  const isStaff = user?.role === "Staff"
  const isCustomer = user?.role === "Customer"

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    changePassword,
    refreshUserData,
    isAuthenticated,
    isAdmin,
    isManager,
    isStaff,
    isCustomer,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
