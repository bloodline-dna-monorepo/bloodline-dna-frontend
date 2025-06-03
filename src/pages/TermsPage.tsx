const TermsPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              <h1 className="text-3xl font-bold">Điều khoản và Điều kiện</h1>
              <p className="opacity-90">Trung tâm xét nghiệm ADN GenUnity</p>
            </div>

            <div className="p-8 prose prose-lg max-w-none">
              <h2>1. Giới thiệu</h2>
              <p>
                Chào mừng bạn đến với Trung tâm xét nghiệm ADN GenUnity. Bằng việc sử dụng dịch vụ của chúng tôi, 
                bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây.
              </p>

              <h2>2. Dịch vụ xét nghiệm ADN</h2>
              <h3>2.1 Phạm vi dịch vụ</h3>
              <p>
                GenUnity cung cấp các dịch vụ xét nghiệm ADN bao gồm:
              </p>
              <ul>
                <li>Xét nghiệm ADN hành chính pháp lý (có giá trị pháp lý)</li>
                <li>Xét nghiệm ADN dân sự tự nguyện (không có giá trị pháp lý)</li>
                <li>Xét nghiệm quan hệ huyết thống (cha-con, mẹ-con, họ hàng)</li>
                <li>Tư vấn di truyền và giải thích kết quả</li>
              </ul>

              <h3>2.2 Độ chính xác</h3>
              <p>
                Chúng tôi cam kết cung cấp kết quả xét nghiệm với độ chính xác cao nhất có thể đạt được 
                bằng công nghệ hiện tại. Tuy nhiên, không có xét nghiệm nào đạt độ chính xác 100%.
              </p>

              <h2>3. Quy trình lấy mẫu và xét nghiệm</h2>
              <h3>3.1 Lấy mẫu</h3>
              <p>
                Việc lấy mẫu phải được thực hiện theo đúng quy trình và hướng dẫn của GenUnity. 
                Đối với xét nghiệm có giá trị pháp lý, việc lấy mẫu phải được thực hiện tại trung tâm 
                với sự chứng kiến của nhân viên.
              </p>

              <h3>3.2 Bảo quản mẫu</h3>
              <p>
                Mẫu xét nghiệm sẽ được bảo quản trong điều kiện phù hợp và được tiêu hủy sau khi 
                hoàn thành xét nghiệm, trừ khi có yêu cầu khác từ khách hàng hoặc cơ quan có thẩm quyền.
              </p>

              <h2>4. Bảo mật thông tin</h2>
              <h3>4.1 Cam kết bảo mật</h3>
              <p>
                GenUnity cam kết bảo vệ tuyệt đối thông tin cá nhân và kết quả xét nghiệm của khách hàng. 
                Thông tin chỉ được tiết lộ cho:
              </p>
              <ul>
                <li>Người yêu cầu xét nghiệm hoặc người được ủy quyền hợp pháp</li>
                <li>Cơ quan có thẩm quyền theo quy định của pháp luật</li>
                <li>Các trường hợp khẩn cấp liên quan đến sức khỏe</li>
              </ul>

              <h3>4.2 Lưu trữ dữ liệu</h3>
              <p>
                Dữ liệu và kết quả xét nghiệm được lưu trữ an toàn trong hệ thống bảo mật cao. 
                Thời gian lưu trữ tuân thủ theo quy định của pháp luật Việt Nam.
              </p>

              <h2>5. Trách nhiệm của khách hàng</h2>
              <h3>5.1 Cung cấp thông tin chính xác</h3>
              <p>
                Khách hàng có trách nhiệm cung cấp thông tin chính xác, đầy đủ và trung thực. 
                Việc cung cấp thông tin sai lệch có thể ảnh hưởng đến kết quả xét nghiệm.
              </p>

              <h3>5.2 Tuân thủ quy trình</h3>
              <p>
                Khách hàng phải tuân thủ đúng quy trình lấy mẫu và các hướng dẫn của GenUnity 
                để đảm bảo chất lượng mẫu và độ chính xác của kết quả.
              </p>

              <h2>6. Chi phí và thanh toán</h2>
              <h3>6.1 Bảng giá</h3>
              <p>
                Chi phí xét nghiệm được niêm yết công khai và có thể thay đổi theo thời gian. 
                Khách hàng sẽ được thông báo về mức phí cụ thể trước khi thực hiện xét nghiệm.
              </p>

              <h3>6.2 Phương thức thanh toán</h3>
              <p>
                GenUnity chấp nhận thanh toán bằng tiền mặt, chuyển khoản ngân hàng, hoặc các 
                phương thức thanh toán điện tử được chấp nhận.
              </p>

              <h2>7. Giới hạn trách nhiệm</h2>
              <h3>7.1 Trách nhiệm của GenUnity</h3>
              <p>
                GenUnity chỉ chịu trách nhiệm trong phạm vi cung cấp dịch vụ xét nghiệm ADN. 
                Chúng tôi không chịu trách nhiệm về các quyết định hoặc hành động của khách hàng 
                dựa trên kết quả xét nghiệm.
              </p>

              <h3>7.2 Giới hạn bồi thường</h3>
              <p>
                Trong mọi trường hợp, trách nhiệm bồi thường của GenUnity không vượt quá 
                tổng số tiền khách hàng đã thanh toán cho dịch vụ xét nghiệm.
              </p>

              <h2>8. Quyền sở hữu trí tuệ</h2>
              <p>
                Tất cả quyền sở hữu trí tuệ liên quan đến phương pháp xét nghiệm, công nghệ, 
                và hệ thống của GenUnity đều thuộc về chúng tôi và được bảo vệ bởi pháp luật.
              </p>

              <h2>9. Thay đổi điều khoản</h2>
              <p>
                GenUnity có quyền thay đổi các điều khoản này bất cứ lúc nào. Các thay đổi 
                sẽ có hiệu lực ngay khi được đăng tải trên website chính thức của chúng tôi.
              </p>

              <h2>10. Luật áp dụng</h2>
              <p>
                Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp 
                phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
              </p>

              <h2>11. Thông tin liên hệ</h2>
              <p>
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:
              </p>
              <ul>
                <li><strong>Địa chỉ:</strong> 123 DNA Street, Genome City, GC 12345</li>
                <li><strong>Điện thoại:</strong> +1 (800) 123-4567</li>
                <li><strong>Email:</strong> info@genunity.com</li>
              </ul>

              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage