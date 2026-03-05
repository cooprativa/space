# Space Landing Page

Marketing landing page for Space — a cycling/sports training club. Single-page app with full-screen GSAP-driven section transitions; no native scroll anywhere.

## Tech Stack

- **React 19 + TypeScript** (strict mode, ES2022 target)
- **Vite 7** — dev server and bundler
- **GSAP 3.14** — all section transitions + Observer plugin (replaces native scroll)
- **Framer Motion** (`motion/react`) — used only in `CountUp.tsx`
- **TailwindCSS 4** — utility classes via `@tailwindcss/vite`
- **liquid-glass-react** — glassmorphism effect in Navbar

## Key Directories

```
src/
├── App.tsx              # Master: all refs, goTo() switch (14 cases), GSAP Observer setup (~696 lines)
├── App.css              # Monolithic stylesheet (~1810 lines), all component styles
├── index.css            # Global resets, CSS variables, Tailwind directives
├── assets/
│   ├── images/          # Optimized images (compressed for Vercel)
│   ├── svg/             # SVG assets and card decoration images
│   └── fonts/           # Custom fonts (Coolvetica, Montserrat)
└── components/
    ├── sections/         # One file per full-screen section (14 total, see table below)
    ├── Navbar.tsx        # LiquidGlass navbar, triggers goToRef callbacks
    ├── RightOrnament.tsx # Race SVG with self-contained entrance animation
    ├── FlipCard.tsx      # CSS 3D flip card (pure presentational)
    ├── ResultsCard.tsx   # Results carousel card
    ├── ContactForm.tsx   # Validated contact form
    ├── ChevronOrnaments.tsx # 4 animated chevron SVGs, driven by App.tsx goTo() cases 6–13
    ├── ContactsRunner.tsx# Animated runner SVG for contacts section
    ├── StatItem.tsx      # Icon + CountUp + label
    ├── ScaffoldOverlay.tsx # "Optimized for larger screens" warning overlay
    └── CountUp.tsx       # Animated number counter (Framer Motion spring)
```

## Sections (index → component)

| Index | Component | Comment |
|-------|-----------|---------|
| 0 | `HeroSection` | |
| 1 | `FounderSection` | |
| 2 | `AfterFounderSection` | Returns `<>` fragment — see architectural_patterns.md |
| 3 | `BeforeWhoWeTrainSection` | |
| 4 | `WhoWeTrainSection` | |
| 5 | `WhoWeTrainSecondSection` | FlipCard grid |
| 6 | `WhoWeTrainThirdSection` | |
| 7 | `MeetTheTeamSection` | |
| 8 | `MeetTheTeamSecondSection` | |
| 9 | `OurCoachesSection` | |
| 10 | `CoachesCTASection` | |
| 11 | `RunnerSeparatorSection` | |
| 12 | `ResultsSection` | Auto-scrolling carousel |
| 13 | `ContactsSection` | Validated form |
| 14 | `FooterSection` | |

## Build & Dev Commands

```bash
npm run dev      # Start Vite HMR dev server
npm run build    # tsc -b && vite build → dist/
npm run lint     # ESLint
```

Path alias `@/*` → `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

## Critical Constraints

- **Do not modify** the GSAP Observer config (`App.tsx:638`) or the `isAnimating` gate — these prevent scroll-overlap bugs.
- **Do not add native scroll** to any section. Navigation is 100% GSAP-driven.
- `ref as any` casts on `<section>` elements are intentional — `forwardRef<HTMLDivElement>` vs `HTMLElement` mismatch.
- `AfterFounderSection` returns a `<>` fragment (overlay div + section) — required by animation architecture (`App.tsx:709`).
- `App.css` has a Google Fonts `@import` warning — existing issue, not an error.
- `FlipCard` svg-front decoration must stay inside `.flip-card-front` (not `.flip-card-inner`) to inherit `backface-visibility: hidden`.
- `ChevronOrnaments` uses GSAP `xPercent: -50, yPercent: -50` for centering (no CSS transform) — do not add CSS transforms to `.chevron-svg` or they will conflict with GSAP.

## Additional Documentation

| File | When to check |
|------|---------------|
| `.claude/docs/architectural_patterns.md` | Before touching navigation, refs, handles, animation logic, or FlipCard CSS |
