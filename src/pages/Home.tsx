'use client'

import type React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Common/Button'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>Professional DNA Testing Services</h1>
            <p className='text-xl md:text-2xl mb-8 text-teal-100'>
              Accurate, reliable, and confidential genetic analysis for administrative and civil purposes
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {isAuthenticated ? (
                <Link to='/dashboard'>
                  <Button size='lg' className='bg-white text-teal-600 hover:bg-gray-100'>
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to='/services'>
                    <Button size='lg' className='bg-gray-100 text-teal-600'>
                      View Services
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button
                      size='lg'
                      variant='outline'
                      className='border-white text-white hover:bg-white hover:text-teal-600'
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Why Choose BloodLine DNA?</h2>
            <p className='text-xl text-gray-600'>We provide the most accurate and reliable DNA testing services</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🔬</div>
              <h3 className='text-xl font-semibold mb-2'>Advanced Technology</h3>
              <p className='text-gray-600'>
                State-of-the-art laboratory equipment and cutting-edge genetic analysis techniques
              </p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🛡️</div>
              <h3 className='text-xl font-semibold mb-2'>100% Confidential</h3>
              <p className='text-gray-600'>Your privacy is our priority. All results are kept strictly confidential</p>
            </div>

            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold mb-2'>Fast Results</h3>
              <p className='text-gray-600'>Get your results quickly with our streamlined testing process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Services</h2>
            <p className='text-xl text-gray-600'>Comprehensive DNA testing solutions for all your needs</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-lg border'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Administrative Testing</h3>
              <p className='text-gray-600 mb-6'>
                DNA testing for official documentation, immigration, and legal purposes
              </p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Paternity Testing</li>
                <li>✓ Maternity Testing</li>
                <li>✓ Sibling Testing</li>
                <li>✓ Immigration Testing</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline'>Learn More</Button>
              </Link>
            </div>

            <div className='bg-white p-8 rounded-lg shadow-lg border'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Civil Testing</h3>
              <p className='text-gray-600 mb-6'>DNA testing for personal knowledge and family relationships</p>
              <ul className='space-y-2 text-gray-600 mb-6'>
                <li>✓ Relationship Testing</li>
                <li>✓ Ancestry Analysis</li>
                <li>✓ Family Tree Building</li>
                <li>✓ Genetic Counseling</li>
              </ul>
              <Link to='/services'>
                <Button variant='outline'>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-teal-600 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Get Started?</h2>
          <p className='text-xl mb-8 text-teal-100'>
            Join thousands of satisfied customers who trust us with their DNA testing needs
          </p>
          {!isAuthenticated && (
            <Link to='/register'>
              <Button size='lg' className='bg-white text-teal-600 hover:bg-gray-100'>
                Create Account Today
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
