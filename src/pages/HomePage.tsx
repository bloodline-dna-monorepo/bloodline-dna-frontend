import Hero from '../components/Hero'
import ServiceCards from '../components/ServiceCards/ServiceCards'
import ProcessSteps from '../components/ProcessSteps'
import AppointmentForm from '../components/AppointmentForm'
import BlogSection from '../components/Blog/BlogSection'
import Testimonials from '../components/Testimonials/Testimonials'
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
