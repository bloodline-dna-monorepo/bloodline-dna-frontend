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

  // Nếu yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // Nếu người dùng đã đăng nhập nhưng cố gắng truy cập vào các trang công khai như login/register, chuyển hướng đến trang dashboard
  if (isAuthenticated) {
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
      return <Navigate to='/unauthorized' replace />
    }

    // Chuyển hướng người dùng đã đăng nhập đến trang dashboard theo vai trò
    if (user?.role === 'Admin') {
      return <Navigate to='/admin/dashboard' replace />
    }
    if (user?.role === 'Manager') {
      return <Navigate to='/manager/dashboard' replace />
    }
    if (user?.role === 'Staff') {
      return <Navigate to='/staff/dashboard' replace />
    }
    return <Navigate to='/customer/profile' replace />
  }

  // Trả về children nếu chưa đăng nhập và không yêu cầu đăng nhập
  return <>{children}</>
}

export default ProtectedRoute
