import { ErrorHandler } from "../utils/errorUtils"

class ApiService {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw ErrorHandler.createApiError(
          errorData.message || `HTTP ${response.status}`,
          errorData.code || ErrorHandler.getErrorType(response.status),
          response.status,
          errorData,
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof TypeError) {
        throw ErrorHandler.createApiError("Network error occurred", "NETWORK_ERROR", 0)
      }
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiService = new ApiService()
