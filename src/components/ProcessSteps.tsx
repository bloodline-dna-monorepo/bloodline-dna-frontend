"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const ProcessSteps = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Register",
      description:
        "Fill out our simple registration form to begin the process. Choose your preferred testing service and collection method.",
      image: "/step1-register.jpg",
    },
    {
      title: "Sample Collection",
      description:
        "Provide your DNA sample either at home with our easy-to-use collection kit or visit one of our partner facilities.",
      image: "/step2-collection.jpg",
    },
    {
      title: "Laboratory Analysis",
      description:
        "Our accredited laboratory processes your sample using state-of-the-art technology for accurate results.",
      image: "/step3-analysis.jpg",
    },
    {
      title: "Receive Results",
      description:
        "Access your secure online portal to view and download your confidential results, typically available within 3-5 business days.",
      image: "/step4-results.jpg",
    },
  ]

  return (
    <section id="process" className="section">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Our DNA testing process is simple, secure, and designed with your convenience in mind.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-[var(--background-alt)] p-6 rounded-lg">
              <div className="flex mb-8">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-3 text-center relative ${
                      activeStep === index ? "text-[var(--primary)] font-medium" : "text-gray-500"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          activeStep === index ? "bg-[var(--primary)] text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="hidden sm:block text-sm">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${
                          activeStep > index ? "bg-[var(--primary)]" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-bold mb-4">
                  Step {activeStep + 1}: {steps[activeStep].title}
                </h3>
                <p className="text-[var(--text-light)] mb-6">{steps[activeStep].description}</p>
                <Link to="/guide" className="btn btn-outline">
                  View Detailed Guide
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--secondary)] opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full"></div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={steps[activeStep].image || "/placeholder.svg"}
                alt={`Step ${activeStep + 1}: ${steps[activeStep].title}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSteps
