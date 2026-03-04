import { cn } from '@/lib/utils'

interface TabletIconProps {
    className?: string
}

const Tablet = ({className} : TabletIconProps) => {
    return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("w-4 h-4", className)}>
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
        <line x1="12" x2="12.01" y1="18" y2="18"/>
    </svg>
    )
}

export default Tablet

// Metadata de l'icon
export const iconVersion = "1.0.0"
