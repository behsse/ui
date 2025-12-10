# Changelog

Dernières mises à jour et annonces du projet.

---

## v0.0.2
**29 Octobre 2025**

Une mise à jour majeure pour l'expérience développeur (DX). Nous avons introduit un système de configuration complet et rendu l'initialisation beaucoup plus intelligente.

### 🚀 Nouveautés

- **Commande `init` intelligente :**
  Lancement rapide de votre projet avec une seule commande.
  - Détection automatique du gestionnaire de paquets (npm, pnpm, yarn, bun).
  - Installation automatique des dépendances clés (`class-variance-authority`, `clsx`, `tailwind-merge`).
  - Configuration optionnelle de Tailwind CSS si non détecté.
  - Création du fichier `cn()` helper automatiquement.

- **Fichier `behsseui.json` :**
  Nous sauvegardons désormais vos préférences de configuration pour ne pas vous les redemander à chaque commande.
  - Stockage des chemins (components, utils, ui).
  - Validation de la configuration avant l'ajout de composants.

- **Architecture Modulaire :**
  Refonte interne du CLI pour séparer proprement la logique des commandes (`src/commands/`) et les utilitaires.

### 💅 Améliorations

- **Commande `add` sécurisée :** Le CLI vérifie maintenant que le projet est bien initialisé (présence du fichier de config) avant de tenter d'ajouter un composant.
- Refactoring global pour une meilleure maintenabilité du code source.

### 📦 Dépendances

- Ajout de `clsx` et `tailwind-merge` pour la gestion conditionnelle des classes CSS et la résolution des conflits Tailwind.

---

## v0.0.1
**24 Octobre 2025**

Lancement initial du projet **BehsseUI CLI**.

### 🚀 Nouveautés

- **Lancement du CLI :** Première version fonctionnelle.
- **Commande `add` :** Possibilité de télécharger des composants depuis le registre GitHub.
- **Nouveau Composant :** Support initial du composant `Button`.