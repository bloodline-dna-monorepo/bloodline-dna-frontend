'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import DashboardSidebar from '../../components/Common/Sidebar'
import { managerService } from '../../services/managerService'
import type { BlogPost } from '../../utils/types'
import ConfirmModal from '../../components/Common/ConfirmModal'
import { toast } from 'react-toastify'

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Image: ''
  })
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, Image: reader.result as string }))
      }
      reader.readAsDataURL(file) // Chuyển thành base64
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await managerService.getBlogs()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingBlog(null)
    setFormData({
      Title: '',
      Description: '',
      Image: ''
    })
    setShowModal(true)
  }

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog)
    setFormData({
      Title: blog.Title,
      Description: blog.Description,

      Image: blog.Image || ''
    })
    setShowModal(true)
  }

  const handleDeleteClick = (blogId: number) => {
    setPendingDeleteId(blogId)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return
    try {
      await managerService.deleteBlog(pendingDeleteId)
      toast.success('🗑️ Xóa bài viết thành công')
      await fetchBlogs()
    } catch (error) {
      toast.error('❌ Có lỗi xảy ra khi xóa bài viết')
      console.error(error)
    } finally {
      setDeleteConfirmOpen(false)
      setPendingDeleteId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   try {
  if (editingBlog) {
    await managerService.updateBlog(editingBlog.BlogID, formData)
    toast.success('✏️ Cập nhật bài viết thành công')
  } else {
    await managerService.createBlog(formData)
    toast.success('✅ Tạo bài viết thành công')
  }
  setShowModal(false)
  await fetchBlogs()
} catch (error) {
  console.error('Error saving blog:', error)
  toast.error('❌ Có lỗi xảy ra khi lưu bài viết')
}

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }



  return (
    <div className='flex min-h-screen bg-gray-50'>
      <DashboardSidebar />
      <main className='flex-1 p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='font-bold text-3xl'>Quản lý Blog</h1>
            <button
              onClick={handleCreate}
              className='bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700'
            >
              <PlusIcon className='h-5 w-5' />
              Tạo bài viết mới
            </button>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='mb-6'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tiêu đề hoặc danh mục...'
                  className='w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Tiêu đề
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Mô tả
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Tác giả
                    </th>

                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Ngày tạo
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                        <div className='flex items-center justify-center'>
                          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600'></div>
                          <span className='ml-2'>Đang tải dữ liệu...</span>
                        </div>
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                        Không có bài viết nào
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog.BlogID} className='hover:bg-gray-50'>
                        <td className='px-6 py-4'>
                          <div className='text-sm font-medium text-gray-900 max-w-xs truncate'>{blog.Title}</div>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <div className='text-sm text-gray-500 max-w-xs truncate'>{blog.Description}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <div className='text-sm text-gray-500 max-w-xs truncate'>{blog.Author}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <div className='text-sm text-gray-500 max-w-xs truncate'>
                            {
                              new Date(blog.CreatedAt).toLocaleDateString('vi-VN')
                              // 👉 "9/7/2025"
                            }
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => handleEdit(blog)}
                              className='text-blue-600 hover:text-blue-800 p-1 rounded'
                              title='Chỉnh sửa'
                            >
                              <PencilIcon className='h-5 w-5' />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(blog.BlogID)}
                              className='text-red-600 hover:text-red-800 p-1 rounded'
                              title='Xóa'
                            >
                              <TrashIcon className='h-5 w-5' />
                            </button>
                            <ConfirmModal
                              isOpen={deleteConfirmOpen}
                              onClose={() => setDeleteConfirmOpen(false)}
                              onConfirm={handleConfirmDelete}
                              title='Xác nhận xóa bài viết'
                              message='Bạn có chắc chắn muốn xóa bài viết này? Thao tác này không thể hoàn tác.'
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>{editingBlog ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
                <button onClick={() => setShowModal(false)} className='text-gray-400 hover:text-gray-600 text-2xl'>
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tiêu đề <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='Title'
                    value={formData.Title}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Mô tả <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    name='Description'
                    value={formData.Description}
                    onChange={handleInputChange}
                    rows={6}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>URL hình ảnh</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  />
                </div>

                <div className='flex justify-end gap-4 pt-6'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                  >
                    Hủy
                  </button>
                  <button type='submit' className='px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700'>
                    {editingBlog ? 'Cập nhật' : 'Tạo mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default BlogManagement
