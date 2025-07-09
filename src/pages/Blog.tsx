'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { managerService } from '../services/managerService'
import type { BlogPost } from '../utils/types'

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Education', 'Industry', 'Ancestry', 'Paternity', 'Health', 'Technology']

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await managerService.getBlogs()
      // Only show published blogs for public view

      setBlogPosts(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogPosts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.Title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.Description.toLowerCase().includes(searchText.toLowerCase())
    return matchesSearch
  })

  const postsPerPage = 6
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} phút đọc`
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-gradient-to-r from-teal-600 to-purple-600 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Blog của chúng tôi</h1>
          <p className='text-xl text-white/90'>Cập nhật thông tin mới nhất về xét nghiệm DNA và khoa học di truyền</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Search and Categories */}
        <div className='mb-12'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
            {/* Search */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Tìm kiếm bài viết...'
                className='w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                value={searchText}
                onChange={handleSearchChange}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
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

            {/* Categories */}
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category === 'All' ? 'Tất cả' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center items-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
            <span className='ml-4 text-gray-600'>Đang tải bài viết...</span>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {currentPosts.length === 0 ? (
                <div className='col-span-full text-center py-16'>
                  <p className='text-gray-500 text-lg'>Không tìm thấy bài viết nào</p>
                </div>
              ) : (
                currentPosts.map((post) => (
                  <article
                    key={post.BlogID}
                    className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                  >
                    <img
                      src={post.Image || '/placeholder.svg?height=200&width=300'}
                      alt={post.Title}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-6'>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='text-sm text-gray-500'>{getReadTime(post.Description)}</span>
                      </div>

                      <h3 className='text-xl font-semibold text-gray-900 mb-3 line-clamp-2'>{post.Title}</h3>

                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-gray-500'>
                          <span>Bởi {post.Author}</span>
                          <span className='mx-2'>•</span>
                          <span>{formatDate(post.CreatedAt)}</span>
                        </div>
                        <button className='text-teal-600 hover:text-teal-700 font-medium text-sm'>Đọc thêm →</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center space-x-2'>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className='px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded ${
                      currentPage === page ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className='px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Blog
