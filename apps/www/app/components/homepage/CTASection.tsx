import { Button } from '@/ui/components/Button'

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border border-dashed">
      <div className="max-w-4xl mx-auto text-center px-2">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to build?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
          Join developers who use BehsseUI to create
          modern and customizable interfaces.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="h-12 px-8 text-base">
            <a href="/docs/installation">
              Read the documentation
            </a>
          </Button>
          <Button variant="outline" asChild className="h-12 px-8 text-base">
            <a href="/docs/components">
              Explore components
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
