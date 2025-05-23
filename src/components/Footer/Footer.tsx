import { Link } from 'react-router-dom'
import { FooterCompanyInfo } from './FooterCompanyInfo'
import { FooterQuickLinks } from './FooterQuickLinks'
import { FooterServices } from './FooterServices'
import { FooterContact } from './FooterContact'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-white pt-16 pb-8'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <FooterCompanyInfo />
          <FooterQuickLinks />
          <FooterServices />
          <FooterContact />
        </div>
        <div className='mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm'>
          <div className='mb-4'>
            <Link to='/privacy' className='hover:text-white transition-colors mx-2'>
              Privacy Policy
            </Link>
            <span className='mx-1'>|</span>
            <Link to='/terms' className='hover:text-white transition-colors mx-2'>
              Terms of Service
            </Link>
            <span className='mx-1'>|</span>
            <Link to='/faq' className='hover:text-white transition-colors mx-2'>
              FAQ
            </Link>
          </div>
          <p>&copy; {currentYear} Gen Unity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
