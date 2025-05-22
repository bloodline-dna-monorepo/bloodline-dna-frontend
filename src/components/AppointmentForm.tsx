"use client"

import type React from "react"

import { useState } from "react"

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    testType: "",
    location: "home",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          phone: "",
          testType: "",
          location: "home",
        })
      }, 3000)
    }, 1500)
  }

  const testTypes = [
    { value: "paternity", label: "Paternity Testing" },
    { value: "relationship", label: "Relationship Testing" },
    { value: "ancestry", label: "Ancestry DNA Testing" },
    { value: "health", label: "Genetic Health Screening" },
    { value: "legal", label: "Legal DNA Testing" },
    { value: "prenatal", label: "Prenatal DNA Testing" },
  ]

  return (
    <section id="appointment" className="section bg-[var(--background-alt)]">
      <div className="container">
        <h2 className="section-title">Schedule Your Test</h2>
        <p className="section-subtitle">
          Fill out the form below to request an appointment for your DNA test. Our team will contact you shortly to
          confirm.
        </p>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
            <h3 className="text-xl font-semibold">Request an Appointment</h3>
            <p className="opacity-90">We'll get back to you within 24 hours</p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
              <p className="text-gray-600">
                Your appointment request has been received. We'll contact you shortly to confirm the details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="testType" className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type
                </label>
                <select
                  id="testType"
                  name="testType"
                  value={formData.testType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="" disabled>
                    Select a test type
                  </option>
                  {testTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Sample Collection Location
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="location"
                      value="home"
                      checked={formData.location === "home"}
                      onChange={handleChange}
                      className="mr-2 text-[var(--primary)]"
                    />
                    <span>At Home</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="location"
                      value="lab"
                      checked={formData.location === "lab"}
                      onChange={handleChange}
                      className="mr-2 text-[var(--primary)]"
                    />
                    <span>At Lab Facility</span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default AppointmentForm
