'use client';

import React from 'react';
import ProjectSelector from '@/components/estimator/ProjectSelector';
import StepDetails from '@/components/estimator/StepDetails';
import ContactForm from '@/components/estimator/ContactForm';
import type {
  ProjectKey,
  EstimatorDetails,
  EstimatorStateLike,
} from '@/components/estimator/types';

// ---------- live estimate model ----------
function getEstimate(project: ProjectKey | null, details: EstimatorDetails) {
  if (!project) return null;

  const sqft = Number(details.squareFootage ?? '0') || 0;
  const windows = Number(details.windowCount ?? '0') || 0;

  let conservative = 0;
  let likely = 0;
  let premium = 0;
  const breakdownLines: string[] = [];

  switch (project) {
    case 'kitchen': {
      const effSqft = sqft > 0 ? sqft : 200;
      const baseLow = 150;
      const baseLikely = 175;
      const baseHigh = 200;

      conservative = effSqft * baseLow;
      likely = effSqft * baseLikely;
      premium = effSqft * baseHigh;
      breakdownLines.push('Cabinets, counters, flooring, appliances');
      break;
    }
    case 'bathroom': {
      let low = 15000;
      let mid = 22000;
      let high = 32000;

      if (details.bathType === 'guestFull') {
        low = 25000;
        mid = 35000;
        high = 45000;
      } else if (details.bathType === 'primarySpa') {
        low = 40000;
        mid = 55000;
        high = 70000;
      }

      conservative = low;
      likely = mid;
      premium = high;
      breakdownLines.push('Tile, vanity, shower/tub, plumbing updates');
      break;
    }
    case 'roofing': {
      const effSqft = (sqft || 1800) * 1.2;
      let lowRate = 5.5;
      let midRate = 6.5;
      let highRate = 8.0;

      if (details.roofType === 'cedarShake') {
        lowRate += 3;
        midRate += 4;
        highRate += 5;
      }
      if (details.roofType === 'slate') {
        lowRate += 8;
        midRate += 10;
        highRate += 12;
      }
      if (details.roofType === 'rubber') {
        lowRate += 1;
        midRate += 2;
        highRate += 3;
      }

      if (details.roofComplexity === 'complex') {
        lowRate *= 1.15;
        midRate *= 1.2;
        highRate *= 1.25;
      } else if (details.roofComplexity === 'veryComplex') {
        lowRate *= 1.3;
        midRate *= 1.4;
        highRate *= 1.5;
      }

      conservative = effSqft * lowRate;
      likely = effSqft * midRate;
      premium = effSqft * highRate;

      if (details.tearOff === 'tearOff' || !details.tearOff) {
        conservative += 1500;
        likely += 2500;
        premium += 4000;
      }

      breakdownLines.push('Full tear-off, disposal, new roof system');
      break;
    }
    case 'siding': {
      const effSqft = sqft || 1800;
      let lowRate = 12;
      let midRate = 16;
      let highRate = 22;

      if (details.sidingMaterial === 'fiberCement') {
        lowRate += 4;
        midRate += 5;
        highRate += 6;
      } else if (details.sidingMaterial === 'cedar') {
        lowRate += 6;
        midRate += 7;
        highRate += 8;
      }

      conservative = effSqft * lowRate;
      likely = effSqft * midRate;
      premium = effSqft * highRate;
      breakdownLines.push('Wrap, new siding, trim, disposal');
      break;
    }
    case 'windows': {
      const count = windows || 10;
      conservative = count * 700;
      likely = count * 900;
      premium = count * 1100;
      breakdownLines.push('Removal, install, foam, coil wrap');
      break;
    }
    case 'deck': {
      const effSqft = sqft || 300;
      conservative = effSqft * 80;
      likely = effSqft * 100;
      premium = effSqft * 140;
      breakdownLines.push('Framing, decking, rails, stairs');
      break;
    }
    case 'addition': {
      const effSqft = sqft || 400;
      conservative = effSqft * 180;
      likely = effSqft * 220;
      premium = effSqft * 275;
      breakdownLines.push('Framing, tie-in, mechanicals, interior finish');
      break;
    }
    default: {
      return null;
    }
  }

  return {
    conservative,
    likely,
    premium,
    breakdownLines,
  };
}

