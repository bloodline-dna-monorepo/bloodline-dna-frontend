// Payment Types - Updated with proper typing
export interface CreatePaymentUrlRequest {
  amount: number
  orderInfo: string
  serviceId?: number
}
export interface AuthResponse {
  success: boolean
  message: string
}
export interface CreatePaymentUrlResponse {
  success: boolean
  paymentUrl?: string
  message: string
}

export interface PaymentResultState {
  registrationData: TestRequestData
  serviceInfo: {
    serviceName: string
    serviceType: string
    amount: number
  }
}

export interface SampleInfo {
  fullName: string
  birthYear: string
  gender: string
  relation: string
  sampleType: string
  idNumber: string
  file: string | null
}

export interface UserinfoID {
  accountId: number
  role: string
  FullName?: string
  Email?: string
  PhoneNumber?: string
  Address?: string
  DateOfBirth?: string
  Gender?: string
  SignatureImage?: string
  CreatedAt?: string
}
export interface TestRequestData {
  serviceId: number
  collectionMethod: string
  appointmentDate?: string
}

// User and Authentication Types
export interface ChangePasswordReponse {
  message: string
}

export interface UpdateProfilereq {
  FullName: string
  PhoneNumber: string
  DateOfBirth: string
  Address: string
}

export interface UpdateProfilerep {
  message: string
}

export interface User {
  accountId: number
  name: string
  email: string
  role: string
  profile?: UserProfile
  PhoneNumber?: string
}

export interface TestProcess {
  TestRequestID: number
  AccountID: number
  ServiceID: number
  ServiceName: string
  ServiceType: 'Administrative' | 'Civil'
  CollectionMethod: 'Home' | 'Facility'
  Appointment: string
  Status: string
  AssignedTo?: number
  StaffName?: string
  CreatedAt: string
  UpdatedAt: string
  SampleCount: number
  Price?: number
  KitID?: string
}

export interface UserProfile {
  ProfileID: number
  AccountID: number
  FullName?: string
  Email: string
  PhoneNumber?: string
  Address?: string
  DateOfBirth?: string
  Gender?: 'Male' | 'Female'
  SignatureImage?: string
}

export interface LoginRequest {
  Email: string
  PasswordHash: string
}



export interface RegisterRequest {
  Email: string
  PasswordHash: string
  ConfirmPassword: string
  FullName: string
  PhoneNumber: string
  Address: string
  DateOfBirth: string
  SignatureImage: string
}

export interface ChangePasswordRequest {
  password: string
  NewPassword: string
  confirmNewPassword: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User
  accessToken: string
  refreshToken: string
}

export interface RegisterResponse {
  message: string
}

// Service Types
export interface Services {
  ServiceID: number
  ServiceName: string
  ServiceType: string
  Description: string
  Price: number
  SampleCount: number
  CreatedAt: Date
  UpdatedAt: Date
}

export interface ServiceResponse {
  service: Services
}

export interface SampleCategories {
  SampleType: string
  Status: 'Pending' | 'Confirmed'
  TestRequestID: number
  TesterName: string
  CMND: string
  YOB: number
  Gender: 'Male' | 'Female'
  Relationship: string
  SignatureImage: string
}

// Test Request Types
export interface TestRequests {
  RequestID: number
  CustomerID: number
  CustomerName: string
  StaffName: string
  ServiceID: number
  Phone: string
  Email: string
  Status: 'Input Infor' | 'Pending' | 'Confirmed' | 'In Progress' | 'Completed'
  AssignedTo?: number
  SampleType: string
  CollectionMethod: 'Home' | 'Facility'
  SampleCount: 2 | 3
  CreatedAt: string
  ConfirmDate?: string
  ServiceName?: string
  ServiceType?: 'Administrative' | 'Civil'
  KitID?: string
  Appointment: string
}

export interface History {
  TestRequestID: string
  KitID?: string
  ServiceID: number
  ServiceType?: 'Administrative' | 'Civil'
  CollectionMethod: string
  ServiceName: string
  SampleCount: 2 | 3
  Price: string
  Result: string
  CreatedAt: string
  ConfirmDate: string
  Status: 'Pending' | 'Verified'
}

