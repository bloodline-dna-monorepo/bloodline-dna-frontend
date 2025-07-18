'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { EyeOutlined } from '@ant-design/icons'
import XMarkIcon from '@ant-design/icons'
import DashboardSidebar from '../../components/Common/Sidebar'
import { adminService } from '../../services/adminService'
import type { User } from '../../utils/types'

type UserRole = 'Customer' | 'Staff' | 'Manager'

const ROLE_COLORS: Record<UserRole, string> = {
  Customer: 'bg-green-100 text-green-700',
  Staff: 'bg-blue-100 text-blue-700',
  Manager: 'bg-purple-100 text-purple-700'
}

const AdminRole: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [originalUsers, setOriginalUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAllUsers()
      setOriginalUsers(data)
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (search.trim() === '') {
      setUsers(originalUsers)
      return
    }

    const debounce = setTimeout(() => {
      const keyword = search.trim().toLowerCase()

      const filtered = originalUsers.filter((user) => {
        const idMatch = user.accountId.toString().includes(keyword)
        const nameMatch = user.name?.toLowerCase().includes(keyword)
        const emailMatch = user.email?.toLowerCase().includes(keyword)
        const roleMatch = user.role?.toLowerCase().includes(keyword)
        return idMatch || nameMatch || emailMatch || roleMatch
      })

      setUsers(filtered)
    }, 300)

    return () => clearTimeout(debounce)
  }, [search, originalUsers])

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      const roleMap = { Customer: 4, Manager: 2, Staff: 3 }
      await adminService.updateUserRole(userId, roleMap[newRole])
      setUsers((prev) => prev.map((user) => (user.accountId === userId ? { ...user, role: newRole } : user)))
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const handleViewUser = async (userId: number) => {
    try {
      const user = await adminService.getUserById(userId)
      setSelectedUser(user)
      setShowDetailModal(true)
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedUser(null)
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 py-10 flex flex-col items-center'>
        <div className='w-full max-w-6xl'>
          <h1 className='text-3xl font-bold mb-8'>Quản lý người dùng</h1>
          <div className='bg-white rounded-xl shadow p-8'>
            <div className='flex justify-between items-center mb-6'>
              <div className='text-xl font-semibold'>Quản lý tài khoản người dùng</div>
              <div className='flex gap-2'>
                <input
                  className='border rounded px-4 py-2 w-64'
                  placeholder='Search by name, email...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className='flex justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600'></div>
              </div>
            ) : (
              <div className='overflow-x-auto border border-gray-200 rounded-lg'>
                <table className='min-w-full bg-white'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>ID</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Họ và tên</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Liên hệ</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Vai trò</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {users.map((u) => (
                      <tr key={u.accountId} className='hover:bg-gray-50'>
                        <td className='py-3 px-4'>{u.accountId}</td>
                        <td className='py-3 px-4'>{u.name || 'N/A'}</td>
                        <td className='py-3 px-4'>
                          <div className='text-sm'>{u.email}</div>
                          {u.PhoneNumber && <div className='text-xs text-gray-500'>{u.PhoneNumber}</div>}
                        </td>
                        <td className='py-3 px-4'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role as UserRole]}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-3'>
                            <button
                              className='text-gray-600 hover:text-blue-600'
                              title='Xem'
                              onClick={() => handleViewUser(u.accountId)}
                            >
                              <EyeOutlined />
                            </button>

                            {u.role !== 'Admin' ? (
                              <select
                                className='border rounded px-2 py-1 text-xs bg-white'
                                value={u.role}
                                onChange={(e) => handleRoleChange(u.accountId, e.target.value as UserRole)}
                              >
                                <option value='Customer'>Customer</option>
                                <option value='Staff'>Staff</option>
                                <option value='Manager'>Manager</option>
                              </select>
                            ) : (
                              <span className='text-sm text-gray-500'></span>
                            )}

                            {/* <button
                              className='text-red-500 hover:text-red-700'
                              title='Xóa'
                              onClick={() => handleDeleteUser(u.accountId)}
                            >
                              <DeleteOutlined />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className='text-center text-gray-400 py-8'>
                          Không có người dùng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* User Detail Modal */}
        {showDetailModal && selectedUser && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white'>
              <div className='mt-3'>
                {/* Modal Header */}
                <div className='flex items-center justify-between pb-4 border-b'>
                  <h3 className='text-lg font-semibold text-gray-900'>Chi tiết người dùng</h3>
                  <button onClick={handleCloseDetailModal} className='text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='h-6 w-6' />
                  </button>
                </div>

                {/* User Details */}
                <div className='mt-6 space-y-6'>
                  {/* Basic Info */}
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-700 mb-3'>Thông tin cơ bản</h4>
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='text-gray-600'>Vai trò:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${ROLE_COLORS[selectedUser.role as UserRole]}`}
                        >
                          {selectedUser.role}
                        </span>
                      </div>
                      <div>
                        <span className='text-gray-600'>Họ và tên:</span>
                        <span className='ml-2 font-medium'>{selectedUser.name || 'Chưa cập nhật'}</span>
                      </div>
                      <div>
                        <span className='text-gray-600'>Email:</span>
                        <span className='ml-2 font-medium'>{selectedUser.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  {selectedUser.profile && (
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-700 mb-3'>Thông tin chi tiết</h4>
                      <div className='grid grid-cols-1 gap-3 text-sm'>
                        <div>
                          <span className='text-gray-600'>Số điện thoại:</span>
                          <span className='ml-2 font-medium'>
                            {selectedUser.profile.PhoneNumber || 'Chưa cập nhật'}
                          </span>
                        </div>
                        <div>
                          <span className='text-gray-600'>Địa chỉ:</span>
                          <span className='ml-2 font-medium'>{selectedUser.profile.Address || 'Chưa cập nhật'}</span>
                        </div>
                        <div>
                          <span className='text-gray-600'>Ngày sinh:</span>
                          <span className='ml-2 font-medium'>
                            {selectedUser.profile.DateOfBirth
                              ? new Date(selectedUser.profile.DateOfBirth).toLocaleDateString('vi-VN')
                              : 'Chưa cập nhật'}
                          </span>
                        </div>
                        <div>
                          <span className='text-gray-600'>Giới tính:</span>
                          <span className='ml-2 font-medium'>{selectedUser.profile.Gender || 'Chưa cập nhật'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className='flex justify-end space-x-3 pt-4 border-t'>
                    <button
                      onClick={handleCloseDetailModal}
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200'
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminRole
