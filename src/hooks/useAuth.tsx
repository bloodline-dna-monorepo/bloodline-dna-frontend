"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { authService, type User } from "../services/authService"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getUserInitials: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on app start
    const currentUser = authService.getCurrentUser()
    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    if (response.success) {
      setUser(response.user)
    } else {
      throw new Error(response.message || "Login failed")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register({ name, email, password })
    if (response.success) {
      setUser(response.user)
    } else {
      throw new Error(response.message || "Registration failed")
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const getUserInitials = () => {
    return authService.getUserInitials()
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    getUserInitials,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
