export const MESSAGES = {
  // Authentication Messages
  AUTH: {
    LOGIN_SUCCESS: "Chào mừng bạn quay trở lại! Đăng nhập thành công.",
    LOGIN_FAILED: "Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.",
    REGISTER_SUCCESS: "Tạo tài khoản thành công! Chào mừng đến với BloodLine DNA.",
    REGISTER_FAILED: "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.",
    EMAIL_EXISTS: "Email này đã được đăng ký. Vui lòng sử dụng email khác.",
    LOGOUT_SUCCESS: "Bạn đã đăng xuất thành công.",
    PASSWORD_CHANGED: "Đổi mật khẩu thành công.",
    TOKEN_EXPIRED: "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
    UNAUTHORIZED: "Vui lòng đăng nhập để truy cập tính năng này.",
  },

  // Form Validation Messages
  VALIDATION: {
    REQUIRED: "Trường này là bắt buộc",
    EMAIL_INVALID: "Vui lòng nhập địa chỉ email hợp lệ",
    EMAIL_REQUIRED: "Email là bắt buộc",
    PASSWORD_REQUIRED: "Mật khẩu là bắt buộc",
    PASSWORD_MIN_LENGTH: "Mật khẩu phải có ít nhất 8 ký tự",
    PASSWORD_MISMATCH: "Mật khẩu không khớp",
    PHONE_INVALID: "Vui lòng nhập số điện thoại hợp lệ",
    DATE_INVALID: "Vui lòng nhập ngày hợp lệ",
    DATE_FUTURE: "Vui lòng chọn ngày trong tương lai",
    NAME_REQUIRED: "Họ tên là bắt buộc",
    RELATIONSHIP_REQUIRED: "Mối quan hệ là bắt buộc",
    YEAR_BIRTH_REQUIRED: "Năm sinh là bắt buộc",
    YEAR_BIRTH_INVALID: "Vui lòng nhập năm sinh hợp lệ",
    SERVICE_REQUIRED: "Vui lòng chọn dịch vụ",
    SAMPLE_PROVIDERS_MIN: "Cần ít nhất một người cung cấp mẫu",
    APPOINTMENT_DATE_REQUIRED: "Ngày hẹn là bắt buộc",
    COLLECTION_METHOD_REQUIRED: "Phương thức lấy mẫu là bắt buộc",
  },

  // Service Messages
  SERVICE: {
    LOADING: "Đang tải dịch vụ...",
    LOAD_ERROR: "Tải dịch vụ thất bại. Vui lòng thử lại.",
    NOT_FOUND: "Không tìm thấy dịch vụ.",
    SELECTION_SUCCESS: "Chọn dịch vụ thành công.",
    REGISTRATION_SUCCESS: "Đăng ký dịch vụ thành công!",
    REGISTRATION_ERROR: "Đăng ký dịch vụ thất bại. Vui lòng thử lại.",
  },

  // Registration Messages
  REGISTRATION: {
    CREATING: "Đang tạo đăng ký của bạn...",
    SUCCESS: "Tạo đăng ký thành công!",
    ERROR: "Tạo đăng ký thất bại. Vui lòng thử lại.",
    LOADING: "Đang tải thông tin đăng ký...",
    NOT_FOUND: "Không tìm thấy đăng ký.",
    STATUS_UPDATED: "Cập nhật trạng thái đăng ký thành công.",
    KIT_ASSIGNED: "Đã cấp bộ dụng cụ thu mẫu DNA thành công.",
  },

  // Payment Messages
  PAYMENT: {
    PROCESSING: "Đang xử lý thanh toán của bạn...",
    SUCCESS: "Thanh toán thành công!",
    FAILED: "Thanh toán thất bại. Vui lòng thử lại.",
    CANCELLED: "Thanh toán đã bị hủy.",
    REDIRECTING: "Đang chuyển hướng đến cổng thanh toán...",
    VERIFYING: "Đang xác minh thanh toán của bạn...",
    INVALID_AMOUNT: "Số tiền thanh toán không hợp lệ.",
  },

  // Profile Messages
  PROFILE: {
    LOADING: "Đang tải hồ sơ...",
    UPDATE_SUCCESS: "Cập nhật hồ sơ thành công!",
    UPDATE_ERROR: "Cập nhật hồ sơ thất bại. Vui lòng thử lại.",
    UPLOAD_SUCCESS: "Tải tệp lên thành công!",
    UPLOAD_ERROR: "Tải tệp lên thất bại. Vui lòng thử lại.",
  },

  // Dashboard Messages
  DASHBOARD: {
    LOADING: "Đang tải bảng điều khiển...",
    LOAD_ERROR: "Tải dữ liệu bảng điều khiển thất bại.",
    STATS_UPDATED: "Cập nhật thống kê thành công.",
  },

  // General Messages
  GENERAL: {
    LOADING: "Đang tải...",
    SAVING: "Đang lưu...",
    DELETING: "Đang xóa...",
    SUCCESS: "Thao tác thành công!",
    ERROR: "Đã xảy ra lỗi. Vui lòng thử lại.",
    NETWORK_ERROR: "Lỗi mạng. Vui lòng kiểm tra kết nối.",
    PERMISSION_DENIED: "Bạn không có quyền thực hiện thao tác này.",
    CONFIRM_DELETE: "Bạn có chắc muốn xóa mục này không?",
    UNSAVED_CHANGES: "Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời khỏi?",
    NO_DATA: "Không có dữ liệu.",
    TRY_AGAIN: "Vui lòng thử lại.",
  },

  // File Messages
  FILE: {
    UPLOAD_SUCCESS: "Tải tệp lên thành công!",
    UPLOAD_ERROR: "Tải tệp lên thất bại. Vui lòng thử lại.",
    INVALID_TYPE: "Định dạng tệp không hợp lệ. Vui lòng chọn tệp hợp lệ.",
    TOO_LARGE: "Tệp quá lớn. Vui lòng chọn tệp nhỏ hơn.",
    SELECT_FILE: "Vui lòng chọn tệp để tải lên.",
  },

  // Notification Messages
  NOTIFICATION: {
    NEW_RESULT: "Kết quả xét nghiệm DNA của bạn đã sẵn sàng!",
    KIT_SHIPPED: "Bộ dụng cụ thu mẫu DNA của bạn đã được gửi đi.",
    PAYMENT_CONFIRMED: "Thanh toán của bạn đã được xác nhận.",
    APPOINTMENT_REMINDER: "Nhắc nhở: Bạn có lịch hẹn vào ngày mai.",
    TEST_COMPLETED: "Xét nghiệm DNA của bạn đã hoàn tất.",
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
