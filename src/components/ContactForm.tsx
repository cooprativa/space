import { useState } from 'react';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger, clearErrors } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    await new Promise((r) => setTimeout(r, 800)); // TODO: wire to backend
    reset();
    setSubmitted(true);
  };

  const fieldProps = (name: keyof ContactFormData) => {
    const { onChange, onBlur: _onBlur, ...rest } = register(name);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e);
        if (e.target.value === '') clearErrors(name);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.trim() !== '') trigger(name);
        else clearErrors(name);
      },
    };
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Row 1 — Full Name */}
      <div className="contact-form__row contact-form__row--full">
        <div className="contact-form__field">
          {/* <label className="contact-form__label" htmlFor="cf-fullName">Full Name</label> */}
          {errors.fullName && <span className="contact-form__error" role="alert">{errors.fullName.message}</span>}
          <div className={`contact-form__input__wrapper${errors.fullName ? ' wrapper--error' : ''}`}>
            <input id="cf-fullName" type="text" placeholder="your full name" autoComplete="name"
              className={`contact-form__input${errors.fullName ? ' contact-form__input--error' : ''}`}
              {...fieldProps('fullName')} />
          </div>
        </div>
      </div>

      {/* Row 2 — Email + Phone */}
      <div className="contact-form__row contact-form__row--half">
        <div className="contact-form__field">
          {/* <label className="contact-form__label" htmlFor="cf-email">Email</label> */}
          {errors.email && <span className="contact-form__error" role="alert">{errors.email.message}</span>}
          <div className={`contact-form__input__wrapper${errors.email ? ' wrapper--error' : ''}`}>
            <input id="cf-email" type="email" placeholder="your email" autoComplete="email"
              className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
              {...fieldProps('email')} />
          </div>
        </div>
        <div className="contact-form__field">
          {/* <label className="contact-form__label" htmlFor="cf-phone">Phone</label> */}
          {errors.phone && <span className="contact-form__error" role="alert">{errors.phone.message}</span>}
          <div className={`contact-form__input__wrapper${errors.phone ? ' wrapper--error' : ''}`}>
            <input id="cf-phone" type="tel" placeholder="your phone number" autoComplete="tel"
              className={`contact-form__input${errors.phone ? ' contact-form__input--error' : ''}`}
              {...fieldProps('phone')} />
          </div>
        </div>
      </div>

      {/* Row 3 — Message */}
      <div className="contact-form__row contact-form__row--full">
        <div className="contact-form__field">
          {/* <label className="contact-form__label" htmlFor="cf-message">Message</label> */}
          {errors.message && <span className="contact-form__error" role="alert">{errors.message.message}</span>}
          <div className={`contact-form__input__wrapper${errors.message ? ' wrapper--error' : ''}`}>
            <textarea id="cf-message" rows={4} placeholder="subject"
              className={`contact-form__textarea${errors.message ? ' contact-form__input--error' : ''}`}
              {...fieldProps('message')} />
          </div>
        </div>
      </div>

      {/* Row 4 — Submit */}
      <div className="contact-form__row contact-form__row--full">
        {submitted && (
          <p className="contact-form__success" role="status">
            Message sent! We'll get back to you soon.
          </p>
        )}
        <button
          type="submit"
          className="contact-form__submit"
          disabled={isSubmitting}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {isSubmitting ? 'Sending…' : hovered ? "Let's Train" : 'Start Training'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
