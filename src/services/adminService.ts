import { apiClient } from '../utils/api'
import type { ApiResponse, User, Services, DashboardStats } from '../utils/types'

class AdminService {
  // Dashboard APIs
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<ApiResponse<DashboardStats>>('/admin/dashboard')
      return response.data.data
    } catch (error) {
      console.error('Admin dashboard stats error:', error)
      throw error
    }
  }

  // User Management APIs
  async getAllUsers(search?: string): Promise<User[]> {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/admin/users', {
        params: { search }
      })
      return response.data.data
    } catch (error) {
      console.error('Admin get users error:', error)
      throw error
    }
  }

  async updateUserRole(userId: number, roleId: number): Promise<void> {
    try {
      await apiClient.put(`/admin/users/${userId}/role`, { roleId })
    } catch (error) {
      console.error('Admin update user role error:', error)
      throw error
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await apiClient.delete(`/admin/users/${userId}`)
    } catch (error) {
      console.error('Admin delete user error:', error)
      throw error
    }
  }

  // Service Management APIs
  async getAllServices(): Promise<Services[]> {
    try {
      const response = await apiClient.get<ApiResponse<Services[]>>('/admin/services')
      return response.data.data
    } catch (error) {
      console.error('Admin get services error:', error)
      throw error
    }
  }

  async createService(serviceData: Omit<Services, 'ServiceID' | 'CreatedAt' | 'UpdatedAt'>): Promise<Services> {
    try {
      const response = await apiClient.post<ApiResponse<Services>>('/admin/services', serviceData)
      return response.data.data
    } catch (error) {
      console.error('Admin create service error:', error)
      throw error
    }
  }

  async updateService(serviceId: number, serviceData: Partial<Services>): Promise<Services> {
    try {
      const response = await apiClient.put<ApiResponse<Services>>(`/admin/services/${serviceId}`, serviceData)
      return response.data.data
    } catch (error) {
      console.error('Admin update service error:', error)
      throw error
    }
  }

  async deleteService(serviceId: number): Promise<void> {
    try {
      await apiClient.delete(`/admin/services/${serviceId}`)
    } catch (error) {
      console.error('Admin delete service error:', error)
      throw error
    }
  }
}

export const adminService = new AdminService()
