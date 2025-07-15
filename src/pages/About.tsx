import type React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Tiến sĩ Emily Chen',
      title: 'Trưởng nhóm Di truyền học',
      description: 'Chuyên về giải trình tự và phân tích di truyền',
      image: '/src/assets/about/m1.png'
    },
    {
      name: 'Michael Davis',
      title: 'Quản lý Phòng thí nghiệm',
      description: 'Giám sát hoạt động phòng thí nghiệm và kiểm soát chất lượng',
      image: '/src/assets/about/m2.png'
    },
    {
      name: 'Sarah Lee',
      title: 'Trưởng phòng Quan hệ Khách hàng',
      description: 'Đảm bảo trải nghiệm khách hàng liền mạch và hỗ trợ',
      image: '/src/assets/about/m3.png'
    },
    {
      name: 'Tiến sĩ Alex Kim',
      title: 'Cố vấn Y tế',
      description: 'Cung cấp chuyên môn lâm sàng và hướng dẫn y tế',
      image: '/src/assets/about/m4.png'
    }
  ]

  const coreValues = [
    {
      icon: '🔬',
      title: 'Chính trực & Chính xác',
      description:
        'Chúng tôi duy trì các tiêu chuẩn cao nhất về khoa học và đạo đức, đảm bảo mọi kết quả đều chính xác và đáng tin cậy.'
    },
    {
      icon: '💝',
      title: 'Chăm sóc Tận tâm',
      description:
        'Chúng tôi cung cấp sự hỗ trợ đồng cảm và giao tiếp rõ ràng, hướng dẫn khách hàng trong hành trình di truyền của họ bằng sự tận tâm.'
    },
    {
      icon: '🔒',
      title: 'Quyền riêng tư & Bảo mật',
      description:
        'Bảo vệ thông tin di truyền cá nhân của bạn là trách nhiệm hàng đầu của chúng tôi, được bảo mật bằng các giao thức hàng đầu trong ngành.'
    },
    {
      icon: '🚀',
      title: 'Đổi mới',
      description:
        'Liên tục thúc đẩy các tiến bộ khoa học để cung cấp những hiểu biết di truyền tiên tiến và toàn diện.'
    },
    {
      icon: '⭐',
      title: 'Xuất sắc',
      description:
        'Phấn đấu đạt chất lượng cao nhất trong mọi khía cạnh dịch vụ của chúng tôi, từ xét nghiệm đến hỗ trợ khách hàng.'
    },
    {
      icon: '🤝',
      title: 'Cộng đồng',
      description:
        'Xây dựng một cộng đồng hỗ trợ nơi các cá nhân có thể kết nối và chia sẻ những câu chuyện về di sản di truyền của họ.'
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Phần Giới thiệu */}
      <div className='bg-gradient-to-r from-teal-600 to-blue-600 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>Về Gen Unity</h1>
          <p className='text-xl text-white/90 max-w-3xl mx-auto'>
            Tiên phong trong dịch vụ xét nghiệm ADN với độ chính xác tuyệt đối, công nghệ tiên tiến và sự chăm sóc tận
            tâm. Trao quyền cho các cá nhân với những hiểu biết di truyền cá nhân hóa.
          </p>
        </div>
      </div>

      {/* Phần Sứ mệnh */}
      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Sứ mệnh của chúng tôi: Khai phá tiềm năng di truyền
              </h2>
              <p className='text-gray-600 mb-6'>
                Tại Gen Unity, chúng tôi tin rằng thông tin di truyền là một cách dễ hiểu và dễ hành động. Sứ mệnh của
                chúng tôi là cung cấp các dịch vụ xét nghiệm ADN chất lượng cao nhất với độ chính xác tuyệt đối, công
                nghệ tiên tiến và sự chăm sóc tận tâm.
              </p>
              <p className='text-gray-600 mb-6'>
                Chúng tôi cam kết thúc đẩy khoa học di truyền đồng thời làm cho nó dễ tiếp cận và có ý nghĩa đối với các
                cá nhân và gia đình. Thông qua đổi mới và giáo dục, chúng tôi trao quyền cho mọi người đưa ra các quyết
                định sáng suốt về sức khỏe, tổ tiên và các mối quan hệ của họ, thúc đẩy một tương lai khỏe mạnh và hiểu
                biết hơn.
              </p>
            </div>
            <div className='flex justify-center'>
              <img
                src='/src/assets/about/our.png'
                alt='Sứ mệnh của chúng tôi'
                className='max-w-md w-full h-auto rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Giá trị cốt lõi */}
      <div className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Giá trị cốt lõi của chúng tôi</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {coreValues.map((value, index) => (
              <div key={index} className='text-center p-6'>
                <div className='text-4xl mb-4'>{value.icon}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>{value.title}</h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tại sao chọn chúng tôi */}
      <div className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Tại sao chọn Gen Unity?</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>✅</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>Độ chính xác được chứng nhận</h3>
              <p className='text-gray-600'>
                Chúng tôi tự hào về phòng thí nghiệm hiện đại, được công nhận, đảm bảo mức độ chính xác và độ tin cậy
                cao nhất trong kết quả của chúng tôi.
              </p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🔒</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>Quyền riêng tư không lay chuyển</h3>
              <p className='text-gray-600'>
                Dữ liệu di truyền của bạn được bảo vệ bằng các biện pháp bảo mật tiên tiến và các giao thức bảo mật
                nghiêm ngặt.
              </p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>👥</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>Hỗ trợ chuyên gia</h3>
              <p className='text-gray-600'>
                Tiếp cận các chuyên gia tư vấn di truyền và đại diện dịch vụ khách hàng sẵn sàng trả lời câu hỏi của bạn
                và cung cấp hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phần Đội ngũ */}
      <div className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Gặp gỡ Đội ngũ tận tâm của chúng tôi</h2>
            <p className='text-xl text-gray-600'>
              Đội ngũ các nhà khoa học, nhà di truyền học hàng đầu và chuyên gia chăm sóc khách hàng của chúng tôi tận
              tâm mang đến cho bạn trải nghiệm và những hiểu biết tốt nhất có thể.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <div key={index} className='text-center'>
                <div className='w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200'>
                  <img
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{member.name}</h3>
                <p className='text-teal-600 font-medium mb-2'>{member.title}</p>
                <p className='text-sm text-gray-600'>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần Công nghệ */}
      <div className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>Công nghệ Hiện đại</h2>
              <p className='text-gray-600 mb-6'>
                Gen Unity sử dụng các công nghệ xét nghiệm ADN tiên tiến nhất hiện có, đảm bảo mức độ chính xác và độ
                tin cậy cao nhất trong kết quả của chúng tôi.
              </p>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='text-teal-600 text-xl'>✓</div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Giải trình tự thế hệ mới</h4>
                    <p className='text-gray-600'>
                      Phòng thí nghiệm của chúng tôi sử dụng công nghệ NGS tiên tiến để phân tích ADN với độ chính xác
                      và chi tiết chưa từng có.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='text-teal-600 text-xl'>✓</div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Xử lý mẫu tự động</h4>
                    <p className='text-gray-600'>
                      Hệ thống robot xử lý mẫu để giảm thiểu lỗi của con người và tối đa hóa tính nhất quán trong kết
                      quả.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='text-teal-600 text-xl'>✓</div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Nền tảng kết quả kỹ thuật số an toàn</h4>
                    <p className='text-gray-600'>
                      Cổng thông tin trực tuyến an toàn của chúng tôi đảm bảo kết quả của bạn chỉ có thể truy cập được
                      bởi bạn, với bảo mật cấp độ ngân hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='w-96 h-96 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center'>
                <span className='text-8xl'>🔬</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần Đối tác */}
      <div className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Đối tác & Chứng nhận của chúng tôi</h2>
            <p className='text-xl text-gray-600'>
              Chúng tôi hợp tác với các tổ chức hàng đầu và duy trì các chứng nhận cao nhất để đảm bảo chất lượng và độ
              tin cậy.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center'>
            <div className='flex justify-center'>
              <img src='/src/assets/about/fpt.png' alt='Đại học FPT' className='h-16 object-contain' />
            </div>
            <div className='flex justify-center'>
              <img src='/src/assets/about/tuvu.png' alt='Đại học Tu Vu' className='h-16 object-contain' />
            </div>
            <div className='flex justify-center'>
              <img src='/src/assets/about/havard.png' alt='Đại học Harvard' className='h-16 object-contain' />
            </div>
            <div className='flex justify-center'>
              <img src='/src/assets/about/yduoc.png' alt='Đại học Y Dược' className='h-16 object-contain' />
            </div>
          </div>
        </div>
      </div>

      {/* Phần Kêu gọi hành động */}
      <div className='py-20 bg-gradient-to-r from-teal-600 to-blue-600'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>Sẵn sàng khám phá câu chuyện ADN của bạn?</h2>
          <p className='text-xl text-white/90 mb-8 max-w-3xl mx-auto'>
            Tham gia cùng hàng ngàn khách hàng hài lòng đã khám phá những hiểu biết thay đổi cuộc sống về sức khỏe, tổ
            tiên và các mối quan hệ gia đình của họ với Gen Unity.
          </p>

          <div className='flex flex-wrap justify-center items-center gap-4'>
            {/* Button */}
            <Link to='/services'>
              <button className='bg-white text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'>
                Tìm hiểu thêm về các xét nghiệm của chúng tôi
              </button>
            </Link>

            {/* Thông tin tiện ích */}
            <div className='flex flex-wrap items-center justify-center gap-4 text-white'>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>📞</span>
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>✓</span>
                <span>Đảm bảo quyền riêng tư 100%</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>⏱️</span>
                <span>Kết quả trong 3-5 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
