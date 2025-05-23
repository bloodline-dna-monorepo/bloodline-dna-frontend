import { Mail, Phone, MapPin } from "lucide-react"
export const FooterContact=()=>(
  /* Contact Info */
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
       
)