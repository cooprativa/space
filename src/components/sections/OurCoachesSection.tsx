import { forwardRef } from 'react';
import Coach1 from '../../assets/images/coach-1.png';
import Coach2 from '../../assets/images/coach-2.png';
import Coach3 from '../../assets/images/coach-3.png';
import Coach4 from '../../assets/images/coach-4.png';

const OurCoachesSection = forwardRef<HTMLDivElement>((_, ref) => {
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
      <div className="coaches">
        <img src={Coach1} alt="Coach 1" />
        <img src={Coach2} alt="Coach 2" />
        <img src={Coach3} alt="Coach 3" />
        <img src={Coach4} alt="Coach 4" />
      </div>
    </section>
  );
});

OurCoachesSection.displayName = 'OurCoachesSection';

export default OurCoachesSection;
