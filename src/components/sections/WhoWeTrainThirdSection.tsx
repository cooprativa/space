import { forwardRef } from 'react';
import FlipCard from '../FlipCard';
import ProfileImgTeam from '../../assets/images/profile-card-team.jpg';
import CardSVGTeam from '../../assets/svg/card-svg-team.svg';
import PersonalizedTrainingImg from '../../assets/images/personalized-training.jpg';
import CTACardSVG from '../../assets/svg/cta-card.svg';

const WhoWeTrainThirdSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section who-we-train-third" ref={ref as any}>
      <FlipCard
        cardClass="profile-card-team"
        profileImg={ProfileImgTeam}
        svgFront={CardSVGTeam}
        sportName="Team sports"
        backText="In team sports, strength is more than power — it's the foundation for performance, resilience, and longevity. Football, basketball, futsal, or hockey all demand acceleration, stability, and the ability to repeat high-intensity efforts under fatigue. Without strength, speed and skill can't be fully expressed. Our approach to strength training is performance-driven and sport-specific. We focus on developing explosive power, joint stability, and muscular endurance, building a body capable of producing force efficiently and absorbing impact safely."
      />
      
      <div className="profile-cta-card">
        <div className="cta-card-container">
          <h3>Personalized training</h3>
            <img src={PersonalizedTrainingImg} alt="" />
            <p>Training designed for your sport, your goals, your performance.</p>
            
            <button className="hero-sub" type="button">
              <svg width="226" height="57" viewBox="0 0 226 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.1674 1.56598C30.6927 0.600783 31.7036 0 32.8025 0H220.952C223.228 0 224.675 2.43496 223.587 4.43402L195.833 55.434C195.307 56.3992 194.296 57 193.198 57H5.04808C2.77218 57 1.32512 54.565 2.41301 52.566L30.1674 1.56598Z" fill="#ACFC17" />
                <path d="M52.22 24.556H49.448V23.302C49.448 21.685 48.755 20.662 47.105 20.662C45.521 20.662 44.795 21.652 44.795 22.939V23.797C44.795 24.754 45.059 25.315 46.082 26.14C47.567 27.295 49.811 28.483 51.032 29.572C52.055 30.463 52.616 31.519 52.616 33.532V34.885C52.616 38.317 50.999 40.198 47.171 40.198C43.343 40.198 41.759 38.284 41.759 34.687V33.433H44.564V34.72C44.564 36.502 45.323 37.459 47.105 37.459C48.656 37.459 49.514 36.7 49.514 34.951V33.961C49.514 32.608 49.184 32.047 48.095 31.189C46.577 29.935 44.894 29.11 43.541 27.79C42.452 26.668 41.858 25.513 41.858 23.764V22.807C41.858 19.903 43.442 17.89 47.072 17.89C51.065 17.89 52.22 20.299 52.22 23.599V24.556ZM59.6997 40H56.7627V20.761H53.0997V18.088H63.4287V20.761H59.6997V40ZM73.5687 40H70.6647L69.8067 34.852H65.7807L64.9887 40H62.1177L65.8467 18.088H69.8397L73.5687 40ZM67.7277 22.708L66.1767 32.311H69.4107L67.8597 22.708H67.7277ZM77.795 40H74.891V18.088H80.996C84.065 18.088 85.154 19.705 85.154 22.477V25.48C85.154 27.493 84.329 28.681 82.91 29.044V29.176C84.461 29.473 85.22 30.529 85.22 32.707V40H82.316V32.476C82.316 31.057 81.887 30.463 80.468 30.463H77.795V40ZM82.283 25.744V22.807C82.283 21.454 81.722 20.761 80.336 20.761H77.795V27.988H80.369C81.557 27.988 82.283 27.427 82.283 25.744ZM92.603 40H89.666V20.761H86.003V18.088H96.332V20.761H92.603V40ZM108.04 40H105.103V20.761H101.44V18.088H111.769V20.761H108.04V40ZM116.145 40H113.241V18.088H119.346C122.415 18.088 123.504 19.705 123.504 22.477V25.48C123.504 27.493 122.679 28.681 121.26 29.044V29.176C122.811 29.473 123.57 30.529 123.57 32.707V40H120.666V32.476C120.666 31.057 120.237 30.463 118.818 30.463H116.145V40ZM120.633 25.744V22.807C120.633 21.454 120.072 20.761 118.686 20.761H116.145V27.988H118.719C119.907 27.988 120.633 27.427 120.633 25.744ZM136.185 40H133.281L132.423 34.852H128.397L127.605 40H124.734L128.463 18.088H132.456L136.185 40ZM130.344 22.708L128.793 32.311H132.027L130.476 22.708H130.344ZM140.477 40H137.507V18.088H140.477V40ZM153.366 40H149.901L144.885 23.038H144.753C144.819 24.655 144.852 26.206 144.852 27.658V40H142.245V18.088H146.139L150.726 33.829H150.858C150.792 31.75 150.759 29.968 150.759 28.516V18.088H153.366V40ZM158.137 40H155.167V18.088H158.137V40ZM171.026 40H167.561L162.545 23.038H162.413C162.479 24.655 162.512 26.206 162.512 27.658V40H159.905V18.088H163.799L168.386 33.829H168.518C168.452 31.75 168.419 29.968 168.419 28.516V18.088H171.026V40ZM183.025 40H181.078L180.946 38.317H180.814C180.253 39.373 179.395 40.198 177.514 40.198C174.544 40.198 172.828 38.218 172.828 34.654V23.533C172.828 19.969 174.61 17.89 177.91 17.89C181.243 17.89 183.025 20.035 183.025 23.599V24.853H180.22V23.335C180.22 21.619 179.461 20.662 177.976 20.662C176.524 20.662 175.765 21.586 175.765 23.302V34.852C175.765 36.568 176.524 37.459 177.91 37.459C179.164 37.459 179.956 36.766 180.22 35.248V30.925H177.745V28.285H183.025V40Z" fill="#0B2E42" />
              </svg>
            </button>
        </div>

        <img className="svg-front-full" src={CTACardSVG} alt="" />
      </div>

    </section>
  );
});

WhoWeTrainThirdSection.displayName = 'WhoWeTrainThirdSection';

export default WhoWeTrainThirdSection;
