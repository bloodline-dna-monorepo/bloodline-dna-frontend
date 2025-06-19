// User and Authentication Types
export interface User {
  accountId: number
  email: string
  role: string
  profile?: UserProfile
}

export interface UserProfile {
  profileId: number
  accountId: number
  fullName?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  gender?: 'Male' | 'Female'
  signatureImage?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User
  accessToken: string
  refreshToken: string
}

// Service Types
export interface Service {
  serviceId: number
  serviceName: string
  serviceTypeId: number
  serviceType: string
  description: string
  price: number
  sampleCount: number
  collectionMethodId: number
  collectionMethod: string
  isActive: boolean
}

export interface ServiceRegistration {
  registrationId: number
  customerId: number
  serviceId: number
  appointmentDate?: string
  collectionMethod: string
  sampleProviders: SampleProvider[]
  totalPrice: number
  status: string
  paymentStatus: string
  createdAt: string
}

export interface SampleProvider {
  fullName: string
  yearOfBirth: number
  gender: 'Male' | 'Female'
  relationship: string
  sampleType: string
  commitment: boolean
  signatureImage?: string
}

// Payment Types
export interface PaymentTransaction {
  TransactionID: number
  RegistrationID: number
  Amount: number
  PaymentMethod: string
  Status: string
  TransactionReference?: string
  PaymentDate?: string
  CreatedAt: string
}

export interface PaymentRequest {
  registrationId: number
  amount: number
  paymentMethod: string
  returnUrl: string
}

// Test Request Types
export interface TestRequest {
  RequestID: number
  CustomerID: number
  ServiceID: number
  Status: string
  Priority: 'Low' | 'Medium' | 'High'
  AssignedTo?: number
  Notes?: string
  SampleType: string
  CollectionMethod: string
  SampleCount: number
  CreatedAt: string
  UpdatedAt: string
  CompletedAt?: string
  ServiceName?: string
  ServiceType?: string
  CustomerName?: string
  CustomerEmail?: string
  CustomerPhone?: string
  AssignedStaffName?: string
}

export interface CreateTestRequestRequest {
  customerId: number
  serviceId: number
  status?: string
  priority?: 'Low' | 'Medium' | 'High'
  notes?: string
  sampleType?: string
  collectionMethod?: string
  sampleCount?: number
}

export interface UpdateTestRequestRequest {
  status?: string
  assignedTo?: number
  priority?: 'Low' | 'Medium' | 'High'
  notes?: string
  completedAt?: string
}

// File Upload Types
export interface FileUpload {
  FileID: number
  RegistrationID: number
  FileName: string
  FilePath: string
  FileType: string
  FileSize: number
  UploadedBy: number
  CreatedAt: string
}

// API Response Types
export interface ApiResponse<T> extends LoginResponse {
  success: boolean
  message: string
  data: T
}

// Role Types
export interface Role {
  RoleID: number
  RoleName: string
}

// Statistics Types
export interface UserStats {
  total: number
  active: number
  inactive: number
  byRole: Record<string, number>
}

export interface ServiceStats {
  total: number
  active: number
  inactive: number
  byType: Record<string, number>
}

export interface RegistrationStats {
  total: number
  totalRevenue: number
  byStatus: Record<string, number>
  byService: Record<string, number>
}

// Form Types
export interface ServiceFormData {
  ServiceName: string
  ServiceType: 'Administrative' | 'Civil'
  Description: string
  Price: number
  SampleCount: number
  CollectionMethod: string
  IsActive: boolean
}

export interface ServiceRegistrationFormData {
  ServiceID: number
  AppointmentDate?: string
  CollectionMethod: 'Home' | 'Facility'
  sampleProviders: SampleProviderFormData[]
}

export interface SampleProviderFormData {
  FullName: string
  YearOfBirth: number
  Gender: 'Male' | 'Female'
  Relationship: string
  SampleType: string
  Commitment: boolean
  SignatureImage?: string
}

// Constants
export const SERVICE_TYPES = {
  ADMINISTRATIVE: 'Administrative',
  CIVIL: 'Civil'
} as const

export const COLLECTION_METHODS = {
  HOME: 'Home',
  FACILITY: 'Facility'
} as const

export const REGISTRATION_STATUSES = {
  PENDING_PAYMENT: 'Pending Payment',
  PAID: 'Paid',
  CONFIRMED: 'Confirmed',
  KIT_SENT: 'Kit Sent',
  SAMPLE_RECEIVED: 'Sample Received',
  UNDER_EXAMINATION: 'Under Examination',
  RESULTS_AVAILABLE: 'Results Available'
} as const

export const PAYMENT_STATUSES = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed'
} as const

export const USER_ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  CUSTOMER: 'Customer'
} as const

export interface Order {
  orderId: number
  customerId: number
  serviceId: number
  serviceName: string
  statusId: number
  statusName: string
  kitId?: number
  kitCode?: string
  staffId?: number
  managerId?: number
  totalPrice: number
  paymentStatus: string
  paymentTransactionId?: string
  appointmentDate?: string
  collectionMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface TestResult {
  resultId: number
  orderId: number
  resultData: string
  enteredByStaffId: number
  confirmedByManagerId?: number
  resultDate: string
  confirmationDate?: string
  isConfirmed: boolean
  pdfPath?: string
}

export interface Kit {
  kitId: number
  kitCode: string
  isUsed: boolean
}

export interface OrderStatus {
  statusId: number
  statusName: string
  description: string
}

export interface ServiceType {
  serviceTypeId: number
  typeName: 'Administrative' | 'Civil'
  description: string
}

export interface CollectionMethod {
  collectionMethodId: number
  methodName: 'At Facility' | 'At Home'
  description: string
}

export interface SampleType {
  sampleTypeId: number
  typeName: string
  description: string
}
