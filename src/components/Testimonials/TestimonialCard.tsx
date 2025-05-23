import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  image: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold">{testimonial.name}</h4>
            <p className="text-sm opacity-80">{testimonial.location}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < testimonial.rating ? "text-yellow-300 fill-yellow-300" : "text-gray-400"}
                />
              ))}
            </div>
          </div>
        </div>
        <blockquote className="text-lg italic">"{testimonial.text}"</blockquote>
      </div>
    </div>
  )
}

export default TestimonialCard
