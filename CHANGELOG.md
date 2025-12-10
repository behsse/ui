# Changelog

Latest updates and announcements from the project.

---

## v0.0.2
**October 29, 2025**

A major update for the Developer Experience (DX). We introduced a complete configuration system and made the initialization process much smarter.

### 🚀 New Features

- **Smart `init` command:**
  Jumpstart your project with a single command.
  - Automatic package manager detection (npm, pnpm, yarn, bun).
  - Automatic installation of key dependencies (`class-variance-authority`, `clsx`, `tailwind-merge`).
  - Optional Tailwind CSS configuration if not detected.
  - Automatic creation of the `cn()` helper file.

- **`behsseui.json` file:**
  We now save your configuration preferences so we don't have to ask for them with every command.
  - Path storage (components, utils, ui).
  - Configuration validation before adding components.

- **Modular Architecture:**
  Internal CLI overhaul to cleanly separate command logic (`src/commands/`) from utilities.

### 💅 Improvements

- **Secure `add` command:** The CLI now verifies that the project is properly initialized (config file present) before attempting to add a component.
- Global refactoring for better source code maintainability.

### 📦 Dependencies

- Added `clsx` and `tailwind-merge` for conditional CSS class management and smart Tailwind conflict resolution.

---

## v0.0.1
**October 24, 2025**

Initial launch of the **BehsseUI CLI** project.

### 🚀 New Features

- **CLI Launch:** First functional version.
- **`add` command:** Ability to download components from the GitHub registry.
- **New Component:** Initial support for the `Button` component.