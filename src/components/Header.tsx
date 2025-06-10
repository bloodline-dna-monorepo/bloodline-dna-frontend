'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Tạm thời luôn hiển thị để test
  const isAuthenticated = true // Luôn true để test
  const user = { name: "Nguyen Van A" }

  // Comment out authentication check để test
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken")
  //   setIsAuthenticated(!!token)
  // }, [])

  // Use passive event listener for better scroll performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleProfileClick = () => {
    navigate("/customer/profile")
    setIsMobileMenuOpen(false)
  }

  const handleProcessClick = () => {
    navigate("/customer/test-process")
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    // Tạm thời không làm gì để test
    console.log("Logout clicked")
    setIsMobileMenuOpen(false)
  }

  // Reserve space for header to prevent layout shifts
  const headerHeight = isScrolled ? 'h-[72px]' : 'h-[96px]'

  return (
    <>
      {/* Placeholder div to prevent layout shifts */}
      <div className={headerHeight}></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
          } ${!isScrolled && location.pathname === '/' ? '' : 'bg-white shadow-md'}`}
      >
        <div className='container flex items-center justify-between'>
          <Link to='/' className='flex items-center'>
            <img src='/logo.png' alt='Gen Unity Logo' className='h-16' width='64' height='64' />
          </Link>

          <nav className='hidden md:flex items-center space-x-1'>
            <Link to='/' className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link to='/about' className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
            <Link to='/services' className={`nav-link ${isActive('/services')}`}>
              DNA Services
            </Link>
            <Link to='/guide' className={`nav-link ${isActive('/guide')}`}>
              Guide & FAQ
            </Link>
            <Link to='/blog' className={`nav-link ${isActive('/blog')}`}>
              Blog
            </Link>

            {/* Luôn hiển thị để test */}
            <div className="flex items-center space-x-4 ml-4">
              <button
                onClick={handleProcessClick}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Process
              </button>

              <div className="relative group">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">N</span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate("/customer/services")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => navigate("/customer/history")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      History
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className='flex items-center md:hidden'>
            <button onClick={toggleMobileMenu} className='p-2 text-gray-600 hover:text-[var(--primary)]'>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden bg-white shadow-lg'>
            <div className='container py-4 space-y-3'>
              <Link
                to='/'
                className='block py-2 hover:text-[var(--primary)]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to='/about'
                className='block py-2 hover:text-[var(--primary)]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to='/services'
                className='block py-2 hover:text-[var(--primary)]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DNA Testing
              </Link>
              <Link
                to='/guide'
                className='block py-2 hover:text-[var(--primary)]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Guide & FAQ
              </Link>
              <Link
                to='/blog'
                className='block py-2 hover:text-[var(--primary)]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Mobile menu - luôn hiển thị để test */}
              <button
                onClick={handleProcessClick}
                className='block w-full text-left py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700'
              >
                Process
              </button>
              <button
                onClick={handleProfileClick}
                className='block w-full text-left py-2 hover:text-[var(--primary)]'
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/customer/services")
                  setIsMobileMenuOpen(false)
                }}
                className='block w-full text-left py-2 hover:text-[var(--primary)]'
              >
                Services
              </button>
              <button
                onClick={() => {
                  navigate("/customer/history")
                  setIsMobileMenuOpen(false)
                }}
                className='block w-full text-left py-2 hover:text-[var(--primary)]'
              >
                History
              </button>
              <button
                onClick={handleLogout}
                className='block w-full text-left py-2 text-red-600 hover:text-red-700'
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
