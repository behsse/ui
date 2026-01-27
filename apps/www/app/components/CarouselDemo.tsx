"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/ui/components/Carousel"

interface CarouselDemoProps {
  variant?: "default" | "two" | "three" | "autoplay" | "loop" | "dots" | "vertical"
}

const COLORS = [
  "bg-primary/20",
  "bg-secondary",
  "bg-accent",
  "bg-muted",
  "bg-primary/10",
]

function DemoCard({ index }: { index: number }) {
  return (
    <div
      className={`${COLORS[index % COLORS.length]} rounded-lg p-6 h-40 flex items-center justify-center`}
    >
      <span className="text-2xl font-semibold">Slide {index + 1}</span>
    </div>
  )
}

export function CarouselDemo({ variant = "default" }: CarouselDemoProps) {
  if (variant === "two") {
    return (
      <Carousel slidesPerView={2} spaceBetween={16} className="w-full max-w-lg">
        <CarouselContent>
          {[0, 1, 2, 3, 4].map((index) => (
            <CarouselItem key={index}>
              <DemoCard index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  if (variant === "three") {
    return (
      <Carousel slidesPerView={3} spaceBetween={12} className="w-full max-w-2xl">
        <CarouselContent>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <CarouselItem key={index}>
              <DemoCard index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  if (variant === "autoplay") {
    return (
      <Carousel autoplay autoplayDelay={3000} loop className="w-full max-w-md">
        <CarouselContent>
          {[0, 1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <DemoCard index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  if (variant === "loop") {
    return (
      <Carousel loop className="w-full max-w-md">
        <CarouselContent>
          {[0, 1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <DemoCard index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  if (variant === "dots") {
    return (
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {[0, 1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <DemoCard index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    )
  }

  if (variant === "vertical") {
    return (
      <Carousel direction="vertical" className="w-full max-w-md h-[200px]">
        <CarouselContent>
          {[0, 1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <div
                className={`${COLORS[index % COLORS.length]} rounded-lg p-6 h-full flex items-center justify-center`}
              >
                <span className="text-2xl font-semibold">Slide {index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  // Default: single slide
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {[0, 1, 2, 3].map((index) => (
          <CarouselItem key={index}>
            <DemoCard index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
