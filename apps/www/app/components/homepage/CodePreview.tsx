export const CodePreview = () => {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border border-dashed">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Simple to use
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                    Initialize your project and add components in a few commands.
                    The code is copied directly into your project — no hidden dependencies.
                    </p>

                    <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-primary text-sm font-bold">1</span>
                        </div>
                        <div>
                        <p className="font-medium">Initialize BehsseUI</p>
                        <p className="text-sm text-muted-foreground">Automatically configures Tailwind and creates the structure</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-primary text-sm font-bold">2</span>
                        </div>
                        <div>
                        <p className="font-medium">Add components</p>
                        <p className="text-sm text-muted-foreground">Select only what you need</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-primary text-sm font-bold">3</span>
                        </div>
                        <div>
                        <p className="font-medium">Customize at will</p>
                        <p className="text-sm text-muted-foreground">The code is yours, modify it without constraints</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-r from-primary/20 via-primary/5 to-transparent rounded-2xl blur-2xl -z-10" />
                    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                        <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-muted-foreground ml-2 font-mono">terminal</span>
                    </div>
                    <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 overflow-x-auto">
                        <div>
                        <span className="text-muted-foreground">$</span>
                        <span className="ml-2">npx behsseui init</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                        <p>✓ Configuration created</p>
                        <p>✓ Tailwind CSS configured</p>
                        <p>✓ Folders created</p>
                        </div>
                        <div className="pt-2 border-t border-border">
                        <span className="text-muted-foreground">$</span>
                        <span className="ml-2">npx behsseui add button</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                        <p>✓ Button.tsx added</p>
                        <p>✓ Dependencies installed</p>
                        </div>
                        <div className="pt-2 border-t border-border">
                        <span className="text-muted-foreground">$</span>
                        <span className="ml-2">npx behsseui add -i github</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                        <p>✓ Github.tsx added to icons/</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
