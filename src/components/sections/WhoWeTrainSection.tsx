import { forwardRef } from 'react';
import FlipCard from '../FlipCard';
import ProfileImgCycling from '../../assets/images/profile-card-cycling.jpg';
import CardSVGCyclingFront from '../../assets/svg/card-svg-cycling-front.svg';
import ProfileImgSwimmers from '../../assets/images/profile-card-swimmers.jpg';
import CardSVGSwimmers from '../../assets/svg/card-svg-swimmers.svg';

const WhoWeTrainSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section who-we-train" ref={ref as any}>
      <div className="heading-container">
        <h2>WHO WE TRAIN</h2>
        <p>PROFILES</p>
      </div>
      <div className="intro-container">
        <p>Every sport demands something different. We tailor training to your discipline, your goals, and the way you perform best.</p>
      </div>

      <FlipCard
        cardClass="profile-card-cycling"
        profileImg={ProfileImgCycling}
        svgFront={CardSVGCyclingFront}
        sportName="Cycling"
        backText="Cycling is more than just endurance it's about mastering power, pacing, and recovery across every ride. Whether on the road, trail, or mountain, our training focuses on developing sustainable performance through structured sessions, data analysis, and strength work. We help cyclists and MTB riders optimize their physical and mental resilience, ensuring they're prepared to perform at their best in every terrain and condition."
      />

      <FlipCard
        cardClass="profile-card-swimmers"
        profileImg={ProfileImgSwimmers}
        svgFront={CardSVGSwimmers}
        sportName="Swimmers"
        backText="Water swimming requires more than just technique, it's about efficiency, adaptability, and mental strength. Our training approach helps swimmers develop endurance, pacing, and breathing control to perform in unpredictable environments. By combining individualized training plans with strength and conditioning, we prepare athletes to face any distance or condition with confidence and precision. Open water swimming is more than a sport — it's a journey of adaptation, confidence, and connection with the unpredictable. The ocean demands respect and composure; it challenges not just your technique, but your mindset."
        frontLayout="h3-first"
      />
    </section>
  );
});

WhoWeTrainSection.displayName = 'WhoWeTrainSection';

export default WhoWeTrainSection;