const formatUsd = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export default function ProjectCalculatorClient() {
  const [state, setState] = React.useState<EstimatorStateLike>({
    step: 1,
    project: null,
    details: {},
    contact: {},
    address: {},
  });

  const liveEst = getEstimate(state.project, state.details || {});
  const estimateForDisplay = liveEst ?? {
    conservative: 0,
    likely: 0,
    premium: 0,
    breakdownLines: [],
  };

  async function handleSubmitContact() {
    console.log('SUBMIT LEAD', state, liveEst);
    alert(
      "Thanks! We'll reach out to confirm scope, schedule a site visit, and firm up your quote."
    );
    setState((prev) => ({ ...prev, step: 4 }));
  }

  return (
    <main
      className="min-h-screen text-white px-4 py-12 md:py-16 bg-[#0c0f14] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/difiore-hero-spotlight-house.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0c0f14',
      }}
    >
      <div className="mx-auto max-w-5xl w-full space-y-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
            {/* marketing headline lives here */}
            Project Cost Estimator
          </h1>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
          </p>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            Answer a few quick questions, see real ballpark numbers, and send
            it to our team to lock in a site visit and final quote.
          </p>
        </div>

        <section className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] backdrop-blur-md ring-1 ring-white/5 shadow-[0_30px_120px_rgba(0,0,0,.8)] p-6 space-y-8">
          {/* STEP 1 */}
          {state.step === 1 && (
            <ProjectSelector
              value={state.project}
              onSelectProject={(proj: ProjectKey) => {
                setState((prev) => ({
                  ...prev,
                  project: proj,
                  step: 2,
                }));
              }}
            />
          )}

          {/* STEP 2 */}
          {state.step === 2 && (
            <>
              <StepDetails
                project={state.project}
                details={state.details}
                estimate={liveEst}
                onChange={(key, val) => {
                  setState((prev) => ({
                    ...prev,
                    details: {
                      ...prev.details,
                      [key]: val,
                    },
                  }));
                }}
              />

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                  onClick={() => setState({ ...state, step: 1 })}
                >
                  ← Back
                </button>
                <button
                  className="flex-1 rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,.35)] transition hover:bg-amber-500/20"
                  onClick={() => setState({ ...state, step: 3 })}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {state.step === 3 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 3 • Where can we send this?
              </div>
              <h2 className="text-2xl font-bold text-white">Lock in a consult</h2>
              <p className="text-sm text-white/60 max-w-2xl">
                You’ll hear from a DiFiore project specialist soon to confirm
                schedule, timeline, and next steps.
                <br />
                If you have an urgent need, click Speak to an Agent in the
                bottom right corner.
              </p>

              <ContactForm
                state={state}
                setState={setState}
                submitting={false}
                onSubmit={handleSubmitContact}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                  onClick={() => setState({ ...state, step: 2 })}
                >
                  ← Back
                </button>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {state.step === 4 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 4 • Sent
              </div>
              <h2 className="text-2xl font-bold text-white">You’re all set ✅</h2>
              <p className="text-sm text-white/60 max-w-2xl">
                A project specialist will reach out shortly to confirm site
                conditions and lock in final quote. No obligation.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] ring-1 ring-white/5 p-4 text-center">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-amber-300 mb-2">
                  Your Estimate
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg border border-white/15 bg-black/20 p-4">
                    <div className="text-xs font-medium text-white/80">Conservative</div>
                    <div className="text-lg font-bold text-green-400 mt-1">
                      {formatUsd(estimateForDisplay.conservative)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-400/40 bg-black/30 p-4 ring-2 ring-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,.4)]">
                    <div className="text-xs font-medium text-white/80">Most Likely</div>
                    <div className="text-lg font-extrabold text-amber-300 mt-1">
                      {formatUsd(estimateForDisplay.likely)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-black/20 p-4">
                    <div className="text-xs font-medium text-white/80">Premium</div>
                    <div className="text-lg font-bold text-red-400 mt-1">
                      {formatUsd(estimateForDisplay.premium)}
                    </div>
                  </div>
                </div>

                {estimateForDisplay.breakdownLines?.length ? (
                  <div className="mt-4 text-[11px] text-white/50 leading-relaxed">
                    {estimateForDisplay.breakdownLines.map((line: string, idx: number) => (
                      <div key={idx}>{line}</div>
                    ))}
                    <div className="mt-2 text-white/40">
                      Final quote requires a site visit (structure/utilities/permits).
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
