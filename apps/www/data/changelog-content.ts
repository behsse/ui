// Ce fichier est généré automatiquement par scripts/generate-changelog.mjs
// Ne pas modifier manuellement

export const changelogContent = `# Changelog

Latest updates and announcements from the project.

---

## v0.3.0
**January 27, 2026**

A massive update focused on expanding the component library! This release introduces **10 new components** and several new icons, making BehsseUI a more complete design system.

### 🧩 Components

**New Components Added:**
- **Accordion:** Collapsible content sections with smooth animations
- **Alert:** Contextual feedback messages with multiple variants (default, destructive, success, warning)
- **AlertDialog:** Modal dialogs for important confirmations with action and cancel buttons
- **Avatar:** User profile images with fallback support
- **Badge:** Small status indicators with multiple variants
- **Breadcrumb:** Navigation trail for hierarchical page structures
- **Calendar:** Date picker supporting single, range, and multiple selection modes
- **Card:** Flexible container component with header, content, and footer sections
- **Carousel:** Image/content slider with autoplay, loop, dots navigation, and vertical mode support
- **Checkbox:** Form input with disabled state, labels, and group support
- **Dialog:** Modal overlay system with customizable header, footer, and close functionality

**Component Enhancements:**
- **Button:** Added \`size\` and \`iconSize\` variants for more flexibility

### 🎨 Icons & Assets

**New Icons Added:**
- AlertCircle
- AlertTriangle
- ArrowUpRight
- CheckCircle
- ChevronLeft
- ChevronRight
- Info

**Icon Updates:**
- **Check:** Redesigned to match Lucide icon style

### 📚 Documentation

- Complete documentation for all new components with interactive previews
- Usage examples including controlled/uncontrolled modes
- Group examples for Checkbox component

### 🌐 Website

- New landing page with improved design
- Enhanced responsive design across all pages
- Copy-paste functionality for init command
- Animated hover effects on Get Started button

### 🔜 Coming Soon
- **More Components:** Input, Select, Tabs, Toast, and more
- **Slices:** Pre-built sections (Hero, Navbar, Footer) to build pages faster

---

## v0.2.0
**December 19, 2025**

We are thrilled to introduce the full **Icon System** integration. Following our initial launch, this update bridges the gap between the documentation and the CLI, allowing you to browse, search, and install icons directly into your application.

### 📚 Documentation
- **Icon Library:** A brand new Icons page is now live! You can search, filter, and preview the growing collection of SVG icons.
- **Interactive Features:** Easily copy icon names or installation commands directly from the UI.
- **Usage Guides:** Updated documentation on how to import and customize icons within your components.

### 🛠️ CLI Features
- **Icon Installation:** The \`add\` command has been upgraded. You can now add specific icons directly to your project (e.g., \`pnpm dlx behsseui@latest add -i Github\`).
- **Streamlined Logic:** The CLI intelligently handles icon dependencies to ensure they are placed correctly in your project structure.

### 🎨 Icons & Assets
**New Icons Added:** The library has been populated with the first set of essential system icons:
- Check
- Close
- Copy
- File
- Github
- Search
- Terminal

### 🔜 Coming Soon
- **More Icons:** We are actively working on expanding the icon set with common UI elements (arrows, social media, user actions).
- **Slices:** Pre-built sections (Hero, Navbar, etc.) to build pages faster are still in development.

---

## v0.1.0
**December 10, 2025**

We are excited to announce the launch of the official **documentation site** and the stable release of the Core CLI. You can now scaffold your project and install your first component.

### 📚 Documentation
- **Official Site:** The documentation is now live! It covers installation, CLI usage, and component customization.
- **Framework Support:** Guides available for **Next.js** and **Vite** integration.

### 🛠️ CLI Features
- **Project Initialization:** The \`init\` command now fully supports automatic dependency detection and Tailwind CSS configuration.
- **Add Components:** The \`add\` command is stable and ready to inject code into your project.
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

- **Smart \`init\` command:**
  Jumpstart your project with a single command.
  - Automatic package manager detection (npm, pnpm, yarn, bun).
  - Automatic installation of key dependencies (\`class-variance-authority\`, \`clsx\`, \`tailwind-merge\`).
  - Optional Tailwind CSS configuration if not detected.
  - Automatic creation of the \`cn()\` helper file.

- **\`behsseui.json\` file:**
  We now save your configuration preferences so we don't have to ask for them with every command.
  - Path storage (components, utils, ui).
  - Configuration validation before adding components.

- **Modular Architecture:**
  Internal CLI overhaul to cleanly separate command logic (\`src/commands/\`) from utilities.

### 💅 Improvements

- **Secure \`add\` command:** The CLI now verifies that the project is properly initialized (config file present) before attempting to add a component.
- Global refactoring for better source code maintainability.

### 📦 Dependencies

- Added \`clsx\` and \`tailwind-merge\` for conditional CSS class management and smart Tailwind conflict resolution.

---

## v0.0.1
**October 24, 2025**

Initial launch of the **BehsseUI CLI** project.

### 🚀 New Features

- **CLI Launch:** First functional version.
- **\`add\` command:** Ability to download components from the GitHub registry.
- **New Component:** Initial support for the \`Button\` component.`
