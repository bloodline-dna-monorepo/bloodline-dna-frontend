import { Link } from "react-router-dom"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  link: string
}

const ServiceCard = ({ icon, title, description, link }: ServiceCardProps) => {
  return (
    <div className="card group hover:border-[var(--primary)] hover:border transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--text-light)] mb-4">{description}</p>
      <Link
        to={link}
        className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] inline-flex items-center"
      >
        Learn More
        <svg
          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

export default ServiceCard
