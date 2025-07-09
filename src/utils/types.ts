// Payment Types - Updated with proper typing
export interface CreatePaymentUrlRequest {
  amount: number
  orderInfo: string
  serviceId?: number
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
  file: string
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
  ServiceName: string
  SampleCount: number
  ServiceType: string
  CreatedAt: string
  Appointment: string
  CollectionMethod: string
  AssignedTo: string
  Status: string
  KitID: string
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

export interface test {
  id: string
  serviceId: string
  userId: string
  status: string
  kitId: string
  createdAt: string
  confirmAt: string
  serviceName: string
  serviceType: string
  location: string
  appointmentDate: string
  technician: string
  cost: number
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
  TestRequestID: string
  CustomerName: string
  KitID?: string
  ServiceID: number
  ServiceType: string
  SampleCount: 2 | 3
  Result: string
  EnterBy: number
  SampleDate: string
  StaffName: string
  Status: 'Pending' | 'Verified' | 'Rejected'
  CreatedAt: string
  UpdatedAt: string
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
  monthlyRevenue: number[] // ví dụ: 6 tháng gần nhất
  serviceDistribution: {
    [serviceType: string]: number // ví dụ: "Civil": 10, "Administrative": 5
  }
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
