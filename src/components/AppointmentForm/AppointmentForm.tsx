// Update the appointment form to check for authentication
"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorHandler } from "../../hooks/useErrorHandler"
import ErrorAlert from "../ErrorAlert"
import { apiService } from "../../services/apiService"
import InputField from "./InputField"
import SelectField from "./SelectField"
import RadioGroup from "./RadioGroup"
import SubmitButton from "./SubmitButton"
import ThankYouMessage from "./ThankYouMessage"

const testTypes = [
  { value: "paternity", label: "Paternity Testing" },
  { value: "relationship", label: "Relationship Testing" },
  { value: "ancestry", label: "Ancestry DNA Testing" },
  { value: "health", label: "Genetic Health Screening" },
  { value: "legal", label: "Legal DNA Testing" },
  { value: "prenatal", label: "Prenatal DNA Testing" },
]

const locationOptions = [
  { value: "home", label: "At Home" },
  { value: "lab", label: "At Lab Facility" },
]

const AppointmentForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    testType: "",
    location: "home",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const { hasError, error, isLoading, executeAsync, clearError } = useErrorHandler()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (hasError) {
      clearError()
    }
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.name.trim()) {
      errors.push("Name is required")
    }

    if (!formData.phone.trim()) {
      errors.push("Phone number is required")
    }

    if (!formData.testType) {
      errors.push("Please select a test type")
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      return
    }

    // Check if user is authenticated
    const isAuthenticated = false // This would be replaced with actual auth check

    if (!isAuthenticated) {
      // Redirect to login page with return URL
      navigate("/auth?redirect=appointment")
      return
    }

    const result = await executeAsync(() => apiService.post("/appointments", formData), "AppointmentForm")

    if (result) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          phone: "",
          testType: "",
          location: "home",
        })
      }, 3000)
    }
  }

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

          {hasError && error && (
            <div className="p-6 pb-0">
              <ErrorAlert error={error} onClose={clearError} />
            </div>
          )}

          {isSubmitted ? (
            <ThankYouMessage />
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <InputField
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              <SelectField
                label="Test Type"
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleChange}
                options={testTypes}
              />
              <RadioGroup
                label="Preferred Sample Collection Location"
                name="location"
                options={locationOptions}
                selectedValue={formData.location}
                onChange={handleChange}
              />
              <div className="pt-2">
                <SubmitButton isLoading={isLoading} />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default AppointmentForm
