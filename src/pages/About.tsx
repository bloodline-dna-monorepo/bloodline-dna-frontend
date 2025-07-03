import type React from "react"

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Tiến sĩ Emily Chen",
      title: "Trưởng nhóm Di truyền học",
      description: "Chuyên về giải trình tự và phân tích gen",
      image: "/src/assets/about/m1.png",
    },
    {
      name: "Michael Davis",
      title: "Quản lý Phòng thí nghiệm",
      description: "Giám sát hoạt động phòng thí nghiệm và kiểm soát chất lượng",
      image: "/src/assets/about/m2.png",
    },
    {
      name: "Sarah Lee",
      title: "Trưởng bộ phận Chăm sóc Khách hàng",
      description: "Đảm bảo trải nghiệm khách hàng liền mạch và hỗ trợ tận tình",
      image: "/src/assets/about/m3.png",
    },
    {
      name: "Tiến sĩ Alex Kim",
      title: "Cố vấn Y tế",
      description: "Cung cấp chuyên môn lâm sàng và hướng dẫn y khoa",
      image: "/src/assets/about/m4.png",
    },
  ]

  const coreValues = [
    {
      icon: "🔬",
      title: "Chính trực & Chính xác",
      description:
        "Chúng tôi duy trì tiêu chuẩn khoa học cao nhất và đạo đức nghề nghiệp, đảm bảo mọi kết quả đều chính xác và đáng tin cậy.",
    },
    {
      icon: "💝",
      title: "Chăm sóc tận tâm",
      description:
        "Chúng tôi cung cấp sự hỗ trợ đồng cảm và giao tiếp rõ ràng, đồng hành cùng khách hàng trong hành trình di truyền một cách nhân ái.",
    },
    {
      icon: "🔒",
      title: "Bảo mật & An toàn",
      description:
        "Bảo vệ thông tin di truyền cá nhân của bạn là trách nhiệm hàng đầu của chúng tôi, với các giao thức bảo mật hàng đầu trong ngành.",
    },
    {
      icon: "🚀",
      title: "Đổi mới",
      description:
        "Không ngừng nâng cao các tiến bộ khoa học để mang lại những hiểu biết di truyền tiên tiến và toàn diện.",
    },
    {
      icon: "⭐",
      title: "Xuất sắc",
      description: "Luôn hướng đến chất lượng cao nhất trong mọi khía cạnh từ xét nghiệm đến hỗ trợ khách hàng.",
    },
    {
      icon: "🤝",
      title: "Cộng đồng",
      description:
        "Xây dựng một cộng đồng hỗ trợ nơi mọi người có thể kết nối và chia sẻ câu chuyện di sản di truyền của mình.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Về Gen Unity</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Dẫn đầu dịch vụ xét nghiệm DNA với độ chính xác tuyệt đối,
             công nghệ tiên tiến và sự chăm sóc tận tâm. Trao quyền cho
              cá nhân bằng những hiểu biết di truyền cá nhân hóa.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sứ Mệnh Của Chúng Tôi: Khai Phá Tiềm Năng Di Truyền</h2>
              <p className="text-gray-600 mb-6">
                Tại Gen Unity, chúng tôi tin rằng thông tin di truyền cần được 
                truyền tải theo cách dễ hiểu và dễ áp dụng. Sứ mệnh của chúng tôi 
                là cung cấp dịch vụ xét nghiệm DNA chất lượng cao nhất với độ chính 
                xác tuyệt đối, công nghệ tiên tiến và sự chăm sóc tận tâm.
              </p>
              <p className="text-gray-600 mb-6">
                Chúng tôi cam kết thúc đẩy khoa học di truyền đồng thời làm cho 
                nó trở nên dễ tiếp cận và có ý nghĩa với từng cá nhân và gia đình. 
                Thông qua đổi mới và giáo dục, chúng tôi trao quyền cho mọi người đưa
                 ra quyết định sáng suốt về sức khỏe, nguồn gốc tổ tiên và các mối quan
                  hệ của họ, hướng đến một tương lai khỏe mạnh và hiểu biết hơn.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/src/assets/about/our.png"
                alt="Sứ Mệnh Của Chúng Tôi"
                className="max-w-md w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá Trị Cốt Lõi Của Chúng Tôi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vì Sao Chọn Gen Unity?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Độ Chính Xác Được Chứng Nhận</h3>
              <p className="text-gray-600">
                Chúng tôi tự hào với phòng thí nghiệm đạt chuẩn, hiện đại,
                 đảm bảo kết quả chính xác và đáng tin cậy ở mức cao nhất.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bảo Mật Tuyệt Đối</h3>
              <p className="text-gray-600">
                Dữ liệu di truyền của bạn được bảo vệ bằng các biện pháp bảo 
                mật tiên tiến và tuân thủ nghiêm ngặt các giao thức bảo mật.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hỗ Trợ Chuyên Gia</h3>
              <p className="text-gray-600">
                Được tư vấn bởi các chuyên gia di truyền và đội ngũ chăm sóc 
                khách hàng sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gặp Gỡ Đội Ngũ Tận Tâm Của Chúng Tôi</h2>
            <p className="text-xl text-gray-600">
              Đội ngũ nhà khoa học, chuyên gia di truyền và nhân viên chăm sóc 
              khách hàng của chúng tôi luôn tận tâm mang đến trải nghiệm và 
              thông tin giá trị nhất cho bạn.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-2">{member.title}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Công Nghệ Hiện Đại</h2>
              <p className="text-gray-600 mb-6">
                Gen Unity sử dụng công nghệ xét nghiệm DNA tiên tiến nhất hiện nay,
                 đảm bảo độ chính xác và độ tin cậy ở mức cao nhất trong kết quả.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Giải Trình Tự Thế Hệ Mới</h4>
                    <p className="text-gray-600">
                      Phòng thí nghiệm của chúng tôi sử dụng công nghệ NGS tiên tiến 
                      để phân tích DNA với độ chính xác và chi tiết chưa từng có.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Xử Lý Mẫu Tự Động</h4>
                    <p className="text-gray-600">Hệ thống robot xử lý mẫu giúp giảm 
                      thiểu lỗi con người và tăng tính nhất quán trong kết quả.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Nền Tảng Kết Quả Số Bảo Mật</h4>
                    <p className="text-gray-600">Cổng thông tin trực tuyến của chúng 
                      tôi đảm bảo kết quả chỉ bạn mới có thể truy cập, với mức bảo mật 
                      tương đương ngân hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center">
                <span className="text-8xl">🔬</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đối Tác & Chứng Nhận</h2>
            <p className="text-xl text-gray-600">
              Chúng tôi hợp tác với các tổ chức hàng đầu và duy trì các 
              chứng nhận cao nhất để đảm bảo chất lượng và độ tin cậy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <img src="/src/assets/about/fpt.png" alt="Đại học FPT" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/tuvu.png" alt="Đại học Tư Vũ" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/havard.png" alt="Đại học Harvard" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/yduoc.png" alt="Đại học Y Dược" className="h-16 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Sẵn Sàng Khám Phá Câu Chuyện DNA Của Bạn?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Hãy cùng hàng ngàn khách hàng hài lòng khám phá những thông tin 
          thay đổi cuộc sống về sức khỏe, nguồn gốc và kết nối gia đình cùng Gen Unity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Learn More About Our Tests
            </button>
            <div className="flex items-center justify-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Miễn phí giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>Cam kết bảo mật 100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⏱️</span>
                <span>Nhận kết quả trong 3-5 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
