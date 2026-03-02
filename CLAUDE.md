# Space Landing Page

Marketing landing page for Space — a cycling/sports training club. Single-page with full-screen GSAP-driven section transitions (no native scroll).

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
├── App.tsx                  # Master: all refs, goTo() switch, GSAP Observer setup
├── App.css                  # Monolithic stylesheet (~1005 lines), all component styles
├── index.css                # Global resets, CSS variables, Tailwind directives
├── assets/
│   ├── images/              # Optimized images (compressed for Vercel)
│   ├── svg/                 # SVG components and static assets
│   └── fonts/               # Custom fonts
└── components/
    ├── Navbar.tsx            # LiquidGlass navbar, triggers goToRef callbacks
    ├── RightOrnament.tsx     # Race SVG with self-contained entrance animation
    ├── FlipCard.tsx          # CSS 3D flip card (pure presentational)
    ├── StatItem.tsx          # Icon + CountUp + label
    ├── ScaffoldOverlay.tsx   # "Optimized for larger screens" warning
    ├── CountUp.tsx           # Animated number counter (Framer Motion spring)
    ├── ScrollReveal.tsx      # GSAP ScrollTrigger text reveal (not active in sections)
    ├── GlassSurface.tsx      # SVG displacement filter (complex, not used in sections)
    └── sections/             # One file per full-screen section (see docs below)
```

## Build & Dev Commands

```bash
npm run dev      # Start Vite HMR dev server
npm run build    # tsc -b && vite build → dist/
npm run lint     # ESLint
```

Path alias `@/*` resolves to `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

## Critical Constraints

- **Do not modify** the GSAP Observer config (`App.tsx:~251`) or the 400ms `setTimeout` hotfix in `onComplete` callbacks — these prevent scroll-overlap bugs.
- **Do not add native scroll** to any section. Navigation is GSAP-only.
- `ref as any` casts on `<section>` elements are intentional — `forwardRef<HTMLDivElement>` vs `HTMLElement` mismatch.
- `AfterFounderSection` returns a `<>` fragment (overlay div + section) — this is required by the animation architecture.
- `App.css` has a Google Fonts `@import` warning — existing issue, not an error.

## Sections (index → component)

| Index | Component |
|-------|-----------|
| 0 | `HeroSection` |
| 1 | `FounderSection` |
| 2 | `AfterFounderSection` |
| 3 | `BeforeWhoWeTrainSection` |
| 4 | `WhoWeTrainSection` |
| 5 | `WhoWeTrainSecondSection` |

## Additional Documentation

| File | When to check |
|------|---------------|
| `.claude/docs/architectural_patterns.md` | Before touching navigation, refs, handles, or animation logic |
