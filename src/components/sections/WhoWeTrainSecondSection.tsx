import { forwardRef } from 'react';
import FlipCard from '../FlipCard';
import ProfileImgTriathlon from '../../assets/images/profile-card-triathlon.jpg';
import CardSVGTriathlon from '../../assets/svg/card-svg-triathlon.svg';
import ProfileImgAthletics from '../../assets/images/profile-card-athletics.jpg';
import CardSVGAthletics from '../../assets/svg/card-svg-athletics.svg';
import ProfileImgDrivers from '../../assets/images/profile-card-drivers.jpg';
import CardSVGDrivers from '../../assets/svg/card-svg-drivers.svg';
import ProfileImgTeam from '../../assets/images/profile-card-team.jpg';
import CardSVGTeam from '../../assets/svg/card-svg-team.svg';

const WhoWeTrainSecondSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section who-we-train-second" ref={ref as any}>
      <FlipCard
        cardClass="profile-card-triathlon"
        profileImg={ProfileImgTriathlon}
        svgFront={CardSVGTriathlon}
        sportName="Triathlon"
        backText="High performance in triathlon is built on adaptation — the body's ability to respond to stress, recover, and evolve. Every training session, every recovery day, and every lifestyle factor contributes to that process. Real progress happens when training load, recovery, and life are in balance. Our methodology is grounded in science and guided by individualization. Each athlete responds differently to the same stimulus; genetics, experience, and daily context shape how adaptation occurs."
        frontLayout="h3-first"
      />

      <FlipCard
        cardClass="profile-card-athletics"
        profileImg={ProfileImgAthletics}
        svgFront={CardSVGAthletics}
        sportName="Athletics"
        backText="Performance in running comes from more than mileage — it's the result of how your body adapts to every stimulus, from training load to recovery, from stress to sleep. Endurance isn't built overnight; it's developed through a process that balances effort, rest, and consistency over time. Our training philosophy combines science with individual context. Each runner adapts differently — shaped by physiology, background, and daily life. That's why every plan we design is personal, aligning the right intensity, volume, and recovery to support continuous adaptation and sustainable progress."
      />

      <FlipCard
        cardClass="profile-card-drivers"
        profileImg={ProfileImgDrivers}
        svgFront={CardSVGDrivers}
        sportName="Drivers"
        backText="In motorsport, physical conditioning is the foundation of performance. Drivers and riders must sustain high heart rates, intense vibration, and extreme G-forces — all while maintaining precision and focus. Our training develops core and neck strength, aerobic and muscular endurance, and postural stability to resist fatigue and enhance control throughout every lap. By targeting the specific demands of driving — from reaction time to heat tolerance — we help athletes perform with consistency and precision under pressure. Because in motorsport, the strongest engine is the athlete's body."
      />

      <FlipCard
        cardClass="profile-card-team"
        profileImg={ProfileImgTeam}
        svgFront={CardSVGTeam}
        sportName="Team sports"
        backText="In team sports, strength is more than power — it's the foundation for performance, resilience, and longevity. Football, basketball, futsal, or hockey all demand acceleration, stability, and the ability to repeat high-intensity efforts under fatigue. Without strength, speed and skill can't be fully expressed. Our approach to strength training is performance-driven and sport-specific. We focus on developing explosive power, joint stability, and muscular endurance, building a body capable of producing force efficiently and absorbing impact safely."
      />
    </section>
  );
});

WhoWeTrainSecondSection.displayName = 'WhoWeTrainSecondSection';

export default WhoWeTrainSecondSection;
