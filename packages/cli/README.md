# behsseui

CLI pour ajouter des composants UI behsseui dans vos projets React.

## Installation

Aucune installation nécessaire ! Utilisez directement avec `npx` :

```bash
npx behsseui add Button
```

## Utilisation

### Ajouter un composant

```bash
npx behsseui add <component-name>
```

Exemple :
```bash
npx behsseui add Button
```

Cette commande va :
1. Créer un dossier `ui` dans votre projet
2. Télécharger le composant depuis le registry GitHub
3. Copier le fichier dans `./ui/Button.tsx`

### Importer le composant

```tsx
import { Button } from "./ui/Button";

export default function App() {
  return <Button>Click me</Button>;
}
```

## Composants disponibles

- `Button` - Composant bouton avec variants et tailles

## Repository

[https://github.com/behsse/ui](https://github.com/behsse/ui)

## License

MIT
