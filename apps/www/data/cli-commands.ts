interface Cli {
    name : string,
    commands : {
        id : number,
        name : string,
        command : string
    }[]
}

// Générateur de commandes pour différents package managers
const generateCommands = (commandTemplate: (pm: string) => string) => {
    const packageManagers = [
        { id: 1, name: "pnpm", prefix: "pnpm dlx" },
        { id: 2, name: "npm", prefix: "npx" },
        { id: 3, name: "yarn", prefix: "yarn" },
        { id: 4, name: "bun", prefix: "bunx --bun" }
    ]

    return packageManagers.map(pm => ({
        id: pm.id,
        name: pm.name,
        command: commandTemplate(pm.prefix)
    }))
}

// Générateur de commandes init avec framework spécifique
const generateInitCommands = (framework?: string): Cli => {
    const flag = framework ? ` --${framework}` : ""
    return {
        name: framework || "init",
        commands: generateCommands((prefix) => `${prefix} behsseui@latest init${flag}`)
    }
}

export const cliCommands : Record<string, Cli>= {
    dependencies: {
        name: "dependencies",
        commands: [
            { id: 1, name: "pnpm", command: "pnpm add tailwind-merge clsx" },
            { id: 2, name: "npm", command: "npm install tailwind-merge clsx" },
            { id: 3, name: "yarn", command: "yarn add tailwind-merge clsx" },
            { id: 4, name: "bun", command: "bun add tailwind-merge clsx" }
        ]
    },
    init: generateInitCommands(),
    add: {
        name: "add",
        commands: generateCommands((prefix) => `${prefix} behsseui@latest add Button`)
    },
    next: generateInitCommands("next"),
    vite: generateInitCommands("vite")
}
