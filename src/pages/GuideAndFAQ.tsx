"use client"

import type React from "react"
import { useState } from "react"

const GuideAndFAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "How accurate are your DNA tests?",
      answer:
        "Our DNA tests are 99.9% accurate for paternity testing and 99.99% accurate for exclusion cases. We use state-of-the-art technology and analyze multiple genetic markers to ensure the highest level of accuracy.",
    },
    {
      question: "How long does it take to get results?",
      answer:
        "Standard results are available within 3-5 business days from when we receive your samples. We also offer expedited services with results in 24 hours or 4 hours for urgent cases.",
    },
    {
      question: "Is my genetic information kept private?",
      answer:
        "Yes, we maintain the highest standards of privacy and confidentiality. Your genetic information is securely stored and never shared with third parties without your explicit consent.",
    },
    {
      question: "Can I use my DNA test results in court?",
      answer:
        "Yes, our legal DNA tests are admissible in court. For legal purposes, we follow strict chain of custody procedures and provide official documentation that meets legal requirements.",
    },
    {
      question: "What's the difference between at-home collection and lab collection?",
      answer:
        "At-home collection allows you to collect samples in the comfort of your home using our kit, while lab collection requires visiting our facility. Both methods are equally accurate, but lab collection is required for legal cases.",
    },
    {
      question: "How do I collect my DNA sample?",
      answer:
        "We provide easy-to-use cheek swab kits. Simply rub the swab inside your cheek for 30 seconds, let it dry, and mail it back to our laboratory using the prepaid envelope provided.",
    },
    {
      question: "Can I test without the other person knowing?",
      answer:
        "For peace of mind testing, yes. However, for legal testing, all participants must be present with valid identification and consent to the testing process.",
    },
    {
      question: "What happens to my sample after testing?",
      answer:
        "After testing is complete, samples are securely destroyed according to our privacy policy unless you specifically request that we retain them for future testing.",
    },
    {
      question: "Do you offer testing for health conditions?",
      answer:
        "Currently, we specialize in relationship testing (paternity, maternity, sibling tests). We do not offer genetic health screening or predisposition testing.",
    },
    {
      question: "Can I use insurance to pay for DNA testing?",
      answer:
        "DNA testing for relationship determination is typically not covered by insurance as it's considered elective. However, you can check with your insurance provider for specific coverage details.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Testing Guide & FAQ</h1>
          <p className="text-xl text-white/90">
            Everything you need to know about our DNA testing process, from collection to results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Testing Process Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Testing Process</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* At-Home Collection Process */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">At-Home Collection Process</h3>
              <p className="text-gray-600 mb-6">
                Our at-home DNA collection process is designed to be simple, convenient, and private. Follow these steps
                to ensure accurate results.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Order Your Kit</h4>
                    <p className="text-gray-600">
                      Select your preferred test and complete your order. Your collection kit will be shipped to you in
                      discreet packaging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Register Your Kit</h4>
                    <p className="text-gray-600">
                      Each kit has a unique identification number. Register this number on our secure portal to link
                      your kit to your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Collect Your Sample</h4>
                    <p className="text-gray-600">
                      Follow the detailed instructions to collect your cheek swab sample. Remember not to eat, drink,
                      smoke, or chew gum for 30 minutes before collection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mail Your Sample</h4>
                    <p className="text-gray-600">
                      Place your sample in the prepaid return envelope and mail it back to our laboratory. No additional
                      postage is required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Receive Your Results</h4>
                    <p className="text-gray-600">
                      Once your sample arrives at our lab, testing typically takes 3-5 business days. You'll receive an
                      email notification when your results are ready to view in your secure online account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video placeholder */}
              <div className="mt-8 bg-gray-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Guide: How to Collect Your DNA Sample</h4>
                <p className="text-gray-600">Watch our step-by-step video guide for proper sample collection.</p>
              </div>
            </div>

            {/* Lab Facility Collection Process */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Lab Facility Collection Process</h3>
              <p className="text-gray-600 mb-6">
                For legal DNA testing or those who prefer professional collection, our partner facilities provide a
                convenient and efficient process.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Schedule an Appointment</h4>
                    <p className="text-gray-600">
                      Book an appointment at one of our partner facilities at a time that's convenient for you. Same-day
                      appointments are often available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Arrive for Your Appointment</h4>
                    <p className="text-gray-600">
                      Bring a valid photo ID. For legal testing, all participants must be present with identification.
                      For testing minors, bring their birth certificate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Sample Collection</h4>
                    <p className="text-gray-600">
                      A trained professional will collect your DNA sample using a simple and painless cheek swab. The
                      entire process takes just a few minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sample Processing</h4>
                    <p className="text-gray-600">
                      Your sample is securely packaged and sent to our laboratory with proper chain of custody
                      documentation for legal testing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Receive Your Results</h4>
                    <p className="text-gray-600">
                      Results are typically available within 3-5 business days. For legal testing, official
                      documentation will be provided.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab facility image placeholder */}
              <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lab Facility</h4>
                <p className="text-gray-600">Professional collection in a comfortable, private environment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform ${openFAQ === index ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see your question answered here? Contact our support team for assistance.
            </p>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideAndFAQ
