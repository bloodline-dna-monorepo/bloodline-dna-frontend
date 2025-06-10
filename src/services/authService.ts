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

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  accessToken: string
  refreshToken: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>("/auth/login", credentials)

    // Store tokens
    localStorage.setItem("authToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>("/auth/register", userData)

    // Store tokens
    localStorage.setItem("authToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("user", JSON.stringify(response.user))

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
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await apiService.post<{ accessToken: string }>("/auth/refresh-token", {
      refreshToken,
    })

    localStorage.setItem("authToken", response.accessToken)
    return response.accessToken
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken")
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }

  getToken(): string | null {
    return localStorage.getItem("authToken")
  }
}

export const authService = new AuthService()
