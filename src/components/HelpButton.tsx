"use client"

import { useState } from "react"
import { HelpCircle, X } from "lucide-react"

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHelp = () => {
    setIsOpen(!isOpen)
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
                  <a href="/faq" className="text-[var(--primary)] hover:underline">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/guide" className="text-[var(--primary)] hover:underline">
                    Testing Process Guide
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-[var(--primary)] hover:underline">
                    Our Services
                  </a>
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
              <button className="btn btn-primary w-full">Start Live Chat</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpButton
