import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"

export function Hero01() {
  return (
    <section className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <Badge variant="secondary" className="px-3 sm:px-4 py-1">
          New Release
        </Badge>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build beautiful interfaces{" "}
          <span className="text-primary block sm:inline">faster than ever</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
          A collection of beautifully designed components built with React and
          Tailwind CSS. Open source and ready to use in your next project.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Button size="large" className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button variant="outline" size="large" className="w-full sm:w-auto">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}
