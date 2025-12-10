# Changelog

Latest updates and announcements from the project.

---

## v0.1.0
**December 10, 2025**

We are excited to announce the launch of the official **documentation site** and the stable release of the Core CLI. You can now scaffold your project and install your first component.

### 📚 Documentation
- **Official Site:** The documentation is now live! It covers installation, CLI usage, and component customization.
- **Framework Support:** Guides available for **Next.js** and **Vite** integration.

### 🛠️ CLI Features
- **Project Initialization:** The `init` command now fully supports automatic dependency detection and Tailwind CSS configuration.
- **Add Components:** The `add` command is stable and ready to inject code into your project.
- **Icon Architecture:** The underlying system for managing and installing icons is now in place (library population starting soon).

### 🧩 Components
- **Button:** The first component is available! It serves as the foundation for the design system, featuring multiple variants and sizes.

### 🔜 Coming Soon
- **Icon Library:** A comprehensive set of SVG icons is being prepared.
- **Slices:** Pre-built sections (Hero, Navbar, etc.) to build pages faster.

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