export interface TestResults {
  TestResultID: number
  TestRequestID: number
  CustomerName: string
  CustomerEmail: string
  CustomerPhone: string
  CustomerAddress: string
  KitID?: string
  ServiceID: number
  ServiceName: string
  ServiceType: string
  SampleCount: 2 | 3
  TestSubjects: string
  Result: string
  EnterBy: number
  SampleDate: string
  StaffName: string
  Status: "Pending" | "Verified" | "Rejected"
  CreatedAt: string
  UpdatedAt: string
  ConfirmDate: string
  RegistrationDate: string
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

export interface Payment {
  BankType: string
  CardNumber: number
  CardName: string
}

export interface PaymentBodyRequest {
  Price: number
  ServiceName: string
  ServiceID: number
  SampleCount: 2 | 3
  ServiceType: 'Administrative' | 'Civil'
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

export interface Feedback {
  FeedbackID: number
  TestResultID: number
  Rating: number
  Comment: string
  FullName: string
  CreatedAt: string
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number
  totalTests: number
  totalServices: number
  revenue: number
  avgRating: number
  completed: number
  pending: number
  feedback: number
  monthlyRevenue: number[]
  serviceDistribution: number[]
  serviceNames?: string[]
}
export interface BlogPostAdd {
  Title: string
  Description: string
  Image: string
}
// Blog Types
export interface BlogPost {
  BlogID: number
  Author: string
  Title: string
  Description: string
  Image: string
  CreatedAt: string
}

export interface SubMenuItem {
  path: string
  label: string
  icon: React.ElementType
}

export interface MenuItem {
  path: string
  label: string
  icon: React.ElementType
  subItems?: SubMenuItem[]
}

export interface TestRequestDetail {
  TestRequestID: number
  AccountID: number
  ServiceID: number
  CollectionMethod: string
  Appointment: string | null
  Status: string
  CreatedAt: string
  UpdatedAt: string
  AssignedTo: number | null
  ServiceName: string
  ServiceType: string
  Price: number
  SampleCount: number
  CustomerName: string
  CustomerEmail: string
  CustomerPhone: string | null
  CustomerAddress: string | null
  TestSubjects: string
  KitID: string | null
  StaffName: string | null
}

export interface DashboardStaffStats {
  totalRequests: number
  pendingRequests: number
  completedRequests: number
  totalCustomers: number
  completionRate: number
}

export interface RecentRequest {
  TestRequestID: number
  CustomerName: string
  Status: string
  CreatedAt: string
}

export interface TestResultData {
  result: string
}

export interface TestRequestDetail {
  TestRequestID: number
  AccountID: number
  ServiceID: number
  CollectionMethod: string
  Appointment: string | null
  Status: string
  CreatedAt: string
  UpdatedAt: string
  AssignedTo: number | null
  ServiceName: string
  ServiceType: string
  Price: number
  SampleCount: number
  CustomerName: string
  CustomerEmail: string
  CustomerPhone: string | null
  CustomerAddress: string | null
  TestSubjects: string
  KitID: string | null
  StaffName: string | null
}

export interface SampleDetail {
  SampleCategoryID: number
  TestRequestID: number
  TesterName: string
  CMND: string
  YOB: number
  Gender: string
  Relationship: string
  SampleType: string
  Status: string
  SignatureImage: string | null
}

export interface TestRequestFullDetail extends TestRequestDetail {
  samples: SampleDetail[]
  paymentInfo?: {
    amount: number
  }
  cusData: UserProfile
  staffData: UserProfile
}

export interface FeedbackCus {
  feedbackId: number
  testResultId: number
  accountId: number
  comment: string
  rating: number
  createdAt: string
}
// New type for pending feedback requests
export interface FeedbackRequest {
  TestRequestID: number
  ServiceName: string
  KitID?: string
  CompletionDate: string
  CollectionMethod: 'Home' | 'Facility'
  Status: string
  TestResultID: number // Added this to link to TestResults for feedback submission
  ServiceType: string // Added ServiceType for display
}
export interface PendingFeedbackRequest {
  TestRequestID: number
  ServiceName: string
  KitID?: string
  CompletionDate: string
  CollectionMethod: 'Home' | 'Facility'
  Status: string
  TestResultID: number // Added this to link to TestResults for feedback submission
}

export interface SubmittedFeedbackRequest {
  FeedbackID: number
  Rating: number
  Comment: string
  CreatedAt: string
  TestRequestID: number
  ServiceName: string
  KitID?: string
  CompletionDate: string
  CollectionMethod: 'Home' | 'Facility'
  Status: string
}

export interface Feedback {
  FeedbackID: number
  TestResultID: number
  Rating: number
  Comment: string
  FullName: string
  CreatedAt: string
  id: number
  rating: number // e.g., 1-5 stars
  comment: string
  customerName: string
  isVerified: boolean
}

export interface SubmittedFeedback {
  FeedbackID: number
  Rating: number
  Comment: string
  CreatedAt: string
  TestRequestID: number
  ServiceName: string
  KitID?: string
  CompletionDate: string
  CollectionMethod: "Home" | "Facility"
  Status: string
  FullName?: string
}
export interface VerifiedResult {
  TestResultID: number
  TestRequestID: number
  CustomerName: string
  CustomerEmail: string
  CustomerPhone: string
  ServiceName: string
  ServiceType: string
  SampleCount: number
  Result: string
  StaffName: string
  VerifiedDate: string
  CreatedAt: string
  KitID: string | null
  CollectionMethod: string
}

export interface VerifiedResultDetail extends VerifiedResult {
  CustomerAddress: string
  TestSubjects: string
  SampleDate: string
  EnterDate: string
  ManagerName: string
  RegistrationDate: string
}