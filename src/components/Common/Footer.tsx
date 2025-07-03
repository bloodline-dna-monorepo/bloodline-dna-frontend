"use client"

import type React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧬</span>
              <span className="text-xl font-bold">BloodLine DNA</span>
            </div>
            <p className="text-gray-300 mb-4">
              Dịch vụ xét nghiệm DNA hàng đầu cung cấp phân tích di truyền chính xác và đáng tin cậy cho mục đích hành chính và dân sự.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Dịch vụ của chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/guide-faq" className="text-gray-300 hover:text-white transition-colors">
                  Hướng dẫn & Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📍 123 Đường Khoa học, Thành phố Công nghệ</li>
              <li>📞 +84 123 456 789</li>
              <li>✉️ info@bloodlinedna.com</li>
              <li>🕒 Thứ 2 - Thứ 6: 8h sáng - 6h tối</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 BloodLine DNA. Đã đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
