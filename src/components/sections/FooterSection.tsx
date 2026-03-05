import { forwardRef } from 'react';
import SpaceLogoEmblem from '../../assets/svg/space-logo-emblem.svg';

const FooterSection = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section footer-section" ref={ref as any}>
      <div className="footer-links-container">
        <img src={SpaceLogoEmblem} alt="" />
        <div className="footer-links">
          <div className="who-we-are-links">
            <h6>who we are</h6>
            <ul>
              <li>
                <a href="">About S PACE</a>
              </li>
              <li>
                <a href="">Meet the Team</a>
              </li>
              <li>
                <a href="">Athlete Stories</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="who-we-train">
            <h6>who we train</h6>
            <ul>
              <li>
                <a href="">Runners</a>
              </li>
              <li>
                <a href="">Triathletes</a>
              </li>
              <li>
                <a href="">Cyclists</a>
              </li>
              <li>
                <a href="">Swimmers</a>
              </li>
              <li>
                <a href="">Pilots</a>
              </li>
              <li>
                <a href="">Team Sports</a>
              </li>
              <li>
                <a href="">Personalized Training</a>
              </li>
            </ul>
          </div>
          <div className="contacts">
            <h6>contacts</h6>
            <ul>
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">Whatsapp</a>
              </li>
              <li>
                <a href="">Rua Nossa Senhora da Nazaré, 12 2580-195 Olhalvo</a>
              </li>
              <li>
                <a href="">(+351) 918 462 024</a>
              </li>
              <li>
                <a href="">geral@spacetrainingcentre.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-credits">
        <small>© 2026 S Pace. All rigths reserved</small>
        <small>@cooprativa</small>
        <span>
          <small>Privacy Policy</small>
          <small>|</small>
          <small>Terms of Use</small>
        </span>
      </div>
      
    </section>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
