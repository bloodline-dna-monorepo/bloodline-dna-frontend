"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HelpCircle, X } from "lucide-react"

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleHelp = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (path: string, section: string) => {
    setIsOpen(false)
    navigate(path)

    // Allow time for the page to load before scrolling
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <>
      <button onClick={toggleHelp} className="help-button" aria-label="Get help">
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-[160px] right-[20px] w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="bg-[var(--secondary)] text-white p-4">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-sm opacity-90">Our support team is here for you</p>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <button
                    onClick={() => handleNavigation("/guide", "faq-section")}
                    className="text-[var(--primary)] hover:underline text-left w-full"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guide", "testing-process")}
                    className="text-[var(--primary)] hover:underline text-left w-full"
                  >
                    Testing Process Guide
                  </button>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[var(--primary)] hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Our Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Contact Us</h4>
              <p className="text-sm mb-2">
                Call us at:{" "}
                <a href="tel:+18001234567" className="text-[var(--primary)] hover:underline">
                  +1 (800) 123-4567
                </a>
              </p>
              <p className="text-sm">
                Email:{" "}
                <a href="mailto:support@genunity.com" className="text-[var(--primary)] hover:underline">
                  support@genunity.com
                </a>
              </p>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-full" onClick={() => setIsOpen(false)}>
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpButton
