import { cn } from '@/lib/utils'

interface CheckIconProps {
    className?: string
}

const Check = ({className} : CheckIconProps) => {
    return(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("text-foreground transition-colors w-2.5 aspect-square", className)}>
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}

export default Check

// Metadata de l'icon
export const iconVersion = "1.0.0"