'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
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

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAllUsers(search)
      setUsers(data)
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      const roleMap = { Customer: 1, Manager: 2, Staff: 3 }
      await adminService.updateUserRole(userId, roleMap[newRole])
      setUsers((prev) => prev.map((user) => (user.accountId === userId ? { ...user, role: newRole } : user)))
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      try {
        await adminService.deleteUser(userId)
        setUsers((prev) => prev.filter((user) => user.accountId !== userId))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className='border rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50'
                >
                  <span className='hidden md:inline'>Sort</span>
                  <svg width='18' height='18' fill='none' viewBox='0 0 20 20'>
                    <rect x='3' y='5' width='14' height='2' rx='1' fill='#222' />
                    <rect x='5' y='9' width='10' height='2' rx='1' fill='#222' />
                    <rect x='7' y='13' width='6' height='2' rx='1' fill='#222' />
                  </svg>
                </button>
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
                            <button className='text-gray-600 hover:text-blue-600' title='Xem'>
                              <EyeOutlined />
                            </button>
                            <button className='text-gray-600 hover:text-blue-600' title='Chỉnh sửa'>
                              <EditOutlined />
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

                            <button
                              className='text-red-500 hover:text-red-700'
                              title='Xóa'
                              onClick={() => handleDeleteUser(u.accountId)}
                            >
                              <DeleteOutlined />
                            </button>
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
      </main>
    </div>
  )
}

export default AdminRole
