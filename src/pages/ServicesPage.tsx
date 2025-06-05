"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

interface ServiceData {
  name: string;
  description: string;
  accuracy: string;
  pricing: {
    time: string;
    twoSamples: string;
    additionalSample: string;
  }[];
}

const legalServices: ServiceData[] = [
  {
    name: "Xét nghiệm ADN Cha – Con",
    description: "Phân tích từ 24–33 loci với độ chính xác cao.",
    accuracy: "độ chính xác cao",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Mẹ – Con",
    description: "Phân tích từ 24–33 loci với độ chính xác cao.",
    accuracy: "độ chính xác cao",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Họ hàng dòng cha",
    description: "Phân tích 23 loci trên nhiễm sắc thể Y và 12 loci trên NST X, độ chính xác cao.",
    accuracy: "độ chính xác cao",
    pricing: [
      { time: "48 giờ", twoSamples: "2.000.000 đ", additionalSample: "1.000.000 đ" },
      { time: "24 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "4 giờ", twoSamples: "3.500.000 đ", additionalSample: "1.750.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)",
    description: "Phân tích ADN ty thể, độ chính xác cao.",
    accuracy: "độ chính xác cao",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  }
];

const civilServices: ServiceData[] = [
  {
    name: "Xét nghiệm ADN Cha – Con",
    description: "Phân tích từ 24–33 loci với độ chính xác 99,999999%.",
    accuracy: "độ chính xác 99,999999%",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Mẹ – Con",
    description: "Phân tích từ 24–33 loci với độ chính xác 99,999999%.",
    accuracy: "độ chính xác 99,999999%",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Họ hàng dòng cha",
    description: "Phân tích 23 loci trên nhiễm sắc thể Y và 12 loci trên NST X, độ chính xác 99,9999%.",
    accuracy: "độ chính xác 99,9999%",
    pricing: [
      { time: "48 giờ", twoSamples: "2.000.000 đ", additionalSample: "1.000.000 đ" },
      { time: "24 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "4 giờ", twoSamples: "3.500.000 đ", additionalSample: "1.750.000 đ" }
    ]
  },
  {
    name: "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)",
    description: "Phân tích ADN ty thể, độ chính xác 99,9999%.",
    accuracy: "độ chính xác 99,9999%",
    pricing: [
      { time: "48 giờ", twoSamples: "2.500.000 đ", additionalSample: "1.250.000 đ" },
      { time: "24 giờ", twoSamples: "3.000.000 đ", additionalSample: "1.500.000 đ" },
      { time: "4 giờ", twoSamples: "4.000.000 đ", additionalSample: "2.000.000 đ" }
    ]
  }
];

const ServiceTable = ({ services }: { services: ServiceData[] }) => (
  <div className="space-y-8">
    {services.map((service, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-4">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <p className="opacity-90">{service.description}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian trả kết quả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi phí 2 mẫu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi phí mẫu thứ 3
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {service.pricing.map((price, priceIndex) => (
                <tr key={priceIndex}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {price.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {price.twoSamples}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {price.additionalSample}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
);

const RegistrationForm = ({
  serviceType,
  onBack
}: {
  serviceType: "legal" | "civil";
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    sampleLocation: serviceType === "legal" ? "center" : "home",
    selectedService: "",
    notes: "",
    fullName: "",
    birthDate: "",
    gender: "",
    idNumber: "",
    phoneNumber: "",
    agreeToTerms: false,
    requesterSignature: null as File | null
  });

  const [testSubjects, setTestSubjects] = useState([
    {
      fullName: "",
      birthYear: "",
      gender: "",
      relationship: "",
      sampleType: "",
      signature: null as File | null
    }
  ]);

  const services =
    serviceType === "legal"
      ? [
        "Xét nghiệm ADN Cha – Con",
        "Xét nghiệm ADN Mẹ – Con",
        "Xét nghiệm ADN Họ hàng dòng cha",
        "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)"
      ]
      : [
        "Xét nghiệm ADN Cha – Con",
        "Xét nghiệm ADN Mẹ – Con",
        "Xét nghiệm ADN Họ hàng dòng cha",
        "Xét nghiệm ADN Họ hàng dòng mẹ (ADN ty thể)"
      ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setTestSubjects((prev) =>
      prev.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
  };

  const addTestSubject = () => {
    setTestSubjects((prev) => [
      ...prev,
      {
        fullName: "",
        birthYear: "",
        gender: "",
        relationship: "",
        sampleType: "",
        signature: null
      }
    ]);
  };

  const removeTestSubject = (index: number) => {
    if (testSubjects.length > 1) {
      setTestSubjects((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = (
    field: string,
    file: File | null,
    subjectIndex?: number
  ) => {
    if (subjectIndex !== undefined) {
      handleSubjectChange(subjectIndex, field, file);
    } else {
      handleInputChange(field, file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert("Vui lòng đồng ý với các điều khoản và cam kết");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "appointmentDate",
      "appointmentTime",
      "selectedService",
      "fullName",
      "birthDate",
      "gender",
      "idNumber",
      "phoneNumber"
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Validate test subjects
    for (let i = 0; i < testSubjects.length; i++) {
      const subject = testSubjects[i];
      if (
        !subject.fullName ||
        !subject.birthYear ||
        !subject.gender ||
        !subject.relationship ||
        !subject.sampleType
      ) {
        alert(`Vui lòng điền đầy đủ thông tin cho người xét nghiệm ${i + 1}`);
        return;
      }
    }

    // Submit form
    console.log("Form submitted:", { formData, testSubjects });
    alert("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    onBack();
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
              <button
                onClick={onBack}
                className="text-white opacity-80 hover:opacity-100 mb-4"
                type="button"
              >
                ← Quay lại
              </button>
              <h2 className="text-2xl font-bold">
                Đăng ký lịch xét nghiệm -{" "}
                {serviceType === "legal"
                  ? "Hành chính pháp lý"
                  : "Dân sự tự nguyện"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày đăng ký <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      handleInputChange("appointmentDate", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ đăng ký <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      handleInputChange("appointmentTime", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                  />
                </div>
              </div>

              {/* Sample Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hình thức lấy mẫu <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  {serviceType === "civil" && (
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sampleLocation"
                        value="home"
                        checked={formData.sampleLocation === "home"}
                        onChange={(e) =>
                          handleInputChange("sampleLocation", e.target.value)
                        }
                        className="mr-2 text-[var(--primary)]"
                      />
                      <span>Tại nhà</span>
                    </label>
                  )}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sampleLocation"
                      value="center"
                      checked={formData.sampleLocation === "center"}
                      onChange={(e) =>
                        handleInputChange("sampleLocation", e.target.value)
                      }
                      className="mr-2 text-[var(--primary)]"
                    />
                    <span>Tại trung tâm</span>
                  </label>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn dịch vụ <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.selectedService}
                  onChange={(e) =>
                    handleInputChange("selectedService", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  required
                >
                  <option value="">Chọn dịch vụ</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Thông tin người yêu cầu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày tháng năm sinh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới tính <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      required
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CMND/CCCD/Passport <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) =>
                        handleInputChange("idNumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      required
                    />
                  </div>
                </div>
                {/* Requester Signature Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chữ ký/Vân tay người yêu cầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(
                        "requesterSignature",
                        e.target.files?.[0] || null
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                  />
                </div>
              </div>

              {/* Test Subjects */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Thông tin người xét nghiệm
                  </h3>
                  <button
                    type="button"
                    onClick={addTestSubject}
                    className="btn btn-outline text-sm"
                  >
                    Thêm người
                  </button>
                </div>
                {testSubjects.map((subject, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 mb-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">
                        Người xét nghiệm {index + 1}
                      </h4>
                      {testSubjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestSubject(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Họ tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={subject.fullName}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "fullName",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Năm sinh <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={subject.birthYear}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "birthYear",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Giới tính <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={subject.gender}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "gender",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          required
                        >
                          <option value="">Chọn</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mối quan hệ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={subject.relationship}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          placeholder="VD: Con, Cha, Mẹ..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loại mẫu <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={subject.sampleType}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "sampleType",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          required
                        >
                          <option value="">Chọn loại mẫu</option>
                          <option value="Tóc">Tóc</option>
                          <option value="Móng">Móng</option>
                          <option value="Nước bọt">Nước bọt</option>
                          <option value="Máu">Máu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chữ ký/Vân tay (nếu có)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(
                              "signature",
                              e.target.files?.[0] || null,
                              index
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú (nếu có)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    handleInputChange("notes", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Nhập ghi chú nếu có..."
                />
              </div>

              {/* Commitment */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Tôi xin cam kết:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 mb-4">
                  <li>
                    Tôi tự nguyện đề nghị xét nghiệm ADN và chấp nhận chi phí
                    xét nghiệm.
                  </li>
                  <li>
                    Những thông tin tôi đã khai trên đây là đúng sự thật và không
                    thay đổi.
                  </li>
                  <li>
                    Tôi không đề nghị nhà, người quen đến phiên nhiều, làm mất
                    trật tự.
                  </li>
                  <li>
                    Những trường hợp sinh đôi, người ghép tủy, nhận mẫu, nếu
                    không khai báo trung thực sẽ bị phạt gấp 2 lần lệ phí đã
                    nộp.
                  </li>
                  <li>
                    Tôi đã đọc và chấp nhận các{" "}
                    <Link
                      to="/terms"
                      className="text-[var(--primary)] hover:underline"
                    >
                      điều khoản của trung tâm GenUnity
                    </Link>{" "}
                    và tôi đồng ý để Viện thực hiện các phân tích với các mẫu
                    trên. Nếu vi phạm, tôi xin chịu hoàn toàn trách nhiệm trước
                    pháp luật.
                  </li>
                </ol>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      handleInputChange("agreeToTerms", e.target.checked)
                    }
                    className="mt-1 mr-3 text-[var(--primary)]"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    <span className="text-red-500">*</span> Tôi đồng ý với các
                    điều khoản và cam kết nêu trên
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button type="submit" className="w-full btn btn-primary">
                  Gửi đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState<"legal" | "civil">("legal");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<"legal" | "civil">("legal");

  const handleRegisterClick = (type: "legal" | "civil") => {
    setSelectedServiceType(type);
    setShowRegistrationForm(true);
  };

  if (showRegistrationForm) {
    return (
      <RegistrationForm
        serviceType={selectedServiceType}
        onBack={() => setShowRegistrationForm(false)}
      />
    );
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dịch Vụ ADN</h1>
            <p className="text-xl opacity-90">
              Dịch vụ xét nghiệm ADN chuyên nghiệp với độ chính xác cao và bảo mật tuyệt đối
            </p>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-16">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                className={`px-8 py-3 rounded-md font-semibold transition-all ${activeTab === "legal"
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
                onClick={() => setActiveTab("legal")}
              >
                Hành chính pháp lý
              </button>
              <button
                className={`px-8 py-3 rounded-md font-semibold transition-all ${activeTab === "civil"
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
                onClick={() => setActiveTab("civil")}
              >
                Dân sự tự nguyện
              </button>
            </div>
          </div>

          {/* Service Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "legal" && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Dịch vụ hành chính pháp lý
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Đây là các xét nghiệm có giá trị pháp lý, thường được sử dụng trong các thủ tục hành chính như làm giấy khai sinh,
                    nhập tịch, thừa kế, cấp visa, hoặc tranh chấp tại tòa án.
                  </p>
                </div>
                <ServiceTable services={legalServices} />
                <div className="text-center mt-8">
                  <button
                    onClick={() => handleRegisterClick("legal")}
                    className="btn btn-primary"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            )}

            {activeTab === "civil" && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Dịch vụ dân sự tự nguyện
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Dịch vụ này không có giá trị pháp lý, thường được sử dụng để giải tỏa nghi ngờ cá nhân về mối quan hệ huyết thống.
                  </p>
                </div>
                <ServiceTable services={civilServices} />
                <div className="text-center mt-8">
                  <button
                    onClick={() => handleRegisterClick("civil")}
                    className="btn btn-primary"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;