import Hero from "../components/Hero"
import ServiceCards from "../components/ServiceCards/ServiceCards"
import ProcessSteps from "../components/ProcessSteps"
import AppointmentForm from "../components/AppointmentForm/AppointmentForm"
import BlogSection from "../components/Blog/BlogSection"
import Testimonials from "../components/Testimonials/Testimonials"

const HomePage = () => {
  return (
    <>
      <Hero />
      <ServiceCards />
      <ProcessSteps />
      <Testimonials />
      <AppointmentForm />
      <BlogSection />
    </>
  )
}

export default HomePage
