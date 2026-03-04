import { forwardRef } from 'react';
import ContactForm from '../ContactForm';

const ContactsSection = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <section className="section contacts-section" ref={ref as any}>
      <div className='heading-container'>
        <h4>READY, SET, GO!</h4>
        <span>Start Training</span>
        <p>Every athlete starts somewhere the difference is how you evolve.</p>
      </div>
      <ContactForm />
    </section>
  );
});

ContactsSection.displayName = 'ContactsSection';

export default ContactsSection;
