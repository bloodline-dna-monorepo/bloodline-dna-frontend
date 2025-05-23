import { Facebook, Instagram, Twitter, Linkedin} from "lucide-react"

export const FooterCompanyInfo =()=>(
  /* Company Info */
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
)