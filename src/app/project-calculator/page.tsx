'use client';

import React from 'react';
import ProjectSelector from '@/components/estimator/ProjectSelector';
import StepDetails from '@/components/estimator/StepDetails';
import ContactForm from '@/components/estimator/ContactForm';

// ---------- TYPES ----------

// what projects we let them pick
export type ProjectKey =
  | 'roofing'
  | 'deck'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'addition'
  | 'windows';

// all step-2 detail answers we collect
export type EstimatorDetails = {
  // shared-ish
  squareFootage?: string; // sqft OR roof sqft OR house sqft etc.
  scopeDescription?: string;

  // roofing
  roofType?: string;
  roofComplexity?: string;
  tearOff?: string;

  // kitchen
  cabinetsScope?: string;
  applianceLevel?: string;

  // bathroom
  bathType?: string;
  layoutChanges?: string;
  showerType?: string;
  finishLevel?: string;
  vanityLengthFt?: string;

  // siding / windows
  sidingMaterial?: string;
  windowCount?: string;
};

// contact step info
export type EstimatorStateLike = {
  step: 1 | 2 | 3 | 4;
  project: ProjectKey | null;
  details: EstimatorDetails;
  contact: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
  };
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
};

// ------ PRICING ENGINE ------
// central “what does this cost?” function
function buildEstimateFor(
  project: ProjectKey | null,
  details: EstimatorDetails
) {
  // helper: safely get a number
  const num = (v: string | undefined) => {
    const n = parseFloat(v || '');
    return Number.isFinite(n) ? n : 0;
  };

  let base = 0;

  // ROOFING
  if (project === 'roofing') {
    // assume smaller default roof if nothing entered
    const roofSqft = num(details.squareFootage) || 2000;

    // baseline architectural asphalt pricing RI/MA/CT (~$6.25/sqft ≈ $12.5K for 2k sqft)
    let perSqFt = 6.25;

    // material bump
    if (details.roofType === 'cedarShake') perSqFt += 4.0; // cedar is pricey
    if (details.roofType === 'slate') perSqFt += 8.0; // slate is super premium
    if (details.roofType === 'rubber') perSqFt += 1.75; // flat EPDM

    // complexity bump
    if (details.roofComplexity === 'complex') perSqFt += 0.75;
    if (details.roofComplexity === 'veryComplex') perSqFt += 1.5;

    // tear-off bump
    if (details.tearOff === 'tearOff') {
      perSqFt += 0.75;
    }

    base = roofSqft * perSqFt;
  }

  // BATHROOM
  if (project === 'bathroom') {
    // “guest full bath — most popular” starting point we talked about
    let bathBase = 32000;

    // layout changes
    if (details.layoutChanges === 'movePlumbing') bathBase += 5000;
    if (details.layoutChanges === 'sameLayout') bathBase -= 2000;
    if (details.layoutChanges === 'minor') bathBase -= 1000;

    // finish level
    if (details.finishLevel === 'designer') bathBase += 8000;
    if (details.finishLevel === 'basic') bathBase -= 4000;

    // shower upgrade
    if (details.showerType === 'wetRoom') bathBase += 6000;
    if (details.showerType === 'tilePan') bathBase += 3000;

    // vanity length bump
    const vanityFt = num(details.vanityLengthFt);
    if (vanityFt > 6) bathBase += 1500;
    if (vanityFt > 0 && vanityFt < 4) bathBase -= 1000;

    base = bathBase;
  }

  // KITCHEN
  if (project === 'kitchen') {
    const kSqft = num(details.squareFootage) || 160;

    // scope affects $/sqft
    let perSq = 250; // mid baseline
    if (details.cabinetsScope === 'refresh') perSq = 175;
    if (details.cabinetsScope === 'replaceSameLayout') perSq = 250;
    if (details.cabinetsScope === 'fullGutMoveWalls') perSq = 325;

    // appliance bump
    let mult = 1;
    if (details.applianceLevel === 'mid') mult += 0.08;
    if (details.applianceLevel === 'highEnd') mult += 0.15;

    base = kSqft * perSq * mult;
  }

  // SIDING / WINDOWS
  if (project === 'siding' || project === 'windows') {
    const houseSqft = num(details.squareFootage) || 1800;

    // siding baseline
    let sidingPerSqFt = 14;
    if (details.sidingMaterial === 'cedar') sidingPerSqFt = 20;
    if (details.sidingMaterial === 'fiberCement') sidingPerSqFt = 18;

    // exterior wall area guess (your earlier 2.6x heuristic)
    const wallArea = houseSqft * 2.6;
    const sidingCost = wallArea * sidingPerSqFt;

    // windows (mid vinyl ~ $650 each)
    const windows = num(details.windowCount);
    const windowCost = windows * 650;

    base = sidingCost + windowCost;
  }

  // DECK
  if (project === 'deck') {
    const deckSqft = num(details.squareFootage) || 300;
    base = deckSqft * 55; // composite mid-grade
  }

  // ADDITION / BASEMENT
  if (project === 'addition') {
    const addSqft = num(details.squareFootage) || 300;
    base = addSqft * 250; // full conditioned new space
  }

  // 3-tier output
  const conservative = Math.round(base * 0.9);
  const likely = Math.round(base);
  const premium = Math.round(base * 1.15);

  // breakdown lines under the 3 cards
  const breakdownLines: string[] = [];
  if (project === 'roofing') {
    const roofSqft = num(details.squareFootage) || 2000;
    breakdownLines.push(
      `~${Math.round(roofSqft / 100)} squares @ ~${Math.round(
        (likely / roofSqft) * 100
      )}/sq.`
    );
  } else if (project === 'bathroom') {
    breakdownLines.push('Demo, tile, vanity, fixtures');
  } else if (project === 'kitchen') {
    breakdownLines.push('Cabinets, counters, flooring, appliances');
  } else if (project === 'siding' || project === 'windows') {
    breakdownLines.push('Full wrap + window replacement');
  } else if (project === 'deck') {
    breakdownLines.push('Composite decking w/ rails');
  } else if (project === 'addition') {
    breakdownLines.push('Framing + MEP + finishes');
  }

  return { conservative, likely, premium, breakdownLines };
}

