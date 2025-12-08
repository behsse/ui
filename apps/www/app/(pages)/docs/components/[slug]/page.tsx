import { notFound } from "next/navigation"
import { components } from "@/data/components"
import { componentPreviews, componentExamples } from "@/data/component-previews"
import { extractCode } from "@/lib/extractCode"
import { Button } from "@/ui/components/Button"
import Link from "next/link"
import CommandCode from "@/app/components/CommandCode"

// Générer les paramètres statiques pour chaque composant
export async function generateStaticParams() {
  return Object.keys(components).map((slug) => ({
    slug: slug,
  }))
}

// Générer les métadonnées pour chaque page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = components[slug as keyof typeof components]

  if (!component) {
    return {
      title: "Component not found",
    }
  }

  return {
    title: `${component.name} - behsseui`,
    description: component.desc,
  }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = components[slug as keyof typeof components]

  if (!component) {
    notFound()
  }

  // Extraire le code source de tous les fichiers listés dans sourceFiles
  const sourceFilesWithCode = component.sourceFiles?.map(fileConfig => {
    // Support des deux formats : string ou objet SourceFile
    if (typeof fileConfig === 'string') {
      return {
        fileName: fileConfig,
        displayPath: `ui/components/${fileConfig}`,
        description: undefined,
        code: extractCode(fileConfig)
      }
    } else {
      return {
        fileName: fileConfig.file,
        displayPath: fileConfig.path,
        description: fileConfig.description,
        code: extractCode(fileConfig.file)
      }
    }
  }).filter(file => file.code && !file.code.startsWith('//')) || []

  return (
    <>
      <div className="mx-auto w-full min-w-0 max-w-4xl grid gap-8 overflow-hidden">
      {/* Header */}
      <div className="grid gap-8 min-w-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <span>/</span>
          <Link href="/docs/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-foreground">{component.name}</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">{component.name}</h1>
          <p className="text-muted-foreground mt-2">{component.desc}</p>
        </div>
      </div>

      {/* Preview & Code */}
      <div className="space-y-4 min-w-0">
        {/* Preview visuel */}
        <div className="border border-border rounded-md w-full min-w-0 h-[50vh] flex items-center justify-center">
          {componentPreviews[slug] || <p className="text-muted-foreground">Preview not available</p>}
        </div>
      </div>

      {/* Installation */}
      <div id="installation" className="py-8 space-y-4 min-w-0">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground">
          Install the component {component.name} in your project using the CLI.
        </p>

        <CommandCode fileName={`${component.name}.tsx`} components={component.commands}/>

        {/* Manual installation - Afficher tous les fichiers sources */}
        {sourceFilesWithCode.length > 0 && (
          <div className="grid gap-4 min-w-0">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg text-foreground font-bold">Install the component manually.</p>
              <p>Create a ui folder at the root of the project, then a component folder inside it, and finally a {component.name}.tsx file in that folder.</p>
              <p>Copy and paste the following code into your project.</p>
            </div>
            {sourceFilesWithCode.map((file, index) => (
              <div key={index} className="grid gap-4 min-w-0">
                {file.description && (
                  <p className="text-muted-foreground">{file.description}</p>
                )}
                <CommandCode
                  fileName={file.displayPath}
                  sourceFileName={file.fileName}
                  sourceFileCode={file.code}
                  showLineNumbers
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Examples */}
      {component.examples && component.examples.length > 0 && (
        <div id="usage" className="space-y-4 min-w-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Usages</h2>
            <p className="text-muted-foreground mt-2">
              Different variants and use cases for the {component.name} component.
            </p>
          </div>

          <div className="grid gap-8 min-w-0">
            {component.examples.map((example, index) => {
              const examplePreview = componentExamples[slug]?.[example.name]
              const exampleId = example.name.toLowerCase()

              return (
                <div id={exampleId} key={index} className="space-y-4 min-w-0">
                  <div>
                    <p className="text-lg font-semibold">{example.name}</p>
                    {example.description && (
                      <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                    )}
                  </div>

                  {/* Preview */}
                  <div className="border border-border rounded-md w-full min-w-0 p-8 flex items-center justify-center bg-background h-[50vh]">
                    {examplePreview || <p className="text-muted-foreground">Preview not available</p>}
                  </div>

                  {/* Code */}
                  <div className="min-w-0">
                    <CommandCode
                      fileName={`${example.name}.tsx`}
                      sourceFileName={`${example.name}.tsx`}
                      sourceFileCode={example.code}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="py-8 flex items-center justify-between border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/components">← Retour aux composants</Link>
        </Button>
      </div>
      </div>


    </>
  )
}
