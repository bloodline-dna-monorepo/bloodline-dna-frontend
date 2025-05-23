export interface ApiError {
  message: string
  code: string
  status: number
  details?: any
}

export interface ErrorState {
  hasError: boolean
  error: ApiError | null
  isLoading: boolean
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: unknown
}

export enum ERROR_TYPE {
  NETWORK = "NETWORK_ERROR",
  VALIDATION = "VALIDATION_ERROR",
  AUTHENTICATION = "AUTHENTICATION_ERROR",
  AUTHORIZATION = "AUTHORIZATION_ERROR",
  SERVER = "SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNKNOWN = "UNKNOWN_ERROR",
}

