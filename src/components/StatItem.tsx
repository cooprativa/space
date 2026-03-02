import CountUp from './CountUp';

interface StatItemProps {
  to: number;
  duration: number;
  label: string;
  startWhen: boolean;
}

export default function StatItem({ to, duration, label, startWhen }: StatItemProps) {
  return (
    <div className="after-founder__stat">
      <div className="after-founder__stat-number-wrapper">
        <svg
          className="after-founder__stat-icon"
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M28.7638 48.0421H19.1758V28.7641H-0.000191212V19.1761H19.1758V5.37634e-05H28.7638V19.1761H48.0418V28.7641H28.7638V48.0421Z" fill="#BD97EC" />
        </svg>
        <CountUp from={0} to={to} duration={duration} className="after-founder__stat-number" startWhen={startWhen} />
      </div>
      <span className="after-founder__stat-label">{label}</span>
    </div>
  );
}
