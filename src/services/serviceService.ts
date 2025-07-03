import { apiClient } from '../utils/api'
import type { ApiResponse, Services, ServiceResponse } from '../utils/types'

class ServiceService {
  async getAllServices(): Promise<Services[]> {
    try {
      const response = await apiClient.get<ApiResponse<Services[]>>('/services')
      return response.data.data
    } catch (error: any) {
      console.error('Service service get all error:', error)
      throw error
    }
  }

  async getServiceById(id: number): Promise<Services> {
    try {
      const response = await apiClient.get<ApiResponse<Services>>(`/services/${id}`)
      return response.data.data
    } catch (error: any) {
      console.error('Service service get by id error:', error)
      throw error
    }
  }

  async getServicesByType(type: 'Administrative' | 'Civil'): Promise<Services[]> {
    try {
      const res = await apiClient.get(`/services/type/${type}`)

      const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : []

      return data as Services[] // ❗ Không cần map lại
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

export const serviceService = new ServiceService()
