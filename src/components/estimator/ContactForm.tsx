'use client';

import { type Dispatch, type SetStateAction } from 'react';
import type { EstimatorStateLike } from './types';

export interface ContactFormProps {
  state: EstimatorStateLike;
  setState: Dispatch<SetStateAction<EstimatorStateLike>>;
  onSubmit: () => Promise<void> | void;
  submitting: boolean;
  error?: string | null;
}

export default function ContactForm({
  state,
  setState,
  onSubmit,
  submitting,
  error,
}: ContactFormProps) {
  const contact = state.contact ?? {};

  function updateContact<K extends keyof EstimatorStateLike['contact']>(
    key: K,
    value: EstimatorStateLike['contact'][K]
  ) {
    setState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value,
      },
    }));
  }

  const firstName = (contact.firstName ?? '').trim();
  const lastName = (contact.lastName ?? '').trim();
  const email = (contact.email ?? '').trim();
  const phone = (contact.phone ?? '').trim();

  const isValidName = (value: string) => value.length >= 2;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const normalizedPhone = phone.replace(/\D/g, '');

  const firstNameValid = isValidName(firstName);
  const lastNameValid = isValidName(lastName);
  const emailValid = emailPattern.test(email);
  const phoneValid = normalizedPhone.length >= 10;

  const formComplete = firstNameValid && lastNameValid && emailValid && phoneValid;
  const disableSubmit = submitting || !formComplete;

  const baseInputClasses =
    'rounded-xl border px-4 py-3 text-[14px] text-white/90 outline-none transition bg-[rgba(15,15,25,.75)] placeholder:text-white/35';
  const focusClasses = 'focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60';
  const errorClasses = 'border-red-400 focus:border-red-400 focus:ring-red-300/60';

  const firstNameInvalid = firstName.length > 0 && !firstNameValid;
  const lastNameInvalid = lastName.length > 0 && !lastNameValid;
  const emailInvalid = email.length > 0 && !emailValid;
  const phoneInvalid = phone.length > 0 && !phoneValid;

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[rgba(12,14,22,.7)] p-6 backdrop-blur-md">
        <div className="text-sm text-white/70 leading-relaxed">
          A real DiFiore project specialist will follow up with next steps. Share the best way to
          reach you and we&rsquo;ll take it from there.
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              First Name
            </span>
            <input
              className={[
                baseInputClasses,
                firstNameInvalid ? errorClasses : 'border-white/10 ' + focusClasses,
              ].join(' ')}
              placeholder="John"
              value={contact.firstName ?? ''}
              onChange={(event) => updateContact('firstName', event.target.value)}
              aria-invalid={firstNameInvalid}
            />
            {firstNameInvalid && (
              <span className="text-[11px] text-red-300">
                First name should be at least 2 characters.
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              Last Name
            </span>
            <input
              className={[
                baseInputClasses,
                lastNameInvalid ? errorClasses : 'border-white/10 ' + focusClasses,
              ].join(' ')}
              placeholder="Smith"
              value={contact.lastName ?? ''}
              onChange={(event) => updateContact('lastName', event.target.value)}
              aria-invalid={lastNameInvalid}
            />
            {lastNameInvalid && (
              <span className="text-[11px] text-red-300">
                Last name should be at least 2 characters.
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              Email
            </span>
            <input
              type="email"
              className={[
                baseInputClasses,
                emailInvalid ? errorClasses : 'border-white/10 ' + focusClasses,
              ].join(' ')}
              placeholder="you@example.com"
              value={contact.email ?? ''}
              onChange={(event) => updateContact('email', event.target.value)}
              aria-invalid={emailInvalid}
            />
            {emailInvalid && (
              <span className="text-[11px] text-red-300">
                Enter a valid email address (name@example.com).
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              Phone
            </span>
            <input
              inputMode="tel"
              className={[
                baseInputClasses,
                phoneInvalid ? errorClasses : 'border-white/10 ' + focusClasses,
              ].join(' ')}
              placeholder="(555) 123-4567"
              value={contact.phone ?? ''}
              onChange={(event) => updateContact('phone', event.target.value)}
              aria-invalid={phoneInvalid}
            />
            {phoneInvalid && (
              <span className="text-[11px] text-red-300">
                Phone should include at least 10 digits.
              </span>
            )}
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (disableSubmit) return;
          onSubmit();
        }}
        disabled={disableSubmit}
        className={[
          'w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold transition',
          disableSubmit
            ? 'border-white/15 bg-white/5 text-white/35 cursor-not-allowed'
            : 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_20px_40px_rgba(255,200,0,.2)] hover:bg-amber-500/20',
        ].join(' ')}
      >
        {submitting ? 'Sending…' : 'Send My Project'}
      </button>

      {!formComplete && (
        <p className="text-[11px] text-white/50 text-center leading-relaxed">
          First &amp; last name must be 2+ characters, email must be valid, and phone needs 10 digits.
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-300 text-center leading-relaxed">{error}</p>
      )}

      <p className="text-[11px] text-white/50 text-center leading-relaxed">
        By tapping submit you agree a licensed DiFiore project manager may contact you about your
        project. No spam. No obligation.
      </p>
    </div>
  );
}
