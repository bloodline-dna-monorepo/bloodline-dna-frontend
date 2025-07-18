// src/pages/Terms.tsx
import React from 'react'

const Terms: React.FC = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8 text-gray-800'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Điều khoản và Điều kiện sử dụng dịch vụ</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>1. Giới thiệu</h2>
        <p>
          Chào mừng bạn đến với <strong>GenUnity</strong>. Bằng việc truy cập và sử dụng dịch vụ trên website này, bạn
          đồng ý với các điều khoản và điều kiện được quy định dưới đây. Nếu bạn không đồng ý, vui lòng ngừng sử dụng
          dịch vụ của chúng tôi.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>2. Mục đích dịch vụ</h2>
        <ul className='list-disc pl-6 space-y-1'>
          <li>Đăng ký dịch vụ xét nghiệm ADN cho các mục đích dân sự hoặc hành chính.</li>
          <li>Quản lý tiến trình xét nghiệm và theo dõi kết quả.</li>
          <li>Nhận tư vấn và thông tin liên quan đến dịch vụ xét nghiệm ADN.</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>3. Quyền và nghĩa vụ của người dùng</h2>
        <p className='font-medium'>Người dùng có quyền:</p>
        <ul className='list-disc pl-6 space-y-1 mb-2'>
          <li>Truy cập, đăng ký và sử dụng các dịch vụ hợp pháp trên nền tảng.</li>
          <li>Yêu cầu hỗ trợ hoặc tư vấn từ bộ phận kỹ thuật.</li>
        </ul>
        <p className='font-medium'>Người dùng có trách nhiệm:</p>
        <ul className='list-disc pl-6 space-y-1'>
          <li>Cung cấp thông tin chính xác, đầy đủ khi đăng ký dịch vụ.</li>
          <li>Không được sử dụng nền tảng cho các hoạt động vi phạm pháp luật.</li>
          <li>Bảo mật tài khoản và thông tin đăng nhập.</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>4. Bảo mật thông tin</h2>
        <p>
          Tất cả thông tin cá nhân và kết quả xét nghiệm sẽ được bảo mật tuyệt đối theo chính sách riêng tư. Chúng tôi
          cam kết không chia sẻ dữ liệu của bạn với bên thứ ba nếu không có sự đồng ý.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>5. Thanh toán và hoàn phí</h2>
        <p>Thanh toán bắt buộc trực tuyến bằng VNPay.</p>
        <p>
          Sau khi nhấn xác nhận thanh toán trên VNPay và hệ thống báo Thanh toán thành công thì bạn sẽ không thể được
          hoàn tiền nên hãy cẩn thận .
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>6. Trách nhiệm pháp lý</h2>
        <p>
          Chúng tôi không chịu trách nhiệm nếu kết quả xét nghiệm bị ảnh hưởng bởi lỗi do người dùng cung cấp sai thông
          tin hoặc mẫu không hợp lệ. Trong mọi trường hợp, trách nhiệm pháp lý tối đa của chúng tôi sẽ không vượt quá
          chi phí bạn đã thanh toán cho dịch vụ.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>7. Sửa đổi điều khoản</h2>
        <p>
          GenUnity có quyền thay đổi, chỉnh sửa các điều khoản bất kỳ lúc nào. Các thay đổi sẽ được thông báo công khai
          trên website. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi được đăng tải đồng nghĩa với việc bạn đã chấp
          nhận các điều khoản mới.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>8. Liên hệ</h2>
        <ul className='pl-4'>
          <li>📧 Email: genunitycompany@gmail.com</li>
          <li>☎️ Điện thoại: 0123 456 789</li>
          <li>📍 Địa chỉ: 7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 700000</li>
        </ul>
      </section>

      <p className='text-sm text-gray-500'>Cập nhật lần cuối: 17/07/2025</p>
    </div>
  )
}

export default Terms
