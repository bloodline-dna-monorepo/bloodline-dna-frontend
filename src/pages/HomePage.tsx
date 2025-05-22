import Hero from '../components/Hero'
import ServiceCards from '../components/ServiceCards'
import ProcessSteps from '../components/ProcessSteps'
import AppointmentForm from '../components/AppointmentForm'
import BlogSection from '../components/BlogSection'
import Testimonials from '../components/Testimonials'
import ScrollToTop from '../components/ScrollToTop'
import HelpButton from '../components/HelpButton'

const HomePage = () => {
  return (
    <>
      <Hero />
      <ServiceCards />
      <ProcessSteps />
      <Testimonials />
      <AppointmentForm />
      <BlogSection />
      <ScrollToTop />
      <HelpButton />
    </>
  )
}

export default HomePage
