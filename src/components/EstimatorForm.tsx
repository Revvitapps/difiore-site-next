'use client';

import React, { useEffect, useRef, useState } from 'react';
import { submitEstimatorPayload } from './estimator/utils/submitEstimator';

// ----- estimate + helpers -----

// rough placeholder math – replace with your real logic per project type
function computeEstimate(
  details: EstimatorState['details'],
  project: EstimatorState['project']
) {
  const sqftNum = parseFloat(details.squareFeet || '0') || 0;

  let basePerSqft = 0;
  switch (project) {
    case 'roofing':
      basePerSqft = 9;
      break;
    case 'deck':
      basePerSqft = 45;
      break;
    case 'bathroom':
      basePerSqft = 250;
      break;
    case 'kitchen':
      basePerSqft = 300;
      break;
    case 'siding':
      basePerSqft = 15;
      break;
    case 'addition':
      basePerSqft = 225;
      break;
    default:
      basePerSqft = 0;
  }

  const mid = sqftNum * basePerSqft;
  if (!mid || mid === 0) {
    return null; // no estimate yet
  }

  return {
    low: Math.round(mid * 0.85),
    mid: Math.round(mid),
    high: Math.round(mid * 1.25),
  };
}

// simple currency formatter for the estimate preview card
function currency(n: number) {
  if (!n || Number.isNaN(n)) return '—';
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

// ----- types -----
export type ProjectType =
  | 'roofing'
  | 'deck'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'addition';

export type EstimatorState = {
  step: number; // 1 select project, 2 address, 3 details, 4 contact, 5 review
  project: ProjectType | '';
  address: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  details: {
    // shared basics
    yearBuilt: string;
    stories: string;
    squareFeet: string;

    // roofing
    roofType: string;
    roofLayers: string;

    // deck
    deckSize: string;
    deckMaterial: string;

    // kitchen/bath/etc
    scopeDescription: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

function createInitialState(): EstimatorState {
  return {
    step: 1,
    project: '',
    address: {
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    details: {
      yearBuilt: '',
      stories: '',
      squareFeet: '',
      roofType: '',
      roofLayers: '',
      deckSize: '',
      deckMaterial: '',
      scopeDescription: '',
    },
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  };
}

const GOOGLE_PLACES_SCRIPT_ID = 'google-places-script';
let googlePlacesPromise: Promise<void> | null = null;

type GoogleMapsEventListener = { remove: () => void };
type GoogleAutocompletePlace = {
  address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
  place_id?: string;
};
type GoogleAutocomplete = {
  getPlace?: () => GoogleAutocompletePlace;
  addListener: (event: 'place_changed', handler: () => void) => GoogleMapsEventListener;
};
type GoogleLike = {
  maps?: {
    places?: {
      Autocomplete?: new (input: HTMLInputElement, opts: Record<string, unknown>) => GoogleAutocomplete;
    };
  };
};

function loadGooglePlacesScript(apiKey: string) {
  if (typeof window === 'undefined') return Promise.resolve();
  const g = (window as typeof window & { google?: GoogleLike }).google;
  if (g?.maps?.places?.Autocomplete) {
    return Promise.resolve();
  }
  if (googlePlacesPromise) return googlePlacesPromise;

  googlePlacesPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_PLACES_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google Maps script failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_PLACES_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Google Maps script failed to load')));
    document.head.appendChild(script);
  });

  return googlePlacesPromise;
}

// ----- subcomponents -----

type SelectorProps = {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
};

const PROJECT_OPTIONS = [
  { key: 'roofing', label: 'Roofing', emoji: '🏠', blurb: 'Full tear-off & replace' },
  { key: 'deck', label: 'Deck / Outdoor Living', emoji: '🪵', blurb: 'Composite & custom builds' },
  { key: 'bathroom', label: 'Bathroom Remodel', emoji: '🚿', blurb: 'Update fixtures & tile' },
  { key: 'kitchen', label: 'Kitchen Remodel', emoji: '🍽️', blurb: 'Cabinets / counters / layout' },
  { key: 'siding', label: 'Siding / Exterior Wrap', emoji: '🏚️', blurb: 'Whole-home exterior refresh' },
  { key: 'addition', label: 'Addition / Basement', emoji: '➕', blurb: 'Add square footage / finish space' },
];

function ProjectSelector({ state, setState }: SelectorProps) {
  const current = state.project;

  function handleSelect(nextProject: string) {
    setState(prev => ({
      ...prev,
      project: nextProject as ProjectType,
      step: 2, // advance to details
    }));
  }

  return (
    <div className="space-y-6 text-zinc-200">
      <div>
        <p className="text-amber-400/90 text-[13px] uppercase tracking-wide font-semibold">
          Step 1 • Project Type
        </p>
        <h2 className="text-white font-extrabold text-[clamp(20px,2vw,24px)] leading-tight">
          What kind of project are you planning?
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Pick the one that’s the best fit. You&rsquo;ll answer a few quick details next.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {PROJECT_OPTIONS.map(opt => {
          const active = current === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleSelect(opt.key)}
              className={[
                'flex flex-col items-start rounded-xl border px-4 py-3 text-left text-sm font-semibold transition w-[160px] bg-[rgba(20,20,28,.6)]',
                active
                  ? 'border-amber-400/60 text-amber-300 shadow-[0_20px_60px_rgba(251,191,36,.3)]'
                  : 'border-white/15 text-white/80 hover:bg-[rgba(30,30,40,.7)] hover:text-white',
              ].join(' ')}
            >
              <span className="flex items-center gap-2 text-white text-[14px] font-bold">
                <span className="text-lg">{opt.emoji}</span>
                <span>{opt.label}</span>
              </span>
              <span className="text-[12px] text-zinc-400 font-normal mt-1 leading-snug">
                {opt.blurb}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type DetailsProps = {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
  est: { low: number; mid: number; high: number } | null;
  currency: (n: number) => string;
};

type AddressProps = {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
};

function StepAddress({ state, setState }: AddressProps) {
  const address = state.address;
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  function updateAddress<K extends keyof EstimatorState['address']>(key: K, val: string) {
    setState(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: val,
      },
    }));
  }

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey) return;

    let listener: GoogleMapsEventListener | null = null;

    loadGooglePlacesScript(apiKey)
      .then(() => {
        const input = addressInputRef.current;
        if (!input) return;
        const g = (window as typeof window & { google?: GoogleLike }).google;
        if (!g?.maps?.places?.Autocomplete) return;

        const instance = new g.maps.places.Autocomplete(input, {
          types: ['address'],
          fields: ['address_components', 'place_id'],
        });

        listener = instance.addListener('place_changed', () => {
          const place = instance.getPlace?.();
          const components = place?.address_components ?? [];
          if (!components.length) return;

          const getComponent = (type: string, prop: 'long_name' | 'short_name' = 'long_name') =>
            components.find(c => Array.isArray(c.types) && c.types.includes(type))?.[prop] ?? '';

          const streetNumber = getComponent('street_number');
          const route = getComponent('route');
          const cityName =
            getComponent('locality') ||
            getComponent('sublocality') ||
            getComponent('administrative_area_level_2');
          const stateCode = getComponent('administrative_area_level_1', 'short_name');
          const postalCode = getComponent('postal_code');

          const streetLine = [streetNumber, route].filter(Boolean).join(' ').trim();

          setState(prev => ({
            ...prev,
            address: {
              ...prev.address,
              address: streetLine || prev.address.address,
              city: cityName || prev.address.city,
              state: stateCode || prev.address.state,
              zip: postalCode || prev.address.zip,
            },
          }));
        });
      })
      .catch(error => {
        console.error('Failed to initialise Google Places autocomplete', error);
      });

    return () => {
      listener?.remove();
    };
  }, [setState]);

  function goDetails() {
    setState(prev => ({ ...prev, step: 3 }));
  }

  return (
    <div className="space-y-6 text-zinc-200">
      <div>
        <p className="text-amber-400/90 text-[13px] uppercase tracking-wide font-semibold">
          Step 2 • Project Address
        </p>
        <h2 className="text-white font-extrabold text-[clamp(20px,2vw,24px)] leading-tight">
          Where is this project located?
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Start with the service address so we can confirm coverage and prep the right crew.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <label className="flex flex-col gap-1 sm:col-span-2 lg:col-span-2">
          <span className="text-[13px] font-semibold text-zinc-200">Project Address</span>
          <input
            ref={addressInputRef}
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50 placeholder:text-white/40"
            placeholder="123 Main St"
            value={address.address}
            onChange={e => updateAddress('address', e.target.value)}
            autoComplete="street-address"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">City</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50 placeholder:text-white/40"
            placeholder="Cranston"
            value={address.city}
            onChange={e => updateAddress('city', e.target.value)}
            autoComplete="address-level2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">State</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white uppercase outline-none focus:ring-2 focus:ring-amber-400/50 placeholder:text-white/40"
            placeholder="PA"
            value={address.state}
            onChange={e => updateAddress('state', e.target.value.toUpperCase())}
            autoComplete="address-level1"
            maxLength={2}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">ZIP</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50 placeholder:text-white/40"
            placeholder="19063"
            value={address.zip}
            onChange={e => updateAddress('zip', e.target.value)}
            autoComplete="postal-code"
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={goDetails}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-[14px] font-semibold text-zinc-900 shadow-[0_20px_60px_rgba(251,191,36,.4)] hover:brightness-110"
        >
          Continue to Project Details →
        </button>
      </div>
    </div>
  );
}

