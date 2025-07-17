"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { managerService } from "../services/managerService"
import type { BlogPost } from "../utils/types"
import { ArrowUpIcon, X } from "lucide-react" // Import X icon for close button

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null) // State for the selected blog to display in modal
const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300) // hiện khi scroll hơn 300px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await managerService.getBlogs()
      // Only show published blogs for public view
      // Assuming 'Status' field exists and 'Published' is the status for public blogs
      // const publishedBlogs = data.filter(post => post.Status === 'Published');
      setBlogPosts(data) // Using all blogs for now as no 'Status' field is in BlogPost type
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error)
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} phút đọc`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tiêu đề */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog của chúng tôi</h1>
          <p className="text-xl text-white/90">Cập nhật thông tin mới nhất về xét nghiệm DNA và khoa học di truyền</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tìm kiếm và Danh mục */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6">
            {/* Tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchText}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Trạng thái tải */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <span className="ml-4 text-gray-600">Đang tải bài viết...</span>
          </div>
        )}

        {/* Lưới bài viết Blog */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào</p>
                </div>
              ) : (
                currentPosts.map((post) => (
                  <article
                    key={post.BlogID}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <img
                      src={post.Image || "/placeholder.svg?height=200&width=300"}
                      alt={post.Title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{getReadTime(post.Description)}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.Title}</h3>

                      <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post.Description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>Bởi {post.Author}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(post.CreatedAt)}</span>
                        </div>
                        <button
                          onClick={() => setSelectedBlog(post)}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          Đọc thêm →
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded ${
                      currentPage === page ? "bg-teal-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedBlog.Image || "/placeholder.svg?height=400&width=600"}
              alt={selectedBlog.Title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedBlog.Title}</h2>
              <div className="text-sm text-gray-500 mb-6">
                <span>Bởi {selectedBlog.Author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(selectedBlog.CreatedAt)}</span>
                <span className="mx-2">•</span>
                <span>{getReadTime(selectedBlog.Description)}</span>
              </div>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{selectedBlog.Description}</p>
            </div>
          </div>
        </div>
      )}
       {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all duration-300'
          title='Lên đầu trang'
        >
          <ArrowUpIcon className='w-6 h-6' />
        </button>
      )}
    </div>
  )
}

export default Blog
