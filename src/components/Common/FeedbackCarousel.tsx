"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"

interface FeedbackCarouselProps {
  feedbacks: {
    FeedbackID: number
    Rating: number
    Comment: string
    FullName: string
  }[]
}

const FeedbackCarousel: React.FC<FeedbackCarouselProps> = ({ feedbacks }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [feedbacks.length])

  if (!feedbacks || feedbacks.length === 0) {
    return <div className="text-center text-gray-600 py-10">Chưa có phản hồi nào để hiển thị.</div>
  }

  const currentFeedback = feedbacks[currentIndex]

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
        />,
      )
    }
    return stars
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">Phản hồi từ Khách hàng</h2>
      <div className="overflow-hidden relative h-48">
        {" "}
        {/* Fixed height for carousel content */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {feedbacks.map((feedback, index) => (
            <div key={feedback.FeedbackID} className="w-full flex-shrink-0 text-center px-4">
              <div className="flex justify-center mb-4">{renderStars(feedback.Rating)}</div>
              <p className="text-lg text-gray-700 italic mb-4">"{feedback.Comment}"</p>
              <p className="text-md font-semibold text-gray-800">- {feedback.FullName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 -ml-4"
        aria-label="Previous feedback"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 -mr-4"
        aria-label="Next feedback"
      >
        &#10095;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-teal-600" : "bg-gray-300"
            } hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75`}
            aria-label={`Go to feedback ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default FeedbackCarousel
