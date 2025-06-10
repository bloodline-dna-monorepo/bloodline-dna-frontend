'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const GuidePage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs: FAQItem[] = [
    {
      question: 'How accurate are your DNA tests?',
      answer:
        'Our DNA tests are highly accurate, with a 99.99% accuracy rate for paternity testing and relationship testing. For ancestry testing, we analyze hundreds of thousands of genetic markers to provide detailed ethnicity estimates. Our laboratory is accredited and follows strict quality control procedures to ensure reliable results.'
    },
    {
      question: 'How long does it take to get results?',
      answer:
        'Standard processing time for most DNA tests is 3-5 business days from when your sample arrives at our laboratory. We also offer expedited processing options that can deliver results in as little as 2 business days for an additional fee. The timeline for receiving your kit, collecting your sample, and shipping it back to our lab is separate from the processing time.'
    },
    {
      question: 'Is my genetic information kept private?',
      answer:
        'Yes, we take privacy very seriously. Your genetic information is protected with industry-leading security measures, and we have strict policies in place to safeguard your data. We do not share your genetic information with third parties without your explicit consent. You can review our detailed privacy policy on our website for more information.'
    },
    {
      question: 'Can I use your DNA test results in court?',
      answer:
        "For legal purposes, you'll need to choose our Legal DNA Testing service, which includes proper chain of custody documentation and follows court-admissible procedures. Our standard at-home tests are for informational purposes only and cannot be used in legal proceedings. The legal testing process requires witnessed sample collection at one of our partner facilities."
    },
    {
      question: "What's the difference between at-home collection and lab collection?",
      answer:
        'At-home collection allows you to collect your DNA sample in the privacy of your own home using our easy-to-use cheek swab kit. This option offers convenience and privacy. Lab collection takes place at one of our partner facilities, where a trained professional will collect your sample. Lab collection is required for legal DNA testing and may be preferred by some clients for the added assurance of professional sample collection.'
    },
    {
      question: 'How do I collect my DNA sample?',
      answer:
        "For at-home collection, your kit will include detailed instructions. Generally, you'll use the provided cheek swabs to gently swab the inside of your cheek for about 30 seconds. It's important not to eat, drink, smoke, or chew gum for at least 30 minutes before collecting your sample. For children and infants, the process is the same but may require assistance from an adult. If you choose lab collection, a professional will handle the sample collection process for you."
    },
    {
      question: 'Can I test without the other person knowing?',
      answer:
        'We require consent from all adults participating in DNA testing. Testing someone without their knowledge or consent may be illegal in many jurisdictions. For minors, consent must be provided by a legal guardian. We encourage open and honest communication about DNA testing among all parties involved.'
    },
    {
      question: 'What happens to my sample after testing?',
      answer:
        'After your DNA test is complete, your physical sample is stored securely for a limited time (typically 3 months) in case retesting is needed, and then it is destroyed according to laboratory protocols. Your genetic data is stored securely in our encrypted database. You can request that your sample be destroyed immediately after testing and/or that your genetic data be deleted from our system at any time.'
    },
    {
      question: 'Do you offer testing for health conditions?',
      answer:
        "Yes, we offer genetic health screening that can identify predispositions to certain hereditary conditions and provide insights about how your genetics may influence your health. However, it's important to note that these tests are not diagnostic. Results should be discussed with a healthcare provider, and we offer genetic counseling services to help you understand your results."
    },
    {
      question: 'Can I use insurance to pay for DNA testing?',
      answer:
        'Some health insurance plans may cover genetic testing for medical purposes if ordered by a physician. Relationship testing (such as paternity tests) and ancestry testing are typically not covered by insurance. We recommend contacting your insurance provider directly to inquire about coverage for specific genetic tests. We can provide you with the necessary documentation to submit to your insurance company for potential reimbursement.'
    }
  ]

  return (
    <div className='pt-24'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-16'>
        <div className='container'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>Testing Guide & FAQ</h1>
            <p className='text-xl opacity-90'>
              Everything you need to know about our DNA testing process, from collection to results.
            </p>
          </div>
        </div>
      </section>

      {/* Process Guide */}
      <section id='testing-process' className='py-16'>
        <div className='container'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Our Testing Process</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16'>
            <div>
              <h3 className='text-2xl font-bold mb-6'>At-Home Collection Process</h3>
              <p className='text-lg text-gray-600 mb-6'>
                Our at-home DNA collection process is designed to be simple, convenient, and private. Follow these steps
                to ensure accurate results.
              </p>

              <div className='space-y-6'>
                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    1
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Order Your Kit</h4>
                    <p className='text-gray-600'>
                      Select your preferred test and complete your order. Your collection kit will be shipped to you in
                      discreet packaging.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    2
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Register Your Kit</h4>
                    <p className='text-gray-600'>
                      Each kit has a unique identification number. Register this number on our secure portal to link
                      your sample to your account.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    3
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Collect Your Sample</h4>
                    <p className='text-gray-600'>
                      Follow the detailed instructions to collect your cheek swab sample. Remember not to eat, drink,
                      smoke, or chew gum for 30 minutes before collection.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    4
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Mail Your Sample</h4>
                    <p className='text-gray-600'>
                      Place your sample in the prepaid return envelope and mail it back to our laboratory. No additional
                      postage is required.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    5
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Receive Your Results</h4>
                    <p className='text-gray-600'>
                      Once your sample arrives at our lab, testing typically takes 3-5 business days. You'll receive an
                      email notification when your results are ready to view in your secure online account.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-[var(--secondary)] opacity-10 rounded-full'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full'></div>
              <div className='bg-white p-4 rounded-lg shadow-xl'>
                <div className="w-full max-w-[960px] mx-auto">
  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
    <iframe
      src="https://www.youtube.com/embed/KMHmxjKN90k?si=OFlctof1VkwSj5qq"
      title="Video Title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  </div>
</div>
                <div className='mt-4 text-center'>
                  <h4 className='font-semibold'>Video Guide: How to Collect Your DNA Sample</h4>
                  <p className='text-sm text-gray-500'>Watch our step-by-step demonstration</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='order-2 lg:order-1 relative'>
              <div className='absolute -top-4 -left-4 w-24 h-24 bg-[var(--primary)] opacity-10 rounded-full'></div>
              <div className='absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--secondary)] opacity-10 rounded-full'></div>
              <img src='/lab-facility.jpg' alt='Lab Facility' className='rounded-lg shadow-xl w-full h-auto' />
            </div>

            <div className='order-1 lg:order-2'>
              <h3 className='text-2xl font-bold mb-6'>Lab Facility Collection Process</h3>
              <p className='text-lg text-gray-600 mb-6'>
                For legal DNA testing or those who prefer professional collection, our partner facilities provide a
                convenient and efficient process.
              </p>

              <div className='space-y-6'>
                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    1
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Schedule an Appointment</h4>
                    <p className='text-gray-600'>
                      Book an appointment at one of our partner facilities at a time that's convenient for you. Same-day
                      appointments are often available.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    2
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Arrive for Your Appointment</h4>
                    <p className='text-gray-600'>
                      Bring a valid photo ID. For legal testing, all participants must be present with identification.
                      For testing minors, bring their birth certificate.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    3
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Professional Sample Collection</h4>
                    <p className='text-gray-600'>
                      A trained professional will collect your DNA sample using a simple and painless cheek swab. For
                      legal testing, photographs may be taken.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    4
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Sample Processing</h4>
                    <p className='text-gray-600'>
                      Your sample is securely packaged and sent to our laboratory with proper chain of custody
                      documentation for legal testing.
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-4 flex-shrink-0'>
                    5
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold mb-2'>Receive Your Results</h4>
                    <p className='text-gray-600'>
                      Results are typically available within 3-5 business days. For legal testing, official
                      documentation will be provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='faq-section' className='py-16 bg-[var(--background-alt)]'>
        <div className='container'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Frequently Asked Questions</h2>

          <div className='max-w-3xl mx-auto'>
            {faqs.map((faq, index) => (
              <div key={index} className='mb-4'>
                <button
                  className={`w-full flex justify-between items-center p-4 rounded-lg text-left font-semibold ${
                    openFAQ === index ? 'bg-[var(--primary)] text-white' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFAQ === index && (
                  <div className='bg-white p-4 rounded-b-lg shadow-md'>
                    <p className='text-gray-600'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='mt-12 text-center'>
            <p className='text-lg mb-6'>
              Don't see your question answered here? Contact our support team for assistance.
            </p>
            <a href='/contact' className='btn btn-primary'>
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GuidePage
