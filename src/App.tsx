import { BrowserRouter } from "react-router-dom"
import  ErrorBoundary  from "./components/ErrorBoundary"
import { AuthProvider } from "./hooks/useAuth"
import AppRoutes from "./routes"
import "./styles/global.css"

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
