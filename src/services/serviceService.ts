import { apiClient } from '../utils/api'
import type { ApiResponse, Service, ServiceResponse } from '../utils/types'

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
    try {
      const response = await apiClient.get(`/services/type/${serviceType}`)

      // Check if the response is an object and contains the data field
      if (response.data && Array.isArray(response.data)) {
        return response.data.map((item) => ({
          serviceId: item.ServiceID,
          serviceName: item.ServiceName,
          description: item.Description,
          price: item.Price,
          sampleCount: item.SampleCount
        }))
      } else if (response.data && Array.isArray(response.data.data)) {
        // If response.data contains an array under the "data" key
        return response.data.data.map((item) => ({
          serviceId: item.ServiceID,
          serviceName: item.ServiceName,
          description: item.Description,
          price: item.Price,
          sampleCount: item.SampleCount
        }))
      } else {
        console.error('Dữ liệu không phải là mảng', response.data)
        return []
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
      return []
    }
  }
}

export const serviceService = new ServiceService()
