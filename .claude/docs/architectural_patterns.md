# Architectural Patterns

## 1. goToRef — Navigation Without Prop Drilling

`goTo()` is defined inside App's `useEffect` closure (closes over all GSAP refs), so it cannot be passed as a prop at render time. Instead:

- `goToRef = useRef<((index: number) => void) | null>(null)` declared at `App.tsx:54`
- After `goTo` is defined, `goToRef.current = goTo` stores it (`App.tsx:721`)
- Navbar receives stable arrow callbacks: `onHeroClick={() => goToRef.current?.(0)}` (`App.tsx:777`)

Avoids re-renders and doesn't require Context or a state manager.

## 2. useImperativeHandle Handles — Exposing Multiple DOM Refs

Section components that need to expose several DOM nodes to App's `goTo()` use this pattern instead of passing one ref per node:

1. Define a `Handle` interface with the exposed members
2. `forwardRef` + `useImperativeHandle` inside the component
3. **Getter properties** so the handle always returns the latest `.current` value (`RightOrnament.tsx:~28`)

Components using this pattern:
- `HeroSection.tsx` -> `HeroSectionHandle` (`heroEl`, `bikerEl`)
- `FounderSection.tsx` -> `FounderSectionHandle` (`founderEl`, `founderImgEl`, `estDateEl`, `badgeEl`)
- `RightOrnament.tsx` -> `RightOrnamentHandle` (`ornamentEl`, `computeLeftX()`)

App holds typed refs: `const heroRef = useRef<HeroSectionHandle>(null)` and accesses via `heroRef.current?.heroEl`.

## 3. GSAP Observer — Full-Page Navigation

`Observer.create()` at `App.tsx:724` intercepts all scroll/touch/keyboard input and routes it to `goTo()`. Native browser scroll is suppressed entirely.

- `onDown` -> `goTo(currentSection + 1)`
- `onUp` -> `goTo(currentSection - 1)`
- Keyboard: Arrow keys, PageUp/Down, Space/Shift+Space all mapped
- `isAnimating` ref (`App.tsx:57`) gates concurrent calls — `goTo()` is a no-op while a transition is running

## 4. Timeline Switch — Animation Orchestration

`goTo(index)` at `App.tsx:129` is a single `switch` with one `case` per section transition (14 cases). Each case:

1. Creates a `gsap.timeline()`
2. Animates 5–12 targets simultaneously (position, opacity, scale, color)
3. Changes ornament color: `#ACFC17` (green) for hero/founder, `#bd97ec` (purple) elsewhere
4. Resets `isAnimating` via `setTimeout(250ms)` in `onComplete`

Do not extract individual cases into separate functions — the closure over all refs is intentional and required.

## 5. Ref-Only State for Navigation

`currentSection` and `isAnimating` are **refs, not state** (`App.tsx:56-57`). Changes to these must never trigger re-renders — re-renders would reset GSAP animations mid-flight.

The only `useState` calls in App are:
- `afterFounderActive` — triggers CountUp animations via the `active` prop on `AfterFounderSection`

## 6. Self-Contained Component Animation

`RightOrnament.tsx` owns its entrance animation entirely in its own `useEffect`:
- `racePlayedRef` — ensures the animation runs once on mount
- `leaderOffsetRef` — stores the final X position so `computeLeftX()` can read it later

Keeps race animation logic out of App's already-complex `goTo` switch.

## 7. Fragment Return (AfterFounderSection)

`AfterFounderSection.tsx` returns a `<>` fragment wrapping an overlay `<div>` and a `<section>`. The overlay div must be a sibling (not child) of the section for `goTo(2)`'s GSAP animation to work. The overlay ref (`imgOverlayRef`) is passed as a prop from App (`App.tsx:794`).

## 8. startWhen Prop — Deferred Animation Trigger

`CountUp.tsx` accepts `startWhen: boolean`. When `false`, the spring stays at 0. App sets `afterFounderActive = true` inside `goTo(2)`'s `onComplete`, which flows down as `active` -> `startWhen`. Decouples counting from scroll events and ensures it only runs after the section transition completes.

## 9. FlipCard CSS Architecture

`FlipCard.tsx` uses CSS 3D transforms. Key rules in `App.css`:

- `.flip-card-inner` — `transform-style: preserve-3d`, rotates on hover
- `.flip-card-front` and `.flip-card-back` — both `position: absolute; width: 100%; height: 100%; backface-visibility: hidden`
- `.flip-card-back` has `transform: rotateY(180deg)` to hide it initially
- `.svg-front` decoration **must live inside `.flip-card-front`** (not `.flip-card-inner`) to inherit `backface-visibility: hidden` and disappear naturally during the flip
- Profile images inside `.flip-card-front` use `flex: 1; min-height: 0; object-fit: cover` to fill available space without overflowing the card bounds
- Card-specific decoration widths use `.flip-card-front > .svg-front` selector; profile image widths use `img:not(.svg-front)` to avoid the decoration being resized by those rules

## 10. Navbar Backdrop Blur Workaround

`backdrop-filter` cannot work inside `transform` ancestors (browser stacking context limitation). The LiquidGlass component applies transforms, so the blur effect must live outside it.

Solution: a separate `.navbar-blur-backdrop` div (`Navbar.tsx:88`) sits outside the transformed `.liquid-glass-navbar-container`. JS measures the `.glass` element's bounding rect and syncs width/height to the blur div (`Navbar.tsx:19-30`). CSS transition on the blur div handles smooth expand/collapse (`App.css:1482`).

Centering uses `left: 0; right: 0; margin: 0 auto` (no transform). The `.glass .glass__warp` SVG displacement filter is disabled (`App.css:1513-1516`) to prevent conflicts with backdrop-filter.
