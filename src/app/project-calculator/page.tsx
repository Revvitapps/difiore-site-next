'use client';

import { useState } from 'react';
import { ProjectSelector } from '../../components/estimator/ProjectSelector';
import { StepDetails } from '../../components/estimator/StepDetails';
import { ContactForm } from '../../components/estimator/ContactForm';
import { ReviewSummary } from '../../components/estimator/ReviewSummary';
import { submitEstimate } from '../../components/estimator/utils/emailSubmit';

// ----------------------
// TYPES
// ----------------------
export type ProjectType =
  | 'roofing'
  | 'deck'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'addition';

export interface EstimatorState {
  step: number; // 0 = choose project, 1 = scope & pricing, 2 = contact, 3 = review/submit
  project: ProjectType | '';
  address: {
    address?: string;
    yearBuilt?: string;
    stories?: string;
    squareFeet?: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    notes?: string;
    timeline?: string;
  };
  // all per-project answers live here (roofSqft, tearOff, finishLevel, etc.)
  details: Record<string, any>;
}

// ----------------------
// COST ENGINE (stub logic for now; refine per-project pricing rules here)
// ----------------------
function computeEstimate(
  details: EstimatorState['details'],
  project: EstimatorState['project']
) {
  // we'll try a sane "mid" cost, then derive low/high bands
  // NOTE: this is where we will wire your real per-project formulas
  // (roof squares, tear-off bump, etc.)

  // square footage proxy
  let qty = 0;

  switch (project) {
    case 'roofing': {
      // roofSqft should represent roof surface area
      const roofSqft = Number(details.roofSqft || 0);
      qty = roofSqft;
      // base: architectural asphalt w/ tearoff mid complexity in RI/MA/CT
      const tearOffFactor =
        details.tearOff === false ? 0.85 : 1.0; // layover cheaper
      const materialFactor = (() => {
        switch (details.material) {
          case 'asphalt_3tab':
            return 0.9;
          case 'architectural':
            return 1.0;
          case 'metal_standing':
            return 2.0;
          case 'cedar':
            return 1.8;
          case 'slate_synthetic':
            return 2.2;
          default:
            return 1.0;
        }
      })();
      const complexityFactor = (() => {
        switch (details.complexity) {
          case 'simple':
            return 0.9;
          case 'complex':
            return 1.1;
          case 'very_complex':
            return 1.3;
          default:
            return 1.0;
        }
      })();

      // base $/sqft (architectural asphalt, tear-off, typical RI labor)
      const basePerSqft = 9;

      const mid =
        roofSqft *
        basePerSqft *
        tearOffFactor *
        materialFactor *
        complexityFactor;

      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.9),
        mid: Math.round(mid),
        high: Math.round(mid * 1.25),
      };
    }

    case 'deck': {
      const deckSqft = Number(details.deckSqft || 0);
      qty = deckSqft;

      // base composite mid-grade
      let perSqft = 55;
      if (details.material === 'standard_pt') perSqft = 35;
      if (details.material === 'premium_comp') perSqft = 70;

      // railing / stairs bumps
      const railingFeet = Number(details.railingFeet || 0);
      const railingCostPerFt =
        details.railing === 'metal' ? 140 : details.railing === 'basic' ? 60 : 0;

      const stairsBump = details.stairs === false ? 0 : 1500;

      const mid =
        deckSqft * perSqft + railingFeet * railingCostPerFt + stairsBump;

      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.85),
        mid: Math.round(mid),
        high: Math.round(mid * 1.2),
      };
    }

    case 'bathroom': {
      // baseline by bath type
      let base = 0;
      switch (details.bathType) {
        case 'powder':
          base = 12000;
          break;
        case 'guest_full':
          base = 28000;
          break;
        case 'primary':
          base = 45000;
          break;
        default:
          base = 20000;
      }

      // finish level bump
      if (details.finishLevel === 'standard') base *= 1;
      if (details.finishLevel === 'popular') base *= 1.15;
      if (details.finishLevel === 'premium') base *= 1.35;

      // plumbing/layout bump
      if (details.layoutChange === 'none') base *= 1;
      if (details.layoutChange === 'minor') base *= 1.15;
      if (details.layoutChange === 'major') base *= 1.3;

      // shower style bump
      if (details.showerType === 'walk_in_tile') base *= 1.12;
      if (details.showerType === 'curbless_tile') base *= 1.22;

      // vanity length add ($400/ft as rough allowance cabinetry+counter+plumbing)
      const vanityLenFt = Number(details.vanityLength || 0);
      base += vanityLenFt * 400;

      const mid = base;
      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.9),
        mid: Math.round(mid),
        high: Math.round(mid * 1.25),
      };
    }

    case 'kitchen': {
      const kitchenSqft = Number(details.sizeSqft || 0) || 180; // safety fallback
      qty = kitchenSqft;

      // baseline per sqft varies by finish / layout / appliances
      let perSqft = 250; // semi-custom, light layout move, mid appliances
      if (details.finishLevel === 'standard') perSqft = 200;
      if (details.finishLevel === 'premium') perSqft = 325;

      if (details.layoutChange === 'major') perSqft *= 1.2;
      else if (details.layoutChange === 'minor') perSqft *= 1.08;

      if (details.appliancePackage === 'basic') perSqft *= 0.95;
      if (details.appliancePackage === 'pro') perSqft *= 1.12;

      if (details.island === true) perSqft *= 1.05;

      const mid = kitchenSqft * perSqft;
      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.9),
        mid: Math.round(mid),
        high: Math.round(mid * 1.25),
      };
    }

    case 'siding': {
      const sidingSqft = Number(details.sidingSqft || 0);
      qty = sidingSqft;

      // material drive
      let perSqft = 14; // vinyl baseline
      if (details.material === 'fiber_cement') perSqft = 20;
      if (details.material === 'cedar') perSqft = 24;

      // access bump on tall houses
      const stories = details.stories || '2';
      if (stories === '2') perSqft *= 1.1;
      if (stories === '3') perSqft *= 1.25;

      // window/door trim work allowance
      const wraps = Number(details.windowWrapCount || 0);
      const wrapAllowance = wraps * 120;

      const mid = sidingSqft * perSqft + wrapAllowance;
      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.9),
        mid: Math.round(mid),
        high: Math.round(mid * 1.25),
      };
    }

    case 'addition': {
      const addSqft = Number(details.addSqft || 0);
      qty = addSqft;

      // base per sqft by finish level
      let perSqft = 225;
      if (details.finishLevel === 'premium') perSqft = 275;

      // basement vs new structure tweak
      if (details.isBasement === true) {
        // finishing existing shell is usually cheaper than new envelope
        perSqft *= 0.7;
      }

      // bathrooms in that new space
      const bathCount = Number(details.bathroomCount || 0);
      const bathAllowanceEach = 18000;
      let mid = addSqft * perSqft + bathCount * bathAllowanceEach;

      // kitchenette bump
      if (details.kitchenette === true) {
        mid += 15000;
      }

      if (!mid || mid <= 0) return null;

      return {
        low: Math.round(mid * 0.9),
        mid: Math.round(mid),
        high: Math.round(mid * 1.25),
      };
    }

    default:
      return null;
  }
}

