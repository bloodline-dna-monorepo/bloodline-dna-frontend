import { BlogPostCard } from "./BlogPostCard"
import { Link } from "react-router-dom"
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
            <BlogPostCard key={post.id} post={post} />
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
