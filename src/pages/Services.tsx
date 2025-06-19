"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { serviceService } from "../services/serviceService"
import type { Service } from "../types/types"

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Administrative" | "Civil">("Administrative")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchServices()
  }, [activeTab])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await serviceService.getServicesByType(activeTab)
      setServices(data)
    } catch (error: any) {
      console.error("Error fetching services:", error)
      setError("Failed to load services")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  const getAdditionalSamplePrice = (basePrice: number) => {
    return Math.floor(basePrice * 0.5) // 50% of base price for additional samples
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Dịch vụ Giám định ADN</h1>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab("Administrative")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === "Administrative" ? "bg-white text-teal-600" : "bg-teal-500 text-white hover:bg-teal-400"
              }`}
            >
              Hành chính pháp lý
            </button>
            <button
              onClick={() => setActiveTab("Civil")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === "Civil" ? "bg-white text-teal-600" : "bg-teal-500 text-white hover:bg-teal-400"
              }`}
            >
              Dân sự tư nhân
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchServices}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Retry
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No services available for {activeTab} category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.serviceId}
                className="bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg p-8 text-white"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{service.serviceName}</h2>
                  <p className="text-white/90">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <h3 className="font-semibold mb-2">THỜI GIAN TRẢ KẾT QUẢ</h3>
                  </div>

                  <div className="md:col-span-1">
                    <h3 className="font-semibold mb-2">CHI PHÍ {service.sampleCount} MẪU</h3>
                  </div>

                  <div className="md:col-span-1">
                    <h3 className="font-semibold mb-2">CHI PHÍ MẪU THÊM</h3>
                  </div>

                  <div className="md:col-span-1">
                    <h3 className="font-semibold mb-2">ĐĂNG KÝ</h3>
                  </div>

                  {/* 48 hours option */}
                  <div className="text-lg font-medium">48 giờ</div>
                  <div className="text-xl font-bold">{formatPrice(service.price)}</div>
                  <div className="text-xl font-bold">{formatPrice(getAdditionalSamplePrice(service.price))}</div>
                  <div>
                    <Link
                      to={`/service-registration/${service.serviceId}?duration=48`}
                      className="inline-block px-6 py-2 rounded-full font-medium transition-colors bg-white/20 text-white hover:bg-white/30 active:bg-white/40"
                    >
                      Đăng ký
                    </Link>
                  </div>

                  {/* 24 hours option (popular) */}
                  <div className="text-lg font-medium">24 giờ</div>
                  <div className="text-xl font-bold">{formatPrice(Math.floor(service.price * 1.2))}</div>
                  <div className="text-xl font-bold">
                    {formatPrice(getAdditionalSamplePrice(Math.floor(service.price * 1.2)))}
                  </div>
                  <div>
                    <Link
                      to={`/service-registration/${service.serviceId}?duration=24`}
                      className="inline-block px-6 py-2 rounded-full font-medium transition-colors bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:bg-yellow-500"
                    >
                      Đăng ký
                    </Link>
                  </div>

                  {/* 4 hours option */}
                  <div className="text-lg font-medium">4 giờ</div>
                  <div className="text-xl font-bold">{formatPrice(Math.floor(service.price * 1.6))}</div>
                  <div className="text-xl font-bold">
                    {formatPrice(getAdditionalSamplePrice(Math.floor(service.price * 1.6)))}
                  </div>
                  <div>
                    <Link
                      to={`/service-registration/${service.serviceId}?duration=4`}
                      className="inline-block px-6 py-2 rounded-full font-medium transition-colors bg-white/20 text-white hover:bg-white/30 active:bg-white/40"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