// ----------------------
// HELPERS
// ----------------------
function currency(n?: number) {
  if (!n || n <= 0) return '—';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// ----------------------
// MAIN COMPONENT
// ----------------------
export default function EstimatorForm({
  onSubmitTo = '/api/leads',
}: {
  onSubmitTo?: string;
}) {
  const [state, setState] = useState<EstimatorState>({
    step: 0,
    project: '',
    address: {
      address: '',
      yearBuilt: '',
      stories: '',
      squareFeet: '',
    },
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      timeline: '',
    },
    details: {},
  });

  // step navigation
  function go(delta: number) {
    setState((s) => ({
      ...s,
      step: Math.max(0, Math.min(3, s.step + delta)),
    }));
  }

  // dynamic live estimate
  const est = computeEstimate(state.details, state.project);

  async function handleSubmit() {
    try {
      await submitEstimate(state, onSubmitTo);
      alert('Estimate submitted successfully. Thank you!');
      // reset but stay on step 0 to encourage new lead
      setState({
        step: 0,
        project: '',
        address: {
          address: '',
          yearBuilt: '',
          stories: '',
          squareFeet: '',
        },
        contact: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          notes: '',
          timeline: '',
        },
        details: {},
      });
    } catch (err) {
      alert('Something went wrong. Try again later.');
    }
  }

  return (
    <div className="rvv-bubble bg-[rgba(12,15,20,0.9)] border border-white/15 rounded-2xl p-6 shadow-[0_24px_60px_rgba(2,8,18,.45)] text-white">
      {/* STEP 0: pick project */}
      {state.step === 0 && (
        <div className="space-y-6">
          <ProjectSelector
            state={state}
            setState={setState}
            layoutClassName="grid w-full gap-3 grid-cols-1 sm:grid-cols-3"
          />

          <div className="flex justify-end">
            <button
              disabled={!state.project}
              onClick={() => {
                if (!state.project) return;
                go(1);
              }}
              className={[
                'rounded-full px-5 py-2 text-sm font-semibold transition',
                state.project
                  ? 'bg-amber-500 text-zinc-900 hover:bg-amber-400 shadow-[0_20px_60px_rgba(251,191,36,.4)]'
                  : 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed',
              ].join(' ')}
            >
              Start my estimate →
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: project details + live pricing */}
      {state.step === 1 && (
        <div className="space-y-8">
          <StepDetails
            state={state}
            setState={setState}
            est={est}
            currency={currency}
          />

          <div className="flex flex-col items-stretch gap-3 text-sm">
            <button
              onClick={() => go(1)}
              className="w-full rounded-full bg-amber-500 text-zinc-900 font-semibold px-5 py-3 shadow-[0_20px_60px_rgba(251,191,36,.4)] hover:bg-amber-400"
            >
              Continue to Contact →
            </button>

            <button
              onClick={() => go(-1)}
              className="w-full text-[13px] text-white/60 hover:text-white"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: contact info */}
      {state.step === 2 && (
        <div className="space-y-8">
          <div>
            <div className="text-lg font-bold text-white">How do we reach you?</div>
            <div className="text-sm text-white/70">
              We’ll confirm schedule, timeline, and next steps. No spam.
            </div>
          </div>

          <ContactForm state={state} setState={setState} />

          <div className="flex flex-col items-stretch gap-3 text-sm">
            <button
              onClick={() => go(1)}
              className="w-full rounded-full bg-amber-500 text-zinc-900 font-semibold px-5 py-3 shadow-[0_20px_60px_rgba(251,191,36,.4)] hover:bg-amber-400"
            >
              Review &amp; Submit →
            </button>

            <button
              onClick={() => go(-1)}
              className="w-full text-[13px] text-white/60 hover:text-white"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: review + submit */}
      {state.step === 3 && (
        <div className="space-y-8">
          <ReviewSummary
            state={state}
            sending={false}
            sent={false}
            error={null}
            onSubmit={handleSubmit}
          />

          <div className="flex flex-col items-stretch gap-3 text-sm">
            <button
              onClick={() => go(-1)}
              className="w-full text-[13px] text-white/60 hover:text-white"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}