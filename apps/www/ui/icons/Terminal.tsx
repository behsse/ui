import { cn } from '@/lib/utils'

interface TerminalIconProps {
    className?: string
}

const Terminal = ({className} : TerminalIconProps) => {
    return (
    <svg viewBox="0 0 24 24" className={cn("fill-foreground transition-colors w-2.5 aspect-square", className)}>
        <path d="M20.92,0.01H3.08C1.38,0.01,0,1.39,0,3.09v17.83C0,22.62,1.38,24,3.08,24h17.84c1.7,0,3.08-1.38,3.08-3.08V3.09 C24,1.39,22.62,0.01,20.92,0.01z M9.8,12.28c-0.02,0.02-0.04,0.02-0.05,0.04l-4.48,4.48c-0.49,0.49-1.28,0.49-1.76,0 s-0.49-1.27,0-1.76l2.99-2.99c0.36-0.36,0.36-0.94,0-1.29L3.51,7.74c-0.49-0.49-0.49-1.27,0-1.76c0.49-0.49,1.28-0.49,1.76,0 l4.48,4.48c0.02,0.01,0.04,0.02,0.05,0.04c0.25,0.25,0.37,0.57,0.36,0.89C10.17,11.71,10.05,12.03,9.8,12.28z M19.61,18.39h-7.97 c-0.69,0-1.25-0.56-1.25-1.25c0-0.69,0.56-1.25,1.25-1.25h7.97c0.69,0,1.25,0.56,1.25,1.25C20.86,17.83,20.3,18.39,19.61,18.39z"/>
    </svg>
    )
}

export default Terminal

// Metadata de l'icon
export const iconVersion = "1.0.0"