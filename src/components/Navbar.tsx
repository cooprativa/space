import { useState, useEffect, useRef, useCallback } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface NavbarProps {
  onHeroClick: () => void;
  onFounderClick: () => void;
  onWhoWeTrainClick: () => void;
  onMeetTheTeamClick: () => void;
  onContactsClick: () => void;
}

export default function Navbar({ onHeroClick, onFounderClick, onWhoWeTrainClick, onMeetTheTeamClick, onContactsClick }: NavbarProps) {
  const liquidGlassContainerRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  // Measure .glass and set blur div dimensions (CSS transition handles animation)
  const updateBlurSize = useCallback(() => {
    const container = liquidGlassContainerRef.current;
    const blurEl = blurRef.current;
    if (!container || !blurEl) return;

    const glassEl = container.querySelector('.glass') as HTMLElement | null;
    if (!glassEl) return;

    const rect = glassEl.getBoundingClientRect();
    blurEl.style.width = `${rect.width}px`;
    blurEl.style.height = `${rect.height}px`;
  }, []);

  // Attach native hover listeners to the .glass element rendered by LiquidGlass
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

  // Dispatch resize events every frame during expand/collapse so LiquidGlass redraws
  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const duration = 500;

    const tick = () => {
      window.dispatchEvent(new Event('resize'));
      if (performance.now() - start < duration) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [navbarExpanded]);

  // Update blur size on mount, on expand/collapse, and on window resize
  useEffect(() => {
    updateBlurSize();
    // Measure again after the transition completes to get final size
    const timer = setTimeout(updateBlurSize, 450);
    return () => clearTimeout(timer);
  }, [navbarExpanded, updateBlurSize]);

  useEffect(() => {
    window.addEventListener('resize', updateBlurSize);
    // Initial measurement after LiquidGlass mounts
    setTimeout(updateBlurSize, 100);
    return () => window.removeEventListener('resize', updateBlurSize);
  }, [updateBlurSize]);

  return (
    <>
      <div ref={blurRef} className="navbar-blur-backdrop" />
      <div ref={liquidGlassContainerRef} className="liquid-glass-navbar-container">
        <LiquidGlass
          mode="polar"
          mouseContainer={liquidGlassContainerRef}
          elasticity={0.2}
          style={{ position: 'fixed' }}
          displacementScale={64}
          blurAmount={0.5}
          saturation={130}
          aberrationIntensity={2}
          cornerRadius={40}
        >
          <div className={`floating-navbar ${navbarExpanded ? 'expanded' : ''}`}>
            <div className="nav-logo-container" onClick={onHeroClick}>
              <img className='navbar-logo' src="/logo-branco.svg" alt="" />
              <img className='navbar-logo' src="/logo-branco.svg" alt="" />
            </div>

            <div className="menu-link">
              <Bars3Icon className="menu-icon" />
              <Bars3Icon className="menu-icon" />
            </div>

            <div className={`navlinks ${navbarExpanded ? 'show' : ''}`}>
              <a onClick={onFounderClick}>Who We Are</a>
              <a onClick={onWhoWeTrainClick}>Who We Train</a>
              <a onClick={onMeetTheTeamClick}>Meet The Team</a>
              <a>Shop</a>
              <a onClick={onContactsClick}>Contact</a>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </>
  );
}
