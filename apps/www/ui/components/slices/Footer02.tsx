import Link from "next/link"
import { Button } from "@/ui/components/Button"
import { Input } from "@/ui/components/Input"

export function Footer02() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-border">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Stay up to date</h3>
            <p className="text-sm text-muted-foreground">
              Get notified about new features and updates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64"
            />
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12">
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Overview</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Newsletter</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Social</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">© 2024 Your Company. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
