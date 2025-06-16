'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Tạm thời luôn hiển thị để test
  const isAuthenticated = true // Luôn true để test
  const user = { name: "Nguyen Van A" }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    //window.scrollY là một Web API property của Browser, 
    // trả về số pixel mà trang web đã được scroll theo chiều dọc (vertical) từ đầu trang.

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleProfileClick = () => {
    navigate("/customer/profile")
  }

  const handleLogout = () => {
    // Tạm thời không làm gì để test
    console.log("Logout clicked")
  }

  // Reserve space for header to prevent layout shifts
  const headerHeight = isScrolled ? 'h-[60px]' : 'h-[80px]' // Giảm height

  return (
    <>
      {/* Placeholder div to prevent layout shifts */}
      <div className={headerHeight}></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1.5' : 'bg-transparent py-3' // Giảm padding
          } ${!isScrolled && location.pathname === '/' ? '' : 'bg-white shadow-md'}`}
      >
        <div className='container flex items-center justify-between'>
          <Link to='/' className='flex items-center'>
            <img src='/logo.png' alt='Gen Unity Logo' className='h-12' width='48' height='48' />
          </Link>

          <nav className='flex items-center space-x-1'>
            <Link to='/' className={`nav-link text-sm ${isActive('/')}`}>
              Home
            </Link>
            <Link to='/about' className={`nav-link text-sm ${isActive('/about')}`}>
              About
            </Link>
            <Link to='/services' className={`nav-link text-sm ${isActive('/services')}`}>
              DNA Services
            </Link>
            <Link to='/guide' className={`nav-link text-sm ${isActive('/guide')}`}>
              Guide & FAQ
            </Link>
            <Link to='/blog' className={`nav-link text-sm ${isActive('/blog')}`}>
              Blog
            </Link>

            {isAuthenticated && (
              <Link to='/customer/test-process' className={`nav-link text-sm ${isActive('/customer/test-process')}`}>
                Process
              </Link>
            )}

            {/* Profile dropdown */}
            {isAuthenticated && (
              <div className="relative group ml-3"> {/* Giảm margin */}
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1.5 transition-colors" /* Giảm padding */
                >
                  <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center"> {/* Giảm avatar size */}
                    <span className="text-white text-xs font-medium">N</span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{user.name}</span> {/* Giảm font size */}
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
            )}

            {/* Sign in cho user chưa đăng nhập */}
            {!isAuthenticated && (
              <Link to='/auth' className='btn btn-primary ml-4'>
                Sign In / Register
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
