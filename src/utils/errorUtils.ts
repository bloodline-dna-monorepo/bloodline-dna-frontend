import { type ApiError, ERROR_TYPE } from "../types/error"
import { ERROR_MESSAGES } from "../constants/errorMessages"

export class ErrorHandler {
  // Tạo lỗi API từ các thông tin đã cho
  static createApiError(message: string, code: string, status: number, details?: string): ApiError {
    return {
      message,
      code,
      status,
      details,
    }
  }

  // Lấy loại lỗi dựa trên mã trạng thái HTTP
  static getErrorType(status: number): ERROR_TYPE {
    switch (status) {
      case 400:
        return ERROR_TYPE.VALIDATION
      case 401:
        return ERROR_TYPE.AUTHENTICATION
      case 403:
        return ERROR_TYPE.AUTHORIZATION
      case 404:
        return ERROR_TYPE.NOT_FOUND
      case 500:
      case 502:
      case 503:
        return ERROR_TYPE.SERVER
      default:
        return ERROR_TYPE.UNKNOWN
    }
  }

  // Lấy thông báo lỗi tương ứng với mã trạng thái
  static getErrorMessage(error: ApiError): string {
    const { code, status } = error

    switch (status) {
      case 400:
        return ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD
      case 401:
        return ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS
      case 403:
        return ERROR_MESSAGES.AUTHORIZATION.ACCESS_DENIED
      case 404:
        return ERROR_MESSAGES.SERVER.INTERNAL_ERROR
      case 500:
        return ERROR_MESSAGES.SERVER.INTERNAL_ERROR
      case 503:
        return ERROR_MESSAGES.SERVER.SERVICE_UNAVAILABLE
      default:
        return error.message || ERROR_MESSAGES.GENERAL.UNKNOWN
    }
  }

  // Kiểm tra xem có phải lỗi mạng không
  static isNetworkError(error: unknown): boolean {
    // Kiểm tra kiểu dữ liệu được trả về và nếu không có phản hồi thì là lỗi mạng
    if (error instanceof Error && !("response" in error) && "request" in error) {
      return true
    }
    return false
  }

  // Xử lý lỗi API từ phản hồi của lỗi
  static handleApiError(error: unknown): ApiError {
    if (this.isNetworkError(error)) {
      return this.createApiError(ERROR_MESSAGES.NETWORK.CONNECTION_FAILED, ERROR_TYPE.NETWORK, 0)
    }

    if (error instanceof Error && "response" in error) {
      const { status, data } = (error as { response: { status: number; data: any } }).response
      return this.createApiError(
        data?.message || this.getErrorMessage({ code: "", status, message: "" }),
        data?.code || this.getErrorType(status),
        status,
        data,
      )
    }

    return this.createApiError(ERROR_MESSAGES.GENERAL.UNKNOWN, ERROR_TYPE.UNKNOWN, 500)
  }

  // Log lỗi ra console với thông tin chi tiết
  static logError(error: ApiError, context?: string): void {
    console.error(`[${context || "Error"}]:`, {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
      timestamp: new Date().toISOString(),
    })
  }
}
