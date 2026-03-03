import { forwardRef } from 'react';
import TrackRunnerImg from '../../assets/images/track-runner-separator.jpg';

const RunnerSeparatorSection = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section style={{ backgroundImage: `url(${TrackRunnerImg})` }} className="section runner-separator" ref={ref as any}></section>
  );
});

RunnerSeparatorSection.displayName = 'RunnerSeparatorSection';

export default RunnerSeparatorSection;
