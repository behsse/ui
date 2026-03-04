"use client"

import { useState } from "react"
import Search from "@/ui/icons/Search"
import Close from "@/ui/icons/Close"

interface SliceSearchProps {
  totalCategories: number
  onSearch: (query: string) => void
  placeholder?: string
}

export function SliceSearch({ totalCategories, onSearch, placeholder }: SliceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder || `Search ${totalCategories} slices...`}
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/15 focus:ring-0 transition-all hover:border-primary/15"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
        >
          <Close className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}
