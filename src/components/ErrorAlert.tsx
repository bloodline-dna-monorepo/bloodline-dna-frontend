"use client"

import { AlertCircle, X } from "lucide-react"
import type { ApiError } from "../types/error"

interface ErrorAlertProps {
  error: ApiError
  onClose?: () => void
  className?: string
}

const ErrorAlert = ({ error, onClose, className = "" }: ErrorAlertProps) => {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-3 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-4 w-4 text-red-400" />
        </div>
        <div className="ml-2 flex-1">
          <h3 className="text-xs font-medium text-red-800">Error</h3>
          <div className="mt-1 text-xs text-red-700">
            <p>{error.message}</p>
            {error.details && <p className="mt-0.5 text-xs opacity-75">Error Code: {error.code}</p>}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-2">
            <div className="-mx-1 -my-1">
              <button
                onClick={onClose}
                className="inline-flex bg-red-50 rounded-md p-1 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-red-50 focus:ring-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorAlert
