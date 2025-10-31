# behsse-ui

CLI pour ajouter des composants behsseui dans vos projets.

## Installation

```bash
npm install -g behsse-ui
# ou
pnpm add -g behsse-ui
# ou
yarn global add behsse-ui
```

## Utilisation

### 1. Initialiser votre projet

Avant d'ajouter des composants, vous devez initialiser votre projet :

```bash
behsseui init
```

Cette commande va :
- Détecter automatiquement votre package manager (npm, pnpm, yarn, bun)
- Vous demander où installer les composants (par défaut : `./ui`)
- Installer les dépendances nécessaires :
  - `class-variance-authority` - Pour gérer les variants des composants
  - `clsx` - Pour manipuler les classes CSS
  - `tailwind-merge` - Pour fusionner les classes Tailwind intelligemment
- Optionnellement installer et configurer Tailwind CSS
- Créer un fichier de configuration `behsseui.json`
- Créer un helper `cn()` dans votre dossier de composants

### 2. Ajouter des composants

Une fois initialisé, vous pouvez ajouter des composants :

```bash
behsseui add Button
```

Le composant sera téléchargé et placé dans le dossier que vous avez configuré.

### 3. Utiliser les composants

```tsx
import { Button } from "./ui/Button";

export default function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

## Composants disponibles

- `Button` - Bouton avec variants (default, destructive, outline, secondary, ghost, link)

Plus de composants à venir...

## Configuration

Le fichier `behsseui.json` à la racine de votre projet contient la configuration :

```json
{
  "$schema": "https://behsseui.dev/schema.json",
  "componentsDir": "./ui",
  "libDir": "./lib",
  "tailwind": {
    "css": "./app/globals.css"
  },
  "initialized": true
}
```

## Pourquoi cette approche ?

Contrairement aux bibliothèques de composants traditionnelles, behsseui copie le code directement dans votre projet. Cela vous donne :

- **Contrôle total** - Modifiez les composants selon vos besoins
- **Pas de dépendances cachées** - Toutes les dépendances sont visibles dans votre `package.json`
- **Pas de bloat** - Seulement les composants que vous utilisez
- **Apprentissage** - Voyez comment les composants sont construits

## Dépendances

### Obligatoires
- `class-variance-authority` - Gestion des variants
- `clsx` - Manipulation de classes
- `tailwind-merge` - Fusion intelligente de classes Tailwind

### Optionnelles
- `tailwindcss` - Framework CSS (recommandé)
- `react` - v18.0.0 ou supérieur

## Repository

[https://github.com/behsse/ui](https://github.com/behsse/ui)

## License

MIT
