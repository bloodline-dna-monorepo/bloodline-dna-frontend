import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppRoutes from "./routes"
import ErrorBoundary from "./components/ErrorBoundary"
import CustomerRoutes from "./routes/CustomerRoutes"

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
