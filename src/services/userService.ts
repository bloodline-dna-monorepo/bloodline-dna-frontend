import { apiClient } from "../utils/api"
import type { User, UserProfile, ApiResponse } from "../types/types"

export const userService = {
  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<{ user: User }>>("/users/profile")
    return response.data.data!.user
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<void> {
    await apiClient.put("/users/profile", profileData)
  },

  async uploadSignature(file: File): Promise<{ filePath: string }> {
    const formData = new FormData()
    formData.append("signature", file)

    const response = await apiClient.post<ApiResponse<{ filePath: string }>>("/users/upload-signature", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.data!
  },

  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>("/users")
    return response.data.data!
  },

  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return response.data.data!
  },

  async updateUserRole(id: number, roleId: number): Promise<void> {
    await apiClient.put(`/users/${id}/role`, { roleId })
  },

  async toggleUserStatus(id: number): Promise<void> {
    await apiClient.put(`/users/${id}/status`)
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}
