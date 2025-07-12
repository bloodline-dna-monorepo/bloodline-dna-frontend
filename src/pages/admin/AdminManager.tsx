'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import DashboardSidebar from '../../components/Common/Sidebar'
import { adminService } from '../../services/adminService'
import type { Services } from '../../utils/types'

const CATEGORY_OPTIONS = [
  { value: 'Administrative', label: 'Hành chính' },
  { value: 'Civil', label: 'Dân sự' }
]

const AdminManager: React.FC = () => {
  const [services, setServices] = useState<Services[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [addForm, setAddForm] = useState({
    ServiceName: '',
    ServiceType: CATEGORY_OPTIONS[0].value,
    Price: '',
    Description: '',
    SampleCount: ''
  })

  const [editForm, setEditForm] = useState({
    ServiceID: '',
    ServiceName: '',
    ServiceType: CATEGORY_OPTIONS[0].value,
    Price: '',
    Description: '',
    SampleCount: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAllServices()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id: number) => {
    const service = services.find((s) => s.ServiceID === id)
    if (service) {
      setEditForm({
        ServiceID: service.ServiceID.toString(),
        ServiceName: service.ServiceName,
        ServiceType: service.ServiceType,
        Price: service.Price.toString(),
        Description: service.Description,
        SampleCount: service.SampleCount.toString()
      })
      setShowEditModal(true)
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setLoading(true)
    try {
      const updatedService = {
        ServiceName: editForm.ServiceName,
        ServiceType: editForm.ServiceType,
        Price: Number(editForm.Price),
        Description: editForm.Description,
        SampleCount: Number(editForm.SampleCount)
      }

      await adminService.updateService(Number(editForm.ServiceID), updatedService)
      await fetchServices()
      setShowEditModal(false)
    } catch (error) {
      console.error('Error updating service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
      try {
        await adminService.deleteService(id)
        setServices((prev) => prev.filter((s) => s.ServiceID !== id))
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  const handleAdd = () => setShowAddModal(true)

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value })
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newService = {
        ServiceName: addForm.ServiceName,
        ServiceType: addForm.ServiceType,
        Price: Number(addForm.Price),
        Description: addForm.Description,
        SampleCount: Number(addForm.SampleCount)
      }

      await adminService.createService(newService)
      await fetchServices()
      setShowAddModal(false)
      setAddForm({
        ServiceName: '',
        ServiceType: CATEGORY_OPTIONS[0].value,
        Price: '',
        Description: '',
        SampleCount: ''
      })
    } catch (error) {
      console.error('Error creating service:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 py-10 flex flex-col items-center'>
        <div className='w-full max-w-6xl'>
          <h1 className='text-3xl font-bold mb-8'>Quản lý dịch vụ</h1>
          <div className='bg-white rounded-xl shadow p-8'>
            <div className='flex justify-between items-center mb-6'>
              <div className='text-xl font-semibold'>Quản lý dịch vụ xét nghiệm</div>
              <button
                className='bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800'
                onClick={handleAdd}
              >
                <PlusOutlined /> Thêm dịch vụ mới
              </button>
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
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Dịch vụ</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Danh mục</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Giá</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Số mẫu</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Mô tả</th>
                      <th className='py-3 px-4 text-left font-medium text-gray-700'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {services.map((s) => (
                      <tr key={s.ServiceID} className='hover:bg-gray-50'>
                        <td className='py-3 px-4 font-medium'>{s.ServiceName}</td>
                        <td className='py-3 px-4'>{s.ServiceType}</td>
                        <td className='py-3 px-4'>{s.Price.toLocaleString()} ₫</td>
                        <td className='py-3 px-4'>{s.SampleCount}</td>
                        <td className='py-3 px-4 max-w-xs'>
                          <div className='truncate' title={s.Description}>
                            {s.Description.length > 50 ? s.Description.slice(0, 50) + '...' : s.Description}
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
                            <button
                              className='text-blue-600 hover:text-blue-800'
                              onClick={() => handleEdit(s.ServiceID)}
                              title='Chỉnh sửa'
                            >
                              <EditOutlined />
                            </button>
                            <button
                              className='text-red-500 hover:text-red-700'
                              onClick={() => handleDelete(s.ServiceID)}
                              title='Xóa'
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan={6} className='text-center text-gray-400 py-8'>
                          Không có dịch vụ nào.
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

      {/* Add Service Modal */}
      {showAddModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <form className='bg-white p-8 rounded-xl shadow-lg max-w-lg w-full mx-4 relative' onSubmit={handleAddSubmit}>
            <button
              type='button'
              className='absolute top-4 right-4 text-gray-400 hover:text-black text-xl'
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
            <h2 className='text-2xl font-bold mb-6'>Thêm dịch vụ mới</h2>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Tên dịch vụ</label>
              <input
                name='ServiceName'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='Nhập tên dịch vụ'
                value={addForm.ServiceName}
                onChange={handleAddChange}
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Danh mục</label>
              <select
                name='ServiceType'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={addForm.ServiceType}
                onChange={handleAddChange}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Giá (VNĐ)</label>
              <input
                name='Price'
                type='number'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                placeholder='5.000.000'
                value={addForm.Price}
                onChange={handleAddChange}
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Số mẫu</label>
              <input
                name='SampleCount'
                type='number'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={addForm.SampleCount}
                onChange={handleAddChange}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block font-medium mb-2'>Mô tả</label>
              <textarea
                name='Description'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                rows={4}
                placeholder='Mô tả dịch vụ...'
                value={addForm.Description}
                onChange={handleAddChange}
              />
            </div>

            <div className='flex justify-end gap-3'>
              <button
                type='button'
                className='px-6 py-2 border rounded hover:bg-gray-100'
                onClick={() => setShowAddModal(false)}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type='submit'
                className='px-6 py-2 bg-black text-white rounded hover:bg-gray-900'
                disabled={loading}
              >
                {loading ? 'Đang tạo...' : 'Tạo dịch vụ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <form className='bg-white p-8 rounded-xl shadow-lg max-w-lg w-full mx-4 relative' onSubmit={handleEditSubmit}>
            <button
              type='button'
              className='absolute top-4 right-4 text-gray-400 hover:text-black text-xl'
              onClick={() => setShowEditModal(false)}
            >
              &times;
            </button>
            <h2 className='text-2xl font-bold mb-6'>Chi tiết & Chỉnh sửa dịch vụ</h2>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Tên dịch vụ</label>
              <input
                name='ServiceName'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={editForm.ServiceName}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Danh mục</label>
              <select
                name='ServiceType'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={editForm.ServiceType}
                onChange={handleEditChange}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Giá (VNĐ)</label>
              <input
                name='Price'
                type='number'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={editForm.Price}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block font-medium mb-2'>Số mẫu</label>
              <input
                name='SampleCount'
                type='number'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                value={editForm.SampleCount}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block font-medium mb-2'>Mô tả</label>
              <textarea
                name='Description'
                className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500'
                rows={4}
                value={editForm.Description}
                onChange={handleEditChange}
              />
            </div>

            <div className='flex justify-end gap-3'>
              <button
                type='button'
                className='px-6 py-2 border rounded hover:bg-gray-100'
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type='submit'
                className='px-6 py-2 bg-black text-white rounded hover:bg-gray-900'
                disabled={loading}
              >
                {loading ? 'Đang cập nhật...' : 'Cập nhật dịch vụ'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminManager
