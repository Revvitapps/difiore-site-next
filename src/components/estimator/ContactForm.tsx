'use client';

import React from 'react';

export interface EstimatorStateLike {
  project: string;
  details: {
    squareFootage?: string;
    stories?: string;
    ageOfHome?: string;
    urgency?: string;
    additionalDetails?: string;
  };
  address: {
    street?: string;
    city?: string;
    zip?: string;
  };
  contact: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    timeline?: string;
    notes?: string;
  };
}

interface ContactFormProps {
  state: EstimatorStateLike;
  setState: React.Dispatch<React.SetStateAction<EstimatorStateLike>>;
  submitting: boolean;
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  state,
  setState,
  submitting,
  onSubmit,
}) => {
  // safe fallbacks so we don't explode
  const contact = state.contact ?? {};
  const address = state.address ?? {};

  function updateContact<K extends keyof EstimatorStateLike['contact']>(
    key: K,
    val: EstimatorStateLike['contact'][K]
  ) {
    setState((s) => ({
      ...s,
      contact: {
        ...s.contact,
        [key]: val,
      },
    }));
  }

  function updateAddress<K extends keyof EstimatorStateLike['address']>(
    key: K,
    val: EstimatorStateLike['address'][K]
  ) {
    setState((s) => ({
      ...s,
      address: {
        ...s.address,
        [key]: val,
      },
    }));
  }

  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="text-lg font-bold">Where can we send this?</div>
        <div className="text-sm text-white/70">
          You&apos;ll get a quick call / text from DiFiore. No spam.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* First Name */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">First Name</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="John"
            value={contact.firstName ?? ''}
            onChange={(e) => updateContact('firstName', e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Last Name</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="Smith"
            value={contact.lastName ?? ''}
            onChange={(e) => updateContact('lastName', e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Phone</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="(555) 123-4567"
            value={contact.phone ?? ''}
            onChange={(e) => updateContact('phone', e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Email</label>
          <input
            type="email"
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="you@example.com"
            value={contact.email ?? ''}
            onChange={(e) => updateContact('email', e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-white/70 text-xs block">Project Address</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="123 Main St"
            value={address.street ?? ''}
            onChange={(e) => updateAddress('street', e.target.value)}
          />
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">City</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="Cranston"
            value={address.city ?? ''}
            onChange={(e) => updateAddress('city', e.target.value)}
          />
        </div>

        {/* ZIP */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">ZIP</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="02816"
            value={address.zip ?? ''}
            onChange={(e) => updateAddress('zip', e.target.value)}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Timeline</label>
          <select
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400 text-white/90"
            value={contact.timeline ?? ''}
            onChange={(e) => updateContact('timeline', e.target.value)}
          >
            <option value="">Select one…</option>
            <option value="asap">Active issue / ASAP</option>
            <option value="30">Within 30 days</option>
            <option value="90">1–3 months</option>
            <option value="planning">Just planning / budgeting</option>
          </select>
        </div>

        {/* Notes */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-white/70 text-xs block">
            Anything we should know?
          </label>
          <textarea
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400 min-h-[80px]"
            placeholder="Leaking around chimney, shingles missing on back side, etc."
            value={contact.notes ?? ''}
            onChange={(e) => updateContact('notes', e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        disabled={submitting}
        onClick={onSubmit}
        className={[
          'w-full rounded-lg border px-4 py-3 text-center text-sm font-semibold transition',
          submitting
            ? 'border-white/20 bg-white/10 text-white/40 cursor-not-allowed'
            : 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_20px_40px_rgba(255,200,0,.2)] hover:bg-amber-500/20',
        ].join(' ')}
      >
        {submitting ? 'Sending…' : 'Get My Quote'}
      </button>

      <p className="text-[11px] text-white/50 text-center leading-relaxed">
        By tapping submit you agree a licensed DiFiore project manager may
        contact you about your project. No spam. No obligation.
      </p>
    </div>
  );
};

export default ContactForm;