function StepDetails({ state, setState, est, currency }: DetailsProps) {
  const d = state.details;

  function updateDetails<K extends keyof EstimatorState['details']>(
    key: K,
    val: string
  ) {
    setState((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [key]: val,
      },
    }));
  }

  function goContact() {
    setState(prev => ({ ...prev, step: 4 }));
  }

  return (
    <div className="space-y-6 text-zinc-200">
      <div>
        <p className="text-amber-400/90 text-[13px] uppercase tracking-wide font-semibold">
          Step 3 • Project Details
        </p>
        <h2 className="text-white font-extrabold text-[clamp(20px,2vw,24px)] leading-tight">
          What are we looking at on site?
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Share the basics so we can prep your estimate.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">Year Built</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
            value={d.yearBuilt}
            onChange={(e) => updateDetails('yearBuilt', e.target.value)}
            placeholder="e.g. 1998"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">Stories</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
            value={d.stories}
            onChange={(e) => updateDetails('stories', e.target.value)}
            placeholder="1 / 2 / 3"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-zinc-200">Approx. Sq Ft</span>
          <input
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
            value={d.squareFeet}
            onChange={(e) => updateDetails('squareFeet', e.target.value)}
            placeholder="2400"
          />
        </label>
      </div>

      {state.project === 'roofing' && (
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Roof Type / Material
            </span>
            <input
              className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
              value={d.roofType}
              onChange={(e) => updateDetails('roofType', e.target.value)}
              placeholder="Asphalt shingle / Metal / etc."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              How many existing layers?
            </span>
            <input
              className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
              value={d.roofLayers}
              onChange={(e) => updateDetails('roofLayers', e.target.value)}
              placeholder="1 layer / 2 layers"
            />
          </label>
        </div>
      )}

      {state.project === 'deck' && (
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Approx. Deck Size
            </span>
            <input
              className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
              value={d.deckSize}
              onChange={(e) => updateDetails('deckSize', e.target.value)}
              placeholder="12'x20', wrap-around, etc."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Material Preference
            </span>
            <input
              className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
              value={d.deckMaterial}
              onChange={(e) => updateDetails('deckMaterial', e.target.value)}
              placeholder="Composite / wood / not sure"
            />
          </label>
        </div>
      )}

      {['kitchen', 'bathroom', 'addition', 'siding'].includes(state.project) && (
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-[13px] font-semibold text-zinc-200">
            Briefly describe the work
          </span>
          <textarea
            rows={3}
            className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
            value={d.scopeDescription}
            onChange={(e) => updateDetails('scopeDescription', e.target.value)}
            placeholder="New cabinets and counters, move sink to island, tile shower, finish basement, reside entire home, etc."
          />
        </label>
      )}

      <div className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] p-4 text-[13px] text-zinc-200 shadow-[0_20px_60px_rgba(251,191,36,.15)]">
        <div className="text-[12px] font-semibold text-amber-400/90 uppercase tracking-wide mb-3">
          Rough Cost Range (not a formal quote)
        </div>

        {est ? (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-black/30 border border-white/10 p-3">
              <div className="text-[11px] text-zinc-400 uppercase tracking-wide">
                Conservative
              </div>
              <div className="text-white font-semibold text-sm leading-tight">
                {currency(est.low)}
              </div>
            </div>

            <div className="rounded-lg bg-black/30 border border-amber-400/40 shadow-[0_20px_60px_rgba(251,191,36,.35)] p-3">
              <div className="text-[11px] text-amber-300 uppercase tracking-wide">
                Most Likely
              </div>
              <div className="text-white font-semibold text-sm leading-tight">
                {currency(est.mid)}
              </div>
            </div>

            <div className="rounded-lg bg-black/30 border border-white/10 p-3">
              <div className="text-[11px] text-zinc-400 uppercase tracking-wide">
                Premium
              </div>
              <div className="text-white font-semibold text-sm leading-tight">
                {currency(est.high)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-zinc-500 text-[12px]">
            Add square footage and scope and we’ll generate a ballpark.
          </div>
        )}

        <div className="text-[11px] text-zinc-500 mt-3 leading-relaxed">
          Final pricing depends on site conditions, finishes, layout changes,
          permitting, etc. We confirm everything during an on-site visit.
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={goContact}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-[14px] font-semibold text-zinc-900 shadow-[0_20px_60px_rgba(251,191,36,.4)] hover:brightness-110"
        >
          Continue to Contact →
        </button>
      </div>
    </div>
  );
}


