'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import LabImage from '../assets/phongxetnghiem.jpg'
import { ArrowUpIcon } from 'lucide-react'
const GuideAndFAQ: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300) // hiện khi scroll hơn 300px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: 'Độ chính xác của xét nghiệm ADN của bạn là bao nhiêu?',
      answer:
        'Xét nghiệm ADN của chúng tôi đạt độ chính xác 99.9% cho xét nghiệm huyết thống cha con và 99.99% cho các trường hợp loại trừ. Chúng tôi sử dụng công nghệ hiện đại và phân tích nhiều dấu hiệu di truyền để đảm bảo độ chính xác cao nhất.'
    },
    {
      question: 'Mất bao lâu để nhận được kết quả?',
      answer:
        'Kết quả tiêu chuẩn có sẵn trong vòng 3-5 ngày làm việc kể từ khi chúng tôi nhận được mẫu của bạn. Chúng tôi cũng cung cấp dịch vụ khẩn cấp với kết quả trong 24 giờ hoặc 4 giờ đối với các trường hợp cấp bách.'
    },
    {
      question: 'Thông tin di truyền của tôi có được giữ bí mật không?',
      answer:
        'Có, chúng tôi duy trì các tiêu chuẩn cao nhất về quyền riêng tư và bảo mật. Thông tin di truyền của bạn được lưu trữ an toàn và không bao giờ được chia sẻ với bên thứ ba nếu không có sự đồng ý rõ ràng của bạn.'
    },
    {
      question: 'Tôi có thể sử dụng kết quả xét nghiệm ADN của mình tại tòa án không?',
      answer:
        'Có, các xét nghiệm ADN pháp lý của chúng tôi được chấp nhận tại tòa án. Đối với mục đích pháp lý, chúng tôi tuân thủ các quy trình chuỗi giám sát nghiêm ngặt và cung cấp tài liệu chính thức đáp ứng các yêu cầu pháp lý.'
    },
    {
      question: 'Sự khác biệt giữa lấy mẫu tại nhà và lấy mẫu tại phòng thí nghiệm là gì?',
      answer:
        'Lấy mẫu tại nhà cho phép bạn thu thập mẫu tại nhà một cách thoải mái bằng bộ kit của chúng tôi, trong khi lấy mẫu tại phòng thí nghiệm yêu cầu bạn đến cơ sở của chúng tôi. Cả hai phương pháp đều chính xác như nhau, nhưng lấy mẫu tại phòng thí nghiệm là bắt buộc đối với các trường hợp pháp lý.'
    },
    {
      question: 'Làm cách nào để thu thập mẫu ADN của tôi?',
      answer:
        'Chúng tôi cung cấp bộ kit lấy mẫu bằng tăm bông má dễ sử dụng. Đơn giản chỉ cần chà tăm bông vào bên trong má của bạn trong 30 giây, để khô và gửi lại phòng thí nghiệm của chúng tôi bằng phong bì trả trước được cung cấp.'
    },
    {
      question: 'Tôi có thể xét nghiệm mà người khác không biết không?',
      answer:
        'Đối với xét nghiệm vì mục đích cá nhân, có. Tuy nhiên, đối với xét nghiệm pháp lý, tất cả những người tham gia phải có mặt với giấy tờ tùy thân hợp lệ và đồng ý với quy trình xét nghiệm.'
    },
    {
      question: 'Điều gì xảy ra với mẫu của tôi sau khi xét nghiệm?',
      answer:
        'Sau khi xét nghiệm hoàn tất, các mẫu sẽ được tiêu hủy an toàn theo chính sách bảo mật của chúng tôi trừ khi bạn yêu cầu cụ thể chúng tôi giữ lại để xét nghiệm trong tương lai.'
    },
    {
      question: 'Bạn có cung cấp xét nghiệm cho các tình trạng sức khỏe không?',
      answer:
        'Hiện tại, chúng tôi chuyên về xét nghiệm mối quan hệ (xét nghiệm huyết thống cha con, mẹ con, anh chị em). Chúng tôi không cung cấp sàng lọc sức khỏe di truyền hoặc xét nghiệm khuynh hướng.'
    },
    {
      question: 'Tôi có thể sử dụng bảo hiểm để thanh toán xét nghiệm ADN không?',
      answer:
        'Xét nghiệm ADN để xác định mối quan hệ thường không được bảo hiểm chi trả vì nó được coi là tự nguyện. Tuy nhiên, bạn có thể kiểm tra với nhà cung cấp bảo hiểm của mình để biết chi tiết bảo hiểm cụ thể.'
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Tiêu đề */}
      <div className='bg-gradient-to-r from-teal-600 to-blue-600 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Hướng dẫn Xét nghiệm & Câu hỏi thường gặp</h1>
          <p className='text-xl text-white/90'>
            Mọi thứ bạn cần biết về quy trình xét nghiệm ADN của chúng tôi, từ thu thập đến kết quả.
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Hướng dẫn quy trình xét nghiệm */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Quy trình xét nghiệm của chúng tôi</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Quy trình lấy mẫu tại nhà */}
            <div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-6'>Quy trình lấy mẫu tại nhà</h3>
              <p className='text-gray-600 mb-6'>
                Quy trình lấy mẫu ADN tại nhà của chúng tôi được thiết kế đơn giản, tiện lợi và riêng tư. Thực hiện theo
                các bước sau để đảm bảo kết quả chính xác.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    1
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Chọn dịch vụ của bạn</h4>
                    <p className='text-gray-600'>
                      Chọn xét nghiệm bạn muốn và hoàn tất đơn đặt hàng. Bộ kit lấy mẫu của bạn sẽ được gửi đến bạn
                      trong bao bì kín đáo.
                    </p>
                  </div>
                </div>

              

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Thu thập mẫu của bạn</h4>
                    <p className='text-gray-600'>
                      Làm theo hướng dẫn chi tiết để thu thập mẫu tăm bông má của bạn. Nhớ không ăn, uống, hút thuốc
                      hoặc nhai kẹo cao su trong 30 phút trước khi lấy mẫu.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Gửi mẫu của bạn</h4>
                    <p className='text-gray-600'>
                      Đặt mẫu của bạn vào phong bì  và gửi lại phòng thí nghiệm của chúng tôi. Không cần thêm
                      phí vận chuyển.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    4
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Nhận kết quả của bạn</h4>
                    <p className='text-gray-600'>
                      Khi mẫu của bạn đến phòng thí nghiệm của chúng tôi, xét nghiệm thường mất 3-5 ngày làm việc. Bạn
                      sẽ nhận được thông báo qua email khi kết quả của bạn sẵn sàng để xem trong tài khoản trực tuyến an
                      toàn của bạn.
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 bg-gray-200 rounded-lg p-8 text-center'>
                <div className='relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4'>
                  <iframe
                    className='absolute top-0 left-0 w-full h-full rounded-lg'
                    src='https://www.youtube.com/embed/QSx8wGHHaMM'
                    title='Hướng dẫn thu thập mẫu ADN'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
                <h4 className='font-semibold text-gray-900 mb-2'>Hướng dẫn video: Cách thu thập mẫu ADN của bạn</h4>
                <p className='text-gray-600'>Xem hướng dẫn video từng bước của chúng tôi để thu thập mẫu đúng cách.</p>
              </div>
            </div>

            {/* Quy trình lấy mẫu tại cơ sở phòng thí nghiệm */}
            <div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                Quy trình lấy mẫu tại cơ sở phòng thí nghiệm
              </h3>
              <p className='text-gray-600 mb-6'>
                Đối với xét nghiệm ADN pháp lý hoặc những người thích lấy mẫu chuyên nghiệp, các cơ sở đối tác của chúng
                tôi cung cấp một quy trình tiện lợi và hiệu quả.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    1
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Đặt lịch hẹn</h4>
                    <p className='text-gray-600'>
                      Đặt lịch hẹn tại một trong các cơ sở đối tác của chúng tôi vào thời gian thuận tiện cho bạn. Các
                      cuộc hẹn trong cùng ngày thường có sẵn.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Đến cuộc hẹn của bạn</h4>
                    <p className='text-gray-600'>
                      Mang theo giấy tờ tùy thân có ảnh hợp lệ. Đối với xét nghiệm pháp lý, tất cả những người tham gia
                      phải có mặt với giấy tờ tùy thân. Đối với xét nghiệm trẻ vị thành niên, mang theo giấy khai sinh
                      của chúng.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Lấy mẫu chuyên nghiệp</h4>
                    <p className='text-gray-600'>
                      Một chuyên gia được đào tạo sẽ thu thập mẫu ADN của bạn bằng cách sử dụng tăm bông má đơn giản và
                      không đau. Toàn bộ quá trình chỉ mất vài phút.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    4
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Xử lý mẫu</h4>
                    <p className='text-gray-600'>
                      Mẫu của bạn được đóng gói an toàn và gửi đến phòng thí nghiệm của chúng tôi với tài liệu chuỗi
                      giám sát thích hợp cho xét nghiệm pháp lý.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                    5
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Nhận kết quả của bạn</h4>
                    <p className='text-gray-600'>
                      Kết quả thường có sẵn trong vòng 3-5 ngày làm việc. Đối với xét nghiệm pháp lý, tài liệu chính
                      thức sẽ được cung cấp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab facility image placeholder */}
              <div className='mt-8 bg-gray-100 rounded-lg p-8 text-center'>
                <img src={LabImage} alt='' />

                <h4 className='font-semibold text-gray-900 mb-2'>Cơ sở phòng thí nghiệm</h4>
                <p className='text-gray-600'>Lấy mẫu chuyên nghiệp trong môi trường thoải mái, riêng tư.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phần Câu hỏi thường gặp */}
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Câu hỏi thường gặp</h2>

          <div className='max-w-4xl mx-auto space-y-4'>
            {faqs.map((faq, index) => (
              <div key={index} className='bg-white rounded-lg shadow border border-gray-200'>
                <button
                  onClick={() => toggleFAQ(index)}
                  className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50'
                >
                  <span className='font-medium text-gray-900'>{faq.question}</span>
                  <span className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                    <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
                {openFAQ === index && (
                  <div className='px-6 pb-4'>
                    <p className='text-gray-600'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Liên hệ hỗ trợ */}
          <div className='text-center mt-12'>
            <p className='text-gray-600 mb-4'>
              Không tìm thấy câu trả lời cho câu hỏi của bạn ở đây? Liên hệ đội ngũ hỗ trợ của chúng tôi để được giúp
              đỡ.
            </p>
            <a
              href='https://mail.google.com/mail/?view=cm&fs=1&to=genunitycompany@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors'
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all duration-300'
          title='Lên đầu trang'
        >
          <ArrowUpIcon className='w-6 h-6' />
        </button>
      )}
    </div>
  )
}

export default GuideAndFAQ
