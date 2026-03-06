import './App.css'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/dist/Observer'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Navbar from './components/Navbar'
import ScaffoldOverlay from './components/ScaffoldOverlay'
import RightOrnament, { type RightOrnamentHandle } from './components/RightOrnament'
import ContactsRunner, { type ContactsRunnerHandle } from './components/ContactsRunner'
import ChevronOrnaments, { type ChevronOrnamentsHandle } from './components/ChevronOrnaments'
import HeroSection, { type HeroSectionHandle } from './components/sections/HeroSection'
import FounderSection, { type FounderSectionHandle } from './components/sections/FounderSection'
import AfterFounderSection from './components/sections/AfterFounderSection'
import BeforeWhoWeTrainSection from './components/sections/BeforeWhoWeTrainSection'
import WhoWeTrainSection from './components/sections/WhoWeTrainSection'
import WhoWeTrainSecondSection from './components/sections/WhoWeTrainSecondSection'
import WhoWeTrainThirdSection from './components/sections/WhoWeTrainThirdSection'
import MeetTheTeamSection from './components/sections/MeetTheTeamSection'
import MeetTheTeamSecondSection from './components/sections/MeetTheTeamSecondSection'
import OurCoachesSection from './components/sections/OurCoachesSection'
import CoachesCTASection from './components/sections/CoachesCTASection'
import RunnerSeparatorSection from './components/sections/RunnerSeparatorSection'
import ResultsSection from './components/sections/ResultsSection'
import ContactsSection from './components/sections/ContactsSection'
import FooterSection from './components/sections/FooterSection'

// Registrar plugins
gsap.registerPlugin(Observer, ScrollTrigger)

