"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout, getUserInitials } = useAuth()

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

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileMenuOpen(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : ""
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
              DNA Services
            </Link>
            <Link to="/guide" className={`nav-link ${isActive("/guide")}`}>
              Guide & FAQ
            </Link>
            <Link to="/blog" className={`nav-link ${isActive("/blog")}`}>
              Blog
            </Link>

            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                >
                  {getUserInitials()}
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary ml-4">
                Sign In / Register
              </Link>
            )}
          </nav>

          <div className="flex items-center md:hidden">
            {/* Mobile Profile Icon */}
            {isAuthenticated && user ? (
              <button
                onClick={toggleProfileMenu}
                className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full font-semibold mr-2"
              >
                {getUserInitials()}
              </button>
            ) : null}

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

              {/* Mobile Authentication */}
              {isAuthenticated && user ? (
                <div className="border-t pt-3">
                  <div className="flex items-center py-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full font-semibold mr-3">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-[var(--primary)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 hover:text-[var(--primary)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left py-2 hover:text-[var(--primary)]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="btn btn-primary w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile Profile Dropdown */}
        {isProfileMenuOpen && isAuthenticated && user && (
          <div className="md:hidden absolute right-4 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
