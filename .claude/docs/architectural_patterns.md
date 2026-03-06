# Architectural Patterns

## 1. Hybrid Scroll System — Observer + Native Scroll

The app uses two navigation modes controlled by `scrollMode` ref (`App.tsx:61`):

**Observer mode (sections 0-3):** `Observer.create()` (`App.tsx:536`) intercepts all scroll/touch/keyboard input and calls `goTo()`. Sections are `position: fixed` overlays animated via GSAP timelines.

**Scroll mode (sections 4-14):** Native scroll inside `#smooth-wrapper` (`App.tsx:618`), a `position: fixed; inset: 0` div. Sections 4-6 scroll horizontally via ScrollTrigger pin+scrub. Sections 7-14 scroll vertically (natural).

### enterScrollMode (`App.tsx:130`)
1. Adds `scroll-mode-active` class to body (re-enables `touch-action: auto`)
2. Shows `#smooth-wrapper` with `overflow-y: auto`
3. Hides all Observer-zone sections via `autoAlpha: 0`
4. Clears GSAP inline transforms on scroll-zone sections (`clearProps: 'all'`)
5. Sets `ScrollTrigger.defaults({ scroller: wrapper })`
6. Creates horizontal ScrollTrigger for `.horizontal-track` (`App.tsx:160-173`)
7. Creates backObserver (`App.tsx:176`) with `preventDefault: false` — detects upward scroll at `scrollTop <= 2` to return to Observer mode
8. Sets up chevron ScrollTriggers and topBanner/contacts triggers
9. Disables main Observer

### exitScrollMode (`App.tsx:303`)
1. Kills all ScrollTriggers, resets defaults
2. Removes `scroll-mode-active` from body
3. Hides wrapper, resets `scrollTop`
4. Clears inline transforms, resets chevrons/banner/runner
5. Re-enables main Observer

### Horizontal Scroll Track
Sections 4-6 are wrapped in `.horizontal-track` (`App.tsx:621`), a `display: flex; width: 300vw` container. ScrollTrigger pins it and scrubs `xPercent: -66.67` (`App.tsx:160`).

CSS in `App.css:37-48`:
```css
.horizontal-track { display: flex; width: 300vw; height: 100vh; }
.horizontal-track .section { width: 100vw; flex-shrink: 0; }
```

### Scroll-zone section CSS override (`App.css:27-34`)
```css
#smooth-wrapper .section {
  position: relative; inset: auto;
  width: 100vw; height: 100vh; min-height: 100vh;
}
```
Overrides the default `position: fixed` that Observer-zone sections use.

### Why not ScrollSmoother?
ScrollSmoother was tried and rejected — it's designed for full-page scroll, not inside a `position: fixed` wrapper. The `overflow: hidden !important` on `html, body, #root` (needed for Observer mode) blocks ScrollSmoother entirely.

## 2. goToRef — Navigation Without Prop Drilling

`goTo()` is defined inside App's `useEffect` closure. Cannot be passed as a prop at render time.

- `goToRef = useRef<((index: number) => void) | null>(null)` (`App.tsx:55`)
- Assigned after definition: `goToRef.current = goTo` (`App.tsx:533`)
- Navbar receives stable arrows: `onHeroClick={() => goToRef.current?.(0)}` (`App.tsx:592`)

## 3. useImperativeHandle Handles

Components exposing multiple DOM refs use `forwardRef` + `useImperativeHandle` with **getter properties** for fresh `.current` values:

- `HeroSectionHandle` -> `heroEl`, `bikerEl`
- `FounderSectionHandle` -> `founderEl`, `founderImgEl`, `estDateEl`, `badgeEl`
- `RightOrnamentHandle` -> `ornamentEl`, `computeLeftX()`
- `ChevronOrnamentsHandle` -> `chevronA`-`chevronD`

## 4. GSAP Observer — Observer-Zone Navigation

`Observer.create()` at `App.tsx:536`. Limits navigation to sections 0-4 (`currentSection < 4`).

- `onDown` / `onUp` -> `goTo(currentSection +/- 1)`
- `onChangeY` with `dy > 7` threshold for wheel events
- Keyboard handler (`App.tsx:559`) returns early if `scrollMode.current` is true
- `isAnimating` ref (`App.tsx:58`) gates concurrent calls
- Trackpad double-scroll fix: dual-gate using Observer's `onStop`/`onStopDelay: 0.15`

## 5. goTo() Switch — Animation Orchestration (`App.tsx:350`)

Handles two paths:
1. **index >= 4**: Enters scroll mode, creates fade-out timeline for Observer-zone sections, then calls `enterScrollMode()` on complete. If already in scroll mode, uses native `wrapper.scrollTo()`.
2. **index 0-3**: Standard Observer-zone switch with 4 cases. Each case creates a `gsap.timeline()` animating 5-12 targets. Ornament color: `#ACFC17` (green) for hero/founder, `#bd97ec` (purple) elsewhere.

## 6. Ref-Only State for Navigation

`currentSection`, `isAnimating`, `scrollMode` are **refs, not state** (`App.tsx:57-61`). Re-renders would reset GSAP animations mid-flight.

Only `useState`: `afterFounderActive` — triggers CountUp via `active` prop on `AfterFounderSection`.

## 7. Chevron Animations — Dual Driver

**Observer mode**: Chevrons hidden (`autoAlpha: 0`) in all cases 0-3.
**Scroll mode**: `setupChevronScrollTriggers()` (`App.tsx:231`) creates 6 ScrollTrigger instances with `scrub: true` tied to section visibility. Chevrons A/B enter at MeetTheTeam, cross at OurCoaches, exit at CoachesCTA. Chevrons C/D enter at CoachesCTA, exit at Contacts.

## 8. Self-Contained Component Animation (RightOrnament)

`RightOrnament.tsx` owns its entrance animation in its own `useEffect`. `racePlayedRef` ensures single run. `computeLeftX()` exposed via handle for `goTo(1)` ornament positioning.

## 9. Fragment Return (AfterFounderSection)

Returns `<>` fragment wrapping overlay `<div>` + `<section>`. Overlay must be a sibling (not child) for GSAP animation to work. Overlay ref passed as `imgOverlayRef` prop (`App.tsx:611`).

## 10. FlipCard CSS Architecture

- `.flip-card-inner` — `transform-style: preserve-3d`, rotates on hover
- `.flip-card-front/.back` — `position: absolute; backface-visibility: hidden`
- `.svg-front` decoration must live inside `.flip-card-front`
- Profile images use `flex: 1; min-height: 0; object-fit: cover`

## 11. Navbar Backdrop Blur Workaround

`backdrop-filter` breaks inside `transform` ancestors. `.navbar-blur-backdrop` (`Navbar.tsx:88`) sits outside the LiquidGlass container. JS syncs dimensions from `.glass` bounding rect (`Navbar.tsx:19-30`). Centering via `margin: 0 auto`. `.glass .glass__warp` filters disabled.
