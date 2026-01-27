import { cn } from '@/lib/utils'

interface ArrowUpRightIconProps {
    className?: string
}

const ArrowUpRight = ({className} : ArrowUpRightIconProps) => {
    return(
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-4 h-4", className)}
        >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
        </svg>
    )
}

export default ArrowUpRight

// Metadata de l'icon
export const iconVersion = "1.0.0"
