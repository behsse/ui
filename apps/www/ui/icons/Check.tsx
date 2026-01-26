import { cn } from '@/lib/utils'

interface CheckIconProps {
    className?: string
}

const Check = ({className} : CheckIconProps) => {
    return(
        <svg viewBox="0 0 24 24" className={cn("fill-foreground transition-colors w-2.5 aspect-square", className)}>
            <path d="M23.98,2.31c-0.07-0.44-0.3-0.85-0.69-1.13l0.01-0.01c-0.77-0.56-1.84-0.39-2.39,0.38l-7.77,10.68l-4.77,6.55
                l-5.44-5.44c-0.6-0.6-1.53-0.66-2.19-0.19c-0.1,0.06-0.19,0.14-0.28,0.23c-0.67,0.67-0.67,1.76,0,2.43l6.84,6.84
                c0.48,0.48,1.17,0.61,1.77,0.41c0.01,0,0.01,0,0.02,0c0.06-0.02,0.12-0.05,0.17-0.07c0.28-0.12,0.52-0.3,0.71-0.55l0.02-0.03
                c0.02-0.03,0.05-0.05,0.07-0.08L23.67,3.61C23.96,3.22,24.05,2.75,23.98,2.31z"/>
        </svg>
    )
}

export default Check

// Metadata de l'icon
export const iconVersion = "1.0.0"