import { forwardRef, useState, useCallback, useRef } from 'react';
import Coach1 from '../../assets/images/coach-1.png';
import Coach2 from '../../assets/images/coach-2.png';
import Coach3 from '../../assets/images/coach-3.png';
import Coach4 from '../../assets/images/coach-4.png';
import GreenCircle from '../../assets/images/push-your-limits.png';

const coaches = [
  { src: Coach1, name: 'Tiago Lemos' },
  { src: Coach2, name: 'André Cruz' },
  { src: Coach3, name: 'Mário Bonança' },
  { src: Coach4, name: 'Henrique Pereira' },
];

const OurCoachesSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [hoveredCoach, setHoveredCoach] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const lastCoachRef = useRef('');
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleCoachEnter = (name: string) => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);

    if (hoveredCoach !== null) {
      // Coach-to-coach: fast 0.15s exit via .switching, then enter with new name
      setIsSwitching(true);
      setHoveredCoach(null);
      transitionTimeout.current = setTimeout(() => {
        lastCoachRef.current = name;
        setIsSwitching(false);
        setHoveredCoach(name);
      }, 150);
    } else {
      // Fresh entry: normal 0.6s enter
      lastCoachRef.current = name;
      setHoveredCoach(name);
    }
  };

  const handleCoachLeave = () => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    setIsSwitching(false);
    setHoveredCoach(null);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section our-coaches" ref={ref as any}>
      <div className='heading-container'>
        <h2>Our
          <span className='text-gradient'>
            Coaches
          </span>
        </h2>
      </div>
      <div
        className="coaches"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleCoachLeave}
      >
        {coaches.map((coach, i) => (
          <img
            key={i}
            className='faded-image'
            src={coach.src}
            alt={coach.name}
            onMouseEnter={() => handleCoachEnter(coach.name)}
          />
        ))}
      </div>
      <div
        className={`coach-cursor-label${isSwitching ? ' switching' : ''}${hoveredCoach ? ' visible' : ''}`}
        style={{ left: cursorPos.x - 100, top: cursorPos.y - 40 }}
      >
        <img src={GreenCircle} alt="" />
        <p>{hoveredCoach ?? lastCoachRef.current}</p>
      </div>
    </section>
  );
});

OurCoachesSection.displayName = 'OurCoachesSection';

export default OurCoachesSection;
