export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION_FAILED: "Unable to connect to server. Please check your internet connection.",
    TIMEOUT: "Request timeout. Please try again.",
    OFFLINE: "You are currently offline. Please check your connection.",
  },
  VALIDATION: {
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
    INVALID_PHONE: "Please enter a valid phone number.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
  },
  AUTHENTICATION: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    ACCOUNT_LOCKED: "Your account has been locked. Please contact support.",
  },
  AUTHORIZATION: {
    ACCESS_DENIED: "You do not have permission to access this resource.",
    INSUFFICIENT_PRIVILEGES: "Insufficient privileges to perform this action.",
  },
  SERVER: {
    INTERNAL_ERROR: "An internal server error occurred. Please try again later.",
    SERVICE_UNAVAILABLE: "Service is temporarily unavailable. Please try again later.",
    MAINTENANCE: "System is under maintenance. Please try again later.",
  },
  GENERAL: {
    UNKNOWN: "An unexpected error occurred. Please try again.",
    FORM_SUBMISSION: "Failed to submit form. Please check your input and try again.",
    FILE_UPLOAD: "Failed to upload file. Please try again.",
  },
} as const
