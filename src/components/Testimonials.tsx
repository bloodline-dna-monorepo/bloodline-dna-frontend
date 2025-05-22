"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
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
  }, [autoplay, testimonials.length])

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
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                        <p className="text-sm opacity-80">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < testimonial.rating ? "text-yellow-300 fill-yellow-300" : "text-gray-400"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-lg italic">"{testimonial.text}"</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-white bg-opacity-40"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
