// Replace LazyImage with regular img
import { Link } from "react-router-dom"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <article
      key={post.id}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
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
  )
}
