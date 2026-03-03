import { forwardRef } from 'react';

const ResultsSection = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section results-section" ref={ref as any}>
      <div className='heading-container'>
        <h4>RESULTS</h4>
        <span>Testimonials</span>
      </div>
      <div className='results-cards-container'>
        <div className='results-card'>
          <svg width="84" height="70" viewBox="0 0 84 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#97B8FF"/>
            <circle cx="64" cy="20" r="20" fill="#97B8FF"/>
            <path d="M1 70L18.5 28L37.5 29.5L10.5 70H1Z" fill="#97B8FF"/>
            <path d="M45 70L62.5 28L81.5 29.5L54.5 70H45Z" fill="#97B8FF"/>
          </svg>

          <div className="card-header">
            <h5>Jóni Oliveira</h5>
            <span>Cyclist</span>
          </div>
          <div className='card-body'>
            <div className="left-line"></div>
            <p>After nearly 20 years of cycling, plus CrossFit and padel, I needed a flexible way to race again without giving up everything else. S PACE delivered personalised support that adapts to my life and goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

ResultsSection.displayName = 'ResultsSection';

export default ResultsSection;
