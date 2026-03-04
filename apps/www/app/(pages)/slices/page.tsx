"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { slices, sliceCategories } from "@/data/slices"
import { SliceSearch } from "@/app/components/SliceSearch"

export default function SlicesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Only count categories that have slices
  const categoriesWithSlices = sliceCategories.filter(
    (category) => Object.values(slices).some((s) => s.category === category.id)
  )
  const totalCategories = categoriesWithSlices.length

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categoriesWithSlices

    return categoriesWithSlices.filter((category) =>
      category.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      category.id.toLowerCase().startsWith(searchQuery.toLowerCase())
    )
  }, [searchQuery, categoriesWithSlices])

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Slices</h1>
        <SliceSearch totalCategories={totalCategories} onSearch={handleSearch} />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No slices found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCategories.map((category) => {
            const categorySliceCount = Object.values(slices).filter(s => s.category === category.id).length

            return (
              <Link
                key={category.id}
                href={`/slices/${category.id}`}
                className="group relative flex flex-col rounded-lg border border-border bg-background overflow-hidden hover:border-foreground/20 transition-all hover:shadow-md hover:-translate-y-1"
              >
                {/* Preview */}
                <div className="h-32 bg-muted/30 border-b">
                  <div className="flex items-center justify-center h-full w-full p-4">
                    {category.preview}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {categorySliceCount}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Hover indicator */}
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
            )
          })}
        </div>
      )}
    </div>
  )
}
