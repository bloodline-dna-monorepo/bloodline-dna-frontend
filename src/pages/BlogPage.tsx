"use client"

import { useState } from "react"
import { BlogPostCard } from "../components/Blog/BlogPostCard"

const categories = ["All", "Education", "Industry", "Ancestry", "Paternity", "Health", "Technology"]

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts = [
    {
      id: 1,
      title: "Understanding DNA Testing: A Comprehensive Guide",
      excerpt:
        "Learn about the different types of DNA tests available and how they work. This guide covers everything from basic concepts to advanced testing methodologies.",
      image: "/blog-post-1.jpg",
      date: "May 15, 2023",
      author: "Dr. Sarah Johnson",
      category: "Education",
    },
    {
      id: 2,
      title: "The Importance of Accredited DNA Testing Facilities",
      excerpt:
        "Why choosing an accredited lab for your DNA testing needs matters for accuracy and legal validity. Discover the standards that set quality labs apart.",
      image: "/blog-post-2.jpg",
      date: "April 28, 2023",
      author: "Michael Chen, PhD",
      category: "Industry",
    },
    {
      id: 3,
      title: "DNA Testing for Ancestry: Tracing Your Genetic Heritage",
      excerpt:
        "Discover how DNA testing can help you uncover your ancestral roots and connect with relatives. Learn how genetic markers reveal your family history.",
      image: "/blog-post-3.jpg",
      date: "April 10, 2023",
      author: "Emma Rodriguez",
      category: "Ancestry",
    },
    {
      id: 4,
      title: "Paternity Testing: What to Expect and How It Works",
      excerpt:
        "A step-by-step guide to paternity testing, from collection to results. Understand the science behind determining biological relationships.",
      image: "/blog-post-4.jpg",
      date: "March 22, 2023",
      author: "Dr. James Wilson",
      category: "Paternity",
    },
    {
      id: 5,
      title: "Genetic Health Screening: Preventive Care Through DNA",
      excerpt:
        "How genetic testing can identify health risks before symptoms appear. Learn about actionable insights from your DNA for better health management.",
      image: "/blog-post-5.jpg",
      date: "March 5, 2023",
      author: "Dr. Lisa Patel",
      category: "Health",
    },
    {
      id: 6,
      title: "The Future of DNA Testing: Emerging Technologies",
      excerpt:
        "Explore cutting-edge developments in genetic testing and what they mean for medicine, ancestry research, and more in the coming years.",
      image: "/blog-post-6.jpg",
      date: "February 18, 2023",
      author: "Robert Kim, PhD",
      category: "Technology",
    },
    {
      id: 7,
      title: "Privacy and Ethics in Genetic Testing",
      excerpt:
        "An examination of the important ethical considerations and privacy concerns surrounding DNA testing in the modern age.",
      image: "/blog-post-7.jpg",
      date: "February 3, 2023",
      author: "Dr. Maria Gonzalez",
      category: "Industry",
    },
    {
      id: 8,
      title: "How to Interpret Your DNA Test Results",
      excerpt:
        "A practical guide to understanding the information in your genetic test report and what the findings actually mean for you.",
      image: "/blog-post-8.jpg",
      date: "January 20, 2023",
      author: "Dr. Thomas Brown",
      category: "Education",
    },
    {
      id: 9,
      title: "DNA Testing for Immigration: Requirements and Process",
      excerpt:
        "Everything you need to know about DNA testing for immigration purposes, including legal requirements and accepted procedures.",
      image: "/blog-post-9.jpg",
      date: "January 5, 2023",
      author: "Jennifer Lee, JD",
      category: "Education",
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl opacity-90">
              Stay informed with the latest news, research, and insights in DNA testing and genetic science.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-auto overflow-x-auto">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeCategory === category
                          ? "bg-[var(--primary)] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-[var(--primary)] text-white">
                1
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
