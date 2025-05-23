

const ThankYouMessage = () => (
  <div className="p-8 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
    <p className="text-gray-600">
      Your appointment request has been received. We'll contact you shortly to confirm the details.
    </p>
  </div>
)

export default ThankYouMessage
