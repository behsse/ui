# Changelog

Latest updates and announcements from the project.

---

## v0.4.0
**March 4, 2026**

A major release introducing **Slices** — pre-built, responsive page sections ready to drop into any project. This update also adds **8 new components**, **5 new icons**, and a brand new Slices showcase page.

### 🧩 Components

**New Components Added:**
- **Drawer:** Slide-out panel from screen edges
- **DropdownMenu:** Accessible dropdown menus with keyboard navigation
- **HoverCard:** Rich content popups on hover
- **Input:** Text input field with multiple variants
- **InputOTP:** One-time password input with segmented fields
- **Pagination:** Page navigation with previous/next and page numbers
- **Progress:** Progress bar with customizable value
- **Select:** Dropdown select input with search and groups

### 🎨 Icons & Assets

**New Icons Added:**
- ChevronDown
- Menu
- Monitor
- Smartphone
- Tablet

### 🧱 Slices

The biggest addition of this release. **Slices** are complete, responsive page sections built with BehsseUI components that you can install with a single CLI command.

**4 Categories, 9 Slices:**

- **Navbars**
  - Navbar 01 — Simple responsive navbar with logo, navigation links, and CTA buttons
  - Navbar 02 — Navbar with centered search bar and navigation links
- **Heroes**
  - Hero 01 — Centered hero section with badge, headline, and action buttons
  - Hero 02 — Split hero section with email signup form
- **Pricing**
  - Pricing 01 — Simple 3-tier pricing cards with highlighted popular plan
  - Pricing 02 — Pricing cards with monthly/yearly toggle and savings badge
  - Pricing 03 — Minimalist 2-card pricing comparison
- **Footers**
  - Footer 01 — Footer with logo, link columns, and social icons
  - Footer 02 — Footer with newsletter signup and link columns

**CLI Support:**
- Install any slice with `pnpm dlx behsseui add slices/Pricing01`
- Slices automatically install their component and icon dependencies

### 🌐 Website

- **Slices Showcase:** New dedicated `/slices` page with category browsing and interactive previews
- **Responsive Preview:** Live iframe preview with desktop, tablet, and mobile viewport toggles
- **Code Display:** View and copy the full source code of each slice

### 🔜 Coming Soon
- **More Components:** Tabs, Toast, Tooltip, and more
- **More Slices:** FAQ, Testimonials, Features, CTA sections
- **Themes:** Theme customization page with multiple presets
- **Colors:** Color palette documentation and customization

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
- **Button:** Added `size` and `iconSize` variants for more flexibility

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
- **Icon Installation:** The `add` command has been upgraded. You can now add specific icons directly to your project (e.g., `pnpm dlx behsseui@latest add -i Github`).
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