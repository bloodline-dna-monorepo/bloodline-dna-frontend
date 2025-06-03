import { Link } from "react-router-dom"
import { Award, Shield, Users, Beaker } from "lucide-react"

const AboutSummary = () => {
  return (
    <section id="about-summary" className="section bg-[var(--background-alt)]">
      <div className="container">
        <h2 className="section-title">About Gen Unity</h2>
        <p className="section-subtitle">
          Pioneering DNA testing services with a commitment to accuracy, privacy, and exceptional care. Empowering
          individuals with profound genetic insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Mission: Unlocking Genetic Potential</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Gen Unity, we believe that everyone deserves access to accurate genetic information in a way that's
              easy to understand and act upon. Our mission is to provide the highest quality DNA testing services with
              uncompromising accuracy, complete privacy, and compassionate support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start">
                <div className="mr-4 text-[var(--primary)]">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Integrity & Accuracy</h4>
                  <p className="text-sm text-gray-600">Highest standards of scientific rigor and ethical practices</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-[var(--secondary)]">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Privacy & Security</h4>
                  <p className="text-sm text-gray-600">Advanced protocols to protect your genetic information</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-[var(--primary)]">
                  <Beaker size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Innovation</h4>
                  <p className="text-sm text-gray-600">Cutting-edge technology for comprehensive genetic insights</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-[var(--secondary)]">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Excellence</h4>
                  <p className="text-sm text-gray-600">Highest quality in every aspect of our service</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--secondary)] opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full"></div>
            <img src="/about-mission.jpg" alt="Our Mission" className="rounded-xl w-full h-auto shadow-xl" />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/about" className="btn btn-primary">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSummary
