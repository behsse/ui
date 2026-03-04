"use client"

import { useState } from "react"
import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Starter",
    description: "Perfect for side projects",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "5 GB storage",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Best for growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100 GB storage",
      "Custom domains",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    description: "For scaling organizations",
    monthlyPrice: 79,
    yearlyPrice: 66,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "SSO authentication",
      "Unlimited storage",
      "Custom integrations",
      "99.9% SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing02() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Plans for every stage
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day trial.
          </p>

          {/* Toggle */}
          <div className="relative flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-background transition-transform shadow-sm ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Yearly
            </span>
            <Badge variant="secondary" size="sm" className={`absolute left-1/2 translate-x-22 transition-opacity ${isYearly ? "opacity-100" : "opacity-0"}`}>Save 20%</Badge>
          </div>
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
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /month
                  </span>
                </div>
                <p className={`text-xs text-muted-foreground -mt-4 transition-opacity ${isYearly ? "opacity-100" : "opacity-0"}`}>
                  Billed annually (${plan.yearlyPrice * 12}/year)
                </p>
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
