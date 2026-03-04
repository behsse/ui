"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/components/Button"
import type { Slice } from "@/data/slices"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/components/Select"
import Monitor from "@/ui/icons/Monitor"
import Tablet from "@/ui/icons/Tablet"
import Smartphone from "@/ui/icons/Smartphone"
import Copy from "@/ui/icons/Copy"
import Check from "@/ui/icons/Check"
import { renderHighlightedCode } from "@/lib/tokenizer"
import styles from "@/app/components/syntax-highlighting.module.scss"

type ViewportSize = "desktop" | "tablet" | "mobile"

const viewportWidths: Record<ViewportSize, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
}

interface SliceCardProps {
  slug: string
  slice: Slice
}

export default function SliceCard({ slug, slice }: SliceCardProps) {
  const [showCode, setShowCode] = useState(false)
  const [viewport, setViewport] = useState<ViewportSize>("desktop")
  const [iframeHeight, setIframeHeight] = useState(400)
  const [containerHeight, setContainerHeight] = useState(400)
  const [iframeReady, setIframeReady] = useState(false)
  const [selectedPackageManager, setSelectedPackageManager] = useState("pnpm")
  const [copied, setCopied] = useState(false)
  const [activeFile, setActiveFile] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Get the current command based on selected package manager
  const currentCommand = slice.commands.find(cmd => cmd.name === selectedPackageManager)?.command || ""

  // Get source files with their code
  const sourceFiles = slice.sourceFiles || []

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleCopyCode = async () => {
    const file = sourceFiles[activeFile]
    if (file?.code) {
      try {
        await navigator.clipboard.writeText(file.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  // Listen for height messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "resize" && event.data.slug === slug) {
        const newHeight = event.data.height
        setIframeHeight(newHeight)
        setContainerHeight(prev => Math.max(prev, newHeight))
        setIframeReady(true)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [slug])

  // Send theme to iframe when it loads or theme changes
  useEffect(() => {
    const sendTheme = () => {
      if (iframeRef.current?.contentWindow) {
        const isDark = document.documentElement.classList.contains("dark")
        iframeRef.current.contentWindow.postMessage({ type: "theme", dark: isDark }, "*")
      }
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener("load", sendTheme)
    }

    const observer = new MutationObserver(sendTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", sendTheme)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div>
          <h3 className="font-semibold">{slice.name}</h3>
          <p className="text-sm text-muted-foreground">{slice.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Viewport toggles */}
          {!showCode && (
            <div className="hidden sm:flex items-center border border-border rounded-md p-0.5 mr-2">
              <button
                onClick={() => setViewport("desktop")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewport === "desktop"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Desktop (1200px)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewport === "tablet"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Tablet (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewport === "mobile"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Mobile (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* CLI Command with Select - Input with Prefix style */}
          {!showCode && (
            <div className="hidden md:flex items-center mr-2">
              <Select value={selectedPackageManager} onValueChange={setSelectedPackageManager}>
                <SelectTrigger className="h-8 w-[90px] text-xs rounded-r-none border-r-0 bg-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pnpm">pnpm</SelectItem>
                  <SelectItem value="npx">npx</SelectItem>
                  <SelectItem value="yarn">yarn</SelectItem>
                  <SelectItem value="bun">bun</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center h-8 px-3 border border-input rounded-r-md bg-transparent">
                <code className="text-xs text-muted-foreground font-mono truncate max-w-[200px] lg:max-w-[300px]">
                  {currentCommand}
                </code>
                <button
                  onClick={handleCopyCommand}
                  className="p-1 hover:bg-muted rounded transition-colors ml-2"
                  title="Copy command"
                >
                  {copied && !showCode ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="small"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Preview" : "Code"}
          </Button>
        </div>
      </div>

      {/* Content */}
      {showCode ? (
        <div className="flex min-h-[400px]">
          {/* Sidebar - File list */}
          <div className="w-48 border-r border-border bg-muted/30 shrink-0">
            <div className="p-2 border-b border-border">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Files</span>
            </div>
            <div className="p-1">
              {sourceFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFile(index)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md transition-colors truncate",
                    activeFile === index
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  title={file.file}
                >
                  {file.file}
                </button>
              ))}
            </div>
          </div>

          {/* Code viewer */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20">
              <span className="text-sm text-muted-foreground font-mono">
                {sourceFiles[activeFile]?.file}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 hover:bg-muted rounded transition-colors"
                title="Copy code"
              >
                {copied && showCode ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <pre className="px-4 py-4 text-sm">
                <code className={cn("block", styles.code)}>
                  {sourceFiles[activeFile]?.code
                    ?.split("\n")
                    .map((line, index) => (
                      <div key={index} className="flex">
                        <span className="select-none text-muted-foreground pr-4 text-right" style={{ minWidth: "2.5rem" }}>
                          {index + 1}
                        </span>
                        <span className="flex-1">{renderHighlightedCode(line)}</span>
                      </div>
                    ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-muted/10 flex justify-center items-start p-4 overflow-hidden relative"
          style={{ height: `${containerHeight + 32}px` }}
        >
          {/* Loading skeleton */}
          {!iframeReady && (
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Loading preview...</span>
              </div>
            </div>
          )}
          <div
            className={cn(
              "transition-all duration-300 ease-out rounded-lg overflow-hidden bg-background",
              viewport !== "desktop" && "border border-border shadow-lg",
              !iframeReady && "opacity-0"
            )}
            style={{
              width: viewport === "desktop" ? "100%" : `${viewportWidths[viewport]}px`,
            }}
          >
            <iframe
              ref={iframeRef}
              src={`/slices-preview/${slug}`}
              className="border-0 block"
              loading="eager"
              style={{
                height: `${iframeHeight}px`,
                width: "100%",
                overflow: "hidden",
              }}
              title={`${slice.name} preview`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
