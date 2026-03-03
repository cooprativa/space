import { forwardRef } from 'react';
import ResultsCard from '../ResultsCard';

const ResultsSection = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section results-section" ref={ref as any}>
      <div className='heading-container'>
        <h4>RESULTS</h4>
        <span>Testimonials</span>
      </div>
      <div className='results-cards-container'>
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
      </div>
    </section>
  );
});

ResultsSection.displayName = 'ResultsSection';

export default ResultsSection;
