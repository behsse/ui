import { cn } from '@/lib/utils'

interface XIconProps {
    className?: string
}

const X = ({ className }: XIconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={cn(
                "fill-foreground transition-colors w-2.5 aspect-square",
                className
            )}
        >
            <path d="M3.4.61C2.62-.17,1.36-.17.58.61-.2,1.39-.2,2.66.58,3.44l8.58,8.57L.58,20.59c-.78.78-.78,2.05,0,2.83.78.78,2.05.78,2.83,0l8.57-8.58,8.58,8.57c.78.78,2.05.78,2.83,0,.78-.78.78-2.05,0-2.83l-8.58-8.57L23.38,3.43c.78-.78.78-2.05,0-2.83-.78-.78-2.05-.78-2.83,0l-8.57,8.58L3.4.61Z"/>
        </svg>
    )
}

export default X
