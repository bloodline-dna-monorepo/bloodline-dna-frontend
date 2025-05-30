"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Calendar, Clock, MapPin, User, Phone, Upload, X } from 'lucide-react'

interface PersonInfo {
  fullName: string
  birthDate: string
  gender: string
  relationship: string
  sampleType: string
}

const AppointmentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const serviceType = queryParams.get("type") as "legal" | "civil" || "legal"

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    collectionMethod: serviceType === "legal" ? "center" : "home",
    selectedService: "",
    notes: "",
    requesterName: "",
    requesterBirthDate: "",
    requesterGender: "",
    requesterIdNumber: "",
    requesterPhone: "",
    agreeToTerms: false,
  })

  const [people, setPeople] = useState<PersonInfo[]>([
    { fullName: "", birthDate: "", gender: "", relationship: "", sampleType: "" }
  ])

  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = {
    legal: [
      "Xét nghiệm ADN Cha – Con",
      "Xét nghiệm ADN Mẹ – Con", 
      "Xét nghiệm ADN Họ hàng dòng cha",
      "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)"
    ],
    civil: [
      "Xét nghiệm ADN Cha – Con",
      "Xét nghiệm ADN Mẹ – Con",
      "Xét nghiệm ADN Họ hàng dòng cha", 
      "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)"
    ]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handlePersonChange = (index: number, field: keyof PersonInfo, value: string) => {
    const updatedPeople = [...people]
    updatedPeople[index] = { ...updatedPeople[index], [field]: value }
    setPeople(updatedPeople)
  }

  const addPerson = () => {
    setPeople([...people, { fullName: "", birthDate: "", gender: "", relationship: "", sampleType: "" }])
  }

  const removePerson = (index: number) => {
    if (people.length > 1) {
      setPeople(people.filter((_, i) => i !== index))
    }
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSignatureFile(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.appointmentDate) newErrors.appointmentDate = "Vui lòng chọn ngày hẹn"
    if (!formData.appointmentTime) newErrors.appointmentTime = "Vui lòng chọn giờ hẹn"
    if (!formData.selectedService) newErrors.selectedService = "Vui lòng chọn dịch vụ"
    if (!formData.requesterName) newErrors.requesterName = "Vui lòng nhập họ tên"
    if (!formData.requesterBirthDate) newErrors.requesterBirthDate = "Vui lòng nhập ngày sinh"
    if (!formData.requesterGender) newErrors.requesterGender = "Vui lòng chọn giới tính"
    if (!formData.requesterIdNumber) newErrors.requesterIdNumber = "Vui lòng nhập CMND/CCCD/Passport"
    if (!formData.requesterPhone) newErrors.requesterPhone = "Vui lòng nhập số điện thoại"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Vui lòng đồng ý với các điều khoản"
    if (!signatureFile) newErrors.signature = "Vui lòng tải lên chữ ký/ngón tay"

    // Validate people
    people.forEach((person, index) => {
      if (!person.fullName) newErrors[`person_${index}_name`] = "Vui lòng nhập họ tên"
      if (!person.birthDate) newErrors[`person_${index}_birth`] = "Vui lòng nhập năm sinh"
      if (!person.gender) newErrors[`person_${index}_gender`] = "Vui lòng chọn giới tính"
      if (!person.relationship) newErrors[`person_${index}_relationship`] = "Vui lòng nhập mối quan hệ"
      if (!person.sampleType) newErrors[`person_${index}_sample`] = "Vui lòng chọn loại mẫu"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Process form submission
      console.log("Form submitted:", { formData, people, signatureFile })
      alert("Đăng ký lịch hẹn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.")
      navigate("/")
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              <h2 className="text-2xl font-bold">
                Đăng ký lịch hẹn - {serviceType === "legal" ? "Hành chính pháp lý" : "Dân sự tự nguyện"}
              </h2>
              <p className="opacity-90">Vui lòng điền đầy đủ thông tin để đăng ký lịch hẹn</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Ngày hẹn *
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Giờ hẹn *
                  </label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  {errors.appointmentTime && <p className="text-red-500 text-sm mt-1">{errors.appointmentTime}</p>}
                </div>
              </div>

              {/* Collection Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Hình thức lấy mẫu *
                </label>
                <div className="space-y-2">
                  {serviceType === "legal" ? (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="center"
                        name="collectionMethod"
                        value="center"
                        checked={formData.collectionMethod === "center"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="center">Tại trung tâm (bắt buộc)</label>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="home"
                          name="collectionMethod"
                          value="home"
                          checked={formData.collectionMethod === "home"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="home">Tại nhà</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="center"
                          name="collectionMethod"
                          value="center"
                          checked={formData.collectionMethod === "center"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="center">Tại trung tâm</label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn dịch vụ *
                </label>
                <select
                  name="selectedService"
                  value={formData.selectedService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="">Chọn dịch vụ</option>
                  {services[serviceType].map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
                {errors.selectedService && <p className="text-red-500 text-sm mt-1">{errors.selectedService}</p>}
              </div>

              {/* Requester Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin người yêu cầu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Họ tên *
                    </label>
                    <input
                      type="text"
                      name="requesterName"
                      value={formData.requesterName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.requesterName && <p className="text-red-500 text-sm mt-1">{errors.requesterName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày tháng năm sinh *
                    </label>
                    <input
                      type="date"
                      name="requesterBirthDate"
                      value={formData.requesterBirthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.requesterBirthDate && <p className="text-red-500 text-sm mt-1">{errors.requesterBirthDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới tính *
                    </label>
                    <select
                      name="requesterGender"
                      value={formData.requesterGender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                    {errors.requesterGender && <p className="text-red-500 text-sm mt-1">{errors.requesterGender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CMND/CCCD/Passport *
                    </label>
                    <input
                      type="text"
                      name="requesterIdNumber"
                      value={formData.requesterIdNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.requesterIdNumber && <p className="text-red-500 text-sm mt-1">{errors.requesterIdNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="requesterPhone"
                      value={formData.requesterPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.requesterPhone && <p className="text-red-500 text-sm mt-1">{errors.requesterPhone}</p>}
                  </div>
                </div>
              </div>

              {/* People to Test */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Thông tin người cần xét nghiệm</h3>
                  <button
                    type="button"
                    onClick={addPerson}
                    className="btn btn-outline text-sm"
                  >
                    Thêm người
                  </button>
                </div>

                {people.map((person, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4 relative">
                    {people.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePerson(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    )}
                    
                    <h4 className="font-medium mb-3">Người thứ {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Họ tên *
                        </label>
                        <input
                          type="text"
                          value={person.fullName}
                          onChange={(e) => handlePersonChange(index, "fullName", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                        {errors[`person_${index}_name`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`person_${index}_name`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Năm sinh *
                        </label>
                        <input
                          type="number"
                          min="1900"
                          max="2024"
                          value={person.birthDate}
                          onChange={(e) => handlePersonChange(index, "birthDate", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                        {errors[`person_${index}_birth`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`person_${index}_birth`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Giới tính *
                        </label>
                        <select
                          value={person.gender}
                          onChange={(e) => handlePersonChange(index, "gender", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                          <option value="">Chọn</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                        </select>
                        {errors[`person_${index}_gender`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`person_${index}_gender`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mối quan hệ *
                        </label>
                        <input
                          type="text"
                          value={person.relationship}
                          onChange={(e) => handlePersonChange(index, "relationship", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          placeholder="VD: Con, Cha, Mẹ..."
                        />
                        {errors[`person_${index}_relationship`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`person_${index}_relationship`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loại mẫu *
                        </label>
                        <select
                          value={person.sampleType}
                          onChange={(e) => handlePersonChange(index, "sampleType", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                          <option value="">Chọn loại mẫu</option>
                          <option value="saliva">Nước bọt</option>
                          <option value="blood">Máu</option>
                          <option value="hair">Tóc</option>
                          <option value="nail">Móng tay</option>
                        </select>
                        {errors[`person_${index}_sample`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`person_${index}_sample`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Signature Upload */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-1" />
                  Chữ ký/Ngón tay của người yêu cầu phân tích *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                {signatureFile && (
                  <p className="text-green-600 text-sm mt-1">Đã tải lên: {signatureFile.name}</p>
                )}
                {errors.signature && <p className="text-red-500 text-sm mt-1">{errors.signature}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Ghi chú thêm (nếu có)"
                />
              </div>

              {/* Terms Agreement */}
              <div className="border-t pt-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Cam kết:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Tôi xin cam kết rằng các thông tin trên là chính xác và tôi đồng ý với{" "}
                    <a href="/terms" target="_blank" className="text-[var(--primary)] hover:underline">
                      các điều khoản của trung tâm GenUnity
                    </a>.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    Tôi đồng ý với các điều khoản và cam kết nêu trên *
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Gửi đăng ký lịch hẹn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage