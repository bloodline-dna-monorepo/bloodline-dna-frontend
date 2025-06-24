import { Beaker, Award, Users, Building, Heart, Shield, CheckCircle } from "lucide-react";
import ourImage from '../assets/about/our.png';
import menber1 from '../assets/about/m1.png';
import menber2 from '../assets/about/m2.png';
import menber3 from '../assets/about/m3.png';
import menber4 from '../assets/about/m4.png';
import fpt from '../assets/about/fpt.png';
import tuvu from '../assets/about/tuvu.png';
import havard from '../assets/about/havard.png';
import yduoc from '../assets/about/yduoc.png';

import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-12 font-['Inter'] antialiased bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-8 rounded-lg mb-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">About Gen Unity</h1>
          <p className="text-sm md:text-base mb-3 max-w-xl mx-auto">
            Pioneering DNA testing services with a commitment to accuracy, privacy, and exceptional care.
            Empowering individuals with profound genetic insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-6 px-3">
        <div className="container mx-auto max-w-3xl">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Mission: Unlocking Genetic Potential</h2>
              <p className="text-sm md:text-base mb-3">
                At Gen Unity, we believe that everyone deserves access to accurate genetic information in a way that's
                easy to understand and act upon. Our mission is to provide the highest quality DNA testing services with
                uncompromising accuracy, complete privacy, and compassionate support.
              </p>
              <p className="text-sm md:text-base mb-3">
                We're committed to advancing genetic science while making it accessible and meaningful for individuals
                and families. Through innovation and education, we empower people to make informed decisions about their
                health, ancestry, and relationships, fostering a healthier and more informed future.
              </p>
            </div>
            <div className="relative order-1 lg:order-2 flex justify-center items-center p-3 bg-white rounded-lg shadow">
              <img
                src={ourImage}
                alt="Our Mission"
                className="rounded-lg w-full max-w-md h-auto"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/A7F3D0/065F46?text=Image+Not+Found"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-100 py-8 px-3 rounded-lg shadow-inner my-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-3 flex justify-center">
                <Shield size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Integrity & Accuracy</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We uphold the highest standards of scientific rigor and ethical practices, ensuring every result is precise and trustworthy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-3 flex justify-center">
                <Heart size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Compassionate Care</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We provide empathetic support and clear communication, guiding our clients through their genetic journey with understanding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-3 flex justify-center">
                <Users size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Privacy & Security</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Protecting your personal genetic information is our paramount responsibility, secured with advanced protocols.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-3 flex justify-center">
                <Beaker size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Continuously exploring new scientific advancements to offer cutting-edge and comprehensive genetic insights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-3 flex justify-center">
                <Award size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Excellence</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Striving for the highest quality in every aspect of our service, from testing to customer support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-3 flex justify-center">
                <Building size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Building a supportive community where individuals can connect and share their genetic journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-100 py-8 px-3 rounded-lg shadow-inner my-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Gen Unity?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-3 flex justify-center">
                <CheckCircle size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Certified Accuracy</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Our labs are accredited, ensuring highly reliable and precise DNA test results every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-500 mb-3 flex justify-center">
                <Shield size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Unwavering Privacy</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Your genetic data is protected with state-of-the-art encryption and strict privacy protocols.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-purple-500 mb-3 flex justify-center">
                <Users size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Access to genetic counselors and customer service for any questions or guidance you need.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-orange-500 mb-3 flex justify-center">
                <Beaker size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Advanced Technology</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Utilizing the latest advancements in genetic sequencing for comprehensive insights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-red-500 mb-3 flex justify-center">
                <Heart size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Personalized Insights</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Tailored reports that are easy to understand, helping you make informed decisions about your health.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-teal-500 mb-3 flex justify-center">
                <Award size={48} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Trusted by Thousands</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Join a growing community of satisfied clients who trust Gen Unity with their genetic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-800 text-white py-8 px-3 rounded-lg my-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Dedicated Team</h2>
          <p className="text-base md:text-lg opacity-80 mb-6 max-w-2xl mx-auto">
            Our team of passionate scientists, geneticists, and customer care specialists are dedicated to providing
            you with the best possible experience and insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
              <img
                src={menber1}
                alt="Team Member 1"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[var(--primary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-base md:text-lg font-semibold mb-2">Dr. Emily Chen</h3>
              <p className="text-sm text-gray-300">Lead Geneticist</p>
              <p className="text-sm text-gray-400 mt-2">Specializing in genomic sequencing and analysis.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
              <img
                src={menber2}
                alt="Team Member 2"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[var(--secondary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-base md:text-lg font-semibold mb-2">Michael Davis</h3>
              <p className="text-sm text-gray-300">Bioinformatics Engineer</p>
              <p className="text-sm text-gray-400 mt-2">Developing advanced data processing algorithms.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
              <img
                src={menber3}
                alt="Team Member 3"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[var(--primary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-base md:text-lg font-semibold mb-2">Sarah Lee</h3>
              <p className="text-sm text-gray-300">Customer Relations Lead</p>
              <p className="text-sm text-gray-400 mt-2">Ensuring a seamless and supportive client experience.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300">
              <img
                src={menber4}
                alt="Team Member 4"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[var(--secondary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-base md:text-lg font-semibold mb-2">Dr. Alex Kim</h3>
              <p className="text-sm text-gray-300">Medical Advisor</p>
              <p className="text-sm text-gray-400 mt-2">Providing clinical expertise and guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* State-of-the-Art Technology Section */}
      <section className="bg-gray-100 py-8 px-3">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">State-of-the-Art Technology</h2>
              <p className="text-sm md:text-base text-gray-900 mb-6 max-w-3xl">
                Gen Unity utilizes the most advanced DNA testing technologies available, ensuring the highest levels of accuracy and reliability in our results.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 mt-1 mr-3">
                    <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-sm md:text-base">Next-Generation Sequencing</span>
                    <div className="text-gray-600 text-sm md:text-base">
                      Our laboratory uses advanced NGS technology to analyze DNA with exceptional precision.
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mt-1 mr-3">
                    <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-sm md:text-base">Automated Sample Processing</span>
                    <div className="text-gray-600 text-sm md:text-base">
                      Robotic systems handle samples to minimize human error and contamination risks.
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mt-1 mr-3">
                    <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-sm md:text-base">Secure Digital Results Platform</span>
                    <div className="text-gray-600 text-sm md:text-base">
                      Our encrypted online portal ensures your results are accessible only to you.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <img
                src={menber1}
                alt="Advanced DNA Testing Technology"
                className="rounded-lg w-full max-w-md h-auto shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/400x300/A7F3D0/065F46?text=DNA+Technology";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Accreditations Section */}
      <section className="bg-gray-50 py-8 px-3">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Partners &amp; Accreditations</h2>
          <p className="text-sm md:text-base text-gray-700 mb-8 max-w-3xl mx-auto">
            We collaborate with leading institutions and maintain the highest industry certifications to ensure quality and reliability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-2">
              <div className="h-20 w-38 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
                <img src={fpt} alt="FPT" className="h-full w-full object-cover" />
              </div>
              <span className="text-gray-800 text-sm md:text-base font-medium text-center">FPT University</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-2">
              <div className="h-28 w-28 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
                <img src={yduoc} alt="yduoc" className="h-full w-full object-cover bg-white" />
              </div>
              <span className="text-gray-800 text-sm md:text-base font-medium text-center">Ho Chi Minh City University of Medicine and Pharmacy</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-2">
              <div className="h-20 w-28 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
                <img src={havard} alt="Harvard" className="h-full w-full object-cover" />
              </div>
              <span className="text-gray-800 text-sm md:text-base font-medium text-center">Harvard International University</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-2">
              <div className="h-28 w-28 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
                <img src={tuvu} alt="tu vu" className="h-full w-full object-cover" />
              </div>
              <span className="text-gray-800 text-sm md:text-base font-medium text-center">Tu Vu Hospital Ho Chi Minh City</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-white py-10 px-3 rounded-lg shadow-lg mt-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Unlock Your DNA Story?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have discovered life-changing insights about their health, ancestry, and family connections with Gen Unity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-white hover:text-[var(--primary)] transition duration-300" /* Tăng padding và font size */
              onClick={() => navigate('/services')}
            >
              Learn More About Our Tests
            </button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Free Shipping Worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span>100% Privacy Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} />
              <span>Results in 2-3 Weeks</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;