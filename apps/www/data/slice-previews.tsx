import { Navbar01 } from "@/ui/components/slices/Navbar01"
import { Navbar02 } from "@/ui/components/slices/Navbar02"
import { Hero01 } from "@/ui/components/slices/Hero01"
import { Hero02 } from "@/ui/components/slices/Hero02"
import { Pricing01 } from "@/ui/components/slices/Pricing01"
import { Pricing02 } from "@/ui/components/slices/Pricing02"
import { Pricing03 } from "@/ui/components/slices/Pricing03"
import { Footer01 } from "@/ui/components/slices/Footer01"
import { Footer02 } from "@/ui/components/slices/Footer02"

// Previews pour chaque slice (preview principal)
export const slicePreviews: Record<string, React.ReactNode> = {
  "navbar-01": <Navbar01 />,
  "navbar-02": <Navbar02 />,
  "hero-01": <Hero01 />,
  "hero-02": <Hero02 />,
  "pricing-01": <Pricing01 />,
  "pricing-02": <Pricing02 />,
  "pricing-03": <Pricing03 />,
  "footer-01": <Footer01 />,
  "footer-02": <Footer02 />,
}
