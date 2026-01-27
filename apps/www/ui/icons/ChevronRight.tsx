import { cn } from '@/lib/utils'

interface ChevronRightProps {
  className?: string
}

const ChevronRight = ({ className }: ChevronRightProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-4 h-4", className)}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default ChevronRight

// Metadata de l'icon
export const iconVersion = "1.0.0"
