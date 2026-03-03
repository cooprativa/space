import { forwardRef, useState, useCallback } from 'react';
import Coach1 from '../../assets/images/coach-1.png';
import Coach2 from '../../assets/images/coach-2.png';
import Coach3 from '../../assets/images/coach-3.png';
import Coach4 from '../../assets/images/coach-4.png';

const coaches = [
  { src: Coach1, name: 'Tiago Lemos' },
  { src: Coach2, name: 'João Dias' },
  { src: Coach3, name: 'Marco Santos' },
  { src: Coach4, name: 'Henrique Pereira' },
];

const OurCoachesSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [hoveredCoach, setHoveredCoach] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

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
        onMouseLeave={() => setHoveredCoach(null)}
      >
        {coaches.map((coach, i) => (
          <img
            key={i}
            className='faded-image'
            src={coach.src}
            alt={coach.name}
            onMouseEnter={() => setHoveredCoach(coach.name)}
          />
        ))}
      </div>
      {hoveredCoach && (
        <div
          className="coach-cursor-label"
          style={{ left: cursorPos.x - 100, top: cursorPos.y + 20 }}
        >
          {hoveredCoach}
        </div>
      )}
    </section>
  );
});

OurCoachesSection.displayName = 'OurCoachesSection';

export default OurCoachesSection;
