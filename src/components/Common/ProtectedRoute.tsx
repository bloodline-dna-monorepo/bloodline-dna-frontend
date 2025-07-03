'use client'

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Array<string>  // Mảng các quyền cần thiết để truy cập
  requireAuth?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, user } = useAuth()

  // Nếu yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/dang-nhap' replace />
  }

  // Nếu người dùng đã đăng nhập nhưng cố gắng truy cập vào các trang công khai như đăng nhập/đăng ký, chuyển hướng đến trang chính
  if (isAuthenticated) {
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
      return <Navigate to='/khong-co-quyen' replace />
    }

    // Chuyển hướng người dùng đã đăng nhập đến trang chính theo vai trò
    if (user?.role === 'Admin') {
      return <Navigate to='/quan-tri/dashboard' replace />
    }
    if (user?.role === 'Manager') {
      return <Navigate to='/quan-ly/dashboard' replace />
    }
    if (user?.role === 'Staff') {
      return <Navigate to='/nhan-vien/dashboard' replace />
    }
    return <Navigate to='/khach-hang/thong-tin' replace />
  }

  // Trả về children nếu chưa đăng nhập và không yêu cầu đăng nhập
  return <>{children}</>
}

export default ProtectedRoute
