import { cn } from '@/lib/utils'

interface WordWrapIconProps {
    className?: string
}

const WordWrap = ({className} : WordWrapIconProps) => {
    return(
        <svg viewBox="0 0 24 24" className={cn("fill-foreground transition-colors w-2.5 aspect-square", className)}>
            <path d="M4 7h16v2H4V7zm0 4h16v2H4v-2zm0 4h10v2H4v-2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 2l3-3-3-3v2H4v2h10v2z"/>
        </svg>
    )
}

export default WordWrap
