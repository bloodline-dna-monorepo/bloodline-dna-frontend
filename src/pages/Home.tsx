'use client'

import type React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Common/Button'

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>Dịch Vụ Xét Nghiệm DNA Chuyên Nghiệp</h1>
            <p className='text-xl md:text-2xl mb-8 text-teal-100'>Phân tích di truyền chính xác, đáng tin cậy và bảo mật cho mục đích hành chính và dân sự</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {isAuthenticated ? (
                <Link to={
                  user?.role === 'Admin' ? '/admin/dashboard' :
                  user?.role === 'Manager' ? '/manager/dashboard' :
                  user?.role === 'Staff' ? '/staff/dashboard' :
                  '/customer/profile'
                }>
                  <Button size='lg' className='text-teal-600 hover:bg-gray-100'>
                    Vào Bảng Điều Khiển
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to='/services'>
                    <Button size='lg' className='bg-gray-100 text-teal-600'>
                      Xem Dịch Vụ
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button
                      size='lg'
                      variant='outline'
                      className='border-white text-white hover:bg-white hover:text-teal-600'
                    >
                      Bắt Đầu Ngay
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Tại Sao Chọn Gen Unity?</h2>
            <p className='text-xl text-gray-600'>Chúng tôi cung cấp dịch vụ xét nghiệm DNA chính xác và đáng tin cậy nhất</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🔬</div>
              <h3 className='text-xl font-semibold mb-2'>Công Nghệ Hiện Đại</h3>
              <p className='text-gray-600'>Trang thiết bị phòng thí nghiệm tiên tiến và kỹ thuật phân tích di truyền hiện đại</p>
            </div>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🛡️</div>
              <h3 className='text-xl font-semibold mb-2'>100% Bảo Mật</h3>
              <p className='text-gray-600'>Quyền riêng tư của bạn là ưu tiên hàng đầu. Mọi kết quả đều được bảo mật tuyệt đối</p>
            </div>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold mb-2'>Kết Quả Nhanh Chóng</h3>
              <p className='text-gray-600'>Nhận kết quả nhanh chóng nhờ quy trình xét nghiệm tối ưu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Dịch Vụ Của Chúng Tôi</h2>
            <p className='text-xl text-gray-600'>Giải pháp xét nghiệm DNA toàn diện cho mọi nhu cầu của bạn</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-lg border'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Xét Nghiệm Hành Chính</h3>
              <p className='text-gray-600 mb-6'>Xét nghiệm DNA phục vụ cho giấy tờ chính thức, nhập cư và mục đích pháp lý</p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Xét Nghiệm Quan Hệ Cha Con</li>
                <li>✓ Xét Nghiệm Quan Hệ Mẹ Con</li>
                <li>✓ Xét Nghiệm Anh Chị Em</li>
                <li>✓ Xét Nghiệm Nhập Cư</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline'>Tìm Hiểu Thêm</Button>
              </Link>
            </div>
            <div className='bg-white p-8 rounded-lg shadow-lg border'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Xét Nghiệm Dân Sự</h3>
              <p className='text-gray-600 mb-6'>Xét nghiệm DNA cho mục đích cá nhân và quan hệ gia đình</p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Xét Nghiệm Quan Hệ Huyết Thống</li>
                <li>✓ Phân Tích Tổ Tiên</li>
                <li>✓ Xây Dựng Cây Phả Hệ</li>
                <li>✓ Tư Vấn Di Truyền</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline'>Tìm Hiểu Thêm</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-teal-600 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Sẵn Sàng Bắt Đầu?</h2>
          <p className='text-xl mb-8 text-teal-100'>Hãy cùng hàng ngàn khách hàng hài lòng tin tưởng chúng tôi với nhu cầu xét nghiệm DNA</p>
          {!isAuthenticated && (
            <Link to='/register'>
              <Button size='lg' className='bg-white text-teal-600 hover:bg-gray-100'>
                Tạo Tài Khoản Ngay
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
