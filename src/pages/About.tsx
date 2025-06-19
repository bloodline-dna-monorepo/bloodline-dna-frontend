import type React from "react"

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Emily Chen",
      title: "Lead Geneticist",
      description: "Specializes in genetic sequencing and analysis",
      image: "/src/assets/about/m1.png",
    },
    {
      name: "Michael Davis",
      title: "Laboratory Manager",
      description: "Oversees laboratory operations and quality control",
      image: "/src/assets/about/m2.png",
    },
    {
      name: "Sarah Lee",
      title: "Customer Relations Lead",
      description: "Ensuring a seamless and supportive customer experience",
      image: "/src/assets/about/m3.png",
    },
    {
      name: "Dr. Alex Kim",
      title: "Medical Advisor",
      description: "Providing clinical expertise and medical guidance",
      image: "/src/assets/about/m4.png",
    },
  ]

  const coreValues = [
    {
      icon: "🔬",
      title: "Integrity & Accuracy",
      description:
        "We uphold the highest standards of scientific rigor and ethical practices, ensuring every result is precise and trustworthy.",
    },
    {
      icon: "💝",
      title: "Compassionate Care",
      description:
        "We provide empathetic support and clear communication, guiding our clients through their genetic journey with compassion.",
    },
    {
      icon: "🔒",
      title: "Privacy & Security",
      description:
        "Protecting your personal genetic information is our paramount responsibility, secured with industry-leading protocols.",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "Continuously advancing our scientific advancements to offer cutting-edge and comprehensive genetic insights.",
    },
    {
      icon: "⭐",
      title: "Excellence",
      description: "Striving for the highest quality in every aspect of our service, from testing to customer support.",
    },
    {
      icon: "🤝",
      title: "Community",
      description:
        "Building a supportive community where individuals can connect and share their genetic heritage stories.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Gen Unity</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Pioneering DNA testing services with uncompromising accuracy, advanced technology, and compassionate care.
            Empowering individuals with personalized genetic insights.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission: Unlocking Genetic Potential</h2>
              <p className="text-gray-600 mb-6">
                At Gen Unity, we believe that genetic information is a way that's easy to understand and act upon. Our
                mission is to provide the highest quality DNA testing services with uncompromising accuracy, advanced
                technology, and compassionate care.
              </p>
              <p className="text-gray-600 mb-6">
                We're committed to advancing genetic science while making it accessible and meaningful for individuals
                and families. Through innovation and education, we empower people to make informed decisions about their
                health, ancestry, and relationships, fostering a healthier and more informed future.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/src/assets/about/our.png"
                alt="Our Mission"
                className="max-w-md w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Gen Unity?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Certified Accuracy</h3>
              <p className="text-gray-600">
                We take pride in our accredited, state-of-the-art laboratory that ensures the highest levels of accuracy
                and reliability in our results.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unwavering Privacy</h3>
              <p className="text-gray-600">
                Your genetic data is protected with state-of-the-art security measures and strict confidentiality
                protocols.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Access to genetic counselors and customer service representatives who are ready to answer your questions
                and provide support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Dedicated Team</h2>
            <p className="text-xl text-gray-600">
              Our team of leading scientists, geneticists, and customer care specialists are dedicated to providing you
              with the best possible experience and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-2">{member.title}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">State-of-the-Art Technology</h2>
              <p className="text-gray-600 mb-6">
                Gen Unity utilizes the most advanced DNA testing technologies available, ensuring the highest levels of
                accuracy and reliability in our results.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Next-Generation Sequencing</h4>
                    <p className="text-gray-600">
                      Our laboratory uses advanced NGS technology to analyze DNA with unprecedented accuracy and detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Sample Processing</h4>
                    <p className="text-gray-600">
                      Robotic systems handle samples to minimize human error and maximize consistency in results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-teal-600 text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Digital Results Platform</h4>
                    <p className="text-gray-600">
                      Our secure online portal ensures your results are accessible only to you, with bank-level
                      security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center">
                <span className="text-8xl">🔬</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners & Accreditations</h2>
            <p className="text-xl text-gray-600">
              We collaborate with leading institutions and maintain the highest certifications to ensure quality and
              reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <img src="/src/assets/about/fpt.png" alt="FPT University" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/tuvu.png" alt="Tu Vu University" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/havard.png" alt="Harvard University" className="h-16 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="/src/assets/about/yduoc.png" alt="Y Duoc University" className="h-16 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Unlock Your DNA Story?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have discovered life-changing insights about their health,
            ancestry, and family connections with Gen Unity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Learn More About Our Tests
            </button>
            <div className="flex items-center justify-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Free shipping nationwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>100% Privacy Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⏱️</span>
                <span>Results in 3-5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
