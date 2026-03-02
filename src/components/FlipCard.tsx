interface FlipCardProps {
  cardClass: string;
  profileImg: string;
  svgFront: string;
  sportName: string;
  backText: string;
  frontLayout?: 'h3-first' | 'img-first';
}

export default function FlipCard({
  cardClass,
  profileImg,
  svgFront,
  sportName,
  backText,
  frontLayout = 'img-first',
}: FlipCardProps) {
  return (
    <div className={`flip-card ${cardClass}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {frontLayout === 'h3-first' ? (
            <>
              <h3>{sportName}</h3>
              <img src={profileImg} alt="" />
            </>
          ) : (
            <>
              <img src={profileImg} alt="" />
              <h3>{sportName}</h3>
            </>
          )}
        </div>
        <div className="flip-card-back">
          {frontLayout === 'h3-first' ? (
            <>
              <h3>{sportName}</h3>
              <p>{backText}</p>
            </>
          ) : (
            <>
              <p>{backText}</p>
              <h3>{sportName}</h3>
            </>
          )}
        </div>
        <img className="svg-front" src={svgFront} alt="" />
      </div>
    </div>
  );
}
