import { Link } from "react-router-dom"
import { Users, FileCheck, Clock, ShieldCheck } from "lucide-react"

const ServiceCards = () => {
  const services = [
    {
      icon: <Users size={40} className="text-[var(--primary)]" />,
      title: "Diverse Testing Services",
      description: "From paternity and relationship testing to ancestry and genetic health screening.",
      link: "/services",
    },
    {
      icon: <FileCheck size={40} className="text-[var(--primary)]" />,
      title: "Simple, Transparent Process",
      description: "Clear instructions and guidance throughout the entire testing process.",
      link: "/guide",
    },
    {
      icon: <Clock size={40} className="text-[var(--primary)]" />,
      title: "Fast, Reliable Results",
      description: "Get your results quickly with our expedited processing options.",
      link: "/services#results",
    },
    {
      icon: <ShieldCheck size={40} className="text-[var(--primary)]" />,
      title: "24/7 Customer Support",
      description: "Our team is always available to answer your questions and provide assistance.",
      link: "/contact",
    },
  ]

  return (
    <section id="services" className="section bg-[var(--background-alt)]">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer a comprehensive range of DNA testing services with the highest standards of accuracy and
          confidentiality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card group hover:border-[var(--primary)] hover:border transition-all">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-[var(--text-light)] mb-4">{service.description}</p>
              <Link
                to={service.link}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards
