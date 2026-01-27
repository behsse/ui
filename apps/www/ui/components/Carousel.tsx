"use client"

import { useState, useEffect, useCallback, useRef, Children, createContext, useContext, isValidElement, cloneElement } from "react"
import { cn } from "@/lib/utils"
import ChevronLeft from "@/ui/icons/ChevronLeft"
import ChevronRight from "@/ui/icons/ChevronRight"

// Context for sharing carousel state
interface CarouselContextValue {
  currentIndex: number
  totalSlides: number
  slidesPerView: number
  direction: "horizontal" | "vertical"
  goToSlide: (index: number) => void
  goToPrevious: () => void
  goToNext: () => void
  canGoNext: boolean
  canGoPrevious: boolean
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel")
  }
  return context
}

// Types
interface CarouselProps {
  children: React.ReactNode
  slidesPerView?: number | "auto"
  spaceBetween?: number
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  direction?: "horizontal" | "vertical"
  className?: string
}

interface CarouselContentProps {
  children: React.ReactNode
  className?: string
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

interface CarouselPreviousProps {
  className?: string
}

interface CarouselNextProps {
  className?: string
}

interface CarouselDotsProps {
  className?: string
}

// Main Carousel component
function Carousel({
  children,
  slidesPerView = 1,
  spaceBetween = 16,
  autoplay = false,
  autoplayDelay = 3000,
  loop = false,
  direction = "horizontal",
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [translatePos, setTranslatePos] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const isVertical = direction === "vertical"
  const effectiveSlidesPerView = typeof slidesPerView === "number" ? slidesPerView : 1
  const maxIndex = Math.max(0, totalSlides - effectiveSlidesPerView)

  const canGoNext = loop || currentIndex < maxIndex
  const canGoPrevious = loop || currentIndex > 0

  const goToSlide = useCallback((index: number) => {
    if (loop) {
      if (index < 0) {
        setCurrentIndex(maxIndex)
      } else if (index > maxIndex) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(index)
      }
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    }
  }, [loop, maxIndex])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  // Autoplay
  useEffect(() => {
    if (autoplay && !isDragging) {
      autoplayRef.current = setInterval(() => {
        goToNext()
      }, autoplayDelay)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, autoplayDelay, goToNext, isDragging])

  // Mouse/Touch drag handling
  const handleDragStart = useCallback((pos: number) => {
    setIsDragging(true)
    setStartPos(pos)
    setTranslatePos(0)
  }, [])

  const handleDragMove = useCallback((pos: number) => {
    if (!isDragging) return
    const diff = pos - startPos
    setTranslatePos(diff)
  }, [isDragging, startPos])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50
    if (translatePos > threshold && canGoPrevious) {
      goToPrevious()
    } else if (translatePos < -threshold && canGoNext) {
      goToNext()
    }

    setTranslatePos(0)
  }, [isDragging, translatePos, canGoPrevious, canGoNext, goToPrevious, goToNext])

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(isVertical ? e.clientY : e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(isVertical ? e.clientY : e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(isVertical ? e.touches[0].clientY : e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(isVertical ? e.touches[0].clientY : e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  const contextValue: CarouselContextValue = {
    currentIndex,
    totalSlides,
    slidesPerView: effectiveSlidesPerView,
    direction,
    goToSlide,
    goToPrevious,
    goToNext,
    canGoNext,
    canGoPrevious,
  }

  // Separate children into content+buttons vs other elements (like dots)
  const contentAndButtons: React.ReactNode[] = []
  const otherElements: React.ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!child || typeof child !== "object" || !("type" in child)) {
      otherElements.push(child)
      return
    }

    if (child.type === CarouselContent || child.type === CarouselPrevious || child.type === CarouselNext) {
      contentAndButtons.push(child)
    } else {
      otherElements.push(child)
    }
  })

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          "w-full",
          isVertical && "h-full",
          className
        )}
      >
        {/* Wrapper for content and navigation buttons - buttons are positioned relative to this */}
        <div
          className={cn(
            "relative",
            isVertical && "h-full"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {contentAndButtons.map((child, index) => {
            if (!isValidElement(child)) return child

            if (child.type === CarouselContent) {
              const contentProps = child.props as CarouselContentProps
              return (
                <CarouselContentInternal
                  key={index}
                  {...contentProps}
                  currentIndex={currentIndex}
                  slidesPerView={effectiveSlidesPerView}
                  spaceBetween={spaceBetween}
                  translatePos={translatePos}
                  isDragging={isDragging}
                  direction={direction}
                  setTotalSlides={setTotalSlides}
                />
              )
            }
            return cloneElement(child, { key: index })
          })}
        </div>

        {/* Other elements like dots are rendered outside the relative wrapper */}
        {otherElements}
      </div>
    </CarouselContext.Provider>
  )
}

// Internal CarouselContent with state access
interface CarouselContentInternalProps extends CarouselContentProps {
  currentIndex: number
  slidesPerView: number
  spaceBetween: number
  translatePos: number
  isDragging: boolean
  direction: "horizontal" | "vertical"
  setTotalSlides: (count: number) => void
}

function CarouselContentInternal({
  children,
  className,
  currentIndex,
  slidesPerView,
  spaceBetween,
  translatePos,
  isDragging,
  direction,
  setTotalSlides,
}: CarouselContentInternalProps) {
  const childrenArray = Children.toArray(children)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState(0)

  const isVertical = direction === "vertical"

  useEffect(() => {
    setTotalSlides(childrenArray.length)
  }, [childrenArray.length, setTotalSlides])

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize(isVertical ? containerRef.current.offsetHeight : containerRef.current.offsetWidth)
      }
    }
    updateSize()
    // Small delay to ensure parent has rendered with correct height
    const timeout = setTimeout(updateSize, 50)
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
      clearTimeout(timeout)
    }
  }, [isVertical])

  // Calculate slide size in pixels
  const totalGapSize = spaceBetween * (slidesPerView - 1)
  const slideSizePx = (containerSize - totalGapSize) / slidesPerView

  // Calculate offset in pixels: each step moves by (slideSize + gap)
  const offsetPx = currentIndex * (slideSizePx + spaceBetween)

  const transform = isVertical
    ? `translateY(${-offsetPx + translatePos}px)`
    : `translateX(${-offsetPx + translatePos}px)`

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden",
        isVertical && "h-full",
        className
      )}
    >
      <div
        className={cn(
          "flex h-full",
          isVertical && "flex-col",
          !isDragging && "transition-transform duration-300 ease-out"
        )}
        style={{
          transform,
          gap: `${spaceBetween}px`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={cn(
              "shrink-0",
              isVertical && "h-full"
            )}
            style={
              isVertical
                ? { height: slideSizePx > 0 ? `${slideSizePx}px` : '100%' }
                : { width: slideSizePx > 0 ? `${slideSizePx}px` : `calc((100% - ${totalGapSize}px) / ${slidesPerView})` }
            }
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

// Public CarouselContent (just a marker component)
function CarouselContent({ children, className }: CarouselContentProps) {
  return <div className={className}>{children}</div>
}

// CarouselItem
function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div className={cn("min-w-0 h-full", className)}>
      {children}
    </div>
  )
}

// CarouselPrevious button
function CarouselPrevious({ className }: CarouselPreviousProps) {
  const { goToPrevious, canGoPrevious, direction } = useCarousel()
  const isVertical = direction === "vertical"

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        goToPrevious()
      }}
      disabled={!canGoPrevious}
      className={cn(
        "absolute z-10",
        "h-8 w-8 rounded-full",
        "bg-background/80 backdrop-blur-sm border border-border",
        "flex items-center justify-center",
        "hover:bg-accent transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isVertical
          ? "top-2 left-1/2 -translate-x-1/2"
          : "left-2 top-1/2 -translate-y-1/2",
        className
      )}
      aria-label="Previous slide"
    >
      <ChevronLeft className={cn("h-4 w-4", isVertical && "rotate-90")} />
    </button>
  )
}

// CarouselNext button
function CarouselNext({ className }: CarouselNextProps) {
  const { goToNext, canGoNext, direction } = useCarousel()
  const isVertical = direction === "vertical"

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        goToNext()
      }}
      disabled={!canGoNext}
      className={cn(
        "absolute z-10",
        "h-8 w-8 rounded-full",
        "bg-background/80 backdrop-blur-sm border border-border",
        "flex items-center justify-center",
        "hover:bg-accent transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isVertical
          ? "bottom-2 left-1/2 -translate-x-1/2"
          : "right-2 top-1/2 -translate-y-1/2",
        className
      )}
      aria-label="Next slide"
    >
      <ChevronRight className={cn("h-4 w-4", isVertical && "rotate-90")} />
    </button>
  )
}

// CarouselDots indicator
function CarouselDots({ className }: CarouselDotsProps) {
  const { currentIndex, totalSlides, slidesPerView, direction, goToSlide } = useCarousel()
  const dotsCount = Math.max(0, totalSlides - slidesPerView + 1)
  const isVertical = direction === "vertical"

  if (dotsCount <= 1) return null

  return (
    <div className={cn(
      "flex justify-center gap-2",
      isVertical ? "flex-col absolute right-2 top-1/2 -translate-y-1/2" : "mt-4",
      className
    )}>
      {Array.from({ length: dotsCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => goToSlide(index)}
          className={cn(
            "rounded-full transition-all",
            isVertical
              ? cn("w-2 h-2", currentIndex === index ? "bg-primary h-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")
              : cn("h-2 w-2", currentIndex === index ? "bg-primary w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
