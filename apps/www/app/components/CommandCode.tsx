"use client"
import { cn } from '@/lib/utils'
import { Button } from '@/ui/components/Button'
import Check from '@/ui/icons/Check'
import Copy from '@/ui/icons/Copy'
import Terminal from '@/ui/icons/Terminal'
import { useState, useEffect } from "react"
import { renderHighlightedCode } from '@/lib/tokenizer'
import styles from './syntax-highlighting.module.scss'

/**
 * Supprime l'indentation commune des lignes pour les template literals
 */
function dedent(str: string): string {
    const lines = str.split('\n')

    // Supprimer les lignes vides au début et à la fin
    while (lines.length > 0 && lines[0].trim() === '') lines.shift()
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop()

    if (lines.length === 0) return ''

    // Trouver l'indentation minimale (ignorer les lignes vides)
    const minIndent = lines
        .filter(line => line.trim().length > 0)
        .reduce((min, line) => {
            const indent = line.match(/^\s*/)?.[0].length ?? 0
            return Math.min(min, indent)
        }, Infinity)

    // Supprimer cette indentation de chaque ligne
    return lines.map(line => line.slice(minIndent)).join('\n')
}

interface CommandCodeProps {
    fileName : string
    components? : {
        id : number,
        name : string,
        command : string
    }[]
    sourceFileName?: string // Nom du fichier source à afficher depuis sourceFiles
    sourceFileCode?: string // Le code du fichier source
    rawCode?: string // Code brut à afficher directement
    showLineNumbers?: boolean // Afficher les numéros de ligne
}

const CommandCode = ({fileName, components, sourceFileName, sourceFileCode, rawCode, showLineNumbers = false} : CommandCodeProps) => {
    // Déterminer le type de contenu à afficher (par ordre de priorité)
    const isRawCode = !!rawCode
    const isSourceFile = !!(sourceFileName && sourceFileCode)

    // Si on a du raw code, on l'affiche (après avoir supprimé l'indentation), sinon on regarde si c'est un fichier source, sinon on affiche les components
    const displayData = isRawCode
        ? [{ id: 1, name: fileName, command: dedent(rawCode) }]
        : isSourceFile
        ? [{ id: 1, name: sourceFileName, command: sourceFileCode }]
        : (components || [])

    const [active, setActive] = useState(displayData[0] ?? null)
    const [copied, setCopied] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    // Mettre à jour active quand displayData change
    useEffect(() => {
        setActive(displayData[0] ?? null)
    }, [sourceFileName, sourceFileCode])

    const handleCopy = async () => {
        if (active?.command) {
            try {
                await navigator.clipboard.writeText(active.command)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Failed to copy:', err)
            }
        }
    }

    // Compter les lignes pour savoir si on doit afficher "expand"
    const lineCount = active?.command.split('\n').length || 0
    const shouldShowExpand = lineCount > 20 // Environ 50vh de contenu

    return (
        <div className='w-full min-w-0 rounded-lg border bg-muted/50'>
            <div className='flex items-center justify-between border-b p-2'>
                <div className='flex items-center gap-2 px-3'>
                    <Terminal className='w-3'/>
                    <p className='text-sm'>{fileName}</p>
                </div>
                <div className='flex items-center gap-1'>
                    {/* Afficher les onglets npm/pnpm/yarn/bun uniquement si ce ne sont pas des fichiers sources ou du raw code */}
                    {!isSourceFile && !isRawCode && displayData.map((component) => (
                        <Button
                            key={component.id}
                            variant="ghost"
                            className={cn("border border-transparent text-xs px-3", active?.id === component.id && "border-border bg-background/50 hover:bg-background/50")}
                            onClick={() => setActive(component)}
                            >
                                {component.name}
                        </Button>
                    ))}
                    {shouldShowExpand && (
                        <Button
                            variant='ghost'
                            className='h-8 px-3 text-xs'
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Collapse' : 'Expand'}
                        </Button>
                    )}
                    <Button variant='ghost' className='h-8 px-3' onClick={handleCopy}>
                        {copied ? <Check className='w-3.5'/> : <Copy className='w-3.5'/>}
                    </Button>
                </div>
            </div>
            <div className='relative min-w-0 group'>
                <pre className={cn(
                    'px-6 py-6 overflow-x-auto whitespace-pre w-full scrollbar-vertical-hide hover:scrollbar-default',
                    !isExpanded && shouldShowExpand ? 'max-h-[30vh]' : '',
                    'overflow-y-auto'
                )}>
                    <code className={cn('text-sm block min-w-0', styles.code)}>
                        {active && (showLineNumbers ? (
                            active.command.split('\n').map((line, index) => (
                                <div key={index} className="flex">
                                    <span className="select-none text-muted-foreground pr-4 text-right" style={{minWidth: '2.5rem'}}>
                                        {index + 1}
                                    </span>
                                    <span className="flex-1">{renderHighlightedCode(line)}</span>
                                </div>
                            ))
                        ) : (
                            renderHighlightedCode(active.command)
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default CommandCode  