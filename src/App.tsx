import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header' // Đảm bảo import Header
import CustomerRoutes from './routes/CustomerRoutes'
import AppRoutes from "./routes"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header /> {/* Đảm bảo Header được render ở đây */}
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
