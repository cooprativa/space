import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

export interface RightOrnamentHandle {
  ornamentEl: HTMLDivElement | null;
  computeLeftX: () => number;
}

interface RightOrnamentProps {
  onAnimationComplete?: () => void;
}

const RightOrnament = forwardRef<RightOrnamentHandle, RightOrnamentProps>(({ onAnimationComplete }, ref) => {
  const ornamentRef = useRef<HTMLDivElement | null>(null);
  const firstSvgRef = useRef<SVGSVGElement | null>(null);
  const secondSvgRef = useRef<SVGSVGElement | null>(null);
  const racePlayedRef = useRef(false);
  const leaderOffsetRef = useRef(200);

  useImperativeHandle(ref, () => ({
    get ornamentEl() { return ornamentRef.current; },
    computeLeftX: () => {
      const svgs: SVGSVGElement[] = [firstSvgRef.current, secondSvgRef.current].filter(Boolean) as SVGSVGElement[];
      if (!svgs.length) return 0;
      let minLeft = Infinity;
      let maxRight = -Infinity;
      svgs.forEach(svg => {
        const r = svg.getBoundingClientRect();
        if (r.left < minLeft) minLeft = r.left;
        if (r.right > maxRight) maxRight = r.right;
      });
      const padding = 0;
      let shift = -(minLeft - padding);
      const viewportW = window.innerWidth;
      if (maxRight + shift > viewportW) {
        shift = viewportW - maxRight;
      }
      if (minLeft <= padding) return 0;
      return shift;
    },
  }));

  // Race entrance animation — runs once on mount
  useEffect(() => {
    const firstSvgEl = firstSvgRef.current;
    const secondSvgEl = secondSvgRef.current;
    if (racePlayedRef.current || !firstSvgEl || !secondSvgEl) return;

    gsap.set([firstSvgEl, secondSvgEl], { autoAlpha: 1 });

    const rect1 = firstSvgEl.getBoundingClientRect();
    const rect2 = secondSvgEl.getBoundingClientRect();
    const margin = 80;

    const start1 = -((rect1.left || 0) + (rect1.width || 0) + margin);
    const start2 = -((rect2.left || 0) + (rect2.width || 0) + margin);

    gsap.set(firstSvgEl, { x: start1 });
    gsap.set(secondSvgEl, { x: start2 });

    const finalGap = Math.max(80, Math.min(200, Math.round(window.innerWidth * 0.12)));
    const leaderOffset = leaderOffsetRef.current;

    const raceTl = gsap.timeline({ onComplete: onAnimationComplete });
    raceTl.to(firstSvgEl, { x: leaderOffset, duration: 1.25, ease: 'power4.out' }, 0);
    raceTl.to(secondSvgEl, { x: leaderOffset - finalGap * 2, duration: 1.25, ease: 'power4.out' }, 0.5);

    racePlayedRef.current = true;
  }, []);

  return (
    <div className="right-ornament" aria-hidden="true" ref={ornamentRef}>
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
  );
});

RightOrnament.displayName = 'RightOrnament';

export default RightOrnament;
