import { cn } from '@/lib/utils'

interface MonitorIconProps {
    className?: string
}

const Monitor = ({className} : MonitorIconProps) => {
    return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("w-4 h-4", className)}>
        <rect width="20" height="14" x="2" y="3" rx="2"/>
        <line x1="8" x2="16" y1="21" y2="21"/>
        <line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
    )
}

export default Monitor

// Metadata de l'icon
export const iconVersion = "1.0.0"
