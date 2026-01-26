import type { ReactNode } from "react"

// Import des icônes
import Close from "@/ui/icons/Close"
import Search from "@/ui/icons/Search"
import File from "@/ui/icons/File"
import Terminal from "@/ui/icons/Terminal"
import Copy from "@/ui/icons/Copy"
import Check from "@/ui/icons/Check"
import { Github } from "@/ui/icons/Github"
import Info from "@/ui/icons/Info"
import AlertCircle from "@/ui/icons/AlertCircle"
import CheckCircle from "@/ui/icons/CheckCircle"
import AlertTriangle from "@/ui/icons/AlertTriangle"

// Import des versions
import { iconVersion as CloseVersion } from "@/ui/icons/Close"
import { iconVersion as SearchVersion } from "@/ui/icons/Search"
import { iconVersion as FileVersion } from "@/ui/icons/File"
import { iconVersion as TerminalVersion } from "@/ui/icons/Terminal"
import { iconVersion as CopyVersion } from "@/ui/icons/Copy"
import { iconVersion as CheckVersion } from "@/ui/icons/Check"
import { iconVersion as GithubVersion } from "@/ui/icons/Github"
import { iconVersion as InfoVersion } from "@/ui/icons/Info"
import { iconVersion as AlertCircleVersion } from "@/ui/icons/AlertCircle"
import { iconVersion as CheckCircleVersion } from "@/ui/icons/CheckCircle"
import { iconVersion as AlertTriangleVersion } from "@/ui/icons/AlertTriangle"

export interface Icon {
  name: string
  component: React.ComponentType<{ className?: string }>
  version: string
  preview: ReactNode
}

export const icons: Icon[] = [
  {
    name: "Close",
    component: Close,
    version: CloseVersion,
    preview: <Close className="w-5 h-5" />
  },
  {
    name: "Search",
    component: Search,
    version: SearchVersion,
    preview: <Search className="w-5 h-5" />
  },
  {
    name: "File",
    component: File,
    version: FileVersion,
    preview: <File className="w-5 h-5" />
  },
  {
    name: "Terminal",
    component: Terminal,
    version: TerminalVersion,
    preview: <Terminal className="w-5 h-5" />
  },
  {
    name: "Copy",
    component: Copy,
    version: CopyVersion,
    preview: <Copy className="w-5 h-5" />
  },
  {
    name: "Check",
    component: Check,
    version: CheckVersion,
    preview: <Check className="w-5 h-5" />
  },
  {
    name: "Github",
    component: Github,
    version: GithubVersion,
    preview: <Github className="w-5 h-5" />
  },
  {
    name: "Info",
    component: Info,
    version: InfoVersion,
    preview: <Info className="w-5 h-5" />
  },
  {
    name: "AlertCircle",
    component: AlertCircle,
    version: AlertCircleVersion,
    preview: <AlertCircle className="w-5 h-5" />
  },
  {
    name: "CheckCircle",
    component: CheckCircle,
    version: CheckCircleVersion,
    preview: <CheckCircle className="w-5 h-5" />
  },
  {
    name: "AlertTriangle",
    component: AlertTriangle,
    version: AlertTriangleVersion,
    preview: <AlertTriangle className="w-5 h-5" />
  }
].sort((a, b) => a.name.localeCompare(b.name))
