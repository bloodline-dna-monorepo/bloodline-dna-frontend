import { Link } from "react-router-dom"
import LazyImage from "./LazyImage"

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/dna-pattern.png)",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-[var(--primary)]">Accurate</span> -
              <span className="text-[var(--secondary)]"> Reliable</span> -
              <span className="text-[var(--primary)]"> Fast</span>
              <br />
              DNA Testing Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Professional DNA testing services with convenient home collection or lab visits. Confidential results you
              can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/services" className="btn btn-primary">
                Schedule a Test Now
              </Link>
              <Link to="/guide" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--secondary)] opacity-10 rounded-full"></div>
            <LazyImage
              src="/hero-image.jpg"
              alt="DNA Testing Professional"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
