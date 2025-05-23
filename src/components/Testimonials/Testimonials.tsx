import { useState, useEffect } from "react"
import TestimonialCard from "./TestimonialCard"
import TestimonialsControls from "./TestimonialsControls"

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer M.",
    location: "New York, NY",
    rating: 5,
    text: "The entire process was smooth and professional. I received my results faster than expected, and the customer service team was incredibly helpful in explaining everything to me.",
    image: "/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Robert K.",
    location: "Chicago, IL",
    rating: 5,
    text: "I was nervous about DNA testing, but Gen Unity made it so easy. The home collection kit was simple to use, and the results were delivered securely to my online account.",
    image: "/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Maria S.",
    location: "Miami, FL",
    rating: 4,
    text: "Very professional service from start to finish. The staff was knowledgeable and compassionate. I would definitely recommend their services to anyone needing DNA testing.",
    image: "/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "David L.",
    location: "Seattle, WA",
    rating: 5,
    text: "The ancestry testing provided detailed results that helped me connect with relatives I never knew I had. The interactive dashboard made it easy to understand my genetic heritage.",
    image: "/testimonial-4.jpg",
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: number | undefined

    if (autoplay) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const handleDotClick = (index: number) => {
    setAutoplay(false)
    setCurrentIndex(index)
  }

  return (
    <section
      id="testimonials"
      className="section bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white"
    >
      <div className="container">
        <h2 className="section-title text-white">What Our Clients Say</h2>
        <p className="section-subtitle text-white opacity-90">
          Read testimonials from our satisfied clients who have experienced our DNA testing services.
        </p>

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <TestimonialsControls
            currentIndex={currentIndex}
            count={testimonials.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
