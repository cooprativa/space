import './App.css'
import HeroBackground from './assets/images/HeroBackground.jpg'
import HeroBiker from './assets/images/Manel-narrow.png'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/dist/Observer'
import FounderImg from "./assets/images/Founder.jpg";
import FounderImgAbove from "./assets/images/FounderAbove.png";
import MaskGradient from "./assets/svg/MaskGradient.tsx";
import AfterFounderImg from "./assets/images/AfterFounder.jpg";
import AfterFounderImgAbove from "./assets/images/AfterFounderAbove.png";
import MaskGradient2 from "./assets/svg/MaskGradient2.tsx";
import ProfileImgCycling from "./assets/images/profile-card-cycling.jpg";
import CardSVGCyclingFront from "./assets/svg/card-svg-cycling-front.svg";
/* import CardSVGCyclingBack from "./assets/svg/card-svg-cycling-back.svg"; */
import ProfileImgSwimmers from "./assets/images/profile-card-swimmers.jpg";
import CardSVGSwimmers from "./assets/svg/card-svg-swimmers.svg";
import ProfileImgTriathlon from "./assets/images/profile-card-triathlon.jpg";
import CardSVGTriathlon from "./assets/svg/card-svg-triathlon.svg";
import ProfileImgAthletics from "./assets/images/profile-card-athletics.jpg";
import CardSVGAthletics from "./assets/svg/card-svg-athletics.svg";
import ProfileImgDrivers from "./assets/images/profile-card-drivers.jpg";
import CardSVGDrivers from "./assets/svg/card-svg-drivers.svg";
import ProfileImgTeam from "./assets/images/profile-card-team.jpg";
import CardSVGTeam from "./assets/svg/card-svg-team.svg";

/* Scaffold Overlay images */
import GreenLogo from "./assets/svg/green-logo.svg";
import WhiteWarning from "./assets/svg/white-warning.svg";
import ScaffoldOverlayBackground from "./assets/images/scaffold-overlay-background.jpg";

/* import NavLogo from "./assets/svg/NavLogo.tsx"; */
import CountUp from './CountUp'
/* import GlassSurface from './components/GlassSurface' */
import LiquidGlass from 'liquid-glass-react'
/* import ScrollReveal from './components/ScrollReveal'; */

import { Bars3Icon } from '@heroicons/react/24/solid'

