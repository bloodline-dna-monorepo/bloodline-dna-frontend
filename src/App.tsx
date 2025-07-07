'use client'
import './index.css'
import type React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Layout Components
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import GuideAndFAQ from './pages/GuideAndFAQ'
import Blog from './pages/Blog'

// Auth Pages
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
// import ResetPassword from "./components/Auth/ResetPassword"

// Staff Pages
// import StaffDashboard from "./pages/staff/StaffDashboard"
// import TestRequestDetails from "./pages/staff/TestRequestDetails"

// Manager Pages
// import ManagerDashboard from './pages/manager/ManagerDashboard'

// // Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard'

// Protected Route Component
import { useAuth } from './hooks/useAuth'
import TestTracking from './pages/customer/TestTracking'
import UserProfilePage from './pages/customer/UserProfile'
import HistoryServices from './pages/customer/HistoryServices'
import Payment from './pages/Payment'
import PaymentReturn from './pages/PaymentReturn'

// import TestTracking from 'pages/customer/TestTracking'
// import HistoryServices from 'pages/customer/HistoryServices'
// import UserProfile from 'pages/customer/UserProfile'

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />
  }

  return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
      </div>
    )
  }

  if (user) {
    // Redirect authenticated users to their dashboard
    switch (user.role) {
      case 'Admin':
        return <Navigate to='/admin/dashboard' replace />
      case 'Manager':
        return <Navigate to='/manager/dashboard' replace />
      case 'Staff':
        return <Navigate to='/staff/dashboard' replace />
      case 'Customer':
      default:
        return <Navigate to='/customer/dashboard' replace />
    }
  }

  return <>{children}</>
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className='min-h-screen flex flex-col'>
          <Routes>
            {/* Public Routes with Header/Footer */}
            <Route
              path='/'
              element={
                <>
                  <Header />
                  <main className='flex-1'>
                    <Home />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path='/about'
              element={
                <>
                  <Header />
                  <main className='flex-1'>
                    <About />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path='/services'
              element={
                <>
                  <Header />
                  <main className='flex-1'>
                    <Services />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path='/guide-faq'
              element={
                <>
                  <Header />
                  <main className='flex-1'>
                    <GuideAndFAQ />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path='/blog'
              element={
                <>
                  <Header />
                  <main className='flex-1'>
                    <Blog />
                  </main>
                  <Footer />
                </>
              }
            />
            {/* <Route
              path="/service/:id"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <ServiceDetail />
                  </main>
                  <Footer />
                </>
              }
            /> */}
            {/* Auth Routes */}
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
            {/* Customer Routes */}
            <Route
              path='/customer/profile'
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/customer/test-process'
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <TestTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path='/customer/history'
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <HistoryServices />
                </ProtectedRoute>
              }
            />
            {/* Staff Routes
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/test-request/:id"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <TestRequestDetails />
                </ProtectedRoute>
              }
            /> */}
            {/* Manager Routes */}
            {/* <Route
              path='/manager/dashboard'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            /> */}
            {/* Admin Routes */}
            {/* <Route
              path='/admin/dashboard'
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            /> */}
            {/* Payment route (after service registration) */}
            <Route
              path='/payment'
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path='/payment/return'
              element={
                <ProtectedRoute>
                  <PaymentReturn />
                </ProtectedRoute>
              }
            />
            {/* Fallback Routes */}
            <Route path='/dashboard' element={<Navigate to='/profile' replace />} />
            <Route path='/profile' element={<Navigate to='/customer/profile' replace />} />
            <Route
              path='/unauthorized'
              element={
                <div className='min-h-screen flex items-center justify-center'>
                  <h1 className='text-2xl text-red-600'>Unauthorized Access</h1>
                </div>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
