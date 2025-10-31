# Changelog

## [0.0.2] - 2025-10-29

### Added

- **Commande `init`** : Initialisation du projet avec installation automatique des dépendances
  - Détection automatique du package manager (npm, pnpm, yarn, bun)
  - Installation de `class-variance-authority`, `clsx`, `tailwind-merge`
  - Configuration optionnelle de Tailwind CSS
  - Création du fichier de configuration `behsseui.json`
  - Création du helper `cn()` pour fusionner les classes Tailwind

- **Système de configuration** : Fichier `behsseui.json` pour stocker les préférences
  - Chemin des composants configurable
  - Chemins Tailwind configurables
  - Validation avant l'ajout de composants

- **Architecture modulaire** :
  - Séparation des commandes dans `src/commands/`
  - Utilitaires dans `src/utils/`
  - Détection intelligente du package manager

### Changed

- **Commande `add`** : Vérification que le projet est initialisé avant d'ajouter des composants
- Structure du CLI refactorisée pour une meilleure maintenabilité

### Dependencies

- Ajout de `clsx` pour la manipulation de classes CSS
- Ajout de `tailwind-merge` pour fusionner intelligemment les classes Tailwind

## [0.0.1] - 2025-10-24

### Added

- Commande `add` initiale pour télécharger des composants
- Support du composant `Button`
- Téléchargement depuis GitHub registry
