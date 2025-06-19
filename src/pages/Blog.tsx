"use client"

import type React from "react"
import { useState } from "react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = ["All", "Education", "Industry", "Ancestry", "Paternity", "Health", "Technology"]

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding DNA Testing: A Comprehensive Guide",
      excerpt:
        "Learn about the different types of DNA tests available and how they work. This guide covers everything from basic genetics to advanced testing methods.",
      author: "Dr. Sarah Johnson",
      date: "May 15, 2023",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Importance of Accredited DNA Testing Facilities",
      excerpt:
        "Why choosing an accredited lab for your DNA testing needs matters for accuracy and legal validity. Understanding certification standards.",
      author: "Michael Chen, PhD",
      date: "April 28, 2023",
      category: "Industry",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "DNA Testing for Ancestry: Tracing Your Genetic Heritage",
      excerpt:
        "Discover how DNA testing can help you uncover your ancestral roots and connect with distant relatives around the world.",
      author: "Emma Rodriguez",
      date: "April 10, 2023",
      category: "Ancestry",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Paternity Testing: What to Expect and How It Works",
      excerpt:
        "A step-by-step guide to paternity testing, from collection to results. Understand the process and what your results mean.",
      author: "Dr. James Wilson",
      date: "March 22, 2023",
      category: "Paternity",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Genetic Health Screening: Preventive Care Through DNA",
      excerpt:
        "How genetic testing can identify health risks before symptoms appear. Learn about preventive healthcare through genetic analysis.",
      author: "Dr. Lisa Patel",
      date: "March 8, 2023",
      category: "Health",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "The Future of DNA Testing: Emerging Technologies",
      excerpt:
        "Explore cutting-edge developments in genetic testing and what they mean for the future of personalized medicine and ancestry research.",
      author: "Robert Kim, PhD",
      date: "February 18, 2023",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read",
    },
    {
      id: 7,
      title: "Privacy and Ethics in Genetic Testing",
      excerpt:
        "An examination of the important ethical considerations and privacy concerns surrounding genetic testing and data storage.",
      author: "Dr. Maria Gonzalez",
      date: "February 3, 2023",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "9 min read",
    },
    {
      id: 8,
      title: "How to Interpret Your DNA Test Results",
      excerpt:
        "A practical guide to understanding the information in your genetic test report and what it means for you and your family.",
      author: "Dr. Thomas Brown",
      date: "January 19, 2023",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read",
    },
    {
      id: 9,
      title: "DNA Testing for Immigration: Requirements and Process",
      excerpt:
        "Everything you need to know about DNA testing for immigration purposes, including requirements, procedures, and documentation.",
      author: "Jennifer Lee, JD",
      date: "January 5, 2023",
      category: "Industry",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min read",
    },
  ]

  const filteredPosts =
    activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  const postsPerPage = 6
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-xl text-white/90">
            Stay informed with the latest news, research, and insights in DNA testing and genetic science.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Categories */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Read More →</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
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
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
