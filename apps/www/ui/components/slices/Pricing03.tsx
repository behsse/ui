import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 projects",
      "Basic analytics dashboard",
      "Community support via Discord",
      "1 GB file storage",
      "Standard API rate limits",
      "Public project sharing",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Advanced tools for professionals",
    price: "$19",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics & reports",
      "Priority email support",
      "50 GB file storage",
      "Higher API rate limits",
      "Private project sharing",
      "Custom branding",
      "Team members (up to 10)",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
]

export function Pricing03() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Free to start, powerful to scale
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            No credit card required. Upgrade anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted
                  ? "border-primary shadow-lg relative"
                  : "relative"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline gap-1 pt-4">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="large"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