function App() {
  const heroHandleRef = useRef<HeroSectionHandle | null>(null)
  const ornamentHandleRef = useRef<RightOrnamentHandle | null>(null)
  const contactsRunnerHandleRef = useRef<ContactsRunnerHandle | null>(null)
  const chevronOrnamentsHandleRef = useRef<ChevronOrnamentsHandle | null>(null)
  const founderHandleRef = useRef<FounderSectionHandle | null>(null)
  const afterFounderRef = useRef<HTMLDivElement | null>(null)
  const beforeWhoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainSecondRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainThirdRef = useRef<HTMLDivElement | null>(null)
  const meetTheTeamRef = useRef<HTMLDivElement | null>(null)
  const meetTheTeamSecondRef = useRef<HTMLDivElement | null>(null)
  const ourCoachesRef = useRef<HTMLDivElement | null>(null)
  const coachesCTARef = useRef<HTMLDivElement | null>(null)
  const runnerSeparatorRef = useRef<HTMLDivElement | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const contactsRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const topBannerRef = useRef<HTMLDivElement | null>(null)

  const afterFounderImgContainerRef = useRef<HTMLDivElement | null>(null)

  // Expose goTo for Navbar callbacks (goTo is defined inside the main useEffect)
  const goToRef = useRef<((index: number) => void) | null>(null)

  const currentSection = useRef(0)
  const isAnimating = useRef(false)

  // Scroll mode refs
  const scrollMode = useRef(false)
  const observerRef = useRef<ReturnType<typeof Observer.create> | null>(null)
  const smoothWrapperRef = useRef<HTMLDivElement | null>(null)
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null)

  const [afterFounderActive, setAfterFounderActive] = useState(false)

  useEffect(() => {
    const heroEl = heroHandleRef.current?.heroEl ?? null
    const heroImgContainerEl = heroHandleRef.current?.bikerEl ?? null
    const ornamentEl = ornamentHandleRef.current?.ornamentEl ?? null
    const founderEl = founderHandleRef.current?.founderEl ?? null
    const founderImgContainerEl = founderHandleRef.current?.founderImgEl ?? null
    const estDateContainerEl = founderHandleRef.current?.estDateEl ?? null
    const founderBadgeEl = founderHandleRef.current?.badgeEl ?? null
    const afterFounderEl = afterFounderRef.current
    const beforeWhoWeTrainEl = beforeWhoWeTrainRef.current
    const whoWeTrainEl = whoWeTrainRef.current
    const whoWeTrainSecondEl = whoWeTrainSecondRef.current
    const whoWeTrainThirdEl = whoWeTrainThirdRef.current
    const meetTheTeamEl = meetTheTeamRef.current
    const meetTheTeamSecondEl = meetTheTeamSecondRef.current
    const ourCoachesEl = ourCoachesRef.current
    const coachesCTAEl = coachesCTARef.current
    const runnerSeparatorEl = runnerSeparatorRef.current
    const resultsEl = resultsRef.current
    const contactsEl = contactsRef.current
    const footerEl = footerRef.current
    const topBannerEl = topBannerRef.current
    const afterFounderImgContainerEl = afterFounderImgContainerRef.current
    const contactsRunnerEl = contactsRunnerHandleRef.current?.contactsRunnerEl ?? null
    const chevronA = chevronOrnamentsHandleRef.current?.chevronA ?? null
    const chevronB = chevronOrnamentsHandleRef.current?.chevronB ?? null
    const chevronC = chevronOrnamentsHandleRef.current?.chevronC ?? null
    const chevronD = chevronOrnamentsHandleRef.current?.chevronD ?? null

    if (!heroEl || !ornamentEl || !founderEl || !afterFounderEl || !beforeWhoWeTrainEl || !whoWeTrainEl || !whoWeTrainSecondEl || !meetTheTeamEl || !ourCoachesEl || !coachesCTAEl || !runnerSeparatorEl || !resultsEl || !footerEl) return

    // Estados iniciais — Observer-zone sections only (scroll-zone sections are in hidden wrapper)
    gsap.set(heroEl, { autoAlpha: 1 })
    gsap.set(founderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(heroImgContainerEl, { autoAlpha: 1 })
    gsap.set(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(estDateContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 })

    // Initialize founder badge as hidden
    if (founderBadgeEl) {
      gsap.set(founderBadgeEl, { autoAlpha: 0 })
    }

    if (contactsRunnerEl) gsap.set(contactsRunnerEl, { autoAlpha: 0 })

    // Chevrons: all off-screen, invisible. xPercent/yPercent for centering (avoid CSS transform conflict)
    if (chevronA) gsap.set(chevronA, { autoAlpha: 0, xPercent: -50, yPercent: -50, x: '60vw', y: '0vh', scaleX: -1 })
    if (chevronB) gsap.set(chevronB, { autoAlpha: 0, xPercent: -50, yPercent: -50, x: '-60vw', y: '0vh' })
    if (chevronC) gsap.set(chevronC, { autoAlpha: 0, xPercent: -50, yPercent: -50, x: '60vw', y: '0vh', scaleX: -1})
    if (chevronD) gsap.set(chevronD, { autoAlpha: 0, xPercent: -50, yPercent: -50, x: '60vw', y: '0vh', scaleX: -1 })

    // Top banner hidden outside the top of the screen by default — shown only on sections 7, 8, 9
    if (topBannerEl) {
      gsap.set(topBannerEl, { autoAlpha: 1, yPercent: -100 })
    }

    // ── Scroll mode helpers ──
    const scrollTriggers: ScrollTrigger[] = []

    const enterScrollMode = () => {
      if (scrollMode.current) return
      scrollMode.current = true

      const wrapper = smoothWrapperRef.current
      if (!wrapper) return

      // Enable touch on body for scroll mode
      document.body.classList.add('scroll-mode-active')

      // Show scroll container
      wrapper.style.visibility = 'visible'
      wrapper.style.overflowY = 'auto'
      wrapper.style.overflowX = 'hidden'

      // Hide all Observer-zone sections
      gsap.set([heroEl, heroImgContainerEl, founderEl, founderImgContainerEl, estDateContainerEl, afterFounderEl, afterFounderImgContainerEl, beforeWhoWeTrainEl], { autoAlpha: 0 })
      if (founderBadgeEl) gsap.set(founderBadgeEl, { autoAlpha: 0 })
      gsap.set(ornamentEl, { x: 800 })

      // Clear any leftover GSAP inline transforms on scroll-zone sections
      const scrollSections = [whoWeTrainEl, whoWeTrainSecondEl, whoWeTrainThirdEl, meetTheTeamEl, meetTheTeamSecondEl, ourCoachesEl, coachesCTAEl, runnerSeparatorEl, resultsEl, contactsEl, footerEl]
      scrollSections.forEach(el => {
        if (el) gsap.set(el, { clearProps: 'all' })
      })

      // Tell ScrollTrigger to use the wrapper as the scroller
      ScrollTrigger.defaults({ scroller: wrapper })

      // Horizontal scroll: pin the track and scrub it left
      const horizontalAnim = gsap.to(horizontalTrackRef.current, {
        xPercent: -66.67,
        ease: 'none',
      })
      const hST = ScrollTrigger.create({
        trigger: horizontalTrackRef.current,
        scroller: wrapper,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + (window.innerWidth * 2),
        animation: horizontalAnim,
      })
      scrollTriggers.push(hST)

      // Back-navigation: detect upward scroll at top of wrapper
      const backObserver = Observer.create({
        target: wrapper,
        type: 'wheel,touch',
        preventDefault: false,  // don't block scroll events
        tolerance: 10,
        onUp: () => {
          if (wrapper.scrollTop <= 2) {
            backObserver.kill()
            exitScrollMode()
            goTo(3)
          }
        },
      })

      // Chevron animations via ScrollTrigger
      setupChevronScrollTriggers(wrapper)

      // TopBanner: show during MeetTheTeam sections (7-9)
      if (topBannerEl) {
        const bannerShow = ScrollTrigger.create({
          trigger: meetTheTeamEl,
          scroller: wrapper,
          start: 'top 80%',
          end: 'bottom top',
          onEnter: () => gsap.to(topBannerEl, { yPercent: 0, duration: 0.3 }),
          onLeaveBack: () => gsap.to(topBannerEl, { yPercent: -100, duration: 0.3 }),
        })
        scrollTriggers.push(bannerShow)

        const bannerHide = ScrollTrigger.create({
          trigger: coachesCTAEl,
          scroller: wrapper,
          start: 'top 50%',
          onEnter: () => gsap.to(topBannerEl, { yPercent: -100, duration: 0.3 }),
          onLeaveBack: () => gsap.to(topBannerEl, { yPercent: 0, duration: 0.3 }),
        })
        scrollTriggers.push(bannerHide)
      }

      // ContactsRunner entrance
      if (contactsEl) {
        const contactsST = ScrollTrigger.create({
          trigger: contactsEl,
          scroller: wrapper,
          start: 'top 80%',
          once: true,
          onEnter: () => contactsRunnerHandleRef.current?.playEntrance(),
        })
        scrollTriggers.push(contactsST)
      }

      // Disable the main Observer
      observerRef.current?.disable()
    }

    const setupChevronScrollTriggers = (scroller: HTMLElement) => {
      if (!chevronA || !chevronB || !chevronC || !chevronD) return

      // Reset chevrons to their initial off-screen positions
      gsap.set(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' })
      gsap.set(chevronB, { autoAlpha: 0, x: '-60vw', y: '0vh' })
      gsap.set(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' })
      gsap.set(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' })

      // Chevron A enters from right when MeetTheTeam comes into view
      scrollTriggers.push(ScrollTrigger.create({
        trigger: meetTheTeamEl,
        scroller,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        animation: gsap.timeline()
          .to(chevronA, { autoAlpha: 1, x: '35vw', y: '-10vh', duration: 1 })
          .to(chevronB, { autoAlpha: 1, x: '-35vw', y: '60vh', duration: 1 }, 0),
      }))

      // Chevrons A/B move during MeetTheTeam sections
      scrollTriggers.push(ScrollTrigger.create({
        trigger: meetTheTeamSecondEl,
        scroller,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.timeline()
          .to(chevronA, { x: '35vw', y: '-65vh', duration: 1 })
          .to(chevronB, { x: '-30vw', y: '-15vh', duration: 1 }, 0),
      }))

      // Chevrons A/B cross/swap at OurCoaches
      scrollTriggers.push(ScrollTrigger.create({
        trigger: ourCoachesEl,
        scroller,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.timeline()
          .to(chevronA, { x: '-40vw', y: '10vh', ease: 'power2.inOut', duration: 1 })
          .to(chevronB, { x: '40vw', y: '10vh', ease: 'power2.inOut', duration: 1 }, 0),
      }))

      // Chevrons A/B exit, C/D enter at CoachesCTA
      scrollTriggers.push(ScrollTrigger.create({
        trigger: coachesCTAEl,
        scroller,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.timeline()
          .to(chevronA, { autoAlpha: 0, x: '-60vw', duration: 1 })
          .to(chevronB, { autoAlpha: 0, x: '60vw', duration: 1 }, 0)
          .to(chevronC, { autoAlpha: 1, x: '45vw', y: '-60vh', duration: 1 }, 0)
          .to(chevronD, { autoAlpha: 1, x: '20vw', y: '-60vh', duration: 1 }, 0),
      }))

      // Chevrons C/D exit at contacts
      scrollTriggers.push(ScrollTrigger.create({
        trigger: contactsEl,
        scroller,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        animation: gsap.timeline()
          .to(chevronC, { autoAlpha: 0, y: '-100vh', duration: 1 })
          .to(chevronD, { autoAlpha: 0, y: '-100vh', duration: 1 }, 0),
      }))
    }

    const exitScrollMode = () => {
      if (!scrollMode.current) return
      scrollMode.current = false

      // Kill all scroll-zone ScrollTriggers
      scrollTriggers.forEach(st => st.kill())
      scrollTriggers.length = 0

      // Kill any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill())

      // Reset ScrollTrigger defaults
      ScrollTrigger.defaults({ scroller: undefined })

      // Remove body scroll-mode class
      document.body.classList.remove('scroll-mode-active')

      // Hide smooth-wrapper
      const wrapper = smoothWrapperRef.current
      if (wrapper) {
        wrapper.style.visibility = 'hidden'
        wrapper.style.overflowY = 'hidden'
        wrapper.scrollTop = 0
      }

      // Clear inline transforms on scroll-zone sections
      const scrollSections = [whoWeTrainEl, whoWeTrainSecondEl, whoWeTrainThirdEl, meetTheTeamEl, meetTheTeamSecondEl, ourCoachesEl, coachesCTAEl, runnerSeparatorEl, resultsEl, contactsEl, footerEl]
      scrollSections.forEach(el => {
        if (el) gsap.set(el, { clearProps: 'all' })
      })

      // Reset chevrons
      if (chevronA) gsap.set(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' })
      if (chevronB) gsap.set(chevronB, { autoAlpha: 0, x: '-60vw', y: '0vh' })
      if (chevronC) gsap.set(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' })
      if (chevronD) gsap.set(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' })

      // Reset top banner
      if (topBannerEl) gsap.set(topBannerEl, { yPercent: -100 })

      // Reset contacts runner
      if (contactsRunnerEl) gsap.set(contactsRunnerEl, { autoAlpha: 0 })

      // Re-enable Observer
      observerRef.current?.enable()
    }

    const goTo = (index: number) => {
      if (isAnimating.current) return

      // If targeting a scroll-zone section (4+), enter scroll mode and scroll to it
      if (index >= 4) {
        if (!scrollMode.current) {
          // Transition from Observer zone into scroll mode
          isAnimating.current = true
          const tl = gsap.timeline({
            defaults: { duration: 0.9, ease: 'power2.out' },
            onComplete: () => {
              currentSection.current = index
              enterScrollMode()
              // If targeting beyond section 4, scroll to the target section
              if (index > 4) {
                const targetMap: Record<number, HTMLElement | null> = {
                  5: whoWeTrainSecondEl, 6: whoWeTrainThirdEl,
                  7: meetTheTeamEl, 8: meetTheTeamSecondEl,
                  9: ourCoachesEl, 10: coachesCTAEl,
                  11: runnerSeparatorEl, 12: contactsEl,
                  13: footerEl,
                }
                const target = targetMap[index]
                const w = smoothWrapperRef.current
                if (target && w) {
                  w.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
                }
              }
              setTimeout(() => { isAnimating.current = false }, 250)
            },
          })
          // Fade out all Observer-zone sections
          tl.to(heroEl, { autoAlpha: 0 }, 0)
            .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
            .to(founderEl, { autoAlpha: 0 }, 0)
            .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
            .to(estDateContainerEl, { autoAlpha: 0 }, 0)
            .to(afterFounderEl, { autoAlpha: 0 }, 0)
            .to(afterFounderImgContainerEl, { autoAlpha: 0 }, 0)
            .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
            .to(ornamentEl, { x: 800 }, 0)
          if (founderBadgeEl) tl.to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
          return
        } else {
          // Already in scroll mode — use ScrollSmoother to scroll to target
          const targetMap: Record<number, HTMLElement | null> = {
            4: whoWeTrainEl, 5: whoWeTrainSecondEl, 6: whoWeTrainThirdEl,
            7: meetTheTeamEl, 8: meetTheTeamSecondEl,
            9: ourCoachesEl, 10: coachesCTAEl,
            11: runnerSeparatorEl, 12: contactsEl,
            13: footerEl,
          }
          const target = targetMap[index]
          const w = smoothWrapperRef.current
          if (target && w) {
            w.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
          }
          currentSection.current = index
          return
        }
      }

      // Observer-zone navigation (sections 0-3)
      // If in scroll mode, exit first
      if (scrollMode.current) {
        exitScrollMode()
      }

      if (index === currentSection.current) return
      isAnimating.current = true

      const ornamentHandle = ornamentHandleRef.current

      // garantir que nenhuma animação anterior interfere (Observer-zone elements only)
      const tweenTargets: (HTMLElement | SVGElement | null)[] = [
        heroEl, founderEl, afterFounderEl, ornamentEl,
        heroImgContainerEl, founderImgContainerEl, estDateContainerEl,
        afterFounderImgContainerEl, beforeWhoWeTrainEl,
      ]
      if (founderBadgeEl) tweenTargets.push(founderBadgeEl)
      if (topBannerEl) tweenTargets.push(topBannerEl)
      if (chevronA) tweenTargets.push(chevronA)
      if (chevronB) tweenTargets.push(chevronB)
      if (chevronC) tweenTargets.push(chevronC)
      if (chevronD) tweenTargets.push(chevronD)
      gsap.killTweensOf(tweenTargets)

      setAfterFounderActive(index === 2)  /* Detect start of transition into AfterFounder section -> To trigger CountUp start animation */

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power2.out' },
        onComplete: () => {
          currentSection.current = index
          setTimeout(() => { isAnimating.current = false }, 250)
        },
      })

      // Observer-zone switch: only cases 0-3 (sections 4+ handled by scroll mode)
      switch (index) {
        case 0: {
          // Voltar ao HERO
          tl.to(topBannerEl, { autoAlpha: 1, yPercent: -100, duration: 0.1 }, 0)
            .to(heroEl, { autoAlpha: 1 }, 0)
            .to(heroImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(founderEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(estDateContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(afterFounderEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
            .to(ornamentEl, { x: 0 }, 0)
            .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
            .to(ornamentEl.querySelectorAll('svg path'), { fill: '#ACFC17', duration: 0.6, ease: 'power2.out' }, 0)
          if (chevronA) tl.to(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronB) tl.to(chevronB, { autoAlpha: 0, x: '-60vw', y: '15vh' }, 0)
          if (chevronC) tl.to(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronD) tl.to(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          break
        }
        case 1: {
          // HERO -> FOUNDER
          tl.to(topBannerEl, { autoAlpha: 1, yPercent: -100, duration: 0.1 }, 0)
            .to(heroEl, { autoAlpha: 0 }, 0)
            .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
            .to(founderEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(founderImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(estDateContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(afterFounderEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
            .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
            .to(ornamentEl, { x: ornamentHandle?.computeLeftX() ?? 0 }, 0)
            .to(founderBadgeEl, { autoAlpha: 1, duration: 0.5 }, 0.4)
            .to(ornamentEl.querySelectorAll('svg path'), { fill: '#ACFC17', duration: 0.6, ease: 'power2.out' }, 0)
          if (chevronA) tl.to(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronB) tl.to(chevronB, { autoAlpha: 0, x: '-60vw', y: '15vh' }, 0)
          if (chevronC) tl.to(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronD) tl.to(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          break
        }
        case 2: {
          // FOUNDER -> AFTER-FOUNDER
          tl.to(topBannerEl, { autoAlpha: 1, yPercent: -100, duration: 0.1 }, 0)
            .to(heroEl, { autoAlpha: 0 }, 0)
            .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
            .to(founderEl, { autoAlpha: 0 }, 0)
            .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
            .to(estDateContainerEl, { autoAlpha: 0 }, 0)
            .to(afterFounderEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(afterFounderImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
            .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
            .to(ornamentEl, { x: 0 }, 0)
            .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
            .to(ornamentEl.querySelectorAll('svg path'), { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' }, 0)
          if (chevronA) tl.to(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronB) tl.to(chevronB, { autoAlpha: 0, x: '-60vw', y: '15vh' }, 0)
          if (chevronC) tl.to(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronD) tl.to(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          break
        }
        case 3: {
          // AFTER-FOUNDER -> BEFORE WHO WE TRAIN
          tl.to(topBannerEl, { autoAlpha: 1, yPercent: -100, duration: 0.1 }, 0)
            .to(heroEl, { autoAlpha: 0 }, 0)
            .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
            .to(founderEl, { autoAlpha: 0 }, 0)
            .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
            .to(estDateContainerEl, { autoAlpha: 0 }, 0)
            .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
            .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
            .to(beforeWhoWeTrainEl, { autoAlpha: 1, yPercent: 0 }, 0)
            .to(ornamentEl, { x: 800 }, 0)
            .to(founderBadgeEl, { autoAlpha: 0, duration: 0.3 }, 0)
            .to(ornamentEl.querySelectorAll('svg path'), { fill: '#bd97ec', duration: 0.6, ease: 'power2.out' }, 0)
          if (chevronA) tl.to(chevronA, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronB) tl.to(chevronB, { autoAlpha: 0, x: '-60vw', y: '15vh' }, 0)
          if (chevronC) tl.to(chevronC, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          if (chevronD) tl.to(chevronD, { autoAlpha: 0, x: '60vw', y: '0vh' }, 0)
          break
        }
      }
    }

    // Expose goTo for Navbar callbacks
    goToRef.current = goTo

    // Observer para bloquear scroll nativo e usar wheel / touch como navegação
    const observer = observerRef.current = Observer.create({
      target: window,
      type: 'wheel,touch,pointer',
      wheelSpeed: 1,
      tolerance: 6,
      preventDefault: true,
      onChangeY: (self: { deltaY: number }) => {
        if (isAnimating.current) return
        const dy = self.deltaY || 0
        if (dy > 7 && currentSection.current < 4) {
          goTo(currentSection.current + 1)
        } else if (dy < -7 && currentSection.current > 0) {
          goTo(currentSection.current - 1)
        }
      },
      onDown: () => {
        if (!isAnimating.current && currentSection.current < 4) goTo(currentSection.current + 1)
      },
      onUp: () => {
        if (!isAnimating.current && currentSection.current > 0) goTo(currentSection.current - 1)
      },
    })

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current || scrollMode.current) return  // In scroll mode, let native scroll handle keys
      const key = e.key
      if (key === 'ArrowDown' || key === 'PageDown' || key === 'ArrowRight'|| (key === ' ' && !e.shiftKey)) {
        e.preventDefault()
        if (currentSection.current < 4) goTo(currentSection.current + 1)
      } else if (key === 'ArrowUp' || key === 'PageUp' || key === 'ArrowLeft' || (key === ' ' && e.shiftKey)) {
        e.preventDefault()
        if (currentSection.current > 0) goTo(currentSection.current - 1)
      }
    }
    window.addEventListener('keydown', onKey, { passive: false })

    // Cleanup
    return () => {
      observer?.kill()
      window.removeEventListener('keydown', onKey)
      scrollTriggers.forEach(st => st.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
      document.body.classList.remove('scroll-mode-active')
    }
  }, [])

  return (
    <>

     <div style={{ position: "relative", width:"100%", height:"100%"}}>

      <div className="top-banner" ref={topBannerRef}>
        <button className="top-banner-button">Start Training</button>
      </div>

      <Navbar
        onHeroClick={() => goToRef.current?.(0)}
        onFounderClick={() => goToRef.current?.(1)}
        onWhoWeTrainClick={() => goToRef.current?.(4)}
        onMeetTheTeamClick={() => goToRef.current?.(7)}
        onContactsClick={() => goToRef.current?.(12)}
      />

      <RightOrnament ref={ornamentHandleRef} />

      <ContactsRunner ref={contactsRunnerHandleRef} />

      <ChevronOrnaments ref={chevronOrnamentsHandleRef} />

      <HeroSection ref={heroHandleRef} />

      <FounderSection ref={founderHandleRef} />

      <AfterFounderSection
        ref={afterFounderRef}
        imgOverlayRef={afterFounderImgContainerRef}
        active={afterFounderActive}
      />

      <BeforeWhoWeTrainSection ref={beforeWhoWeTrainRef} />

      {/* Scroll-controlled zone: sections 4-14 */}
      <div id="smooth-wrapper" ref={smoothWrapperRef}
           style={{ position: 'fixed', inset: 0, zIndex: 2, visibility: 'hidden', overflow: 'hidden' }}>
        <div id="smooth-content">
          <div className="horizontal-track" ref={horizontalTrackRef}>
            <WhoWeTrainSection ref={whoWeTrainRef} />
            <WhoWeTrainSecondSection ref={whoWeTrainSecondRef} />
            <WhoWeTrainThirdSection ref={whoWeTrainThirdRef} />
          </div>

          <MeetTheTeamSection ref={meetTheTeamRef} />
          <MeetTheTeamSecondSection ref={meetTheTeamSecondRef} />
          <OurCoachesSection ref={ourCoachesRef} />
          <CoachesCTASection ref={coachesCTARef} />
          <RunnerSeparatorSection ref={runnerSeparatorRef} />
          <ResultsSection ref={resultsRef} />
          <ContactsSection ref={contactsRef} />
          <FooterSection ref={footerRef} />
        </div>
      </div>

      <ScaffoldOverlay />

     </div>

    </>
  )
}

export default App
