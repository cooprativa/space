import { forwardRef } from 'react';
import InesHenriques from '../../assets/images/ines-henriques.png';

const MeetTheTeamSecondSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section meet-the-team" ref={ref as any}>
      <div className='team-member person-right'>
        <img className='faded-image ines-h' src={InesHenriques} alt="Inês Henriques" />
        <h4>Inês<span>Henriques</span></h4>
        <p>With a background in exercise science and sports nutrition, I focus on optimizing performance through tailored nutritional strategies. My approach bridges science and daily practice, helping athletes fuel training, enhance recovery, and sustain long-term health and performance.</p>
      </div>
    </section>
  );
});

MeetTheTeamSecondSection.displayName = 'MeetTheTeamSection';

export default MeetTheTeamSecondSection;
