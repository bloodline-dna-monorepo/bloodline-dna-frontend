export const MESSAGES = {
  // Authentication Messages
  AUTH: {
    LOGIN_SUCCESS: "Welcome back! Login successful.",
    LOGIN_FAILED: "Invalid email or password. Please try again.",
    REGISTER_SUCCESS: "Account created successfully! Welcome to BloodLine DNA.",
    REGISTER_FAILED: "Registration failed. Please check your information.",
    EMAIL_EXISTS: "This email is already registered. Please use a different email.",
    LOGOUT_SUCCESS: "You have been logged out successfully.",
    PASSWORD_CHANGED: "Password changed successfully.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    UNAUTHORIZED: "Please log in to access this feature.",
  },

  // Form Validation Messages
  VALIDATION: {
    REQUIRED: "This field is required",
    EMAIL_INVALID: "Please enter a valid email address",
    EMAIL_REQUIRED: "Email address is required",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
    PASSWORD_MISMATCH: "Passwords do not match",
    PHONE_INVALID: "Please enter a valid phone number",
    DATE_INVALID: "Please enter a valid date",
    DATE_FUTURE: "Please select a future date",
    NAME_REQUIRED: "Full name is required",
    RELATIONSHIP_REQUIRED: "Relationship is required",
    YEAR_BIRTH_REQUIRED: "Year of birth is required",
    YEAR_BIRTH_INVALID: "Please enter a valid year of birth",
    SERVICE_REQUIRED: "Please select a service",
    SAMPLE_PROVIDERS_MIN: "At least one sample provider is required",
    APPOINTMENT_DATE_REQUIRED: "Appointment date is required",
    COLLECTION_METHOD_REQUIRED: "Collection method is required",
  },

  // Service Messages
  SERVICE: {
    LOADING: "Loading services...",
    LOAD_ERROR: "Failed to load services. Please try again.",
    NOT_FOUND: "Service not found.",
    SELECTION_SUCCESS: "Service selected successfully.",
    REGISTRATION_SUCCESS: "Service registration completed successfully!",
    REGISTRATION_ERROR: "Failed to register for service. Please try again.",
  },

  // Registration Messages
  REGISTRATION: {
    CREATING: "Creating your registration...",
    SUCCESS: "Registration created successfully!",
    ERROR: "Failed to create registration. Please try again.",
    LOADING: "Loading registration details...",
    NOT_FOUND: "Registration not found.",
    STATUS_UPDATED: "Registration status updated successfully.",
    KIT_ASSIGNED: "DNA collection kit assigned successfully.",
  },

  // Payment Messages
  PAYMENT: {
    PROCESSING: "Processing your payment...",
    SUCCESS: "Payment completed successfully!",
    FAILED: "Payment failed. Please try again.",
    CANCELLED: "Payment was cancelled.",
    REDIRECTING: "Redirecting to payment gateway...",
    VERIFYING: "Verifying your payment...",
    INVALID_AMOUNT: "Invalid payment amount.",
  },

  // Profile Messages
  PROFILE: {
    LOADING: "Loading profile...",
    UPDATE_SUCCESS: "Profile updated successfully!",
    UPDATE_ERROR: "Failed to update profile. Please try again.",
    UPLOAD_SUCCESS: "File uploaded successfully!",
    UPLOAD_ERROR: "Failed to upload file. Please try again.",
  },

  // Dashboard Messages
  DASHBOARD: {
    LOADING: "Loading dashboard...",
    LOAD_ERROR: "Failed to load dashboard data.",
    STATS_UPDATED: "Statistics updated successfully.",
  },

  // General Messages
  GENERAL: {
    LOADING: "Loading...",
    SAVING: "Saving...",
    DELETING: "Deleting...",
    SUCCESS: "Operation completed successfully!",
    ERROR: "An error occurred. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    PERMISSION_DENIED: "You don't have permission to perform this action.",
    CONFIRM_DELETE: "Are you sure you want to delete this item?",
    UNSAVED_CHANGES: "You have unsaved changes. Are you sure you want to leave?",
    NO_DATA: "No data available.",
    TRY_AGAIN: "Please try again.",
  },

  // File Messages
  FILE: {
    UPLOAD_SUCCESS: "File uploaded successfully!",
    UPLOAD_ERROR: "Failed to upload file. Please try again.",
    INVALID_TYPE: "Invalid file type. Please select a valid file.",
    TOO_LARGE: "File is too large. Please select a smaller file.",
    SELECT_FILE: "Please select a file to upload.",
  },

  // Notification Messages
  NOTIFICATION: {
    NEW_RESULT: "Your DNA test results are ready!",
    KIT_SHIPPED: "Your DNA collection kit has been shipped.",
    PAYMENT_CONFIRMED: "Your payment has been confirmed.",
    APPOINTMENT_REMINDER: "Reminder: You have an appointment tomorrow.",
    TEST_COMPLETED: "Your DNA test has been completed.",
  },
} as const

// Helper function to get nested messages
export const getMessage = (category: keyof typeof MESSAGES, key: string): string => {
  const categoryMessages = MESSAGES[category] as Record<string, string>
  return categoryMessages[key] || MESSAGES.GENERAL.ERROR
}

// Type definitions
export type MessageCategory = keyof typeof MESSAGES
export type AuthMessage = keyof typeof MESSAGES.AUTH
export type ValidationMessage = keyof typeof MESSAGES.VALIDATION
export type ServiceMessage = keyof typeof MESSAGES.SERVICE
export type GeneralMessage = keyof typeof MESSAGES.GENERAL
