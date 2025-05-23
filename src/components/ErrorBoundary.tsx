import type React from "react"
import { Component, type ReactNode } from "react"
import type { ErrorBoundaryState } from "../types/error"
import ErrorFallback from "./ErrorFallback"

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error Boundary caught an error:", error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Log error to monitoring service
    this.logErrorToService(error, errorInfo)
  }

  logErrorToService = (error: Error, errorInfo: unknown) => {
    // Here you would send error to your monitoring service
    // Example: Sentry, LogRocket, etc.
    console.error("Logging error to service:", {
      error: error.message,
      stack: error.stack,
      errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || ErrorFallback
      return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
