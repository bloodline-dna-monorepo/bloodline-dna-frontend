import { apiClient } from '../utils/api'
import type { ApiResponse, Service, ServiceResponse } from '../types/types'

class ServiceService {
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await apiClient.get<ApiResponse<Service[]>>('/services')
      return response.data.data
    } catch (error: any) {
      console.error('Service service get all error:', error)
      throw error
    }
  }

  async getServiceById(id: number): Promise<Service> {
    try {
      const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`)
      return response.data.data
    } catch (error: any) {
      console.error('Service service get by id error:', error)
      throw error
    }
  }

  async getServicesByType(serviceType: 'Administrative' | 'Civil'): Promise<Service[]> {
    const response = await apiClient.get(`/services/${serviceType}`)

    // Giả sử backend trả tên cột viết hoa, map lại:
    return response.data.map((item: any) => ({
      serviceId: item.ServiceID,
      serviceName: item.ServiceName, // ✅ Đúng tên cột
      description: item.Description,
      price: item.Price,
      sampleCount: item.NumberSample
    }))
  }
}

export const serviceService = new ServiceService()
