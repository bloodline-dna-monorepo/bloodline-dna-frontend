import { apiClient } from "../utils/api"
import type { ApiResponse, Service } from "../types/types"

class ServiceService {
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await apiClient.get<ApiResponse<Service[]>>("/services")
      return response.data.data
    } catch (error: any) {
      console.error("Service service get all error:", error)
      throw error
    }
  }

  async getServiceById(id: number): Promise<Service> {
    try {
      const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`)
      return response.data.data
    } catch (error: any) {
      console.error("Service service get by id error:", error)
      throw error
    }
  }

  async getServicesByType(serviceType: "Administrative" | "Civil"): Promise<Service[]> {
    try {
      const response = await apiClient.get<ApiResponse<Service[]>>(`/services?type=${serviceType}`)
      return response.data.data
    } catch (error: any) {
      console.error("Service service get by type error:", error)
      throw error
    }
  }
}

export const serviceService = new ServiceService()
