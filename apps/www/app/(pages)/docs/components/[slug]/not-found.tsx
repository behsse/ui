import Link from "next/link"
import { Button } from "@/ui/components/Button"

export default function NotFound() {
  return (
    <div className="container flex h-screen max-w-2xl flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Component not found</h1>
        <p className="text-muted-foreground">
          Le composant que vous recherchez n'existe pas ou a été déplacé.
        </p>
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/docs/components">Voir tous les composants</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs">Retour à la documentation</Link>
        </Button>
      </div>
    </div>
  )
}
