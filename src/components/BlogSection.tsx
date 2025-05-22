import { Link } from "react-router-dom"
import LazyImage from "./LazyImage"

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding DNA Testing: A Comprehensive Guide",
      excerpt: "Learn about the different types of DNA tests available and how they work.",
      image: "/blog-post-1.jpg",
      date: "May 15, 2023",
      author: "Dr. Sarah Johnson",
      category: "Education",
    },
    {
      id: 2,
      title: "The Importance of Accredited DNA Testing Facilities",
      excerpt: "Why choosing an accredited lab for your DNA testing needs matters for accuracy and legal validity.",
      image: "/blog-post-2.jpg",
      date: "April 28, 2023",
      author: "Michael Chen, PhD",
      category: "Industry",
    },
    {
      id: 3,
      title: "DNA Testing for Ancestry: Tracing Your Genetic Heritage",
      excerpt: "Discover how DNA testing can help you uncover your ancestral roots and connect with relatives.",
      image: "/blog-post-3.jpg",
      date: "April 10, 2023",
      author: "Emma Rodriguez",
      category: "Ancestry",
    },
  ]

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title">Latest from Our Blog</h2>
        <p className="section-subtitle">
          Stay informed with the latest news, research, and insights in DNA testing and genetic science.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <LazyImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 hover:text-[var(--primary)] transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] inline-flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="btn btn-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
