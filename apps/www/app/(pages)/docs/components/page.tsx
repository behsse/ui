import Link from "next/link"
import { components } from "@/data/components"
import File from "@/ui/icons/File"

export const metadata = {
  title: "Components - behsseui",
  description: "Explorez tous les composants disponibles dans behsseui",
}

export default function ComponentsPage() {
  const componentsList = Object.entries(components)

  return (
    <main className="relative lg:gap-10">
      <div className="mx-auto w-full min-w-0">
        {/* Header */}
        <div className="space-y-4 pb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <span>/</span>
            <span className="text-foreground">Components</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">All components</h1>
          <p className="text-muted-foreground">
            {componentsList.length} component{componentsList.length > 1 ? "s" : ""} available
          </p>
        </div>

        {/* Liste des composants */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {componentsList.map(([slug, component]) => (
            <Link
              key={slug}
              href={`/docs/components/${slug}`}
              className="group relative flex flex-col rounded-lg border bg-background overflow-hidden hover:border-foreground/20 transition-all hover:shadow-md"
            >
              {/* Aperçu visuel */}
              {component.minimalPreview && (
                <div className="h-32 bg-muted/30 border-b">
                  <div className="flex items-center justify-center h-full w-full p-4">
                    {component.minimalPreview}
                  </div>
                </div>
              )}

              {/* Contenu de la card */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-foreground transition-colors">
                      {component.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {component.desc}
                </p>
              </div>

              {/* Indicateur hover */}
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
