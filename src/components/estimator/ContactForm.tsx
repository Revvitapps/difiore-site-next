'use client';

import React from 'react';
import type { EstimatorState } from '../EstimatorForm';

interface ContactFormProps {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
  onSubmit: () => Promise<void> | void;
  submitting: boolean;
}

export function ContactForm({ state, setState, onSubmit, submitting }: ContactFormProps) {
  function updateField<K extends keyof EstimatorState['contact']>(
    key: K,
    val: EstimatorState['contact'][K]
  ) {
    setState((s) => ({
      ...s,
      contact: {
        ...s.contact,
        [key]: val,
      },
    }));
  }

  return (
    <div className="space-y-4 text-white">
      {/* intro copy */}
      <div>
        <div className="text-lg font-bold">Where can we send this?</div>
        <div className="text-sm text-white/70">
          You&apos;ll get a call/text from DiFiore (real human, not spam).
        </div>
      </div>

      {/* grid fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* first name */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">First Name</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="John"
            value={state.contact.firstName ?? ''}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
        </div>

        {/* last name */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Last Name</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="Smith"
            value={state.contact.lastName ?? ''}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
        </div>

        {/* phone */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Phone</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="(555) 123-4567"
            value={state.contact.phone ?? ''}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>

        {/* email */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">Email</label>
          <input
            type="email"
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="you@example.com"
            value={state.contact.email ?? ''}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>

        {/* street */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-white/70 text-xs block">Project Address</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="123 Main St, Town"
            value={state.address.street ?? ''}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                address: { ...s.address, street: e.target.value },
              }))
            }
          />
        </div>

        {/* city */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">City</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="Springfield"
            value={state.address.city ?? ''}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                address: { ...s.address, city: e.target.value },
              }))
            }
          />
        </div>

        {/* zip */}
        <div className="space-y-1">
          <label className="text-white/70 text-xs block">ZIP</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none placeholder-white/40 focus:ring-2 focus:ring-amber-400"
            placeholder="08054"
            value={state.address.zip ?? ''}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                address: { ...s.address, zip: e.target.value },
              }))
            }
          />
        </div>
      </div>

      {/* submit */}
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

      {/* legal copy */}
      <p className="text-[11px] text-white/50 text-center leading-relaxed">
        By tapping submit you agree a licensed DiFiore project manager may
        contact you about your project. No spam. No obligation.
      </p>
    </div>
  );
}