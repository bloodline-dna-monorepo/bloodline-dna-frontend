"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Use passive event listener for better scroll performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : ""
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  // Reserve space for header to prevent layout shifts
  const headerHeight = isScrolled ? "h-[72px]" : "h-[96px]"

  return (
    <>
      {/* Placeholder div to prevent layout shifts */}
      <div className={headerHeight}></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Gen Unity Logo" className="h-16" width="64" height="64" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about")}`}>
              About
            </Link>
            <Link to="/services" className={`nav-link ${isActive("/services")}`}>
              DNA Testing
            </Link>
            <Link to="/guide" className={`nav-link ${isActive("/guide")}`}>
              Guide & FAQ
            </Link>
            <Link to="/blog" className={`nav-link ${isActive("/blog")}`}>
              Blog
            </Link>
            <Link to="/auth" className="btn btn-primary ml-4">
              Sign In / Register
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-[var(--primary)]">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block py-2 hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="block py-2 hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DNA Testing
              </Link>
              <Link
                to="/guide"
                className="block py-2 hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Guide & FAQ
              </Link>
              <Link
                to="/blog"
                className="block py-2 hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/auth"
                className="btn btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
