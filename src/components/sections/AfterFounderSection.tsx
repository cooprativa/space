import { forwardRef } from 'react';
import AfterFounderImg from '../../assets/images/AfterFounder.jpg';
import AfterFounderImgAbove from '../../assets/images/AfterFounderAbove.png';
import MaskGradient2 from '../../assets/svg/MaskGradient2.tsx';
import StatItem from '../StatItem';

interface AfterFounderSectionProps {
  active: boolean;
  imgOverlayRef: React.Ref<HTMLDivElement>;
}

const AfterFounderSection = forwardRef<HTMLDivElement, AfterFounderSectionProps>(
  ({ active, imgOverlayRef }, ref) => {
    return (
      <>
        <div
          style={{ backgroundImage: `url(${AfterFounderImgAbove})` }}
          ref={imgOverlayRef}
          className="after-founder-img-overlay-container"
        />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <section className="section after-founder" ref={ref as any}>
          <div className="after-founder__inner">
            <img src={AfterFounderImg} className="After_Founder__img" alt="Founder" />
            <MaskGradient2 />
            <div className="AfterFounder__mask"></div>
            <div className="after-founder__stats-grid">
              <StatItem to={100} duration={6}   label="Athletes Coached"             startWhen={active} />
              <StatItem to={20}  duration={6.5} label="National & international titles" startWhen={active} />
              <StatItem to={10}  duration={7}   label="Sports disciplines"           startWhen={active} />
              <StatItem to={5}   duration={7.5} label="Professional coaches"         startWhen={active} />
            </div>
          </div>
        </section>
      </>
    );
  }
);

AfterFounderSection.displayName = 'AfterFounderSection';

export default AfterFounderSection;
