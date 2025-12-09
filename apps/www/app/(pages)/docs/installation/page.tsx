import CommandCode from "@/app/components/CommandCode"
import FrameworkCard from "./components/FrameworkCard"
import { cliCommands } from "@/data/cli-commands"

const InstallationPage = () => {
    const frameworkTab = [
        {
            id : 1,
            href : "/docs/installation/next",
            logo: "/Symbol.svg",
            name: "Next.js",
            description : "Modern full-stack React framework."

        },
        {
            id : 2,
            href : "/docs/installation/vite",
            logo: "/vite.svg",
            name: "Vite",
            description : "A fast React builder for modern web development."

        },
    ]
    return (
        <main className='grid gap-16'>
            <div className="grid gap-2" id="installation">            
                <h2 className='text-4xl font-bold'>Installation</h2>
                <p className="text-muted-foreground">How to install behsse UI in your web project. It's fast, flexible, and reliable. Start by choosing your framework. Then simply follow the instructions to use behsse UI.</p>
            </div>
            <div className="grid gap-10" id="wyf">
                <div className="grid gap-2">
                    <h3 className="text-2xl font-bold">With your framework</h3>
                    <p className="text-muted-foreground">Start by selecting your preferred framework. Then, follow the instructions to initialize behsseui in your project.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {
                        frameworkTab.map((framework) => (
                            <FrameworkCard key={framework.id} href={framework.href} logo={framework.logo} name={framework.name} description={framework.description}/>
                        ))
                    }
                </div>
            </div>
            <div className="grid gap-10" id="manual">
                <div className="grid gap-2">
                    <h3 className="text-2xl font-bold">Manual</h3>
                    <p className="text-muted-foreground">Initialize behsseui in an existing project to take advantage of all its features.</p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h4 className="text-lg">Add TailwindCSS</h4>
                        <p className="text-muted-foreground">You need to install Tailwind CSS in your project.</p>
                    </div>
                    <a href="https://tailwindcss.com/docs/installation/using-vite" target="_blank" className="underline w-fit">Follow the Tailwind CSS installation instructions to get started.</a>
                </div>
                <div className="grid gap-4">
                    <h4 className="text-lg">Add dependencies</h4>
                    <CommandCode fileName="CLI" components={cliCommands.dependencies.commands}/>
                </div>
                <div className="grid gap-2">
                    <h4 className="text-lg">Configure path aliases</h4>
                    <p className="text-muted-foreground">Configure the path aliases in your <span className="font-bold">tsconfig.json</span></p>
                    <CommandCode
                        fileName="tsconfig.json"
                        rawCode={`
                            {
                              "compilerOptions": {
                                "paths": {
                                  "@/*": ["./*"]
                                }
                              }
                            }
                        `}
                        showLineNumbers={true}
                    />
                </div>
                <div className="grid gap-2">
                    <h4 className="text-lg">Configure styles</h4>
                    <p className="text-muted-foreground">Add the style to your project's global CSS file.</p>
                    <CommandCode
                        fileName="globals.css"
                        rawCode={`
                            @import "tailwindcss";

                            @source "../ui/components/**/*.tsx";

                            @custom-variant dark (&:is(.dark *));

                            @theme inline {
                              --color-background: var(--background);
                              --color-foreground: var(--foreground);
                              --font-sans: var(--font-geist-sans);
                              --font-mono: var(--font-geist-mono);
                              --color-sidebar-ring: var(--sidebar-ring);
                              --color-sidebar-border: var(--sidebar-border);
                              --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
                              --color-sidebar-accent: var(--sidebar-accent);
                              --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
                              --color-sidebar-primary: var(--sidebar-primary);
                              --color-sidebar-foreground: var(--sidebar-foreground);
                              --color-sidebar: var(--sidebar);
                              --color-chart-5: var(--chart-5);
                              --color-chart-4: var(--chart-4);
                              --color-chart-3: var(--chart-3);
                              --color-chart-2: var(--chart-2);
                              --color-chart-1: var(--chart-1);
                              --color-ring: var(--ring);
                              --color-input: var(--input);
                              --color-border: var(--border);
                              --color-destructive: var(--destructive);
                              --color-accent-foreground: var(--accent-foreground);
                              --color-accent: var(--accent);
                              --color-muted-foreground: var(--muted-foreground);
                              --color-muted: var(--muted);
                              --color-secondary-foreground: var(--secondary-foreground);
                              --color-secondary: var(--secondary);
                              --color-primary-foreground: var(--primary-foreground);
                              --color-primary: var(--primary);
                              --color-popover-foreground: var(--popover-foreground);
                              --color-popover: var(--popover);
                              --color-card-foreground: var(--card-foreground);
                              --color-card: var(--card);
                              --radius-sm: calc(var(--radius) - 4px);
                              --radius-md: calc(var(--radius) - 2px);
                              --radius-lg: var(--radius);
                              --radius-xl: calc(var(--radius) + 4px);
                              --breakpoint-3xl: 1600px;

                              --animate-accordion-down: accordion-down 0.2s ease-out;
                              --animate-accordion-up: accordion-up 0.2s ease-out;

                              --navbar-height: 3.5rem;
                            }

                            @keyframes accordion-down {
                              from {
                                  max-height: 0;
                                  opacity: 0;
                              }
                              to {
                                  max-height: 1000px;
                                  opacity: 1;
                              }
                            }

                            @keyframes accordion-up {
                              from {
                                  max-height: 1000px;
                                  opacity: 1;
                              }
                              to {
                                  max-height: 0;
                                  opacity: 0;
                              }
                            }

                            /* Default Theme - Light */
                            :root,
                            [data-theme='default'] {
                              --radius: 0.625rem;
                              --background: oklch(1 0 0);
                              --foreground: oklch(0.145 0 0);
                              --card: oklch(1 0 0);
                              --card-foreground: oklch(0.145 0 0);
                              --popover: oklch(1 0 0);
                              --popover-foreground: oklch(0.145 0 0);
                              --primary: oklch(0.205 0 0);
                              --primary-foreground: oklch(0.985 0 0);
                              --secondary: oklch(0.97 0 0);
                              --secondary-foreground: oklch(0.205 0 0);
                              --muted: oklch(0.97 0 0);
                              --muted-foreground: oklch(0.556 0 0);
                              --accent: oklch(0.97 0 0);
                              --accent-foreground: oklch(0.205 0 0);
                              --destructive: oklch(0.577 0.245 27.325);
                              --border: oklch(0.922 0 0);
                              --input: oklch(0.922 0 0);
                              --ring: oklch(0.708 0 0);
                              --chart-1: oklch(0.646 0.222 41.116);
                              --chart-2: oklch(0.6 0.118 184.704);
                              --chart-3: oklch(0.398 0.07 227.392);
                              --chart-4: oklch(0.828 0.189 84.429);
                              --chart-5: oklch(0.769 0.188 70.08);
                              --sidebar: oklch(0.985 0 0);
                              --sidebar-foreground: oklch(0.145 0 0);
                              --sidebar-primary: oklch(0.205 0 0);
                              --sidebar-primary-foreground: oklch(0.985 0 0);
                              --sidebar-accent: oklch(0.97 0 0);
                              --sidebar-accent-foreground: oklch(0.205 0 0);
                              --sidebar-border: oklch(0.922 0 0);
                              --sidebar-ring: oklch(0.708 0 0);
                            }

                            /* Default Theme - Dark */
                            .dark[data-theme='default'],
                            .dark:not([data-theme]) {
                              --background: oklch(0.145 0 0);
                              --foreground: oklch(0.985 0 0);
                              --card: oklch(0.205 0 0);
                              --card-foreground: oklch(0.985 0 0);
                              --popover: oklch(0.205 0 0);
                              --popover-foreground: oklch(0.985 0 0);
                              --primary: oklch(0.922 0 0);
                              --primary-foreground: oklch(0.205 0 0);
                              --secondary: oklch(0.269 0 0);
                              --secondary-foreground: oklch(0.985 0 0);
                              --muted: oklch(0.269 0 0);
                              --muted-foreground: oklch(0.708 0 0);
                              --accent: oklch(0.269 0 0);
                              --accent-foreground: oklch(0.985 0 0);
                              --destructive: oklch(0.704 0.191 22.216);
                              --border: oklch(1 0 0 / 10%);
                              --input: oklch(1 0 0 / 15%);
                              --ring: oklch(0.556 0 0);
                              --chart-1: oklch(0.488 0.243 264.376);
                              --chart-2: oklch(0.696 0.17 162.48);
                              --chart-3: oklch(0.769 0.188 70.08);
                              --chart-4: oklch(0.627 0.265 303.9);
                              --chart-5: oklch(0.645 0.246 16.439);
                              --sidebar: oklch(0.205 0 0);
                              --sidebar-foreground: oklch(0.985 0 0);
                              --sidebar-primary: oklch(0.488 0.243 264.376);
                              --sidebar-primary-foreground: oklch(0.985 0 0);
                              --sidebar-accent: oklch(0.269 0 0);
                              --sidebar-accent-foreground: oklch(0.985 0 0);
                              --sidebar-border: oklch(1 0 0 / 10%);
                              --sidebar-ring: oklch(0.556 0 0);
                            }

                            @layer base {
                              * {
                                  @apply border-border outline-ring/50;
                              }
                              body {
                                  @apply bg-background text-foreground;
                              }
                            }
                        `}
                        showLineNumbers={true}
                    />
                </div>
                <div className="grid gap-2">
                    <h4 className="text-lg">Create utils.ts files</h4>
                    <p className="text-muted-foreground">Create a lib folder in the root directory of your project and create the utils.ts file with this code.</p>
                    <CommandCode
                        fileName="lib/utils.ts"
                        rawCode={`
                            import { clsx, type ClassValue } from "clsx";
                            import { twMerge } from "tailwind-merge";

                            export function cn(...inputs: ClassValue[]) {
                              return twMerge(clsx(inputs));
                            }
                        `}
                        showLineNumbers={true}
                    />
                </div>
                <div className="grid gap-2 pb-14">
                    <h4 className="text-lg">Create behsseui.json files</h4>
                    <p className="text-muted-foreground">Create a behsseui.json file in the root of your project.</p>
                    <CommandCode
                        fileName="behsseui.json"
                        rawCode={`
                            {
                              "$schema": "https://behsseui.dev/schema.json",
                              "componentsDir": "./ui",
                              "libDir": "./lib",
                              "tailwind": {
                                  "css": "./app/globals.css"
                              },
                              "initialized": true
                            }
                        `}
                        showLineNumbers={true}
                    />
                </div>
            </div>
        </main>
    )
}

export default InstallationPage