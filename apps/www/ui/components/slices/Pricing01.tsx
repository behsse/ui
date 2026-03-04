import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Free",
    description: "For individuals getting started",
    price: "$0",
    period: "/month",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100 GB storage",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale organizations",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SSO & SAML",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing01() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
                  <Badge>Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
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
