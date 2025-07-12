'use client'

import type React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Common/Button'
import FeedbackCarousel from '../components/Common/FeedbackCarousel'
import { feedbackService } from '../services/feedbackService'
import type { SubmittedFeedback } from '../utils/types'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const [feedbacks, setFeedbacks] = useState<SubmittedFeedback[]>([])
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)
  const [errorFeedbacks, setErrorFeedbacks] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoadingFeedbacks(true)
        // Call the new public feedback service
        const data = await feedbackService.getPublicFeedbacks()
        console.log(data)

        setFeedbacks(data)
      } catch (error) {
        console.error('Failed to fetch public feedbacks:', error)
        setErrorFeedbacks('Failed to load feedbacks.')
      } finally {
        setLoadingFeedbacks(false)
      }
    }

    fetchFeedbacks()
  }, [])

  return (
    <div className='min-h-screen'>
      {/* Phần Giới thiệu */}
      <section className='bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>Dịch vụ Xét nghiệm ADN Chuyên nghiệp</h1>
            <p className='text-xl md:text-2xl mb-8 text-teal-100'>
              Phân tích di truyền chính xác, đáng tin cậy và bảo mật cho mục đích hành chính và dân sự
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {isAuthenticated ? (
                <Link to='/services'>
                  <Button size='lg' className=' text-teal-600 hover:bg-gray-100'>
                    Xem Dịch vụ
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to='/services'>
                    <Button size='lg' className=' text-teal-600 hover:bg-gray-100'>
                      Xem Dịch vụ
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button
                      size='lg'
                      variant='outline'
                      className='border-white text-white hover:bg-white hover:text-teal-600 bg-transparent'
                    >
                      Bắt đầu
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Phần Tính năng */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Tại sao chọn BloodLine DNA?</h2>
            <p className='text-xl text-gray-600'>
              Chúng tôi cung cấp dịch vụ xét nghiệm ADN chính xác và đáng tin cậy nhất
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🔬</div>
              <h3 className='text-xl font-semibold mb-2'>Công nghệ Tiên tiến</h3>
              <p className='text-gray-600'>
                Thiết bị phòng thí nghiệm hiện đại và kỹ thuật phân tích di truyền tiên tiến
              </p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🛡️</div>
              <h3 className='text-xl font-semibold mb-2'>Bảo mật 100%</h3>
              <p className='text-gray-600'>
                Quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi. Tất cả kết quả được giữ bí mật tuyệt đối
              </p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold mb-2'>Kết quả Nhanh chóng</h3>
              <p className='text-gray-600'>Nhận kết quả nhanh chóng với quy trình xét nghiệm được tối ưu hóa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Xem trước Dịch vụ */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Dịch vụ của chúng tôi</h2>
            <p className='text-xl text-gray-600'>Giải pháp xét nghiệm ADN toàn diện cho mọi nhu cầu của bạn</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Xét nghiệm Hành chính</h3>
              <p className='text-gray-600 mb-6'>
                Xét nghiệm ADN cho các tài liệu chính thức, nhập cư và mục đích pháp lý
              </p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Xét nghiệm Huyết thống Cha con</li>
                <li>✓ Xét nghiệm Huyết thống Mẹ con</li>
                <li>✓ Xét nghiệm Anh chị em</li>
                <li>✓ Xét nghiệm Nhập cư</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline' className='border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent'>
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>

            <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Xét nghiệm Dân sự</h3>
              <p className='text-gray-600 mb-6'>Xét nghiệm ADN cho mục đích cá nhân và mối quan hệ gia đình</p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Xét nghiệm Mối quan hệ</li>
                <li>✓ Phân tích Tổ tiên</li>
                <li>✓ Xây dựng Cây gia đình</li>
                <li>✓ Tư vấn Di truyền</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline' className='border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent'>
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Carousel Phản hồi */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {loadingFeedbacks ? (
            <div className='text-center text-gray-600'>Đang tải phản hồi...</div>
          ) : errorFeedbacks ? (
            <div className='text-center text-red-500'>{errorFeedbacks}</div>
          ) : (
            <FeedbackCarousel feedbacks={feedbacks} />
          )}
        </div>
      </section>

      {/* Phần Kêu gọi hành động */}
      <section className='bg-teal-600 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Sẵn sàng bắt đầu?</h2>
          <p className='text-xl mb-8 text-teal-100'>
            Tham gia cùng hàng ngàn khách hàng hài lòng đã tin tưởng chúng tôi với nhu cầu xét nghiệm ADN của họ
          </p>
          {!isAuthenticated && (
            <Link to='/register'>
              <Button size='lg' className='bg-white text-teal-600 hover:bg-gray-100'>
                Tạo tài khoản ngay hôm nay
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
