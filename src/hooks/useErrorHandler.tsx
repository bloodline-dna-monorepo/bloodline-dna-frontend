"use client"

import { useState, useCallback } from "react"
import type { ApiError, ErrorState } from "../types/error"
import { ErrorHandler } from "../utils/errorUtils"

export const useErrorHandler = (initialState?: Partial<ErrorState>) => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    isLoading: false,
    ...initialState,
  })

  const setError = useCallback((error: ApiError | Error | any) => {
    let apiError: ApiError

    if (error instanceof Error) {
      apiError = ErrorHandler.createApiError(error.message, "UNKNOWN_ERROR", 500)
    } else if (error.response || error.request) {
      apiError = ErrorHandler.handleApiError(error)
    } else {
      apiError = error as ApiError
    }

    ErrorHandler.logError(apiError, "useErrorHandler")

    setErrorState({
      hasError: true,
      error: apiError,
      isLoading: false,
    })
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      isLoading: false,
    })
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setErrorState((prev) => ({
      ...prev,
      isLoading: loading,
    }))
  }, [])

  const executeAsync = useCallback(
    async (asyncFunction: () => Promise<unknown>, context?: string): Promise<unknown | null> => {
      try {
        setLoading(true)
        clearError()

        const result = await asyncFunction()
        setLoading(false)
        return result
      } catch (error) {
        ErrorHandler.logError(ErrorHandler.handleApiError(error), context || "executeAsync")
        setError(error)
        return null
      }
    },
    [setError, clearError, setLoading],
  )

  return {
    ...errorState,
    setError,
    clearError,
    setLoading,
    executeAsync,
  }
}
