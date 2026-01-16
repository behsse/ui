"use client"

import { usePathname } from "next/navigation"

export default function IconLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div>
      <div className="w-full 3xl:max-w-[1550px] 3xl:mx-auto h-full 3xl:px-20 px-4 sm:px-6 md:px-8">
        <div className="flex items-start gap-4 md:gap-6 lg:gap-10">
          {/* Contenu principal */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
