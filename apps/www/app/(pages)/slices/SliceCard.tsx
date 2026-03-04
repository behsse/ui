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
import CommandCode from "@/app/components/CommandCode"

/**
 * Transforme le code source d'une slice pour afficher le nom générique
 * ex: "export function Navbar01" -> "export function Navbar"
 * Retire les numéros à la fin du nom de la fonction exportée
 */
function renameSliceCode(code: string, sourceFileName: string): { code: string; fileName: string } {
  // Extraire le nom de base sans extension (ex: "Navbar01" depuis "Navbar01.tsx")
  const baseName = sourceFileName.replace(/\.tsx?$/, "")
  // Retirer les chiffres à la fin pour obtenir le nom générique (ex: "Navbar")
  const genericName = baseName.replace(/\d+$/, "")

  if (genericName === baseName) {
    return { code, fileName: sourceFileName }
  }

  // Remplacer toutes les occurrences du nom numéroté par le nom générique dans le code
  const renamedCode = code.replace(new RegExp(baseName, "g"), genericName)
  const renamedFileName = sourceFileName.replace(baseName, genericName)

  return { code: renamedCode, fileName: renamedFileName }
}

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
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const currentCommand = slice.commands.find(cmd => cmd.name === selectedPackageManager)?.command || ""
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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "resize" && event.data.slug === slug) {
        const newHeight = event.data.height
        setIframeHeight(newHeight)
        setContainerHeight(newHeight)
        setIframeReady(true)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [slug])

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
    <div className="space-y-3">
      {/* Title & description above the card */}
      <div>
        <h3 className="text-lg font-semibold">{slice.name}</h3>
        <p className="text-sm text-muted-foreground">{slice.description}</p>
      </div>

      {/* Card */}
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <div className="flex items-center gap-1">
            <Button
              variant={showCode ? "ghost" : "secondary"}
              size="small"
              onClick={() => setShowCode(false)}
              className="text-xs h-7 px-3"
            >
              Preview
            </Button>
            <Button
              variant={showCode ? "secondary" : "ghost"}
              size="small"
              onClick={() => setShowCode(true)}
              className="text-xs h-7 px-3"
            >
              Code
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport toggles - only in preview mode */}
            {!showCode && (
              <div className="hidden sm:flex items-center border border-border rounded-md p-0.5">
                <button
                  onClick={() => setViewport("desktop")}
                  className={cn(
                    "p-1 rounded transition-colors",
                    viewport === "desktop"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Desktop (1200px)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={cn(
                    "p-1 rounded transition-colors",
                    viewport === "tablet"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={cn(
                    "p-1 rounded transition-colors",
                    viewport === "mobile"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* CLI Command with Select - only in preview mode */}
            {!showCode && (
              <div className="hidden md:flex items-center">
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
                    {copied ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Preview - always mounted, toggled with hidden */}
        <div
          className={cn(
            "bg-muted/10 flex justify-center items-start p-4 overflow-hidden relative",
            showCode && "hidden"
          )}
          style={{ height: `${containerHeight + 32}px` }}
        >
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
              viewport !== "desktop" && "shadow-lg",
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

        {/* Code - inside the card, no extra border/rounding */}
        {showCode && sourceFiles[0] && (() => {
          const renamed = renameSliceCode(sourceFiles[0].code, sourceFiles[0].file)
          return (
            <CommandCode
              fileName={renamed.fileName}
              sourceFileName={renamed.fileName}
              sourceFileCode={renamed.code}
              showLineNumbers
              embedded
              maxHeight={containerHeight}
            />
          )
        })()}
      </div>
    </div>
  )
}