// Registrar plugins
gsap.registerPlugin(Observer)

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const ornamentRef = useRef<HTMLDivElement | null>(null)
  const founderRef = useRef<HTMLDivElement | null>(null)
  const afterFounderRef = useRef<HTMLDivElement | null>(null)
  const beforeWhoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainSecondRef = useRef<HTMLDivElement | null>(null)
  const founderBadgeRef = useRef<SVGSVGElement | null>(null)
  const racePlayedRef = useRef(false) // ensure race animation runs only once

  /* Imagens PNG em overlay - refs */
  const heroImgContainerRef = useRef<HTMLDivElement | null>(null)
  const founderImgContainerRef = useRef<HTMLDivElement | null>(null)
  const estDateContainerRef = useRef<HTMLDivElement | null>(null)
  const afterFounderImgContainerRef = useRef<HTMLDivElement | null>(null)

  /* Navlinks - refs */
  const heroLinkRef = useRef<HTMLDivElement | null>(null)
  const founderLinkRef = useRef<HTMLAnchorElement | null>(null)
  const whoWeTrainLinkRef = useRef<HTMLAnchorElement | null>(null)
  /*   const whoWeTrainLinkRef = useRef<HTMLAnchorElement | null>(null)
  const meetTheTeamLinkRef = useRef<HTMLAnchorElement | null>(null)
  const contactLinkRef = useRef<HTMLAnchorElement | null>(null) */

  // New: separate SVG refs so we control timings precisely
  const firstSvgRef = useRef<SVGSVGElement | null>(null)
  const secondSvgRef = useRef<SVGSVGElement | null>(null)
  const leaderOffsetRef = useRef(200) // shared offset applied to child svgs at race end

  const currentSection = useRef(0)
  const isAnimating = useRef(false)

  /* const [heroActive, setHeroActive] = useState(true)
  const [founderActive, setFounderActive] = useState(false) */
  const [afterFounderActive, setAfterFounderActive] = useState(false)

  useEffect(() => {
    const heroEl = heroRef.current
    const ornamentEl = ornamentRef.current
    const founderEl = founderRef.current
    const afterFounderEl = afterFounderRef.current
    const beforeWhoWeTrainEl = beforeWhoWeTrainRef.current
    const whoWeTrainEl = whoWeTrainRef.current
    const whoWeTrainSecondEl = whoWeTrainSecondRef.current
    const founderBadgeEl = founderBadgeRef.current
    const firstSvgEl = firstSvgRef.current
    const secondSvgEl = secondSvgRef.current

    /* Navlinks */
    const heroLink = heroLinkRef.current
    const founderLink = founderLinkRef.current
    const whoWeTrainLink = whoWeTrainLinkRef.current

    /* Imagens PNG em overlay */
    const heroImgContainerEl = heroImgContainerRef.current
    const founderImgContainerEl = founderImgContainerRef.current
    const estDateContainerEl = estDateContainerRef.current
    const afterFounderImgContainerEl = afterFounderImgContainerRef.current
    
    if (!heroEl || !ornamentEl || !founderEl || !afterFounderEl || !beforeWhoWeTrainEl || !whoWeTrainEl || !whoWeTrainSecondEl /* || !heroLink || !founderLink */) return

    // Estados iniciais (apenas hero visível)
    gsap.set(heroEl, { autoAlpha: 1 })
    gsap.set(founderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 })

    gsap.set(heroImgContainerEl, { autoAlpha: 1 })
    gsap.set(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(estDateContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 })

    // Initialize founder badge as hidden
    if (founderBadgeEl) {
      gsap.set(founderBadgeEl, { autoAlpha: 0 })
    }

    // Race entrance animation using two separate SVGs
    if (!racePlayedRef.current && firstSvgEl && secondSvgEl) {
      // Ensure both are visible
      gsap.set([firstSvgEl, secondSvgEl], { autoAlpha: 1 })

      // Measure final positions to compute a true off-screen-left start
      const rect1 = firstSvgEl.getBoundingClientRect()
      const rect2 = secondSvgEl.getBoundingClientRect()
      const margin = 80 // extra pixels to guarantee fully off-screen

      // Start such that each element's left is beyond the viewport left edge
      const start1 = -((rect1.left || 0) + (rect1.width || 0) + margin)
      const start2 = -((rect2.left || 0) + (rect2.width || 0) + margin)

      // Pre-position both off-screen so the chaser isn't visible during its delay
      gsap.set(firstSvgEl, { x: start1 })
      gsap.set(secondSvgEl, { x: start2 })

      // Final spacing gap (reduced further) so second is closer
      const finalGap = Math.max(80, Math.min(200, Math.round(window.innerWidth * 0.12)))

      const raceTl = gsap.timeline()
      const leaderOffset = leaderOffsetRef.current
      raceTl.to(
        firstSvgEl,
        { x: leaderOffset, duration: 1.25, ease: 'power4.out' },
        0
      )
      raceTl.to(
        secondSvgEl,
        { x: leaderOffset - finalGap * 2, duration: 1.25, ease: 'power4.out' },
        0.5
      )

      racePlayedRef.current = true
    }

    const computeOrnamentLeftX = () => {
      const svgs: SVGSVGElement[] = [firstSvgRef.current, secondSvgRef.current].filter(Boolean) as SVGSVGElement[]
      if (!svgs.length) return 0
      let minLeft = Infinity
      let maxRight = -Infinity
      svgs.forEach(svg => {
        const r = svg.getBoundingClientRect()
        if (r.left < minLeft) minLeft = r.left
        if (r.right > maxRight) maxRight = r.right
      })
      const padding = 0 // align flush to the left; raise if you want gap
      // Desired shift to bring left edge to padding
      let shift = -(minLeft - padding)
      // Prevent overshoot that would push right edge outside viewport
      const viewportW = window.innerWidth
      if (maxRight + shift > viewportW) {
        shift = viewportW - maxRight
      }
      // If already at or beyond left, no shift needed
      if (minLeft <= padding) return 0
      return shift
    }

    const goTo = (index: number) => {
      if (isAnimating.current || index === currentSection.current) return
      isAnimating.current = true

      // garantir que nenhuma animação anterior interfere
      const tweenTargets: (HTMLDivElement | SVGSVGElement | null)[] = [
        heroEl,
        founderEl,
        afterFounderEl,
        ornamentEl,
        heroImgContainerEl,
        founderImgContainerEl,
        estDateContainerEl,
        afterFounderImgContainerEl,
        beforeWhoWeTrainEl,
        whoWeTrainEl,
        whoWeTrainSecondEl
      ]
      if (founderBadgeEl) tweenTargets.push(founderBadgeEl)
      gsap.killTweensOf(tweenTargets)

      /* setHeroActive(index === 0)
      setFounderActive(index === 1) */
      setAfterFounderActive(index === 2)  /* Detect start of transition into AfterFounder section -> To trigger CountUp start animation */

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power2.out' },
        onComplete: () => {
          currentSection.current = index
          isAnimating.current = false
        },
      })

      switch (index) {
        case 0: {
           // Voltar ao HERO
           tl.to(heroEl, { autoAlpha: 1 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(founderEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(ornamentEl, { x: 0 }, 0)
             // Hide founder badge when leaving founder section
             .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
             // Revert ornament color back to original green when returning to hero
             .to(
               ornamentEl.querySelectorAll('svg path'),
               { fill: '#ACFC17', duration: 0.6, ease: 'power2.out' },
               0
             )
          break
        }
        case 1: {
          // HERO -> FOUNDER or AFTER-FOUNDER -> FOUNDER
           tl.to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 1, xPercent: 0 }, 0)
             // Show founder image container when entering founder section
             .to(founderImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(ornamentEl, { x: computeOrnamentLeftX() }, 0)
             // Show founder badge when entering founder section
             .to(founderBadgeEl, { autoAlpha: 1, duration: 0.5 }, 0.4)
             
             // Ensure ornament color is green in founder section
             .to(
                ornamentEl.querySelectorAll('svg path'),
               { fill: '#ACFC17', duration: 0.6, ease: 'power2.out' },
               0
             )
           break
        }
        case 2: {
          // FOUNDER -> AFTER-FOUNDER
           tl.to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(ornamentEl, { x: 0 }, 0)
             // Hide founder badge when leaving founder section
             .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
             // Change ornament color to the requested purple when entering after-founder
             .to(
               ornamentEl.querySelectorAll('svg path'),
               { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' },
               0
             )
          break
        }
        case 3: {
          // AFTER-FOUNDER -> BEFORE WHO WE TRAIN
           tl.to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 1, yPercent: 0 }, 0)
             .to(whoWeTrainEl, { autoAlpha: .4, yPercent: 50 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(ornamentEl, { x: 800 }, 0)
             // Hide founder badge when leaving founder section
             .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
             // Change ornament color to the requested purple when entering after-founder
             .to(
               ornamentEl.querySelectorAll('svg path'),
               { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' },
               0
             )
          break
        }
        case 4: {
          // BEFORE WHO WE TRAIN -> WHO WE TRAIN
           tl.to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 1, xPercent: 0, yPercent: 0 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(ornamentEl, { x: 800 }, 0)
             // Hide founder badge when leaving founder section
             .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
             // Change ornament color to the requested purple when entering after-founder
             .to(
               ornamentEl.querySelectorAll('svg path'),
               { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' },
               0
             )
          break
        }
        case 5: {
          // WHO WE TRAIN -> WHO WE TRAIN SECOND
           tl.to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(ornamentEl, { x: 800 }, 0)
             // Hide founder badge when leaving founder section
             .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
             // Change ornament color to the requested purple when entering after-founder
             .to(
               ornamentEl.querySelectorAll('svg path'),
               { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' },
               0
             )
          break
        }
      }
    }

    // Observer para bloquear scroll nativo e usar wheel / touch como navegação
    const observer = Observer.create({
      target: window,
      type: 'wheel,touch,pointer',
      wheelSpeed: 1,
      tolerance: 6,
      preventDefault: true,
      onChangeY: (self: { deltaY: number }) => {
        if (isAnimating.current) return
        const dy = self.deltaY || 0
        if (dy > 6 && currentSection.current < 5) {
          goTo(currentSection.current + 1)
        } else if (dy < -6 && currentSection.current > 0) {
          goTo(currentSection.current - 1)
        }
      },
      onDown: () => {
        if (!isAnimating.current && currentSection.current < 5) goTo(currentSection.current + 1)
      },
      onUp: () => {
        if (!isAnimating.current && currentSection.current > 0) goTo(currentSection.current - 1)
      },
    })

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return
      const key = e.key
      if (key === 'ArrowDown' || key === 'PageDown' || key === 'ArrowRight'|| (key === ' ' && !e.shiftKey)) {
        e.preventDefault()
        if (currentSection.current < 5) goTo(currentSection.current + 1)
      } else if (key === 'ArrowUp' || key === 'PageUp' || key === 'ArrowLeft' || (key === ' ' && e.shiftKey)) {
        e.preventDefault()
        if (currentSection.current > 0) goTo(currentSection.current - 1)
      }
    }
    window.addEventListener('keydown', onKey, { passive: false })

    /* Managing navlinks clicks */
    if (heroLink) heroLink.addEventListener('click', () => goTo(0), { passive: false })
    if (founderLink) founderLink.addEventListener('click', () => goTo(1), { passive: false })
    if (whoWeTrainLink) whoWeTrainLink.addEventListener('click', () => goTo(4), { passive: false })

    // Cleanup
    return () => {
      observer?.kill()
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const liquidGlassContainerRef = useRef<HTMLDivElement>(null);

  const [navbarExpanded, setNavbarExpanded] = useState(false);

  // Attach native hover listeners to the .glass element rendered by LiquidGlass,
  // because LiquidGlass doesn't support onMouseEnter / onMouseLeave props.
  useEffect(() => {
    const container = liquidGlassContainerRef.current;
    if (!container) return;

    const glassEl = container.querySelector('.glass') as HTMLElement | null;
    if (!glassEl) return;

    const handleEnter = () => setNavbarExpanded(true);
    const handleLeave = () => setNavbarExpanded(false);

    setTimeout(() => {
      glassEl.addEventListener('mouseenter', handleEnter);
      glassEl.addEventListener('mouseleave', handleLeave);
    }, 500);

    return () => {
      glassEl.removeEventListener('mouseenter', handleEnter);
      glassEl.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // LiquidGlass only recalculates its glass surface size on window "resize".
  // Dispatch resize events every frame during the expand/collapse CSS transition
  // so the glass surface smoothly follows the content width change.
  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const duration = 500; // slightly longer than the 400ms CSS transition

    const tick = () => {
      window.dispatchEvent(new Event('resize'));
      if (performance.now() - start < duration) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [navbarExpanded]);

  return (
    <>
     
     <div style={{ position: "relative", width:"100%", height:"100%"}}>

      <div ref={liquidGlassContainerRef} className="liquid-glass-navbar-container">
        <LiquidGlass mode='polar'
          mouseContainer={liquidGlassContainerRef}
          elasticity={0.2}
          style={{ 
            position: 'fixed',
          }}
          displacementScale={64}
          blurAmount={0.5}
          saturation={130}
          aberrationIntensity={2}
          cornerRadius={40}
        >
          <div className={`floating-navbar ${ navbarExpanded ? "expanded" : "" }`}>
            <div ref={heroLinkRef} className="nav-logo-container">
              <img src="/logo-branco.svg" alt="" />
              <img src="/logo-branco.svg" alt="" />
            </div>

            <div className="menu-link">
              <Bars3Icon className='menu-icon' />
              <Bars3Icon className='menu-icon' />
            </div>
            
            <div className={`navlinks ${ navbarExpanded ? "show" : "" }`}>
              <a ref={founderLinkRef} /* ref={whoWeAreLinkRef} */>Who We Are</a>
              <a ref={whoWeTrainLinkRef} /* ref={whoWeTrainLinkRef} */>Who We Train</a>
              <a /* ref={meetTheTeamLinkRef} */>Meet The Team</a>
              <a>Shop</a>
              <a /* ref={contactLinkRef} */>Contact</a>
            </div>
          </div>
        </LiquidGlass>
      </div>
      
      <div className="right-ornament" aria-hidden="true" ref={ornamentRef}>
        {/* Two separate SVGs for the right ornament */}
        <svg
          className="ornament-svg svg-first"
          ref={firstSvgRef}
          width="754"
          height="1045"
          viewBox="0 0 754 1045"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M275.358 1045H10.2569C6.41485 1045 2.5728 1042.8 0.926203 1038.96C-0.72039 1035.12 -0.171509 1031.28 2.57281 1027.99L467.461 521.951L3.67052 16.4653C0.926203 13.7211 0.377343 9.33036 2.02394 5.48845C3.67053 1.64653 6.96372 0 11.3546 0H276.456C279.2 0 281.945 1.09769 283.591 3.29307L753.968 515.365C757.261 519.207 757.261 525.244 753.968 529.086L282.494 1042.26C280.298 1043.9 278.103 1045 275.358 1045ZM25.0762 1028.53H272.065L737.502 521.951L273.163 16.4653H26.174L484.476 515.365C487.769 519.207 487.769 525.244 484.476 529.086L25.0762 1028.53Z" fill="#ACFC17"/>
        </svg>
      
        <svg
          className="ornament-svg svg-second"
          ref={secondSvgRef}
          width="482"
          height="1024"
          viewBox="0 0 482 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M9.87956 1023.8C8.78183 1023.8 7.6841 1023.8 6.03751 1023.25C2.74432 1021.61 0 1017.77 0 1013.92V719.743C0 716.999 1.09773 714.803 2.74432 713.157L187.712 511.731L2.74432 310.305C1.09773 308.658 0 306.463 0 303.719V10.0868C0 5.69607 2.74432 1.85416 6.58637 0.756469C10.4284 -0.890065 14.8193 0.207624 17.5637 3.50069L478.61 505.693C481.903 509.535 481.903 515.573 478.61 519.415L17.5637 1021.61C15.3682 1022.71 12.6239 1023.8 9.87956 1023.8ZM16.4659 722.487V997.458L462.144 512.28L16.4659 26.5522V301.523L203.629 505.145C206.922 508.987 206.922 515.024 203.629 518.866L16.4659 722.487Z" fill="#ACFC17"/>
        </svg>
      </div>

      <div style={{ backgroundImage: `url(${HeroBiker})` }} ref={heroImgContainerRef} className="hero-biker-div" />

      <div className="section hero" style={{ backgroundImage: `url(${HeroBackground})` }} ref={heroRef}>

        <div className="logo-container">
          <div className="logo-main">
            {/* Main Logo SVG */}
            <svg width="911" height="267" viewBox="0 0 911 267" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M115.141 207.849C93.3915 248.926 62.2042 267 29.7857 267C-4.68458 267 -7.55711 245.64 12.5505 208.26C19.937 194.294 28.1442 181.149 34.71 172.112L66.3078 176.22C59.742 186.078 53.5866 195.937 48.6623 204.974C37.1722 226.745 37.5825 232.495 45.7897 232.495C53.1762 232.495 60.1524 226.745 68.7699 211.135L72.4632 204.152C82.7222 184.846 86.4154 167.594 79.0289 140.894C71.2321 114.605 73.6942 93.2446 89.2879 63.6692L91.3397 59.5615C108.575 25.4677 135.248 0 173.822 0C210.344 0 209.524 23.4138 190.647 58.74C183.671 71.4738 177.926 80.5108 171.36 90.78L139.352 86.6723C145.097 78.0462 146.738 75.9923 153.715 62.4369C165.615 39.8446 165.205 34.5046 158.228 34.5046C150.842 34.5046 145.918 39.4338 137.71 54.6323L135.248 59.9723C127.451 74.76 124.989 89.9585 130.324 110.086C137.3 138.84 135.659 169.648 118.013 202.509L115.141 207.849Z" fill="#ACFC17" />
              <path d="M360.126 170.469H349.867L300.623 262.892H255.894L393.365 4.51843H446.301C484.465 4.51843 492.672 25.0569 459.843 86.2615C425.783 150.752 391.723 170.469 360.126 170.469ZM423.731 39.8446H419.217L369.153 134.322H374.078C384.337 134.322 396.237 124.052 416.755 85.44C435.632 49.703 434.811 39.8446 423.731 39.8446Z" fill="#ACFC17" />
              <path d="M504.982 262.892H459.843L475.436 226.745H448.763L426.604 262.892H389.261L559.971 4.51843H607.983L504.982 262.892ZM490.209 191.008L536.99 87.9046L471.743 191.008H490.209Z" fill="#ACFC17" />
              <path d="M588.697 267C555.457 267 543.557 250.158 563.665 211.957L646.557 56.2754C666.255 18.8954 697.032 0 729.861 0C759.406 0 775.411 10.2692 750.789 56.6862C743.813 69.42 736.016 82.1538 729.45 92.0123L697.032 89.1369C703.187 80.1 709.343 70.6523 713.856 61.6154C726.578 37.38 722.884 34.0938 714.677 34.0938C706.47 34.0938 701.135 37.38 694.159 50.5246L606.752 215.243C600.597 227.155 600.597 232.495 610.856 232.495C618.242 232.495 626.039 227.566 639.171 202.92C643.275 194.705 647.788 185.257 651.482 175.398L687.183 172.523C683.49 181.971 678.976 193.062 670.769 208.26C645.326 255.909 617.832 267 588.697 267Z" fill="#ACFC17" />
              <path d="M773.769 262.892H683.079L820.55 4.51843H910.829L891.953 40.2554H846.403L808.239 112.14H846.403L827.116 148.288H788.952L746.685 227.155H792.645L773.769 262.892Z" fill="#ACFC17" />
            </svg>
          </div>
          <div className="hero-content">
            {/* Secondary SVG */}
            <svg width="463" height="24" viewBox="0 0 463 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1872 22.638H6.60016V4.554H0.000164069V0.725999H17.8202V4.554H11.1872V22.638ZM29.2616 4.521H23.3546V10.362H29.0966C31.5386 10.362 32.4626 9.141 32.4626 7.458C32.4626 5.742 31.5386 4.521 29.2616 4.521ZM36.1586 22.638H31.6706V16.995C31.6706 14.883 30.8786 14.058 28.2386 14.058H23.3546V22.638H18.8996V0.725999H30.0206C34.0796 0.725999 36.7526 3.432 36.7526 7.062C36.7526 9.405 35.5976 11.385 33.4856 12.144C35.4326 12.771 36.1586 13.86 36.1586 16.434V22.638Z" fill="#ACFC17" />
              <path d="M50.4848 14.355L47.7458 5.643H47.7128L44.9078 14.355H50.4848ZM58.1738 22.638H53.1908L51.8048 18.117H43.7198L42.1688 22.638H37.3178L45.1388 0.725999H50.4518L58.1738 22.638ZM63.7698 22.638H59.1828V0.725999H63.7698V22.638ZM83.1911 22.638H78.9671L69.5951 7.92V22.638H65.3381V0.725999H70.1891L78.9011 14.817V0.725999H83.1911V22.638ZM109.559 7.194H105.203C104.972 4.95 103.619 3.861 100.847 3.861C98.2731 3.861 96.9201 4.785 96.9201 6.435C96.9201 7.821 97.8771 8.613 100.319 9.207C102.794 9.801 105.203 10.395 106.82 11.121C108.734 11.979 110.252 13.332 110.252 16.434C110.252 21.252 106.622 23.397 101.507 23.397C96.0951 23.397 92.3331 20.988 92.2341 16.071H96.6561C96.7221 18.315 98.6031 19.701 101.54 19.701C104.246 19.701 105.797 18.546 105.797 16.599C105.797 15.312 105.137 14.421 102.398 13.827C99.6921 13.233 97.9431 12.837 96.3921 12.144C94.0491 11.088 92.7291 9.504 92.7291 6.732C92.7291 2.805 95.4021 -1.13249e-06 100.748 -1.13249e-06C106.292 -1.13249e-06 109.394 3.003 109.559 7.194ZM132.642 22.638H128.352V7.623L124.26 22.638H119.706L115.647 7.689V22.638H111.39V0.725999H118.122L122.082 16.797L126.042 0.725999H132.642V22.638ZM146.842 14.355L144.103 5.643H144.07L141.265 14.355H146.842ZM154.531 22.638H149.548L148.162 18.117H140.077L138.526 22.638H133.675L141.496 0.725999H146.809L154.531 22.638ZM165.902 4.521H159.995V10.362H165.737C168.179 10.362 169.103 9.141 169.103 7.458C169.103 5.742 168.179 4.521 165.902 4.521ZM172.799 22.638H168.311V16.995C168.311 14.883 167.519 14.058 164.879 14.058H159.995V22.638H155.54V0.725999H166.661C170.72 0.725999 173.393 3.003 173.393 7.194C173.393 9.405 172.238 11.385 170.126 12.144C172.073 12.771 172.799 13.86 172.799 16.434V22.638ZM185.178 22.638H180.591V4.554H173.991V0.725999H191.811V4.554H185.178V22.638ZM209.523 22.638H192.891V0.725999H208.995V4.554H197.346V9.24H208.071V13.101H197.346V18.744H209.523V22.638ZM220.816 4.521H214.909V10.362H220.651C223.093 10.362 224.017 9.141 224.017 7.458C224.017 5.742 223.093 4.521 220.816 4.521ZM227.713 22.638H223.225V16.995C223.225 14.883 222.433 14.058 219.793 14.058H214.909V22.638H210.454V0.725999H221.575C225.634 0.725999 228.307 3.432 228.307 7.062C228.307 9.405 227.152 11.385 225.04 12.144C226.987 12.771 227.713 13.86 227.713 16.434V22.638ZM234.119 22.638H229.532V18.183H234.119V22.638ZM256.155 14.355L253.416 5.643H253.383L250.578 14.355H256.155ZM263.844 22.638H258.861L257.475 18.117H249.39L247.839 22.638H242.988L250.809 0.725999H256.122L263.844 22.638ZM269.308 18.909H273.103C277.096 18.909 278.812 16.401 278.812 11.451C278.812 6.501 277.096 4.521 272.707 4.521H269.308V18.909ZM274.027 22.638H264.853V0.725999H273.334C279.274 0.725999 283.498 4.785 283.498 11.451C283.498 18.117 279.703 22.638 274.027 22.638ZM295.02 14.355L292.281 5.643H292.248L289.443 14.355H295.02ZM302.709 22.638H297.726L296.34 18.117H288.255L286.704 22.638H281.853L289.674 0.725999H294.987L302.709 22.638ZM308.305 10.956H312.661C315.301 10.956 316.39 9.603 316.39 7.689C316.39 5.874 315.301 4.521 312.661 4.521H308.305V10.956ZM308.305 22.638H303.718V0.725999H313.387C317.677 0.725999 320.416 3.861 320.416 7.821C320.416 11.814 317.677 14.685 313.387 14.685H308.305V22.638ZM331.906 22.638H327.319V4.554H320.719V0.725999H338.539V4.554H331.906V22.638ZM352 18.909H357.808C359.92 18.909 361.174 17.556 361.174 15.774C361.174 13.86 359.92 13.002 357.874 13.002H352V18.909ZM357.511 4.521H352V9.273H357.775C359.59 9.273 360.547 8.448 360.547 6.897C360.547 5.214 359.656 4.521 357.511 4.521ZM357.445 22.638H347.578V0.725999H358.369C362.659 0.725999 364.969 3.036 364.969 6.699C364.969 8.58 363.814 10.164 362.296 10.791C364.144 11.484 365.629 12.969 365.629 16.104C365.629 20.097 362.956 22.638 357.445 22.638ZM383.16 22.638H366.528V0.725999H382.632V4.554H370.983V9.24H381.708V13.101H370.983V18.744H383.16V22.638ZM394.651 22.638H390.064V4.554H383.464V0.725999H401.284V4.554H394.651V22.638ZM413.085 22.638H408.498V4.554H401.898V0.725999H419.718V4.554H413.085V22.638ZM437.429 22.638H420.797V0.725999H436.901V4.554H425.252V9.24H435.977V13.101H425.252V18.744H437.429V22.638ZM448.723 4.521H442.816V10.362H448.558C451 10.362 451.924 9.141 451.924 7.458C451.924 5.742 451 4.521 448.723 4.521ZM455.62 22.638H451.132V16.995C451.132 14.883 450.34 14.058 447.7 14.058H442.816V22.638H438.361V0.725999H449.482C453.541 0.725999 456.214 3.432 456.214 7.062C456.214 9.405 455.059 11.385 452.947 12.144C454.894 12.771 455.62 13.86 455.62 16.434V22.638ZM462.026 22.638H457.439V18.183H462.026V22.638Z" fill="#ACFC17" />
            </svg>

            {/* Hero CTA button SVG under secondary svg */}
            <button className="hero-sub" type="button">
              <svg width="226" height="57" viewBox="0 0 226 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.1674 1.56598C30.6927 0.600783 31.7036 0 32.8025 0H220.952C223.228 0 224.675 2.43496 223.587 4.43402L195.833 55.434C195.307 56.3992 194.296 57 193.198 57H5.04808C2.77218 57 1.32512 54.565 2.41301 52.566L30.1674 1.56598Z" fill="#ACFC17" />
                <path d="M52.22 24.556H49.448V23.302C49.448 21.685 48.755 20.662 47.105 20.662C45.521 20.662 44.795 21.652 44.795 22.939V23.797C44.795 24.754 45.059 25.315 46.082 26.14C47.567 27.295 49.811 28.483 51.032 29.572C52.055 30.463 52.616 31.519 52.616 33.532V34.885C52.616 38.317 50.999 40.198 47.171 40.198C43.343 40.198 41.759 38.284 41.759 34.687V33.433H44.564V34.72C44.564 36.502 45.323 37.459 47.105 37.459C48.656 37.459 49.514 36.7 49.514 34.951V33.961C49.514 32.608 49.184 32.047 48.095 31.189C46.577 29.935 44.894 29.11 43.541 27.79C42.452 26.668 41.858 25.513 41.858 23.764V22.807C41.858 19.903 43.442 17.89 47.072 17.89C51.065 17.89 52.22 20.299 52.22 23.599V24.556ZM59.6997 40H56.7627V20.761H53.0997V18.088H63.4287V20.761H59.6997V40ZM73.5687 40H70.6647L69.8067 34.852H65.7807L64.9887 40H62.1177L65.8467 18.088H69.8397L73.5687 40ZM67.7277 22.708L66.1767 32.311H69.4107L67.8597 22.708H67.7277ZM77.795 40H74.891V18.088H80.996C84.065 18.088 85.154 19.705 85.154 22.477V25.48C85.154 27.493 84.329 28.681 82.91 29.044V29.176C84.461 29.473 85.22 30.529 85.22 32.707V40H82.316V32.476C82.316 31.057 81.887 30.463 80.468 30.463H77.795V40ZM82.283 25.744V22.807C82.283 21.454 81.722 20.761 80.336 20.761H77.795V27.988H80.369C81.557 27.988 82.283 27.427 82.283 25.744ZM92.603 40H89.666V20.761H86.003V18.088H96.332V20.761H92.603V40ZM108.04 40H105.103V20.761H101.44V18.088H111.769V20.761H108.04V40ZM116.145 40H113.241V18.088H119.346C122.415 18.088 123.504 19.705 123.504 22.477V25.48C123.504 27.493 122.679 28.681 121.26 29.044V29.176C122.811 29.473 123.57 30.529 123.57 32.707V40H120.666V32.476C120.666 31.057 120.237 30.463 118.818 30.463H116.145V40ZM120.633 25.744V22.807C120.633 21.454 120.072 20.761 118.686 20.761H116.145V27.988H118.719C119.907 27.988 120.633 27.427 120.633 25.744ZM136.185 40H133.281L132.423 34.852H128.397L127.605 40H124.734L128.463 18.088H132.456L136.185 40ZM130.344 22.708L128.793 32.311H132.027L130.476 22.708H130.344ZM140.477 40H137.507V18.088H140.477V40ZM153.366 40H149.901L144.885 23.038H144.753C144.819 24.655 144.852 26.206 144.852 27.658V40H142.245V18.088H146.139L150.726 33.829H150.858C150.792 31.75 150.759 29.968 150.759 28.516V18.088H153.366V40ZM158.137 40H155.167V18.088H158.137V40ZM171.026 40H167.561L162.545 23.038H162.413C162.479 24.655 162.512 26.206 162.512 27.658V40H159.905V18.088H163.799L168.386 33.829H168.518C168.452 31.75 168.419 29.968 168.419 28.516V18.088H171.026V40ZM183.025 40H181.078L180.946 38.317H180.814C180.253 39.373 179.395 40.198 177.514 40.198C174.544 40.198 172.828 38.218 172.828 34.654V23.533C172.828 19.969 174.61 17.89 177.91 17.89C181.243 17.89 183.025 20.035 183.025 23.599V24.853H180.22V23.335C180.22 21.619 179.461 20.662 177.976 20.662C176.524 20.662 175.765 21.586 175.765 23.302V34.852C175.765 36.568 176.524 37.459 177.91 37.459C179.164 37.459 179.956 36.766 180.22 35.248V30.925H177.745V28.285H183.025V40Z" fill="#0B2E42" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div ref={estDateContainerRef} className='est-date-container'>
        <p>FOUNDED</p>
        <p>2021</p>
      </div>

      <div style={{ backgroundImage: `url(${FounderImgAbove})` }} ref={founderImgContainerRef} className="founder-img-overlay-container" />
          
      <section className="section founder-section" ref={founderRef}>
        <div className="founder__inner">
          <img
            src={FounderImg}
            className="founder__img"
            alt="Founder"
          />
          {/* <img
            src={FounderImgAbove}
            className={`founder__img-overlay ${founderActive && 'above'}`}
            alt="Founder"
          /> */}
          <MaskGradient />
          {/* Founder badge SVG: above the mask and aligned to the right */}
          <div className="founder-content founder-content--badge">
            <svg
              ref={founderBadgeRef}
              width="393"
              height="199"
              viewBox="0 0 393 199"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M69.3001 72.03H55.2301L44.4151 26.67L33.3901 72.03H19.7401L5.85965e-05 2.31003H15.5401L26.9851 47.46L36.6451 2.31003H51.9751L62.5801 47.46L73.9201 2.31003H88.8301L69.3001 72.03ZM148.517 72.03H133.817V40.74H106.622V72.03H92.0268V2.31003H106.622V28.56H133.817V2.31003H148.517V72.03ZM186.308 61.95C196.808 61.95 205.208 54.6 205.208 38.115C205.208 21.63 198.488 12.915 186.308 12.915C174.023 12.915 167.198 21.63 167.198 38.115C167.198 54.6 174.233 61.95 186.308 61.95ZM186.308 74.445C164.888 74.445 152.813 61.32 152.813 37.8C152.813 14.175 164.888 2.41399e-05 186.308 2.41399e-05C207.728 2.41399e-05 219.593 14.175 219.593 38.115C219.593 62.055 207.728 74.445 186.308 74.445ZM316.522 72.03H302.452L291.637 26.67L280.612 72.03H266.962L247.222 2.31003H262.762L274.207 47.46L283.867 2.31003H299.197L309.802 47.46L321.142 2.31003H336.052L316.522 72.03ZM392.168 72.03H339.248V2.31003H390.488V14.49H353.423V29.4H387.548V41.685H353.423V59.64H392.168V72.03ZM41.8951 128.675L33.1801 100.955H33.0751L24.1501 128.675H41.8951ZM66.3601 155.03H50.5051L46.0951 140.645H20.3701L15.4351 155.03H5.85965e-05L24.8851 85.31H41.7901L66.3601 155.03ZM102.541 97.385H83.7458V115.97H102.016C109.786 115.97 112.726 112.085 112.726 106.73C112.726 101.27 109.786 97.385 102.541 97.385ZM124.486 155.03H110.206V137.075C110.206 130.355 107.686 127.73 99.2858 127.73H83.7458V155.03H69.5708V85.31H104.956C117.871 85.31 126.376 93.92 126.376 105.47C126.376 112.925 122.701 119.225 115.981 121.64C122.176 123.635 124.486 127.1 124.486 135.29V155.03ZM183.194 155.03H130.274V85.31H181.514V97.49H144.449V112.4H178.574V124.685H144.449V142.64H183.194V155.03Z" fill="#BD97EC"/>
              <path d="M16.6851 174.63H12.4851V172.73C12.4851 170.28 11.4351 168.73 8.93506 168.73C6.53506 168.73 5.43506 170.23 5.43506 172.18V173.48C5.43506 174.93 5.83506 175.78 7.38506 177.03C9.63506 178.78 13.0351 180.58 14.8851 182.23C16.4351 183.58 17.2851 185.18 17.2851 188.23V190.28C17.2851 195.48 14.8351 198.33 9.03506 198.33C3.23506 198.33 0.835059 195.43 0.835059 189.98V188.08H5.08506V190.03C5.08506 192.73 6.23506 194.18 8.93506 194.18C11.2851 194.18 12.5851 193.03 12.5851 190.38V188.88C12.5851 186.83 12.0851 185.98 10.4351 184.68C8.13506 182.78 5.58506 181.53 3.53506 179.53C1.88506 177.83 0.985059 176.08 0.985059 173.43V171.98C0.985059 167.58 3.38506 164.53 8.88506 164.53C14.9351 164.53 16.6851 168.18 16.6851 173.18V174.63ZM34.9433 184.83H30.1933V198.03H25.6933V164.83H34.9433C39.5433 164.83 41.2433 167.28 41.2433 171.48V178.18C41.2433 182.38 39.5433 184.83 34.9433 184.83ZM30.1933 168.88V180.93H34.0433C36.1433 180.93 36.9933 179.68 36.9933 177.48V171.98C36.9933 169.98 36.1433 168.88 34.0433 168.88H30.1933ZM57.5276 198.03H53.1276L51.8276 190.23H45.7276L44.5276 198.03H40.1776L45.8276 164.83H51.8776L57.5276 198.03ZM48.6776 171.83L46.3276 186.38H51.2276L48.8776 171.83H48.6776ZM69.9499 190.28V184.48H74.1999V190.03C74.1999 195.58 71.5499 198.33 66.5499 198.33C61.3999 198.33 58.7499 195.33 58.7499 189.93V172.83C58.7499 167.28 61.3999 164.53 66.3999 164.53C71.4499 164.53 74.1999 167.28 74.1999 172.78V176.73H69.9499V172.78C69.9499 170.18 68.7999 168.73 66.5499 168.73C64.3499 168.73 63.1999 170.13 63.1999 172.73V190.28C63.1999 192.83 64.1999 194.18 66.5499 194.18C68.7999 194.18 69.9499 192.93 69.9499 190.28ZM89.314 198.03H76.914V164.83H88.914V168.88H81.314V178.58H88.264V182.68H81.314V193.98H89.314V198.03Z" fill="white"/>
            </svg>
            {/* <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            > */}
              <p className="founder-description montserrat-regular">
                S PACE is a performance training centre built on science, experience, and adaptability. We design
                personalized training and nutrition programs for endurance, strength, and health.
              </p>
              <p className="founder-description2 montserrat-regular">
                  From elite athletes to individuals pursuing a healthier lifestyle, every program is tailored to specific goals, ensuring
                  progress that’s effective, sustainable, and built to last.
              </p>
            {/* </ScrollReveal> */}
            
            {/* Founder CTA button SVG (similar to hero-sub) */}
            <button className="founder-sub" type="button">
              <svg
                width="226"
                height="57"
                viewBox="0 0 226 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M30.1674 1.56598C30.6927 0.600783 31.7036 0 32.8025 0H220.952C223.228 0 224.675 2.43496 223.587 4.43402L195.833 55.434C195.307 56.3992 194.296 57 193.198 57H5.04808C2.77218 57 1.32512 54.565 2.41301 52.566L30.1674 1.56598Z" fill="#ACFC17" />
                <path d="M63.273 41H54.891V19.088H57.861V38.294H63.273V41ZM72.9363 41H64.7523V19.088H72.6723V21.761H67.6563V28.163H72.2433V30.869H67.6563V38.327H72.9363V41ZM85.3441 41H82.4401L81.5821 35.852H77.5561L76.7641 41H73.8931L77.6221 19.088H81.6151L85.3441 41ZM79.5031 23.708L77.9521 33.311H81.1861L79.6351 23.708H79.5031ZM89.5704 41H86.6664V19.088H92.7714C95.8404 19.088 96.9294 20.705 96.9294 23.477V26.48C96.9294 28.493 96.1044 29.681 94.6854 30.044V30.176C96.2364 30.473 96.9954 31.529 96.9954 33.707V41H94.0914V33.476C94.0914 32.057 93.6624 31.463 92.2434 31.463H89.5704V41ZM94.0584 26.744V23.807C94.0584 22.454 93.4974 21.761 92.1114 21.761H89.5704V28.988H92.1444C93.3324 28.988 94.0584 28.427 94.0584 26.744ZM109.776 41H106.311L101.295 24.038H101.163C101.229 25.655 101.262 27.206 101.262 28.658V41H98.6547V19.088H102.549L107.136 34.829H107.268C107.202 32.75 107.169 30.968 107.169 29.516V19.088H109.776V41ZM130.954 41H128.314V28.889C128.314 27.536 128.347 25.952 128.413 24.137H128.281L124.585 41H121.846L118.15 24.137H118.018C118.084 25.952 118.117 27.536 118.117 28.889V41H115.477V19.088H119.965L123.199 35.159H123.331L126.565 19.088H130.954V41ZM143.013 24.599V35.72C143.013 39.383 141.165 41.198 137.865 41.198C134.466 41.198 132.618 39.218 132.618 35.654V24.533C132.618 20.969 134.532 18.89 137.832 18.89C141.132 18.89 143.013 21.035 143.013 24.599ZM140.109 35.885V24.335C140.109 22.619 139.284 21.662 137.799 21.662C136.38 21.662 135.555 22.586 135.555 24.302V35.852C135.555 37.568 136.347 38.459 137.832 38.459C139.284 38.459 140.109 37.634 140.109 35.885ZM147.61 41H144.706V19.088H150.811C153.88 19.088 154.969 20.705 154.969 23.477V26.48C154.969 28.493 154.144 29.681 152.725 30.044V30.176C154.276 30.473 155.035 31.529 155.035 33.707V41H152.131V33.476C152.131 32.057 151.702 31.463 150.283 31.463H147.61V41ZM152.098 26.744V23.807C152.098 22.454 151.537 21.761 150.151 21.761H147.61V28.988H150.184C151.372 28.988 152.098 28.427 152.098 26.744ZM164.879 41H156.695V19.088H164.615V21.761H159.599V28.163H164.186V30.869H159.599V38.327H164.879V41Z" fill="#0B2E42" />
              </svg>
            </button>
          </div>
          <div className="founder__mask"></div>
        </div>
      </section>

      <div style={{ backgroundImage: `url(${AfterFounderImgAbove})` }} ref={afterFounderImgContainerRef} className="after-founder-img-overlay-container" />

      <section className="section after-founder" ref={afterFounderRef}>
        <div className="after-founder__inner">
          <img
            src={AfterFounderImg}
            className="After_Founder__img"
            alt="Founder"
          />
          <MaskGradient2 />
          <div className="AfterFounder__mask"></div>
          <div className="after-founder__stats-grid">
            <div className="after-founder__stat">
              <div className="after-founder__stat-number-wrapper">
                <svg
                  className="after-founder__stat-icon"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28.7638 48.0421H19.1758V28.7641H-0.000191212V19.1761H19.1758V5.37634e-05H28.7638V19.1761H48.0418V28.7641H28.7638V48.0421Z" fill="#BD97EC"/>
                </svg>
                <CountUp from={0} to={100} duration={6} className="after-founder__stat-number" startWhen={afterFounderActive} />
              </div>
              <span className="after-founder__stat-label">Athletes Coached</span>
            </div>
            <div className="after-founder__stat">
              <div className="after-founder__stat-number-wrapper">
                <svg
                  className="after-founder__stat-icon"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28.7638 48.0421H19.1758V28.7641H-0.000191212V19.1761H19.1758V5.37634e-05H28.7638V19.1761H48.0418V28.7641H28.7638V48.0421Z" fill="#BD97EC"/>
                </svg>
                <CountUp from={0} to={20} duration={6.5} className="after-founder__stat-number" startWhen={afterFounderActive} />
              </div>
              <span className="after-founder__stat-label">National & international titles</span>
            </div>
            <div className="after-founder__stat">
              <div className="after-founder__stat-number-wrapper">
                <svg
                  className="after-founder__stat-icon"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28.7638 48.0421H19.1758V28.7641H-0.000191212V19.1761H19.1758V5.37634e-05H28.7638V19.1761H48.0418V28.7641H28.7638V48.0421Z" fill="#BD97EC"/>
                </svg>
                <CountUp from={0} to={10} duration={7} className="after-founder__stat-number" startWhen={afterFounderActive} />
              </div>
              <span className="after-founder__stat-label">Sports disciplinesached</span>
            </div>
            <div className="after-founder__stat">
              <div className="after-founder__stat-number-wrapper">
                <svg
                  className="after-founder__stat-icon"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28.7638 48.0421H19.1758V28.7641H-0.000191212V19.1761H19.1758V5.37634e-05H28.7638V19.1761H48.0418V28.7641H28.7638V48.0421Z" fill="#BD97EC"/>
                </svg>
                <CountUp from={0} to={5} duration={7.5} className="after-founder__stat-number" startWhen={afterFounderActive} />
              </div>
              <span className="after-founder__stat-label">Professional coaches</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section before-who-we-train" ref={beforeWhoWeTrainRef}>
        <div className='quote-container'>
            <h3>“Helping every athlete, from Olympians to first-timers, evolve with purpose.”</h3>
            <p>Manuel Nicolau</p>
        </div>
      </section>
      
      <section className="section who-we-train" ref={whoWeTrainRef}>
        <div className='heading-container'>
          <h2>WHO WE TRAIN</h2>
          <p>PROFILES</p>
        </div>
        <div className='intro-container'>
          <p>Every sport demands something different. We tailor training to your discipline, your goals, and the way you perform best.</p>
        </div>
        
        {/* <div className='profile-card'>
          <img src={ProfileImgCycling} alt="" />
          <p>Cycling</p>
        </div> */}

        <div className="flip-card profile-card-cycling">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ProfileImgCycling} alt="" />
              <h3>Cycling</h3>
            </div>
            <div className="flip-card-back">
              <p>Cycling is more than just endurance it’s about mastering power, pacing, and recovery across every ride. Whether on the road, trail, or mountain, our training focuses on developing sustainable performance through structured sessions, data analysis, and strength work. We help cyclists and MTB riders optimize their physical and mental resilience, ensuring they’re prepared to perform at their best in every terrain and condition.</p>
              <h3>Cycling</h3>
            </div>
            <img className='svg-front' src={CardSVGCyclingFront} alt="" />
            {/* <img className='svg-back' src={CardSVGCyclingBack} alt="" /> */}
          </div>
        </div>

        <div className="flip-card profile-card-swimmers">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3>Swimmers</h3>
              <img src={ProfileImgSwimmers} alt="" />
            </div>
            <div className="flip-card-back">
              <h3>Swimmers</h3>
              <p>Water swimming requires more than just technique, it’s about efficiency, adaptability, and mental strength. Our training approach helps swimmers develop endurance, pacing, and breathing control to perform in unpredictable environments. By combining individualized training plans with strength and conditioning, we prepare athletes to face any distance or condition with confidence and precision.<br/><br/>Open water swimming is more than a sport — it’s a journey of adaptation, confidence, and connection with the unpredictable. The ocean demands respect and composure; it challenges not just your technique, but your mindset.</p>
            </div>
            <img className='svg-front' src={CardSVGSwimmers} alt="" />
          </div>
        </div>
      </section>

      <section className="section who-we-train-second" ref={whoWeTrainSecondRef}>
        <div className="flip-card profile-card-triathlon">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3>Triathlon</h3>
              <img src={ProfileImgTriathlon} alt="" />
            </div>
            <div className="flip-card-back">
              <h3>Triathlon</h3>
              <p>High performance in triathlon is built on adaptation — the body’s ability to respond to stress, recover, and evolve. Every training session, every recovery day, and every lifestyle factor contributes to that process. Real progress happens when training load, recovery, and life are in balance. Our methodology is grounded in science and guided by individualization. Each athlete responds differently to the same stimulus; genetics, experience, and daily context shape how adaptation occurs.</p>
            </div>
            <img className='svg-front' src={CardSVGTriathlon} alt="" />
          </div>
        </div>

        <div className="flip-card profile-card-athletics">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ProfileImgAthletics} alt="" />
              <h3>Athletics</h3>
            </div>
            <div className="flip-card-back">
              <p>Performance in running comes from more than mileage — it’s the result of how your body adapts to every stimulus, from training load to recovery, from stress to sleep. Endurance isn’t built overnight; it’s developed through a process that balances effort, rest, and consistency over time. Our training philosophy combines science with individual context. Each runner adapts differently — shaped by physiology, background, and daily life. That’s why every plan we design is personal, aligning the right intensity, volume, and recovery to support continuous adaptation and sustainable progress.</p>
              <h3>Athletics</h3>
            </div>
            <img className='svg-front' src={CardSVGAthletics} alt="" />
          </div>
        </div>

        <div className="flip-card profile-card-drivers">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ProfileImgDrivers} alt="" />
              <h3>Drivers</h3>
            </div>
            <div className="flip-card-back">
              <p>In motorsport, physical conditioning is the foundation of performance. Drivers and riders must sustain high heart rates, intense vibration, and extreme G-forces — all while maintaining precision and focus. Our training develops core and neck strength, aerobic and muscular endurance, and postural stability to resist fatigue and enhance control throughout every lap. y targeting the specific demands of driving — from reaction time to heat tolerance — we help athletes perform with consistency and precision under pressure. Because in motorsport, the strongest engine is the athlete’s body.</p>
              <h3>Drivers</h3>
            </div>
            <img className='svg-front' src={CardSVGDrivers} alt="" />
          </div>
        </div>

        <div className="flip-card profile-card-team">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ProfileImgTeam} alt="" />
              <h3>Team sports</h3>
            </div>
            <div className="flip-card-back">
              <p>In team sports, strength is more than power — it’s the foundation for performance, resilience, and longevity. Football, basketball, futsal, or hockey all demand acceleration, stability, and the ability to repeat high-intensity efforts under fatigue. Without strength, speed and skill can’t be fully expressed. Our approach to strength training is performance-driven and sport-specific. We focus on developing explosive power, joint stability, and muscular endurance, building a body capable of producing force efficiently and absorbing impact safely.</p>
              <h3>Team sports</h3>
            </div>
            <img className='svg-front' src={CardSVGTeam} alt="" />
          </div>
        </div>
      </section>
          
      <div className="scaffold-overlay" style={{ backgroundImage: `url(${ScaffoldOverlayBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <img src={GreenLogo} alt="" />
        <div>
          <img src={WhiteWarning} alt="" />
          <h4>OPTIMIZED FOR LARGER SCREENS</h4>
          <p>Work in progress.<br/>For the best experience, please resize your browser window or view this page on a larger screen.</p>
        </div>
      </div>

     </div>
    
    </>
  )
}

export default App
