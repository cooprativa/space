# Space Landing Page

Marketing landing page for Space — a cycling/sports training club. Single-page app with a hybrid navigation system: GSAP Observer for sections 0-3, native scroll + ScrollTrigger for sections 4-14.

## Tech Stack

- **React 19 + TypeScript** (strict mode, ES2022 target)
- **Vite 7** — dev server and bundler
- **GSAP 3.14** — Observer (sections 0-3), ScrollTrigger (sections 4-14)
- **Framer Motion** (`motion/react`) — used only in `CountUp.tsx`
- **TailwindCSS 4** — utility classes via `@tailwindcss/vite`
- **liquid-glass-react** — glassmorphism effect in Navbar

## Key Directories

```
src/
├── App.tsx              # Master orchestrator: hybrid scroll system (~647 lines)
├── App.css              # Monolithic stylesheet (~1810 lines)
├── index.css            # Global resets, CSS variables, Tailwind directives
├── assets/              # images/, svg/, fonts/
└── components/
    ├── sections/         # One file per full-screen section (15 total, see table)
    ├── Navbar.tsx        # LiquidGlass navbar, triggers goToRef callbacks
    ├── RightOrnament.tsx # Race SVG with self-contained entrance animation
    ├── ChevronOrnaments.tsx # 4 animated chevron SVGs
    ├── FlipCard.tsx      # CSS 3D flip card
    ├── ResultsCard.tsx, ContactForm.tsx, ContactsRunner.tsx
    ├── StatItem.tsx, CountUp.tsx, ScrollReveal.tsx
    ├── GlassSurface.tsx, ScaffoldOverlay.tsx
```

## Sections (index -> component)

| Index | Component | Mode |
|-------|-----------|------|
| 0 | `HeroSection` | Observer |
| 1 | `FounderSection` | Observer |
| 2 | `AfterFounderSection` | Observer (fragment return) |
| 3 | `BeforeWhoWeTrainSection` | Observer |
| 4-6 | `WhoWeTrainSection/Second/Third` | Scroll (horizontal) |
| 7-8 | `MeetTheTeamSection/Second` | Scroll (vertical) |
| 9 | `OurCoachesSection` | Scroll (vertical) |
| 10 | `CoachesCTASection` | Scroll (vertical) |
| 11 | `RunnerSeparatorSection` | Scroll (vertical) |
| 12 | `ResultsSection` | Scroll (vertical) |
| 13 | `ContactsSection` | Scroll (vertical) |
| 14 | `FooterSection` | Scroll (vertical) |

## Build & Dev Commands

```bash
npm run dev      # Start Vite HMR dev server
npm run build    # tsc -b && vite build -> dist/
npm run lint     # ESLint
```

Path alias `@/*` -> `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

## Hybrid Scroll Architecture

Two navigation modes managed by `scrollMode` ref (`App.tsx:61`):

**Observer mode** (sections 0-3): GSAP Observer intercepts all input, `goTo()` switch animates transitions. Sections are `position: fixed` overlays.

**Scroll mode** (sections 4-14): Native scroll inside `#smooth-wrapper` (`App.tsx:618`), a fixed overlay div. Horizontal sections 4-6 use ScrollTrigger pin + scrub. Vertical sections 7-14 scroll naturally.

Mode transitions: `enterScrollMode()` (`App.tsx:130`) / `exitScrollMode()` (`App.tsx:303`). Back-navigation uses a secondary Observer with `preventDefault: false` that watches `wrapper.scrollTop <= 2`.

See `.claude/docs/architectural_patterns.md` for full details.

## Critical Constraints

- **Do not modify** the GSAP Observer config (`App.tsx:536`) or the `isAnimating` gate (`App.tsx:58`)
- `scrollMode`, `currentSection`, `isAnimating` are **refs, not state** — re-renders break GSAP mid-flight
- `#smooth-wrapper` sections use `position: relative` (not fixed) — CSS override at `App.css:27`
- `ref as any` casts on `<section>` elements are intentional
- `AfterFounderSection` returns a `<>` fragment — required by animation architecture (`App.tsx:609`)
- `FlipCard` svg-front must stay inside `.flip-card-front` (backface-visibility inheritance)
- `ChevronOrnaments` — no CSS transforms on `.chevron-svg` (GSAP conflict)
- `.navbar-blur-backdrop` must have no `transform` ancestor (backdrop-filter breaks)
- `.glass .glass__warp` filters disabled (`App.css:1513-1516`)
- `App.css` Google Fonts `@import` warning is an existing issue, not an error

## Additional Documentation

| File | When to check |
|------|---------------|
| `.claude/docs/architectural_patterns.md` | Before touching navigation, scroll modes, refs, handles, animation logic, or FlipCard CSS |
