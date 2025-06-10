import { apiService } from "./apiService"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>("/auth/login", credentials)

    if (response.success && response.token) {
      // Store token and user info
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
    }

    return response
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>("/auth/register", userData)

    if (response.success && response.token) {
      // Store token and user info
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
    }

    return response
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      await apiService.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    }
  }

  async getCurrentUserProfile(): Promise<User> {
    return await apiService.get<User>("/auth/profile")
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("user")
    return !!(token && user)
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }

  getToken(): string | null {
    return localStorage.getItem("authToken")
  }

  // Get user initials for profile avatar
  getUserInitials(): string {
    const user = this.getCurrentUser()
    if (!user || !user.name) return "U"

    const names = user.name.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }
}

export const authService = new AuthService()
