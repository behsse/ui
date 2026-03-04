import { notFound } from "next/navigation"
import { slices } from "@/data/slices"
import { slicePreviews } from "@/data/slice-previews"
import PreviewClient from "./PreviewClient"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(slices).map((slug) => ({ slug }))
}

export default async function SlicePreviewPage({ params }: PageProps) {
  const { slug } = await params

  if (!slices[slug] || !slicePreviews[slug]) {
    notFound()
  }

  return (
    <PreviewClient slug={slug}>
      {slicePreviews[slug]}
    </PreviewClient>
  )
}