export default function ProjectCalculatorPage() {
  // global wizard state
  const [state, setState] = React.useState<EstimatorStateLike>({
    step: 1,
    project: null,
    details: {},
    contact: {},
    address: {},
  });

  // recompute live est every render from current answers
  const liveEst = buildEstimateFor(state.project, state.details || {});

  // submit handler for contact step
  async function handleSubmitContact() {
    console.log('SUBMIT LEAD', state, liveEst);
    alert(
      "Thanks! We'll reach out to confirm scope, schedule a site visit, and firm up your quote."
    );
    // after submit, step 4 = review / confirmation
    setState((prev) => ({ ...prev, step: 4 }));
  }

  // ---------------- RENDER ----------------

  return (
    <main
      className="min-h-screen text-white px-4 py-12 md:py-16 bg-[#0c0f14] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/difiore-hero-spotlight-house.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0c0f14', // fallback if image fails
      }}
    >
      <div className="mx-auto max-w-5xl w-full space-y-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
           
          </h1>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
        
          </p>
        </div>

        {/* CARD WRAPPER */}
        <section className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] backdrop-blur-md ring-1 ring-white/5 shadow-[0_30px_120px_rgba(0,0,0,.8)] p-6 space-y-8">
          {/* STEP 1 */}
          {state.step === 1 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 1 • Project Type
              </div>
              <h2 className="text-2xl font-bold text-white">
                What kind of project are you planning?
              </h2>
              <p className="text-sm text-white/60 max-w-2xl">
                Pick your project, answer a few quick
                details and get an estiamte to sent to our team for final evaluation.
              </p>

              <ProjectSelector
                value={state.project}
                onSelectProject={(proj) => {
                  setState((prev) => ({
                    ...prev,
                    project: proj,
                    step: 2, // ADVANCE ON CLICK ✅
                  }));
                }}
              />
            </>
          )}

          {/* STEP 2 */}
          {state.step === 2 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 2 • Scope &amp; Details
              </div>
              <h2 className="text-2xl font-bold text-white">
                Tell us a little more
              </h2>
              <p className="text-sm text-white/60 max-w-2xl">
                We’ll use this to generate your live estimate below.
              </p>

              <StepDetails
                project={state.project}
                details={state.details}
                est={liveEst}
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      step: 1,
                    }))
                  }
                >
                  ← Back
                </button>
                <button
                  className="flex-1 rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,.4)] hover:bg-amber-500/20"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      step: 3,
                    }))
                  }
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 - CONTACT */}
          {state.step === 3 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 3 • Where can we send this?
              </div>
              <h2 className="text-2xl font-bold text-white">
                Lock in a consult
              </h2>
              <p className="text-sm text-white/60 max-w-2xl">
                You’ll hear from a DiFiore project specialist soon to confirm schedule, timeline, and next steps. 
                <p></p>If you have an urgent need click cpeak to an Agent on the bottom right hand corner. 
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
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      step: 2,
                    }))
                  }
                >
                  ← Back
                </button>
              </div>
            </>
          )}

          {/* STEP 4 - THANK YOU / REVIEW */}
          {state.step === 4 && (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                Step 4 • Sent
              </div>
              <h2 className="text-2xl font-bold text-white">
                You’re all set ✅
              </h2>
              <p className="text-sm text-white/60 max-w-2xl">
                A project specialist will reach out shortly to confirm site
                conditions and lock in final quote. No obligation.
              </p>

              {/* quick recap of pricing */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] ring-1 ring-white/5 p-4 text-center">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-amber-300 mb-2">
                  Your Estimate
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg border border-white/15 bg-black/20 p-4">
                    <div className="text-xs font-medium text-white/80">
                      Conservative
                    </div>
                    <div className="text-lg font-bold text-green-400 mt-1">
                      {liveEst.conservative.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-400/40 bg-black/30 p-4 ring-2 ring-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,.4)]">
                    <div className="text-xs font-medium text-white/80">
                      Most Likely
                    </div>
                    <div className="text-lg font-extrabold text-amber-300 mt-1">
                      {liveEst.likely.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-black/20 p-4">
                    <div className="text-xs font-medium text-white/80">
                      Premium
                    </div>
                    <div className="text-lg font-bold text-red-400 mt-1">
                      {liveEst.premium.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>

                {liveEst.breakdownLines?.length ? (
                  <div className="mt-4 text-[11px] text-white/50 leading-relaxed">
                    {liveEst.breakdownLines.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                    <div className="mt-2 text-white/40">
                      Final quote requires a site visit
                      (structure/utilities/permits).
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