import { notFound } from "next/navigation"
import Link from "next/link"
import { slices, sliceCategories } from "@/data/slices"
import SliceCard from "../SliceCard"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return sliceCategories.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categoryId } = await params
  const category = sliceCategories.find((c) => c.id === categoryId)

  if (!category) {
    notFound()
  }

  const categorySlices = Object.entries(slices).filter(
    ([, slice]) => slice.category === categoryId
  )

  return (
    <div className="space-y-8 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/slices" className="hover:text-foreground transition-colors">
          Slices
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground">
          {category.description}. {categorySlices.length} slice{categorySlices.length > 1 ? "s" : ""} available.
        </p>
      </div>

      {/* Slices stacked */}
      <div className="space-y-8">
        {categorySlices.map(([slug, slice]) => (
          <SliceCard
            key={slug}
            slug={slug}
            slice={slice}
          />
        ))}
      </div>
    </div>
  )
}
