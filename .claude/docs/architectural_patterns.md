# Architectural Patterns

## 1. goToRef — Navigation Without Prop Drilling

`goTo()` is defined inside App's `useEffect` closure (it closes over GSAP refs), so it can't be passed as a prop at render time. Instead:

- `goToRef = useRef<((index: number) => void) | null>(null)` is declared at the top of App (`App.tsx:30`)
- After `goTo` is defined inside the effect, `goToRef.current = goTo` stores it (`App.tsx:~71`)
- Navbar receives stable arrow callbacks: `onHeroClick={() => goToRef.current?.(0)}` (`App.tsx:~225`)

This avoids re-renders and doesn't require Context or a state manager.

## 2. useImperativeHandle Handles — Exposing Multiple DOM Refs

Section components need to expose several DOM nodes to App's `goTo()` without passing a ref per node. Pattern:

1. Define a `Handle` interface with the exposed members
2. Use `forwardRef` + `useImperativeHandle` inside the component
3. Use **getter properties** so the handle always returns the latest `.current` value

Example from `RightOrnament.tsx`:
```ts
// RightOrnament.tsx:11-18
export interface RightOrnamentHandle {
  ornamentEl: HTMLDivElement | null;
  computeLeftX: () => number;
}
useImperativeHandle(ref, () => ({
  get ornamentEl() { return ornamentRef.current; },
  computeLeftX: () => { /* reads ornamentRef.current at call time */ },
}));
```

Same pattern used in:
- `HeroSection.tsx` → `HeroSectionHandle` (`heroEl`, `bikerEl`)
- `FounderSection.tsx` → `FounderSectionHandle` (`founderEl`, `founderImgEl`, `estDateEl`, `badgeEl`)
- `RightOrnament.tsx` → `RightOrnamentHandle` (`ornamentEl`, `computeLeftX`)

App holds typed refs: `const heroRef = useRef<HeroSectionHandle>(null)` and accesses members via `heroRef.current?.heroEl`.

## 3. GSAP Observer — Full-Page Navigation

`gsap.Observer.create()` in `App.tsx:~251` intercepts **all** scroll/touch/keyboard input and routes it to `goTo()`. Native browser scroll is suppressed entirely.

- `onDown` → `goTo(currentSection - 1)`
- `onUp` → `goTo(currentSection + 1)`
- Keyboard: Arrow keys, PageUp/Down, Space/Shift+Space all mapped
- `isAnimating` ref gates concurrent calls — never call `goTo()` recursively

## 4. Timeline Switch — Animation Orchestration

`goTo(index)` in `App.tsx:~71` is a single `switch` statement with one `case` per section transition. Each case:

1. Creates a `gsap.timeline()`
2. Animates 5–12 targets simultaneously (positions, opacity, scale)
3. Changes ornament color: green `#ACFC17` for hero/founder, purple `#bd97ec` elsewhere
4. Sets `isAnimating = false` and starts the 400ms cooldown in `onComplete`

Do not extract individual cases into separate functions — the closure over all refs is intentional.

## 5. Ref-Only State for Navigation

`currentSection` and `isAnimating` are **refs, not state** (`App.tsx:28-29`). This is deliberate: changes to these values must never trigger re-renders, since re-renders would reset GSAP animations mid-flight.

The only `useState` in App is `afterFounderActive` — it triggers CountUp animations via the `active` prop on `AfterFounderSection`.

## 6. Self-Contained Component Animation

`RightOrnament.tsx` owns its entrance animation entirely in its own `useEffect`. It uses:
- `racePlayedRef` — ensures the animation runs **once** on mount
- `leaderOffsetRef` — stores the final X position for `computeLeftX()` to read later

This keeps race animation logic out of App's already-complex `goTo` switch.

## 7. Fragment Return (AfterFounderSection)

`AfterFounderSection.tsx` returns a `<>` fragment wrapping an overlay `<div>` and a `<section>`. This is required because the overlay div must be a sibling (not a child) of the section for the GSAP animation in `goTo(2)` to work correctly. The overlay ref (`imgOverlayRef`) is passed as a prop from App.

## 8. startWhen Prop — Deferred Animation Trigger

`CountUp.tsx` accepts a `startWhen: boolean` prop. When `false`, the spring stays at 0. App sets `afterFounderActive = true` inside `goTo(2)`'s `onComplete`, which flows down as `active` → `startWhen`. This decouples the counting animation from scroll events and ensures it only runs after the section transition completes.
