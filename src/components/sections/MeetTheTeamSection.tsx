import { forwardRef } from 'react';
import MeetTheImg from '../../assets/images/meet-the.jpg';
import ManuelNicolau from '../../assets/images/manuel-nicolau.png';

const MeetTheTeamSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section meet-the-team bg-white" ref={ref as any}>
      <div className='heading-container'>
        <img src={MeetTheImg} alt="Meet the team" />
        <h2>
          <span className='text-gradient'>
            team
          </span>
        </h2>
      </div>
      <div className='team-member person-left'>
        <img className='faded-image manuel-n' src={ManuelNicolau} alt="Manuel Nicolau" />
        <h4>Manuel<span>Nicolau</span></h4>
        <p>My journey began on the track as an 800m runner and evolved into a lifelong pursuit of understanding human performance. With a PhD path in Exercise Physiology and years coaching athletes across disciplines, my mission is to unlock potential through science and passion for sport.</p>
      </div>
    </section>
  );
});

MeetTheTeamSection.displayName = 'MeetTheTeamSection';

export default MeetTheTeamSection;
