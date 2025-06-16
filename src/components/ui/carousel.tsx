"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { slides } from "@/constans/data"



export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Pause autoplay when user interacts with carousel
  const handleInteraction = () => {
    setIsAutoPlaying(false)

    // Resume autoplay after 10 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }

  return (
    <div
      className="relative h-[400px] w-full overflow-hidden"
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.ID}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            {/* Background with color overlay */}
            <div className={cn("absolute inset-0 flex items-center justify-center", slide.imagen)}>
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl px-6 ">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{slide.titulo}</h2>
              <p className="text-lg sm:text-xl md:text-2xl">{slide.texto}</p>
              <Button className="mt-6 text-secondary">Saber más</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30 z-20"
        onClick={() => {
          prevSlide()
          handleInteraction()
        }}
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30 z-20"
        onClick={() => {
          nextSlide()
          handleInteraction()
        }}
        aria-label="Diapositiva siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentIndex ? "bg-current w-6" : "bg-inherit ",
            )}
            onClick={() => {
              goToSlide(index)
              handleInteraction()
            }}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

