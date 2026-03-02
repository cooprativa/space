import GreenLogo from "../assets/svg/green-logo.svg";
import WhiteWarning from "../assets/svg/white-warning.svg";
import ScaffoldOverlayBackground from "../assets/images/scaffold-overlay-background.jpg";

export default function ScaffoldOverlay() {
  return (
    <div
      className="scaffold-overlay"
      style={{
        backgroundImage: `url(${ScaffoldOverlayBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img src={GreenLogo} alt="" />
      <div>
        <img src={WhiteWarning} alt="" />
        <h4>OPTIMIZED FOR LARGER SCREENS</h4>
        <p>
          Work in progress.<br />
          For the best experience, please resize your browser window or view this page on a larger screen.
        </p>
      </div>
    </div>
  );
}
