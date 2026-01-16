import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Intuitive CLI",
    description: "Install only the components you need. No unnecessary dependencies, just source code in your project.",
    href: "/docs/installation"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Ready-to-Use Slices",
    description: "Complete sections like navbars, dashboards, and more. Copy, paste, customize.",
    href: "/docs/components"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Customizable Themes",
    description: "Complete theme system with dark/light mode support. Change colors with one click using CSS variables.",
    href: "/docs/intro"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Icon Library",
    description: "Optimized SVG icons, individually installable. Lightweight, accessible, and customizable.",
    href: "/icons"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Smooth Animations",
    description: "Ready-to-use CSS and Framer Motion animations. Bring your interfaces to life effortlessly.",
    href: "/docs/components"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Full Source Code",
    description: "No magic, no black box. You own the code, modify it as you wish.",
    href: "/docs/intro"
  }
];

export const Feature = () => {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Everything you need
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A different approach to component libraries.
                    You keep full control over your code.
                </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                    <Link
                    key={index}
                    href={feature.href}
                    className="group relative p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
                    >
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                    </p>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
        </section>
    )
}
