import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import ResultsCard from '../ResultsCard';

const TOTAL_POSITIONS = 3;
const AUTO_ADVANCE_MS = 10_000;
const GAP = 40;
const VISIBLE_CARDS = 3;

const ResultsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const currentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = (containerWidth - GAP * (VISIBLE_CARDS - 1)) / VISIBLE_CARDS;
    setOffset(index * (cardWidth + GAP));
    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const next = (currentIndexRef.current + 1) % TOTAL_POSITIONS;
      goToSlide(next);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [currentIndex, goToSlide]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section results-section" ref={ref as any}>
      <div className='heading-container'>
        <h4>RESULTS</h4>
        <span>Testimonials</span>
      </div>
      <div className='results-cards-container' ref={containerRef}>
        <div className='results-track' style={{ transform: `translateX(-${offset}px)` }}>
          <ResultsCard
            name="Jóni Oliveira"
            discipline="Cyclist"
            quote="After nearly 20 years of cycling, plus CrossFit and padel, I needed a flexible way to race again without giving up everything else. S PACE delivered personalised support that adapts to my life and goals."
          />
          <ResultsCard
            name="Mário Franco"
            discipline="Motorsport Driver"
            quote="Five years of fully personalized training, combining strength, cardio, and nutrition made a real difference in my Dakar Rally performance. Such professionalism was truly decisive."
          />
          <ResultsCard
            name="Maria Inês Santos"
            discipline="Triathlete"
            quote="When I started with S PACE, my goal was clear, to complete an Ironman, but I needed a plan built around me, not theory. Their data-driven adjustments made all the difference."
          />
          <ResultsCard
            name="Raquel Cabaço"
            discipline="Runner"
            quote="I chose S PACE to work with Manuel Nicolau, a goal I had for a long time. Despite the distance, the communication is constant and close and it's been working extremely well."
          />
          <ResultsCard
            name="Pedro Bailão"
            discipline="Archer"
            quote="The nutrition plans are fully personalised to my sport, daily routine, and even competition days, which has made a significant difference in my performance and well-being."
          />
        </div>
      </div>
      <div className="carousel-dots">
        {Array.from({ length: TOTAL_POSITIONS }, (_, i) => (
          <button
            key={i}
            className={`carousel-dot${currentIndex === i ? ' active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  );
});

ResultsSection.displayName = 'ResultsSection';

export default ResultsSection;
