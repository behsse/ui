import { cn } from '@/lib/utils'

interface LineNumbersIconProps {
    className?: string
}

const LineNumbers = ({className} : LineNumbersIconProps) => {
    return(
        <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current transition-colors w-3.5 aspect-square", className)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h12M6 12h12M6 18h12M2 6h1M2 12h1M2 18h1"/>
        </svg>
    )
}

export default LineNumbers
