import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Category not found</h1>
      <p className="text-muted-foreground mb-8">
        The slice category you are looking for does not exist.
      </p>
      <Link
        href="/slices"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Back to Slices
      </Link>
    </div>
  )
}
