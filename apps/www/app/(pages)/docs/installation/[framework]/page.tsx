import CommandCode from "@/app/components/CommandCode"
import { cliCommands } from "@/data/cli-commands"
import { notFound } from "next/navigation"

interface FrameworkPageProps {
  params: Promise<{
    framework: string
  }>
}

// Mapping des noms de frameworks pour l'affichage
const frameworkNames: Record<string, string> = {
  next: "Next.js",
  vite: "Vite"
}

export default async function FrameworkPage({ params }: FrameworkPageProps) {
  const { framework } = await params

  // Vérifier si le framework existe dans cliCommands
  if (!cliCommands[framework]) {
    notFound()
  }

  const frameworkDisplayName = frameworkNames[framework] || framework

  return (
    <main className='grid gap-16 pb-20'>
      <div className="grid gap-2" id='create'>
        <h2 className='text-4xl font-bold'>{frameworkDisplayName}</h2>
        <p className="text-muted-foreground">Install and configure behsseui for {frameworkDisplayName}.</p>
      </div>
      <div className="grid gap-4">
        <div className='grid gap-4'>
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold">Create project</h3>
            <p className="text-muted-foreground">Run init command to create create a new {frameworkDisplayName} project with behsseui</p>
          </div>
          <CommandCode fileName="CLI" components={cliCommands[framework].commands}/>
        </div>
        <div className="grid gap-4">
          <p className="text-muted-foreground">Or in existing {frameworkDisplayName} project</p>
          <CommandCode fileName="CLI" components={cliCommands.init.commands}/>
        </div>
      </div>
      <div className="grid gap-4">
        <div className='grid gap-4' id='add'>
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold">Add components</h3>
            <p className="text-muted-foreground">You can now start adding components to your project.</p>
            <p className="text-muted-foreground">The command above will add the Button component to your project. You can then import it like this:</p>
          </div>
          <CommandCode fileName="CLI" components={cliCommands.add.commands}/>
        </div>
      </div>
    </main>
  )
}
