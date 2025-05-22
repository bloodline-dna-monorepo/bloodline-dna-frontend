import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Gen Unity Logo" className="h-10 mr-2" />
              <span className="text-xl font-bold">
                <span className="text-[var(--primary)]">Gen</span>
                <span className="text-[var(--secondary)]">Unity</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing accurate, reliable, and fast DNA testing services with the highest standards of privacy and
              confidentiality.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  DNA Testing Services
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-400 hover:text-white transition-colors">
                  Guide & FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/paternity" className="text-gray-400 hover:text-white transition-colors">
                  Paternity Testing
                </Link>
              </li>
              <li>
                <Link to="/services/ancestry" className="text-gray-400 hover:text-white transition-colors">
                  Ancestry DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/relationship" className="text-gray-400 hover:text-white transition-colors">
                  Relationship Testing
                </Link>
              </li>
              <li>
                <Link to="/services/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/prenatal" className="text-gray-400 hover:text-white transition-colors">
                  Prenatal DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/services/genetic" className="text-gray-400 hover:text-white transition-colors">
                  Genetic Health Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-[var(--primary)] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 DNA Street, Genome City, GC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-[var(--primary)] mr-2 flex-shrink-0" />
                <a href="tel:+18001234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-[var(--primary)] mr-2 flex-shrink-0" />
                <a href="mailto:info@genunity.com" className="text-gray-400 hover:text-white transition-colors">
                  info@genunity.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Working Hours</h4>
              <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <div className="mb-4">
            <Link to="/privacy" className="hover:text-white transition-colors mx-2">
              Privacy Policy
            </Link>
            <span className="mx-1">|</span>
            <Link to="/terms" className="hover:text-white transition-colors mx-2">
              Terms of Service
            </Link>
            <span className="mx-1">|</span>
            <Link to="/faq" className="hover:text-white transition-colors mx-2">
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
