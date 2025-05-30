import { Beaker, Award, Users, Building, Heart, Shield } from "lucide-react"

const AboutPage = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Gen Unity</h1>
            <p className="text-xl opacity-90">
              Pioneering DNA testing services with a commitment to accuracy, privacy, and exceptional care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Gen Unity, we believe that everyone deserves access to accurate genetic information in a way that's
                easy to understand and act upon. Our mission is to provide the highest quality DNA testing services with
                uncompromising accuracy, complete privacy, and compassionate support.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to advancing genetic science while making it accessible and meaningful for individuals
                and families. Through innovation and education, we empower people to make informed decisions about their
                health, ancestry, and relationships.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--primary)] opacity-10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--secondary)] opacity-10 rounded-full"></div>
              <img src="/about-mission.jpg" alt="Our Mission" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[var(--background-alt)]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            These principles guide everything we do, from how we develop our testing procedures to how we interact with
            our clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Beaker className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scientific Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards of scientific rigor and accuracy in all our testing procedures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy & Confidentiality</h3>
              <p className="text-gray-600">
                We protect your genetic information with industry-leading security measures and strict privacy policies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassionate Care</h3>
              <p className="text-gray-600">
                We approach every client with empathy, understanding the personal nature of genetic testing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Award className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with complete transparency and honesty in all aspects of our business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Users className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We make advanced genetic testing accessible to everyone through clear communication and affordable
                options.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Building className="text-[var(--primary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our methods and services to stay at the forefront of genetic science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Expert Team</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Our team consists of leading geneticists, laboratory specialists, and healthcare professionals dedicated to
            providing the highest quality DNA testing services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="/team-member-1.jpg" alt="Dr. Sarah Johnson" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-[var(--primary)] font-medium">Chief Medical Officer</p>
              <p className="text-gray-600 mt-2">
                Board-certified geneticist with over 15 years of experience in clinical genetics.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="/team-member-2.jpg" alt="Dr. Michael Chen" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Dr. Michael Chen</h3>
              <p className="text-[var(--primary)] font-medium">Laboratory Director</p>
              <p className="text-gray-600 mt-2">
                PhD in Molecular Biology with expertise in advanced DNA sequencing technologies.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="/team-member-3.jpg" alt="Dr. Emily Rodriguez" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Dr. Emily Rodriguez</h3>
              <p className="text-[var(--primary)] font-medium">Research Director</p>
              <p className="text-gray-600 mt-2">
                Specializes in population genetics and leads our ancestry testing program.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="/team-member-4.jpg" alt="James Wilson" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">James Wilson</h3>
              <p className="text-[var(--primary)] font-medium">Client Services Director</p>
              <p className="text-gray-600 mt-2">
                Ensures exceptional client experience with a background in healthcare administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-16 bg-[var(--background-alt)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">State-of-the-Art Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Gen Unity utilizes the most advanced DNA testing technologies available, ensuring the highest levels of
                accuracy and reliability in our results.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">Next-Generation Sequencing</h4>
                    <p className="text-gray-600">
                      Our laboratory uses advanced NGS technology to analyze DNA with exceptional precision.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">Automated Sample Processing</h4>
                    <p className="text-gray-600">
                      Robotic systems handle samples to minimize human error and contamination risks.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">Secure Digital Results Platform</h4>
                    <p className="text-gray-600">
                      Our encrypted online portal ensures your results are accessible only to you.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--secondary)] opacity-10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full"></div>
              <img
                src="/lab-technology.jpg"
                alt="Our Laboratory Technology"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Accreditations */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Partners & Accreditations</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            We collaborate with leading institutions and maintain the highest industry certifications.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/partner-logo-1.png" alt="Partner 1" className="h-16 mx-auto mb-4" />
              <p className="font-medium">American College of Medical Genetics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/partner-logo-2.png" alt="Partner 2" className="h-16 mx-auto mb-4" />
              <p className="font-medium">Clinical Laboratory Improvement Amendments (CLIA)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/partner-logo-3.png" alt="Partner 3" className="h-16 mx-auto mb-4" />
              <p className="font-medium">College of American Pathologists</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/partner-logo-4.png" alt="Partner 4" className="h-16 mx-auto mb-4" />
              <p className="font-medium">International Society of Genetic Genealogy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Gen Unity</h2>
          <p className="text-lg opacity-90 mb-12 text-center max-w-3xl mx-auto">
            We stand apart in the DNA testing industry for our commitment to excellence in every aspect of our service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Unmatched Accuracy</h3>
              <p className="opacity-90">
                Our rigorous quality control processes and advanced technology ensure 99.99% accuracy in all our tests.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Comprehensive Support</h3>
              <p className="opacity-90">
                Our team of genetic counselors is available to help you understand your results and next steps.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fast Turnaround</h3>
              <p className="opacity-90">
                Most results are available within 3-5 business days, with expedited options available.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Privacy Guaranteed</h3>
              <p className="opacity-90">
                Your genetic information is protected with bank-level security and strict privacy policies.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Convenient Options</h3>
              <p className="opacity-90">
                Choose between at-home collection kits or visits to our partner facilities nationwide.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
              <p className="opacity-90">
                No hidden fees or surprises—our pricing is clear and competitive, with options for every budget.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
