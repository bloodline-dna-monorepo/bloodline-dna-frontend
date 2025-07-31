'use client'
import './index.css'
import type React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
// Layout Components
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import GuideAndFAQ from './pages/GuideAndFAQ'
import Blog from './pages/Blog'
import ServicesPage from './pages/Services'
// Auth Pages
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
// import ResetPassword from "./components/Auth/ResetPassword"

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard'
import ManageRequests from './pages/staff/ManageRequests'
import ConfirmedRequests from './pages/staff/ConfirmedRequests'
import TestProcess from './pages/staff/TestProcess'
import TestProcessCenter from './pages/staff/TestProcessCenter'
// import TestRequestDetails from "./pages/staff/TestRequestDetails"

// Manager Pages
// import ManagerDashboard from './pages/manager/ManagerDashboard'

// // Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard'

// Protected Route Component
import { useAuth } from './hooks/useAuth'
import UserProfilePage from './pages/customer/UserProfile'
import FeedbackPage from './pages/customer/FeedbackPage' // Import FeedbackPage

import ManagerDashboard from './pages/manager/ManagerDashboard'
import TestResultManage from './pages/manager/TestResultManage'
import ManaFeedback from './pages/manager/ManaFeedback'
import BlogManagement from './pages/manager/BlogManagement'
import PaymentResult from './pages/PaymentResult'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminManager from './pages/admin/AdminManager'
import AdminRole from './pages/admin/AdminRole'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Terms from './pages/Terms'
import TestManagement from './pages/customer/TestManagement'

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
        return <Navigate to='/customer/dashboard' replace />
    }
  }

  return <>{children}</>
}

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
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
                    <ServicesPage />
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
            <Route path='/terms' element={<Terms />} />
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
              path='/profile'
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />            
            <Route
              path='/customer/test-management'
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <TestManagement />
                </ProtectedRoute>
              }
            />            
            <Route
              path='/customer/feedback' // New route for FeedbackPage
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <FeedbackPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/manager/manager-dashboard'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path='/manager/test-results'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <TestResultManage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/manager/view-feedback'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <ManaFeedback />
                </ProtectedRoute>
              }
            />

            <Route
              path='/manager/blog-management'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <BlogManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path='/manager/blog-management'
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                  <BlogManagement />
                </ProtectedRoute>
              }
            />

            {/* Payment Result Route */}
            <Route path='/payment/result' element={<PaymentResult />} />

            <Route
              path='/admin-dashboard'
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path='/user-management'
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminRole />
                </ProtectedRoute>
              }
            />

            <Route
              path='/service-management'
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminManager />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes
=======
            {/* Staff Routes - Temporary bypass for testing */}
            <Route
              path='/staff/dashboard'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/staff/manage-requests'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <ManageRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path='/staff/manage-requests/not-confirmed'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <ManageRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path='/staff/manage-requests/confirmed'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <ConfirmedRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path='/staff/test-process/:requestId'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <TestProcess />
                </ProtectedRoute>
              }
            />
            <Route
              path='/staff/test-process-center/:requestId'
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <TestProcessCenter />
                </ProtectedRoute>
              }
            />
            {/* <Route
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

            {/* Fallback Routes */}
            <Route path='/dashboard' element={<Navigate to='/profile' replace />} />
            <Route path='/profile' element={<Navigate to='/profile' replace />} />
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
