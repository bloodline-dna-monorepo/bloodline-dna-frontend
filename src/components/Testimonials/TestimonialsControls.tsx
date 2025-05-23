import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestimonialsControlsProps {
  currentIndex: number
  count: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
}

const TestimonialsControls = ({
  currentIndex,
  count,
  onPrev,
  onNext,
  onDotClick,
}: TestimonialsControlsProps) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(count)].map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-white bg-opacity-40"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export default TestimonialsControls
