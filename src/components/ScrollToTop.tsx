"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-50 p-2 text-white transition-all duration-300 rounded-full shadow-md bg-[var(--primary)] hover:bg-[var(--primary-dark)] ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      style={{ bottom: "160px", right: "20px" }}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  )
}

export default ScrollToTop
