'use client';

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { EstimatorStateLike } from './types';

const GOOGLE_PLACES_SCRIPT_ID = 'google-places-script';
let googlePlacesPromise: Promise<void> | null = null;

type GoogleMapsEventListener = { remove: () => void };
type GoogleAutocompletePlace = {
  address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
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
      existing.addEventListener('error', () => reject(new Error('Google Maps script failed to load')), {
        once: true,
      });
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

type StepAddressProps = {
  state: EstimatorStateLike;
  setState: Dispatch<SetStateAction<EstimatorStateLike>>;
};

export default function StepAddress({ state, setState }: StepAddressProps) {
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteLoaded, setAutocompleteLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  function updateAddress<K extends keyof EstimatorStateLike['address']>(
    key: K,
    value: EstimatorStateLike['address'][K]
  ) {
    setState((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value,
      },
    }));
  }

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey) {
      setLoadError('Google Places API key missing. Autocomplete is disabled.');
      return;
    }

    let listener: GoogleMapsEventListener | null = null;

    loadGooglePlacesScript(apiKey)
      .then(() => {
        const input = addressInputRef.current;
        if (!input) return;
        const g = (window as typeof window & { google?: GoogleLike }).google;
        if (!g?.maps?.places?.Autocomplete) return;

        const instance = new g.maps.places.Autocomplete(input, {
          types: ['address'],
          fields: ['address_components', 'formatted_address'],
        });

        setAutocompleteLoaded(true);

        listener = instance.addListener('place_changed', () => {
          const place = instance.getPlace?.();
          const components = place?.address_components ?? [];
          if (!components.length) return;

          const getComponent = (type: string, prop: 'long_name' | 'short_name' = 'long_name') =>
            components.find((c) => Array.isArray(c.types) && c.types.includes(type))?.[prop] ?? '';

          const streetNumber = getComponent('street_number');
          const route = getComponent('route');
          const city =
            getComponent('locality') ||
            getComponent('sublocality') ||
            getComponent('administrative_area_level_2');
          const stateCode = getComponent('administrative_area_level_1', 'short_name');
          const postalCode = getComponent('postal_code');

          const streetLine = [streetNumber, route].filter(Boolean).join(' ').trim();

          setState((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              street: streetLine || prev.address.street,
              city: city || prev.address.city,
              state: stateCode || prev.address.state,
              zip: postalCode || prev.address.zip,
            },
          }));
        });
      })
      .catch((error) => {
        console.error('Failed to initialise Google Places autocomplete', error);
        setLoadError('Unable to load Google Places autocomplete. Check API key & quotas.');
      });

    return () => {
      listener?.remove();
    };
  }, [setState]);

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[rgba(12,14,22,.7)] p-6 backdrop-blur-md">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
          Step 2 • Project Address
        </div>
        <h3 className="mt-2 text-2xl font-bold">Where is the work happening?</h3>
        <p className="mt-2 text-sm text-white/60">
          We use this to confirm service coverage and prep the right crew. You can adjust any field
          manually if needed.
        </p>
        {loadError && (
          <p className="mt-3 text-xs text-amber-300/80">{loadError}</p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <label className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              Street Address
            </span>
            <input
              ref={addressInputRef}
              className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 placeholder:text-white/35"
              placeholder="123 Main St"
              value={state.address.street ?? ''}
              onChange={(event) => updateAddress('street', event.target.value)}
              autoComplete="street-address"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              City
            </span>
            <input
              className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 placeholder:text-white/35"
              placeholder="Cranston"
              value={state.address.city ?? ''}
              onChange={(event) => updateAddress('city', event.target.value)}
              autoComplete="address-level2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              State
            </span>
            <input
              className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 uppercase outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 placeholder:text-white/35"
              placeholder="PA"
              value={state.address.state ?? ''}
              onChange={(event) => updateAddress('state', event.target.value.toUpperCase())}
              autoComplete="address-level1"
              maxLength={2}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
              ZIP
            </span>
            <input
              className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 placeholder:text-white/35"
              placeholder="02816"
              value={state.address.zip ?? ''}
              onChange={(event) => updateAddress('zip', event.target.value)}
              autoComplete="postal-code"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[12px] text-white/60 leading-relaxed">
        We only use your address to scope the project.{' '}
        {autocompleteLoaded ? '' : 'Autocomplete is optional—feel free to type it in manually. '}
        You&rsquo;ll see your estimate next, then you can share contact info to schedule a visit.
      </div>
    </div>
  );
}
