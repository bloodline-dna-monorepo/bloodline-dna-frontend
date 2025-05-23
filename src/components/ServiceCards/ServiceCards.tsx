import type { JSX } from "react"
import ServiceCard from "./ServiceCard"
import { Users, FileCheck, Clock, ShieldCheck } from "lucide-react"

interface Service {
  icon: JSX.Element
  title: string
  description: string
  link: string
}

const services: Service[] = [
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

const ServiceCards = () => {
  return (
    <section id="services" className="section bg-[var(--background-alt)]">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer a comprehensive range of DNA testing services with the highest standards of accuracy and confidentiality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards
