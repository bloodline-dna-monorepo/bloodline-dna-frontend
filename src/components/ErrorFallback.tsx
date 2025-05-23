"use client"

import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Link } from "react-router-dom"

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  const isDevelopment = import.meta.env.MODE === "development"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened. Please try again.</p>

        {isDevelopment && (
          <div className="mb-6 p-4 bg-red-50 rounded-md text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">Error Details (Development Only):</h3>
            <p className="text-xs text-red-700 font-mono break-all">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetError}
            className="flex items-center justify-center px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <Link
            to="/"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
