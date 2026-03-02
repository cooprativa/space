import { forwardRef } from 'react';

const BeforeWhoWeTrainSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section before-who-we-train" ref={ref as any}>
      <div className="quote-container">
        <h3>"Helping every athlete, from Olympians to first-timers, evolve with purpose."</h3>
        <p>Manuel Nicolau</p>
      </div>
    </section>
  );
});

BeforeWhoWeTrainSection.displayName = 'BeforeWhoWeTrainSection';

export default BeforeWhoWeTrainSection;
