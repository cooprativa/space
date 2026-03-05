import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import RunnerImg from '../assets/images/runner-contacts.png';
import RunnerShadowImg from '../assets/images/runner-contacts-green-shadow.png';

export interface ContactsRunnerHandle {
  contactsRunnerEl: HTMLDivElement | null;
  playEntrance: () => void;
}

const ContactsRunner = forwardRef<ContactsRunnerHandle>((_, ref) => {
  const contactsRunnerRef = useRef<HTMLDivElement | null>(null);
  const runnerRef       = useRef<HTMLImageElement | null>(null);
  const firstShadowRef  = useRef<HTMLImageElement | null>(null);
  const secondShadowRef = useRef<HTMLImageElement | null>(null);
  const thirdShadowRef  = useRef<HTMLImageElement | null>(null);
  const fourthShadowRef = useRef<HTMLImageElement | null>(null);

  useImperativeHandle(ref, () => ({
    get contactsRunnerEl() { return contactsRunnerRef.current; },
    playEntrance: () => {
      const runnerEl = runnerRef.current;
      const s1 = firstShadowRef.current;
      const s2 = secondShadowRef.current;
      const s3 = thirdShadowRef.current;
      const s4 = fourthShadowRef.current;
      if (!runnerEl || !s1 || !s2 || !s3 || !s4) return;

      gsap.killTweensOf([runnerEl, s1, s2, s3, s4]);

      gsap.set(runnerEl, { opacity: 1 });
      gsap.set(s1, { opacity: 0.75 });
      gsap.set(s2, { opacity: 0.50 });
      gsap.set(s3, { opacity: 0.30 });
      gsap.set(s4, { opacity: 0.15 });

      const startX = window.innerWidth + 300;
      gsap.set([runnerEl, s1, s2, s3, s4], { x: startX });

      const tl = gsap.timeline();
      tl.to(runnerEl, { x: 0,   duration: 1.0, ease: 'power4.out' }, 0);
      tl.to(s1,       { x: 40,  duration: 1.2, ease: 'power4.out' }, 0.05);
      tl.to(s2,       { x: 85,  duration: 1.4, ease: 'power4.out' }, 0.10);
      tl.to(s3,       { x: 140, duration: 1.6, ease: 'power4.out' }, 0.15);
      tl.to(s4,       { x: 205, duration: 1.8, ease: 'power4.out' }, 0.20);
    },
  }));

  return (
    <div className="contacts-runner" aria-hidden="true" ref={contactsRunnerRef}>
      <img src={RunnerShadowImg} className="contacts-runner-img shadow-4" ref={fourthShadowRef} alt="" />
      <img src={RunnerShadowImg} className="contacts-runner-img shadow-3" ref={thirdShadowRef} alt="" />
      <img src={RunnerShadowImg} className="contacts-runner-img shadow-2" ref={secondShadowRef} alt="" />
      <img src={RunnerShadowImg} className="contacts-runner-img shadow-1" ref={firstShadowRef} alt="" />
      <img src={RunnerImg}       className="contacts-runner-img runner"   ref={runnerRef} alt="" />
    </div>
  );
});

ContactsRunner.displayName = 'ContactsRunner';
export default ContactsRunner;
