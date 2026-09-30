# ☁️ vCloudOps — Official Cloud & DevOps Community Portal

> **"Architect The Cloud. Command The Future."**  
> Where student engineers build, deploy, and scale — real infrastructure, real pipelines, real community.

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.4.4-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.81.0-F59E0B?style=flat-square&logo=rust&logoColor=white)](https://oxc.rs/)
[![Status](https://img.shields.io/badge/Branch-feature%2Fhome--screen-38BDF8?style=flat-square)](https://github.com/CodeBySatyajit/vCloudOps)

---

## 📖 Overview

**vCloudOps** is a modern, high-performance community portal engineered for an official student-led Cloud Computing and DevOps club. The platform serves as the central hub for workshops, hackathons, student-led open-source cloud projects, and real-world infrastructure deployments.

The frontend is designed with an **Apple VisionOS & GDG-inspired frosted glass aesthetic**, featuring an immersive SVG cosmic universe with interactive scroll-driven parallax physics, glassmorphic UI components, and accessible motion controls.

---

## 🛠️ Complete Tech Stack

| Domain | Technology / Tool | Version | Purpose & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | **React** | `^19.2.8` | Component-based UI library utilizing modern hooks, concurrent rendering, and clean functional architecture. |
| **DOM Engine** | **ReactDOM** | `^19.2.8` | React DOM renderer supporting React 19 fiber reconciler features. |
| **Build System** | **Vite** | `^8.3.0` | Ultra-fast build engine and HMR (Hot Module Replacement) development server. |
| **Vite Plugin** | **@vitejs/plugin-react** | `^6.1.1` | Fast Refresh and Babel/SWC JSX transformation for React under Vite. |
| **Styling & Design**| **Tailwind CSS** | `^4.3.3` | Next-generation engine with `@tailwindcss/vite` integration, utility classes, and reactive dark styling. |
| **Animation Engine**| **Framer Motion** | `^13.4.4` | Production-ready motion library powering spring physics, layout animations (`layoutId`), staggered reveals, and scroll parallax hooks (`useScroll`, `useTransform`, `useSpring`). |
| **Linter & Quality**| **Oxlint** | `^1.81.0` | High-speed Rust-based linter enforcing clean React patterns and syntax hygiene. |
| **Asset Processing**| **Sharp** | `^0.35.4` | High-performance Node.js image processing library used in scripts for automated background removal and image optimization (`scripts/remove-bg.mjs`). |
| **Typography** | **Space Grotesk & JetBrains Mono** | Google Fonts | Space Grotesk (`var(--font-main)`) for futuristic headings and JetBrains Mono (`var(--font-mono)`) for engineering & terminal aesthetics. |

---

## 🤖 Agentic Skills & MCP Servers

The project development and pair programming workflow is powered by an agentic AI ecosystem utilizing specialized **Skills** and **Model Context Protocol (MCP) Servers**:

### 🔌 MCP Servers (Model Context Protocol)

- **`gemini-api_gemini-api-docs`**:
  - **Tools**: `gemini_search_docs`, `gemini_get_doc`
  - **Role**: Provides real-time, upstream search and retrieval of Google Gemini API & SDK documentation, implementation guides, and type references directly inside the editor for rapid integration and verification.

### 🧠 Agentic Skills

- **`generative_ui`**:
  - Enables rich interactive component generation, UI mockups, inline artifact previews, and visual iteration.
- **`agy-customizations`**:
  - Manages agent configurations, prompt rules, workspace hooks, skill loading priorities, and environment definitions.
- **`antigravity-guide`**:
  - Provides workflow orchestration, keybinding guidance, and project CLI standards for the Antigravity workspace.
- **Autonomous Engineering Skills**:
  - Automated code review, static analysis, accessibility validation (`prefers-reduced-motion`), and build verification.

---

## 📊 Development Status: Completed vs. Remaining

### ✅ Completed Work (Current Phase — Home Screen & Core UI)

- [x] **Project Scaffolding & Build Configuration**:
  - Configured Vite 8 with React 19 and `@tailwindcss/vite` 4.3.3.
  - Setup Oxlint configuration (`.oxlintrc.json`) and clean build pipeline.
- [x] **Apple-Inspired Floating Capsule Navbar (`src/components/Navbar.jsx`)**:
  - Frosted glass backdrop blur (`backdrop-filter: blur(24px) saturate(190%)`).
  - Animated sliding glass pill hover effect with Framer Motion `layoutId`.
  - Active section indicator spring dot.
  - Specular drop-shadow brand logo integration (`/logo.png`).
  - Full-screen responsive iOS-style glass drawer for mobile devices with body-scroll locking.
- [x] **Hero Section (`src/components/Hero.jsx`)**:
  - Staggered word-by-word entrance animation ("*Architect The Cloud. Command The Future.*").
  - Monospace animated community badge (`Official Cloud & DevOps Club`).
  - Glowing pulse Call-to-Action buttons ("*Explore Events*" and "*About the Club*").
  - Responsive community metrics counter strip (40+ Members, Events, Projects, Years).
- [x] **Mission Statement & About Teaser (`src/components/AboutTeaser.jsx`)**:
  - Viewport-triggered word-by-word text reveal with monospace styling.
  - Domain highlight badges: Cloud Architecture, CI/CD Automation, Containers & Kubernetes, DevSecOps, Observability, and Hackathons.
- [x] **Cosmic Parallax Space Background (`src/components/SpaceBackground.jsx`)**:
  - Multi-layered vector space theme with deep midnight navy void (`#050B18`).
  - Stepped pixel-cratered icy lunar planet (top-right).
  - Continental ocean exoplanet with orbiting mini-satellite moon (bottom-left).
  - Mid-distance ringed gas giant.
  - 5 floating dwarf planets and moons (Amethyst, Emerald ringed, Ruby lava, Cyan ice, and Golden pearl).
  - Twinkling pixel-art cross stars, celestial field, and dynamic shooting meteor trails.
  - Smooth spring-interpolated scroll parallax (`useSpring(useScroll())`).
- [x] **Alternative Animated Cloud Background (`src/components/CloudBackground.jsx`)**:
  - Procedural cloud-layering background system with adjustable drift speeds.
- [x] **Accessibility & Motion Optimization**:
  - Custom `useReducedMotion` hook respecting user system accessibility preferences (`prefers-reduced-motion`).
  - Optimized scroll listeners (`useScrolled`).
  - Bouncing interactive scroll indicator (`ScrollCue.jsx`).
- [x] **Automated Asset Pipelines (`scripts/remove-bg.mjs`)**:
  - Script using `sharp` to strip white backgrounds and generate transparent PNG assets for logos.

---

### ⏳ Remaining Work (Upcoming Roadmap & Modules)

- [ ] **Events & Workshops Showcase (`#events`)**:
  - [ ] Interactive event cards for upcoming cloud bootcamps, AWS/GCP certification study jams, and hackathons.
  - [ ] Modal dialogue for event RSVPs and speaker info.
  - [ ] Past events archive with photo galleries and slide decks.
- [ ] **Core Team & Contributors Section (`#team`)**:
  - [ ] Member profile cards featuring leads, coordinators, and mentors.
  - [ ] Social badges (GitHub, LinkedIn, Portfolio links).
  - [ ] Dynamic badge representation for DevOps, Cloud, and Web team roles.
- [ ] **Community Onboarding & Contact Section (`#contact`)**:
  - [ ] Interactive community join form (Discord, Slack, WhatsApp community links).
  - [ ] Contact/inquiry form with validation.
  - [ ] Newsletter subscription for club updates.
- [ ] **Projects & Labs Showcase**:
  - [ ] Interactive portfolio displaying open-source cloud architectures, Terraform modules, and Kubernetes deployments created by students.
- [ ] **Backend / CMS & Dynamic Data**:
  - [ ] Real-time member count and live RSVP counters via Firebase / Supabase / AWS Lambda.
  - [ ] Markdown or Headless CMS integration for club announcements.
- [ ] **Multi-Page Routing**:
  - [ ] Optional client-side routing (`react-router-dom`) for dedicated `/events`, `/team`, and `/blog` routes.
- [ ] **Theme Switcher**:
  - [ ] Live toggle switch between the Cosmic Space theme and Daylight Cloud theme.
- [ ] **CI/CD & Cloud Deployment Pipeline**:
  - [ ] GitHub Actions workflow for automated testing, linting (`npm run lint`), and build checks (`npm run build`).
  - [ ] Production deployment to Vercel, Netlify, or AWS (S3 + CloudFront).

---

## 📁 Project Structure

```text
vCloudOps/
├── public/
│   ├── clouds/               # High-res cloud imagery for atmospheric backdrop
│   ├── favicon.svg           # Project favicon
│   ├── icons.svg             # Community SVG sprite icons
│   └── logo.png              # Official vCloudOps high-resolution logo
├── scripts/
│   └── remove-bg.mjs         # Sharp utility script for background transparency
├── src/
│   ├── assets/               # Local static graphics and SVGs
│   ├── components/
│   │   ├── AboutTeaser.jsx   # Scroll-revealed mission briefing & domain badges
│   │   ├── CloudBackground.jsx # Alternative procedural cloud backdrop
│   │   ├── Hero.jsx          # Primary hero landing with headline & stats
│   │   ├── Navbar.jsx        # Apple VisionOS frosted glass floating navbar
│   │   ├── ScrollCue.jsx     # Scroll guidance indicator with bouncing arrow
│   │   └── SpaceBackground.jsx # Cosmic theme with SVG planets & parallax physics
│   ├── hooks/
│   │   ├── useReducedMotion.js # Motion accessibility hook
│   │   └── useScrolled.js    # Window scroll position threshold hook
│   ├── pages/
│   │   └── Home.jsx          # Root page composing background, nav, hero, and teaser
│   ├── App.css               # Component utility rules
│   ├── App.jsx               # Application entry wrapper
│   ├── index.css             # Tailwind imports, custom typography, & keyframes
│   └── main.jsx              # DOM entry point
├── .oxlintrc.json            # Oxlint configuration
├── index.html                # HTML entry template with meta tags
├── package.json              # Dependencies and run scripts
├── vite.config.js            # Vite build configuration with Tailwind plugin
└── README.md                 # Complete project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CodeBySatyajit/vCloudOps.git
   cd vCloudOps
   ```

2. **Checkout the active feature branch**:
   ```bash
   git checkout feature/home-screen
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Development Server

Start Vite with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Compile production-optimized static assets to the `dist/` directory:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Running Code Quality & Lint Checks

Run the high-speed Rust-based linter:
```bash
npm run lint
```

### Asset Background Stripping Script

Run the automated Sharp script to process transparent assets:
```bash
node scripts/remove-bg.mjs
```

---

## 🤝 Contribution Guidelines

1. **Branching Strategy**:
   - `main`: Production-ready code.
   - `feature/<feature-name>`: Active feature branches (e.g., `feature/home-screen`, `feature/events-section`).
2. **Commit Standard**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new capabilities.
   - `fix:` for bug fixes.
   - `style:` for UI/CSS modifications.
   - `docs:` for documentation updates.
3. **Verification**: Always run `npm run lint` and `npm run build` prior to submitting a pull request.

---

## 📄 License

This project is maintained for the **vCloudOps** Community.  
Built by the community, for the community.