type ContactProps = {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
};

function ContactForm({ state, setState }: ContactProps) {
  const c = state.contact;

  function update<K extends keyof EstimatorState['contact']>(
    key: K,
    val: string
  ) {
    setState(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: val,
      },
    }));
  }

  const firstName = c.firstName.trim();
  const lastName = c.lastName.trim();
  const email = c.email.trim();
  const phone = c.phone.trim();

  const isValidName = (value: string) => value.length >= 2;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const normalizedPhone = phone.replace(/\D/g, '');

  const firstNameValid = isValidName(firstName);
  const lastNameValid = isValidName(lastName);
  const emailValid = emailPattern.test(email);
  const phoneValid = normalizedPhone.length >= 10;

  const formComplete = firstNameValid && lastNameValid && emailValid && phoneValid;

  function goReview() {
    if (!formComplete) return;
    setState(prev => ({ ...prev, step: 5 }));
  }

  const baseInputClasses =
    'rounded-xl border px-3 py-2 text-[14px] text-white outline-none transition bg-[rgba(20,20,28,.6)] placeholder:text-white/40';
  const focusClasses = 'focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300';
  const errorClasses = 'border-red-400 focus:border-red-400 focus:ring-red-300/70';

  const firstNameInvalid = firstName.length > 0 && !firstNameValid;
  const lastNameInvalid = lastName.length > 0 && !lastNameValid;
  const emailInvalid = email.length > 0 && !emailValid;
  const phoneInvalid = phone.length > 0 && !phoneValid;

  return (
    <div className="space-y-6 text-zinc-200">
      <div>
        <p className="text-amber-400/90 text-[13px] uppercase tracking-wide font-semibold">
          Step 4 • How can we reach you?
        </p>
        <h2 className="text-white font-extrabold text-[clamp(20px,2vw,24px)] leading-tight">
          We&rsquo;ll send your ballpark and follow up to schedule a visit
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          A real person reviews every request. We only need the best way to connect.
        </p>
      </div>

      <div className="grid gap-4 text-sm text-white">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              First Name *
            </span>
            <input
              className={[
                baseInputClasses,
                firstNameInvalid ? errorClasses : 'border-white/15 ' + focusClasses,
              ].join(' ')}
              value={c.firstName}
              onChange={e => update('firstName', e.target.value)}
              placeholder="John"
              aria-invalid={firstNameInvalid}
            />
            {firstNameInvalid && (
              <span className="text-[11px] text-red-300">
                First name should be at least 2 characters.
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Last Name *
            </span>
            <input
              className={[
                baseInputClasses,
                lastNameInvalid ? errorClasses : 'border-white/15 ' + focusClasses,
              ].join(' ')}
              value={c.lastName}
              onChange={e => update('lastName', e.target.value)}
              placeholder="Smith"
              aria-invalid={lastNameInvalid}
            />
            {lastNameInvalid && (
              <span className="text-[11px] text-red-300">
                Last name should be at least 2 characters.
              </span>
            )}
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Email *
            </span>
            <input
              className={[
                baseInputClasses,
                emailInvalid ? errorClasses : 'border-white/15 ' + focusClasses,
              ].join(' ')}
              value={c.email}
              onChange={e => update('email', e.target.value)}
              placeholder="john@email.com"
              aria-invalid={emailInvalid}
            />
            {emailInvalid && (
              <span className="text-[11px] text-red-300">
                Enter a valid email address (name@example.com).
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-zinc-200">
              Phone *
            </span>
            <input
              inputMode="tel"
              className={[
                baseInputClasses,
                phoneInvalid ? errorClasses : 'border-white/15 ' + focusClasses,
              ].join(' ')}
              value={c.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="(555) 123-4567"
              aria-invalid={phoneInvalid}
            />
            {phoneInvalid && (
              <span className="text-[11px] text-red-300">
                Phone should include at least 10 digits.
              </span>
            )}
          </label>
        </div>

        <p className="text-[12px] text-zinc-400">
          Need to share timing or special notes? You can reply to our email after submitting.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={goReview}
          disabled={!formComplete}
          className={[
            'rounded-xl px-4 py-2 text-[14px] font-semibold shadow-[0_20px_60px_rgba(251,191,36,.4)] transition',
            formComplete
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 hover:brightness-110'
              : 'bg-white/5 text-zinc-500 cursor-not-allowed',
          ].join(' ')}
        >
          Review &amp; Submit →
        </button>
      </div>
      {!formComplete && (
        <p className="text-[12px] text-zinc-400">
          First &amp; last name must be 2+ characters, email must be valid, and phone needs at least 10 digits.
        </p>
      )}
    </div>
  );
}

type ReviewProps = {
  state: EstimatorState;
  sending: boolean;
  sent: boolean;
  error: string | null;
  onSubmit: () => void;
};

function ReviewSummary({
  state,
  sending,
  sent,
  error,
  onSubmit,
}: ReviewProps) {
  const { address, project, contact, details } = state;

  return (
    <div className="text-white text-sm space-y-4">
      <div className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] p-4">
        <div className="text-[13px] font-semibold text-amber-400/90 mb-2">
          Project Summary
        </div>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-zinc-300">
          <div>
            <strong className="text-white/90">Address:</strong>{' '}
            {address.address || '—'}
          </div>
          <div>
            <strong className="text-white/90">Project:</strong>{' '}
            {project || '—'}
          </div>
          <div>
            <strong className="text-white/90">Contact:</strong>{' '}
            {contact.firstName} {contact.lastName}
          </div>
          <div>
            <strong className="text-white/90">Email:</strong>{' '}
            {contact.email}
          </div>
          <div>
            <strong className="text-white/90">Phone:</strong>{' '}
            {contact.phone || 'Not provided'}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] p-4">
        <div className="text-[13px] font-semibold text-amber-400/90 mb-2">
          Project Details
        </div>

        <pre className="text-xs text-zinc-400 bg-black/40 p-3 rounded-xl border border-white/10 overflow-x-auto">
          {JSON.stringify(details, null, 2)}
        </pre>
      </div>

      <div className="text-center text-[13px]">
        {!sent && !sending && !error && (
          <button
            className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-[14px] font-semibold text-zinc-900 shadow-[0_20px_60px_rgba(251,191,36,.4)] hover:brightness-110"
            onClick={onSubmit}
          >
            Submit Project Request
          </button>
        )}

        {sending && <div className="text-zinc-400">Sending…</div>}

        {sent && !error && (
          <div className="text-emerald-400">
            Thank you! We&rsquo;ve received your request.
          </div>
        )}

        {error && <div className="text-red-400">{error}</div>}
      </div>
    </div>
  );
}

// ----- main form wrapper -----

export default function EstimatorForm() {
  const [state, setState] = useState<EstimatorState>(createInitialState());
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // live rolling estimate for Step 3 preview card
  const estimateRangeOrNull = computeEstimate(state.details, state.project);

  async function handleSubmit() {
    try {
      setSending(true);
      setError(null);

      if (!state.project) {
        setError('Select a project type before submitting.');
        return;
      }

      const projectOption = PROJECT_OPTIONS.find((opt) => opt.key === state.project);
      const projectLabel = projectOption?.label ?? state.project;

      const filteredDetails = Object.entries(state.details).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          const trimmed = value.trim();
          if (trimmed) acc[key] = trimmed;
          return acc;
        },
        {}
      );

      const phoneDigits = state.contact.phone.replace(/\D/g, '');

      await submitEstimatorPayload({
        project: state.project,
        projectLabel,
        address: {
          street: state.address.address.trim(),
          city: state.address.city.trim(),
          state: state.address.state.trim(),
          zip: state.address.zip.trim(),
        },
        contact: {
          firstName: state.contact.firstName.trim(),
          lastName: state.contact.lastName.trim(),
          email: state.contact.email.trim(),
          phone: phoneDigits,
          phoneFormatted: state.contact.phone.trim(),
        },
        details: Object.keys(filteredDetails).length ? filteredDetails : undefined,
        estimate: estimateRangeOrNull
          ? {
              conservative: estimateRangeOrNull.low,
              likely: estimateRangeOrNull.mid,
              premium: estimateRangeOrNull.high,
            }
          : undefined,
        meta: {
          source: 'estimator-form',
          submittedAt: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        },
      });

      setSent(true);
    } catch (err) {
      console.error('Estimator submission failed', err);
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Something went wrong sending your request. Please try again.';
      setError(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,.12)_0%,rgba(0,0,0,0)_60%)] bg-[rgba(15,15,20,.8)] p-6 shadow-[0_40px_120px_rgba(0,0,0,.8)] ring-1 ring-white/5 backdrop-blur-xl">
      {state.step === 1 && <ProjectSelector state={state} setState={setState} />}
      {state.step === 2 && <StepAddress state={state} setState={setState} />}
      {state.step === 3 && (
        <StepDetails
          state={state}
          setState={setState}
          est={estimateRangeOrNull}
          currency={currency}
        />
      )}
      {state.step === 4 && <ContactForm state={state} setState={setState} />}
      {state.step === 5 && (
        <ReviewSummary
          state={state}
          sending={sending}
          sent={sent}
          error={error}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
