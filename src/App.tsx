"use client"
import './index.css'
import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Layout Components
import Header from "./components/Common/Header"
import Footer from "./components/Common/Footer"

// Public Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import GuideAndFAQ from "./pages/GuideAndFAQ"
import Blog from "./pages/Blog"

// Auth Pages
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
// import ResetPassword from "./components/Auth/ResetPassword"

// Customer Pages
<<<<<<< Updated upstream
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import Profile from "./pages/customer/Profile"
import TestProcess from "./pages/customer/TestProcess"
import HistoryServices from "./pages/customer/HistoryServices"
=======
import CustomerDashboard from './pages/customer/CustomerDashboard'
import Profile from './pages/customer/Profile'
import CustomerTestProcess from './pages/customer/TestProcess'
import HistoryServices from './pages/customer/HistoryServices'
>>>>>>> Stashed changes

// Staff Pages
import StaffDashboard from "./pages/staff/StaffDashboard"
import TestRequests from "./pages/staff/TestRequests"
import StaffTestProcess from "./pages/staff/TestProcess"
<<<<<<< Updated upstream
import ProcessDetail from "./pages/staff/ProcessDetail"
import StaffProfile from "./pages/staff/StaffProfile"
import StaffSettings from "./pages/staff/StaffSettings"

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard"
=======
import StaffProfile from "./pages/staff/StaffProfile"
import StaffSettings from "./pages/staff/StaffSettings"
import StaffTestRoutes from "./components/StaffSidebar/StaffTestRoutes"

// Manager Pages
import { ManagerDashboard } from './pages/manager/ManagerDashboard'
>>>>>>> Stashed changes

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard"

// Service Components
// import ServiceDetail from "./components/ServiceADN/ServiceDetail"
// import ServiceForm from "./components/ServiceADN/ServiceForm"

// Protected Route Component
import { useAuth } from "./context/AuthContext"

// Comment out ProtectedRoute và chỉ render children
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  // TEMP: Disable auth for testing
  return <>{children}</>

  // Original code:
  // const { user, loading } = useAuth()

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return <Navigate to="/login" replace />
  // }

  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  // return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (user) {
    // Redirect authenticated users to their dashboard
    switch (user.role) {
      case "Admin":
        return <Navigate to="/admin/dashboard" replace />
      case "Manager":
        return <Navigate to="/manager/dashboard" replace />
      case "Staff":
        return <Navigate to="/staff/dashboard" replace />
      case "Customer":
      default:
        return <Navigate to="/customer/dashboard" replace />
    }
  }

  return <>{children}</>
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Staff Routes - Direct Access for Testing */}
            <Route path="/staff/*" element={<StaffTestRoutes />} />

            {/* Public Routes with Header/Footer */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <Home />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <About />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <Services />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/guide-faq"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <GuideAndFAQ />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <Header />
                  <main className="flex-1">
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
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/test-process"
              element={
<<<<<<< Updated upstream
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <TestProcess />
=======
                <ProtectedRoute allowedRoles={['Customer']}>
                  <CustomerTestProcess />
>>>>>>> Stashed changes
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/history"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <HistoryServices />
                </ProtectedRoute>
              }
            />
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
            {/* Staff Routes */}
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
<<<<<<< Updated upstream
              path="/staff/test-requests"
=======
              path="/staff/requests"
>>>>>>> Stashed changes
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <TestRequests />
                </ProtectedRoute>
              }
            />
            <Route
<<<<<<< Updated upstream
              path="/staff/test-process"
=======
              path="/staff/tests"
>>>>>>> Stashed changes
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <StaffTestProcess />
                </ProtectedRoute>
              }
            />
            <Route
<<<<<<< Updated upstream
              path="/staff/process-detail/:id"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <ProcessDetail />
                </ProtectedRoute>
              }
            />
            <Route
=======
>>>>>>> Stashed changes
              path="/staff/profile"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <StaffProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/settings"
              element={
                <ProtectedRoute allowedRoles={["Staff"]}>
                  <StaffSettings />
                </ProtectedRoute>
              }
            />
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
            {/* Manager Routes */}
            <Route
              path="/manager/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Service Registration
            <Route
              path="/service-registration/:serviceId"
              element={
                <ProtectedRoute>
                  <ServiceForm />
                </ProtectedRoute>
              }
            /> */}

            {/* Fallback Routes */}
            <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
            <Route path="/profile" element={<Navigate to="/customer/profile" replace />} />
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl text-red-600">Unauthorized Access</h1>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App