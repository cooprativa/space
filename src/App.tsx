import './App.css'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/dist/Observer'

import Navbar from './components/Navbar'
import ScaffoldOverlay from './components/ScaffoldOverlay'
import RightOrnament, { type RightOrnamentHandle } from './components/RightOrnament'
import ContactsRunner, { type ContactsRunnerHandle } from './components/ContactsRunner'
import HeroSection, { type HeroSectionHandle } from './components/sections/HeroSection'
import FounderSection, { type FounderSectionHandle } from './components/sections/FounderSection'
import AfterFounderSection from './components/sections/AfterFounderSection'
import BeforeWhoWeTrainSection from './components/sections/BeforeWhoWeTrainSection'
import WhoWeTrainSection from './components/sections/WhoWeTrainSection'
import WhoWeTrainSecondSection from './components/sections/WhoWeTrainSecondSection'
import MeetTheTeamSection from './components/sections/MeetTheTeamSection'
import MeetTheTeamSecondSection from './components/sections/MeetTheTeamSecondSection'
import OurCoachesSection from './components/sections/OurCoachesSection'
import CoachesCTASection from './components/sections/CoachesCTASection'
import RunnerSeparatorSection from './components/sections/RunnerSeparatorSection'
import ResultsSection from './components/sections/ResultsSection'
import ContactsSection from './components/sections/ContactsSection'
import FooterSection from './components/sections/FooterSection'

// Registrar plugins
gsap.registerPlugin(Observer)

