import { Button } from "@/ui/components/Button"
import { Input } from "@/ui/components/Input"

export function Hero02() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              The modern way to build web apps
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Ship faster with pre-built components. Focus on what matters most —
              building great products for your users.
            </p>

            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1"
              />
              <Button className="w-full sm:w-auto shrink-0">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 10,000+ developers. No spam, ever.
            </p>
          </div>

          {/* Visual placeholder */}
          <div className="hidden lg:block">
            <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-border" />
          </div>
        </div>
      </div>
    </section>
  )
}
