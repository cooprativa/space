import { useRef } from 'react';
import LiquidGlass from 'liquid-glass-react';

interface ResultsCardProps {
  name: string;
  discipline: string;
  quote: string;
}

export default function ResultsCard({ name, discipline, quote }: ResultsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className='results-card' ref={cardRef}>
      <LiquidGlass
        mode="polar"
        mouseContainer={cardRef}
        style={{ position: 'absolute', top: '50%', left: '50%', width: '100%' }}
        displacementScale={50}
        blurAmount={0.5}
        saturation={130}
        aberrationIntensity={1}
        cornerRadius={30}
      >
        <div className='results-card-inner'>
          <div className="card-header">
            <h5>{name}</h5>
            <span>{discipline}</span>
          </div>
          <div className='card-body'>
            <div className="left-line"></div>
            <p>{quote}</p>
          </div>
        </div>
      </LiquidGlass>
      <svg width="84" height="70" viewBox="0 0 84 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#97B8FF"/>
        <circle cx="64" cy="20" r="20" fill="#97B8FF"/>
        <path d="M1 70L18.5 28L37.5 29.5L10.5 70H1Z" fill="#97B8FF"/>
        <path d="M45 70L62.5 28L81.5 29.5L54.5 70H45Z" fill="#97B8FF"/>
      </svg>
    </div>
  );
}
