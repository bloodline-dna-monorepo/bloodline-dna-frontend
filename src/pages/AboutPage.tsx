import { Beaker, Award, Users, Building, Heart, Shield, CheckCircle } from "lucide-react";
import ServiceCards from "../components/ServiceCards/ServiceCards"

import ourImage from '../assets/about/our.png';
import menber1 from '../assets/about/m1.png';
import menber2 from '../assets/about/m2.png';
import menber3 from '../assets/about/m3.png';
import menber4 from '../assets/about/m4.png';

const AboutPage = () => {
  return (
    <div className="pt-24 font-['Inter'] antialiased bg-gray-50">

      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-24 px-4 rounded-b-3xl shadow-lg">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            About Gen Unity
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-3xl mx-auto">
            Pioneering DNA testing services with a commitment to accuracy, privacy, and exceptional care.
            Empowering individuals with profound genetic insights.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">Our Mission: Unlocking Genetic Potential</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                At Gen Unity, we believe that everyone deserves access to accurate genetic information in a way that's
                easy to understand and act upon. Our mission is to provide the highest quality DNA testing services with
                uncompromising accuracy, complete privacy, and compassionate support.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We're committed to advancing genetic science while making it accessible and meaningful for individuals
                and families. Through innovation and education, we empower people to make informed decisions about their
                health, ancestry, and relationships, fostering a healthier and more informed future.
              </p>
            </div>
            <div className="relative order-1 lg:order-2 flex justify-center items-center p-4 bg-white rounded-xl shadow-2xl">
              <img
                src={ourImage}
                alt="Our Mission"
                className="rounded-xl w-full max-w-lg h-auto transition-transform duration-500 hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/A7F3D0/065F46?text=Image+Not+Found"; }}
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceCards />

      <section className="bg-gray-100 py-20 px-4 rounded-3xl shadow-inner my-12">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <Shield size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Integrity & Accuracy</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We uphold the highest standards of scientific rigor and ethical practices, ensuring every result is precise and trustworthy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-4 flex justify-center">
                <Heart size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Compassionate Care</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We provide empathetic support and clear communication, guiding our clients through their genetic journey with understanding.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <Users size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Privacy & Security</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Protecting your personal genetic information is our paramount responsibility, secured with advanced protocols.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-4 flex justify-center">
                <Beaker size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Continuously exploring new scientific advancements to offer cutting-edge and comprehensive genetic insights.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <Award size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Excellence</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Striving for the highest quality in every aspect of our service, from testing to customer support.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-[var(--secondary)] mb-4 flex justify-center">
                <Building size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Community</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Building a supportive community where individuals can connect and share their genetic journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Why Choose Gen Unity?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-green-500 mb-4">
                <CheckCircle size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Certified Accuracy</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Our labs are accredited, ensuring highly reliable and precise DNA test results every time.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-blue-500 mb-4">
                <Shield size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Unwavering Privacy</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Your genetic data is protected with state-of-the-art encryption and strict privacy protocols.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-purple-500 mb-4">
                <Users size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Expert Support</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Access to genetic counselors and customer service for any questions or guidance you need.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-orange-500 mb-4">
                <Beaker size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Advanced Technology</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Utilizing the latest advancements in genetic sequencing for comprehensive insights.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Heart size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Personalized Insights</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Tailored reports that are easy to understand, helping you make informed decisions about your health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="text-teal-500 mb-4">
                <Award size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">Trusted by Thousands</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Join a growing community of satisfied clients who trust Gen Unity with their genetic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 text-white py-20 px-4 rounded-3xl my-12">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Meet Our Dedicated Team</h2>
          <p className="text-lg md:text-xl opacity-80 mb-10 max-w-3xl mx-auto">
            Our team of passionate scientists, geneticists, and customer care specialists are dedicated to providing
            you with the best possible experience and insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={menber1}
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--primary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Dr. Emily Chen</h3>
              <p className="text-base text-gray-300">Lead Geneticist</p>
              <p className="text-base text-gray-400 mt-2">Specializing in genomic sequencing and analysis.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={menber2}
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--secondary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Michael Davis</h3>
              <p className="text-base text-gray-300">Bioinformatics Engineer</p>
              <p className="text-base text-gray-400 mt-2">Developing advanced data processing algorithms.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={menber3}
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--primary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Sarah Lee</h3>
              <p className="text-base text-gray-300">Customer Relations Lead</p>
              <p className="text-base text-gray-400 mt-2">Ensuring a seamless and supportive client experience.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={menber4}
                alt="Team Member 4"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--secondary)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/150x150/E0F2FE/1E40AF?text=Image+Not+Found"; }}
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Dr. Alex Kim</h3>
              <p className="text-base text-gray-300">Medical Advisor</p>
              <p className="text-base text-gray-400 mt-2">Providing clinical expertise and guidance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-white py-20 px-4 rounded-t-3xl shadow-lg mt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Discover Your Genetic Story?</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Start your journey with Gen Unity today and unlock personalized insights into your health, ancestry, and more.
          </p>
          <button className="bg-white text-[var(--primary)] px-10 py-4 rounded-full font-semibold text-xl shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