function App() {
  const heroHandleRef = useRef<HeroSectionHandle | null>(null)
  const ornamentHandleRef = useRef<RightOrnamentHandle | null>(null)
  const contactsRunnerHandleRef = useRef<ContactsRunnerHandle | null>(null)
  const founderHandleRef = useRef<FounderSectionHandle | null>(null)
  const afterFounderRef = useRef<HTMLDivElement | null>(null)
  const beforeWhoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainRef = useRef<HTMLDivElement | null>(null)
  const whoWeTrainSecondRef = useRef<HTMLDivElement | null>(null)
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

    if (!heroEl || !ornamentEl || !founderEl || !afterFounderEl || !beforeWhoWeTrainEl || !whoWeTrainEl || !whoWeTrainSecondEl || !meetTheTeamEl || !ourCoachesEl || !coachesCTAEl || !runnerSeparatorEl || !resultsEl || !footerEl) return

    // Estados iniciais (apenas hero visível)
    gsap.set(heroEl, { autoAlpha: 1 })
    gsap.set(founderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 })
    gsap.set(ourCoachesEl, { autoAlpha: 1, yPercent: 100 })
    gsap.set(coachesCTAEl, { autoAlpha: 1, yPercent: 100 })
    gsap.set(runnerSeparatorEl, { autoAlpha: 1, yPercent: 100 })
    gsap.set(resultsEl, { autoAlpha: 1, yPercent: 100 })
    gsap.set(footerEl, { autoAlpha: 0, yPercent: 100 })
    gsap.set(heroImgContainerEl, { autoAlpha: 1 })
    gsap.set(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(estDateContainerEl, { autoAlpha: 0, xPercent: 100 })
    gsap.set(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 })

    // Initialize founder badge as hidden
    if (founderBadgeEl) {
      gsap.set(founderBadgeEl, { autoAlpha: 0 })
    }

    if (contactsRunnerEl) gsap.set(contactsRunnerEl, { autoAlpha: 0 })

    // Top banner hidden by default — shown only on sections 6, 7, 8
    if (topBannerEl) {
      gsap.set(topBannerEl, { autoAlpha: 0 })
    }

    const goTo = (index: number) => {
      if (isAnimating.current || index === currentSection.current) return
      isAnimating.current = true

      const ornamentHandle = ornamentHandleRef.current

      // garantir que nenhuma animação anterior interfere
      const tweenTargets: (HTMLElement | SVGElement | null)[] = [
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
        whoWeTrainSecondEl,
        meetTheTeamEl,
        meetTheTeamSecondEl,
        ourCoachesEl,
        coachesCTAEl,
        runnerSeparatorEl,
        resultsEl,
        contactsEl,
        footerEl
      ]
      if (founderBadgeEl) tweenTargets.push(founderBadgeEl)
      if (topBannerEl) tweenTargets.push(topBannerEl)
      if (contactsRunnerEl) tweenTargets.push(contactsRunnerEl)
      gsap.killTweensOf(tweenTargets)

      setAfterFounderActive(index === 2)  /* Detect start of transition into AfterFounder section -> To trigger CountUp start animation */

      if (index === 11) contactsRunnerHandleRef.current?.playEntrance()
        
      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power2.out' },
        onComplete: () => {
          currentSection.current = index
          setTimeout(() => { isAnimating.current = false }, 250)
        },
      })

      switch (index) {
        case 0: {
           // Voltar ao HERO
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 1 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(founderEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
             .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
             .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
             .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
             .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
             .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
             .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
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
              .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
             .to(ornamentEl, { x: ornamentHandle?.computeLeftX() ?? 0 }, 0)
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
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 1, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, yPercent: 100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 1, yPercent: 0 }, 0)
             .to(whoWeTrainEl, { autoAlpha: .4, yPercent: 50 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 1, xPercent: 0, yPercent: 0 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 0, xPercent: 100 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 6: {
          // WHO WE TRAIN SECOND -> MEET THE TEAM
           tl.to(topBannerEl, { autoAlpha: 1, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 7: {
          // MEET THE TEAM -> MEET THE TEAM SECOND
           tl.to(topBannerEl, { autoAlpha: 1, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 8: {
          // MEET THE TEAM SECOND -> OUR COACHES
           tl.to(topBannerEl, { autoAlpha: 1, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 9: {
          // OUR COACHES -> COACHES CTA
           tl.to(topBannerEl, { autoAlpha: 1, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: 55, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 100 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 10: {
          // COACHES CTA -> RESULTS
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 100, yPercent: -85, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(contactsEl, { autoAlpha: 0, yPercent: 100 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 11: {
          // RESULTS -> CONTACTS
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 0, yPercent: -100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(contactsEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 100 }, 0)
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
        case 12: {
          // CONTACTS -> FOOTER
           tl.to(topBannerEl, { autoAlpha: 0, duration: 0.3 }, 0)
             .to(heroEl, { autoAlpha: 0 }, 0)
             .to(heroImgContainerEl, { autoAlpha: 0 }, 0)
             .to(founderEl, { autoAlpha: 0 }, 0)
             .to(founderImgContainerEl, { autoAlpha: 0 }, 0)
             .to(estDateContainerEl, { autoAlpha: 0 }, 0)
             .to(afterFounderEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(afterFounderImgContainerEl, { autoAlpha: 0, xPercent: 0 }, 0)
             .to(beforeWhoWeTrainEl, { autoAlpha: 0, yPercent: -50 }, 0)
             .to(whoWeTrainEl, { autoAlpha: 0, xPercent: -100 }, 0)
             .to(whoWeTrainSecondEl, { autoAlpha: 1, xPercent: 0 }, 0)
              .to(meetTheTeamEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(meetTheTeamSecondEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(ourCoachesEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(coachesCTAEl, { autoAlpha: 1, yPercent: -100 }, 0)
              .to(runnerSeparatorEl, { autoAlpha: 0, yPercent: -100, duration: 1.2 }, 0)
              .to(resultsEl, { autoAlpha: 1, yPercent: 0 }, 0)
              .to(contactsEl, { autoAlpha: 1, yPercent: -60 }, 0)
              .to(footerEl, { autoAlpha: 1, yPercent: 40 }, 0)
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

      // ContactsRunner: hide on all sections except 11, show on 11 (entrance handled via playEntrance)
      if (index !== 11 && contactsRunnerEl) tl.to(contactsRunnerEl, { autoAlpha: 0 }, 0)
    }

    // Expose goTo for Navbar callbacks
    goToRef.current = goTo

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
        if (dy > 7 && currentSection.current < 12) {
          goTo(currentSection.current + 1)
        } else if (dy < -7 && currentSection.current > 0) {
          goTo(currentSection.current - 1)
        }
      },
      onDown: () => {
        if (!isAnimating.current && currentSection.current < 12) goTo(currentSection.current + 1)
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
        if (currentSection.current < 12) goTo(currentSection.current + 1)
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
        onMeetTheTeamClick={() => goToRef.current?.(6)}
        onContactsClick={() => goToRef.current?.(11)}
      />

      <RightOrnament ref={ornamentHandleRef} />

      <ContactsRunner ref={contactsRunnerHandleRef} />

      <HeroSection ref={heroHandleRef} />

      <FounderSection ref={founderHandleRef} />

      <AfterFounderSection
        ref={afterFounderRef}
        imgOverlayRef={afterFounderImgContainerRef}
        active={afterFounderActive}
      />

      <BeforeWhoWeTrainSection ref={beforeWhoWeTrainRef} />

      <WhoWeTrainSection ref={whoWeTrainRef} />

      <WhoWeTrainSecondSection ref={whoWeTrainSecondRef} />
      
      <MeetTheTeamSection ref={meetTheTeamRef} />

      <MeetTheTeamSecondSection ref={meetTheTeamSecondRef} />

      <OurCoachesSection ref={ourCoachesRef} />
      
      <CoachesCTASection ref={coachesCTARef} />
      
      <RunnerSeparatorSection ref={runnerSeparatorRef} />

      <ResultsSection ref={resultsRef} />

      <ContactsSection ref={contactsRef} />

      <FooterSection ref={footerRef} />

      <ScaffoldOverlay />

     </div>

    </>
  )
}

export default App
