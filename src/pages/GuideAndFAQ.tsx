"use client"

import type React from "react"
import { useState } from "react"

const GuideAndFAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "Độ chính xác của xét nghiệm DNA là bao nhiêu?",
      answer: "Xét nghiệm DNA của chúng tôi có độ chính xác 99,9% đối với xét nghiệm huyết thống và 99,99% đối với các trường hợp loại trừ. Chúng tôi sử dụng công nghệ hiện đại và phân tích nhiều dấu hiệu di truyền để đảm bảo mức độ chính xác cao nhất.",
    },
    {
      question: "Bao lâu thì tôi nhận được kết quả?",
      answer: "Kết quả tiêu chuẩn sẽ có trong vòng 3-5 ngày làm việc kể từ khi chúng tôi nhận được mẫu của bạn. Chúng tôi cũng cung cấp dịch vụ nhanh với kết quả trong 24 giờ hoặc 4 giờ cho các trường hợp khẩn cấp.",
    },
    {
      question: "Thông tin di truyền của tôi có được giữ bí mật không?",
      answer: "Có. Chúng tôi duy trì các tiêu chuẩn cao nhất về quyền riêng tư và bảo mật. Thông tin di truyền của bạn được lưu trữ an toàn và không bao giờ chia sẻ với bên thứ ba nếu không có sự đồng ý rõ ràng từ bạn.",
    },
    {
      question: "Tôi có thể sử dụng kết quả xét nghiệm DNA trong tòa án không?",
      answer: "Có. Các xét nghiệm DNA hợp pháp của chúng tôi có thể được chấp nhận tại tòa án. Đối với các mục đích pháp lý, chúng tôi tuân theo quy trình nghiêm ngặt về chuỗi bảo quản mẫu và cung cấp tài liệu chính thức đáp ứng yêu cầu pháp lý.",
    },
    {
      question: "Sự khác biệt giữa thu mẫu tại nhà và tại phòng lab là gì?",
      answer: "Thu mẫu tại nhà cho phép bạn lấy mẫu tại nhà với bộ dụng cụ của chúng tôi, trong khi thu mẫu tại phòng lab yêu cầu bạn đến cơ sở của chúng tôi. Cả hai phương pháp đều có độ chính xác như nhau, nhưng thu mẫu tại lab là bắt buộc cho các trường hợp pháp lý.",
    },
    {
      question: "Tôi lấy mẫu DNA như thế nào?",
      answer: "Chúng tôi cung cấp bộ dụng cụ gạc má đơn giản, dễ sử dụng. Chỉ cần chà nhẹ đầu gạc trong miệng bạn khoảng 30 giây, để khô và gửi lại phòng lab của chúng tôi bằng phong bì trả trước kèm theo.",
    },
    {
      question: "Tôi có thể xét nghiệm mà người kia không biết không?",
      answer: "Đối với xét nghiệm nhằm mục đích cá nhân, có thể. Tuy nhiên, đối với xét nghiệm pháp lý, tất cả người tham gia phải có mặt, mang giấy tờ tùy thân hợp lệ và đồng ý thực hiện xét nghiệm.",
    },
    {
      question: "Mẫu của tôi sẽ được xử lý thế nào sau khi xét nghiệm?",
      answer: "Sau khi xét nghiệm hoàn tất, mẫu sẽ được tiêu hủy an toàn theo chính sách bảo mật của chúng tôi, trừ khi bạn yêu cầu giữ lại để xét nghiệm trong tương lai.",
    },
    {
      question: "Bạn có cung cấp xét nghiệm các bệnh lý không?",
      answer: "Hiện tại chúng tôi chuyên về xét nghiệm mối quan hệ (cha, mẹ, anh chị em). Chúng tôi không cung cấp xét nghiệm di truyền về bệnh lý hay nguy cơ mắc bệnh.",
    },
    {
      question: "Tôi có thể dùng bảo hiểm để thanh toán xét nghiệm DNA không?",
      answer: "Xét nghiệm DNA để xác định quan hệ thường không được bảo hiểm chi trả vì được xem là tự nguyện. Tuy nhiên, bạn có thể liên hệ với nhà cung cấp bảo hiểm để biết thông tin cụ thể.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Hướng Dẫn Xét Nghiệm & Câu Hỏi Thường Gặp</h1>
          <p className="text-xl text-white/90">
            Tất cả những gì bạn cần biết về quy trình xét nghiệm DNA của chúng tôi, từ thu mẫu đến nhận kết quả.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Testing Process Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quy Trình Xét Nghiệm</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* At-Home Collection Process */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quy Trình Thu Mẫu Tại Nhà</h3>
              <p className="text-gray-600 mb-6">
                Quy trình thu mẫu DNA tại nhà của chúng tôi được thiết kế đơn giản, 
                tiện lợi và riêng tư. Làm theo các bước sau để đảm bảo kết quả chính xác.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Đặt Mua Bộ Kit</h4>
                    <p className="text-gray-600">
                      Chọn xét nghiệm bạn muốn và hoàn tất đặt hàng. 
                      Bộ kit sẽ được gửi đến bạn trong bao bì kín đáo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Đăng Ký Bộ Kit</h4>
                    <p className="text-gray-600">
                      Mỗi bộ kit có mã số riêng. Đăng ký mã số này trên cổng 
                      thông tin bảo mật để liên kết với tài khoản của bạn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Thu Mẫu DNA</h4>
                    <p className="text-gray-600">
                      Làm theo hướng dẫn chi tiết để lấy mẫu gạc má. Không ăn uống,
                       hút thuốc, hay nhai kẹo trước 30 phút khi lấy mẫu.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Gửi Lại Mẫu</h4>
                    <p className="text-gray-600">
                      Đặt mẫu vào phong bì trả trước và gửi lại phòng thí 
                      nghiệm của chúng tôi. Không cần thêm phí gửi.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Nhận Kết Quả</h4>
                    <p className="text-gray-600">
                      Khi mẫu đến phòng lab, thời gian xét nghiệm là 3–5 ngày
                       làm việc. Kết quả sẽ được gửi qua email và bạn có thể 
                       xem trong tài khoản an toàn của mình.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video placeholder */}
              <div className="mt-8 bg-gray-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Hướng Dẫn: Cách Thu Mẫu DNA</h4>
                <p className="text-gray-600">Xem video hướng dẫn từng bước để lấy mẫu đúng cách.</p>
              </div>
            </div>

            {/* Lab Facility Collection Process */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quy Trình Thu Mẫu Tại Cơ Sở</h3>
              <p className="text-gray-600 mb-6">
                Đối với xét nghiệm hợp pháp hoặc người muốn lấy mẫu bởi chuyên gia, 
                cơ sở đối tác của chúng tôi cung cấp quy trình thuận tiện và hiệu quả.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Đặt Lịch Hẹn</h4>
                    <p className="text-gray-600">
                      Đặt lịch tại cơ sở gần bạn vào thời gian thuận tiện. 
                      Nhiều cơ sở có lịch hẹn ngay trong ngày.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Đến Cơ Sở</h4>
                    <p className="text-gray-600">
                      Mang theo giấy tờ tùy thân có ảnh. Với xét nghiệm pháp lý,
                       tất cả người tham gia phải có mặt và mang đầy đủ giấy tờ.
                        Trẻ em cần có giấy khai sinh.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Chuyên Gia Thu Mẫu</h4>
                    <p className="text-gray-600">
                      Nhân viên chuyên nghiệp sẽ thực hiện việc lấy mẫu bằng gạc 
                      má một cách đơn giản và nhanh chóng. Quá trình chỉ mất vài phút.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Xử Lý Mẫu</h4>
                    <p className="text-gray-600">
                      Mẫu sẽ được đóng gói cẩn thận và gửi về phòng 
                      lab kèm đầy đủ tài liệu pháp lý cần thiết.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Nhận Kết Quả</h4>
                    <p className="text-gray-600">
                      Kết quả thường có trong 3–5 ngày làm việc. Với xét nghiệm pháp lý,
                       chúng tôi cung cấp tài liệu chứng nhận hợp pháp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab facility image placeholder */}
              <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cơ Sở Xét Nghiệm</h4>
                <p className="text-gray-600">Lấy mẫu bởi chuyên gia trong không gian riêng tư, tiện nghi.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Câu Hỏi Thường Gặp</h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform ${openFAQ === index ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Bạn không thấy câu hỏi mình cần? Hãy liên hệ đội ngũ hỗ trợ của chúng tôi để được giúp đỡ.
            </p>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
              Liên hệ Hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideAndFAQ
