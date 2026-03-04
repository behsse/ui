"use client"

import { useEffect, useLayoutEffect, useRef } from "react"

interface PreviewClientProps {
  slug: string
  children: React.ReactNode
}

export default function PreviewClient({ slug, children }: PreviewClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Send height as early as possible using useLayoutEffect
  useLayoutEffect(() => {
    const sendHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight
        window.parent.postMessage({ type: "resize", slug, height }, "*")
      }
    }

    // Send immediately
    sendHeight()

    // Also observe for any size changes
    const resizeObserver = new ResizeObserver(sendHeight)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [slug])

  // Remove scrollbar-gutter reserved space and hide scrollbars in iframe
  useLayoutEffect(() => {
    document.documentElement.style.overflow = "hidden"
    document.documentElement.style.scrollbarGutter = "auto"
  }, [])

  // Listen for theme messages from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "theme") {
        document.documentElement.classList.toggle("dark", event.data.dark)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div ref={containerRef} className="bg-background overflow-hidden">
      {children}
    </div>
  )
}
