"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { userService } from "../../services/userService"
import DashboardSidebar from "../../components/Layout/DashboardSidebar"
import Button from "../../components/Common/Button"
import Input from "../../components/Common/Input"
import type { ChangePasswordRequest, UserProfile } from "../../types/types"

const Profile: React.FC = () => {
  const { user, changePassword, refreshUserData } = useAuth()
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "Male",
  })
  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [signatureFile, setSignatureFile] = useState<File | null>(null)

  useEffect(() => {
    if (user?.profile) {
      setProfileData({
        fullName: user.profile.fullName || "",
        phoneNumber: user.profile.phoneNumber || "",
        address: user.profile.address || "",
        dateOfBirth: user.profile.dateOfBirth ? user.profile.dateOfBirth.split("T")[0] : "",
        gender: user.profile.gender || "Male",
      })
    }
  }, [user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureFile(e.target.files[0])
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      let signaturePath = ""
      if (signatureFile) {
        const response = await userService.uploadSignature(signatureFile)
        signaturePath = response.filePath
      }

      const updateData = {
        ...profileData,
        ...(signaturePath && { signatureImage: signaturePath }),
      }

      await userService.updateProfile(updateData)
      await refreshUserData() // Refresh user data in context
      setMessage("Profile updated successfully")
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setError("")
    setMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      setPasswordLoading(false)
      return
    }

    try {
      await changePassword(passwordData)
      setMessage("Password changed successfully")
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to change password")
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="h-1 w-16 bg-teal-600 mt-2"></div>
          </div>

          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={profileData.fullName || ""}
                    onChange={handleProfileChange}
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={user?.email || ""}
                    placeholder="Enter your email"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber || ""}
                    onChange={handleProfileChange}
                    placeholder="Enter your phone number"
                  />

                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth || ""}
                    onChange={handleProfileChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender || "Male"}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={3}
                    value={profileData.address || ""}
                    onChange={handleProfileChange}
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature / Fingerprint Image</label>
                  <input
                    type="file"
                    onChange={handleSignatureChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    accept="image/*"
                  />
                  {user?.profile?.signatureImage && (
                    <p className="text-sm text-gray-500 mt-1">Current signature uploaded</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" loading={loading}>
                  Update Profile
                </Button>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password"
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                />

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" loading={passwordLoading}>
                  Change Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
