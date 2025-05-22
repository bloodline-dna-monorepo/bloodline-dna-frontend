'use client'

import { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

const LazyImage = ({ src, alt, className = '' }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
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

  return (
    <div className='relative overflow-hidden' ref={imgRef}>
      {!isLoaded && <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>}
      {isInView && (
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          className={`lazy-load ${isLoaded ? 'loaded' : ''} ${className}`}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}

export default LazyImage
