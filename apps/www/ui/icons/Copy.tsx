import { cn } from '@/lib/utils'

interface CopyIconProps {
    className?: string
}
const Copy = ({className} : CopyIconProps) => {
    return (
    <svg viewBox="0 0 24 24" className={cn("fill-foreground transition-colors w-2.5 aspect-square", className)}>
        <path d="M20.99,4.62h-1.61V3.01c0-1.66-1.35-3.01-3.01-3.01H3.01C1.35,0,0,1.35,0,3.01v13.36 c0,1.66,1.35,3.01,3.01,3.01h1.61v1.61c0,1.66,1.35,3.01,3.01,3.01h13.36c1.66,0,3.01-1.35,3.01-3.01V7.63 C24,5.97,22.65,4.62,20.99,4.62z M3.01,17.38C2.45,17.38,2,16.93,2,16.37V3.01C2,2.45,2.45,2,3.01,2h13.36 c0.56,0,1.01,0.45,1.01,1.01v1.61H7.63c-1.66,0-3.01,1.35-3.01,3.01v9.75H3.01z M22,20.99c0,0.56-0.45,1.01-1.01,1.01H7.63 c-0.56,0-1.01-0.45-1.01-1.01V7.63c0-0.56,0.45-1.01,1.01-1.01h13.36c0.56,0,1.01,0.45,1.01,1.01V20.99z"/>
    </svg>

    )
}

export default Copy