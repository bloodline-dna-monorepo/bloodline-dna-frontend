"use client"

import { useState, useEffect, useRef } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

const LazyImage = ({ src, alt, className = "", width, height }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Use Intersection Observer API for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "200px" }, // Load images 200px before they come into view
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Generate a low-quality placeholder if no image is provided
  const placeholder = src ? src : `/placeholder.svg?height=${height || 300}&width=${width || 400}`

  return (
    <div className="relative overflow-hidden" ref={imgRef}>
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
      {isInView && (
        <img
          src={placeholder || "/placeholder.svg"}
          alt={alt}
          className={`lazy-load ${isLoaded ? "loaded" : ""} ${className}`}
          onLoad={handleLoad}
          loading="lazy"
          width={width}
          height={height}
        />
      )}
    </div>
  )
}

export default LazyImage
