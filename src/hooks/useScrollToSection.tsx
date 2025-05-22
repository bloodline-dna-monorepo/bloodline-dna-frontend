"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useScrollToSection = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "")
      const element = document.getElementById(id)

      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })
        }, 100)
      }
    }
  }, [hash])
}

export default useScrollToSection
