import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface ChevronOrnamentsHandle {
  chevronA: SVGSVGElement | null;
  chevronB: SVGSVGElement | null;
  chevronC: SVGSVGElement | null;
  chevronD: SVGSVGElement | null;
}

const ChevronOrnaments = forwardRef<ChevronOrnamentsHandle>((_, ref) => {
  const chevronARef = useRef<SVGSVGElement | null>(null);
  const chevronBRef = useRef<SVGSVGElement | null>(null);
  const chevronCRef = useRef<SVGSVGElement | null>(null);
  const chevronDRef = useRef<SVGSVGElement | null>(null);

  useImperativeHandle(ref, () => ({
    get chevronA() { return chevronARef.current; },
    get chevronB() { return chevronBRef.current; },
    get chevronC() { return chevronCRef.current; },
    get chevronD() { return chevronDRef.current; },
  }));

  const chevronPath = "M275.358 1045H10.2569C6.41485 1045 2.5728 1042.8 0.926203 1038.96C-0.72039 1035.12 -0.171509 1031.28 2.57281 1027.99L467.461 521.951L3.67052 16.4653C0.926203 13.7211 0.377343 9.33036 2.02394 5.48845C3.67053 1.64653 6.96372 0 11.3546 0H276.456C279.2 0 281.945 1.09769 283.591 3.29307L753.968 515.365C757.261 519.207 757.261 525.244 753.968 529.086L282.494 1042.26C280.298 1043.9 278.103 1045 275.358 1045ZM25.0762 1028.53H272.065L737.502 521.951L273.163 16.4653H26.174L484.476 515.365C487.769 519.207 487.769 525.244 484.476 529.086L25.0762 1028.53Z";

  return (
    <div className="chevron-ornaments" aria-hidden="true">
      <svg ref={chevronARef} className="chevron-svg chevron-a" width="754" height="1045" viewBox="0 0 754 1045" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d={chevronPath} fill="#ACFC17" />
      </svg>
      <svg ref={chevronBRef} className="chevron-svg chevron-b" width="754" height="1045" viewBox="0 0 754 1045" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d={chevronPath} fill="#ACFC17" />
      </svg>
      <svg ref={chevronCRef} className="chevron-svg chevron-c" width="754" height="1045" viewBox="0 0 754 1045" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d={chevronPath} fill="#ACFC17" />
      </svg>
      <svg ref={chevronDRef} className="chevron-svg chevron-d" width="754" height="1045" viewBox="0 0 754 1045" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d={chevronPath} fill="#ACFC17" />
      </svg>
    </div>
  );
});

ChevronOrnaments.displayName = 'ChevronOrnaments';

export default ChevronOrnaments;
