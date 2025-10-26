// src/app/project-calculator/page.tsx
'use client';

import React, { useState } from 'react';
import ProjectSelector, { type ProjectKey } from '@/components/estimator/ProjectSelector';
import StepDetails from '@/components/estimator/StepDetails';
import ContactForm, { type EstimatorStateLike } from '@/components/estimator/ContactForm';
import ReviewSummary from '@/components/estimator/ReviewSummary';

// ---------- ESTIMATE ENGINE ----------
function calcEstimate(state: EstimatorStateLike) {
  // super simple for now: pretend sqft * rate
  // later we wire in roofing logic / bathroom logic / etc.
  const sqftNum = Number(state.details.squareFootage || 0);

  let rateLow = 0;
  let rateHigh = 0;

  switch (state.project) {
    case 'roofing':
      rateLow = 7;
      rateHigh = 10;
      break;
    case 'kitchen':
      rateLow = 200;
      rateHigh = 350;
      break;
    case 'bathroom':
      rateLow = 180;
      rateHigh = 300;
      break;
    case 'siding':
      rateLow = 12;
      rateHigh = 18;
      break;
    default:
      rateLow = 150;
      rateHigh = 250;
  }

  const low = Math.round(sqftNum * rateLow);
  const high = Math.round(sqftNum * rateHigh);

  return {
    low,
    high,
  };
}

// ---------- PAGE COMPONENT ----------
export default function ProjectCalculatorPage() {
  // step 0 = choose project
  // step 1 = project scope details
  // step 2 = contact
  // step 3 = review
  const [step, setStep] = useState<number>(0);

  // global form state for entire wizard
  const [state, setState] = useState<EstimatorStateLike>({
    project: '',
    details: {
      squareFootage: '',
      stories: '',
      ageOfHome: '',
      urgency: '',
      additionalDetails: '',
    },
    address: {
      street: '',
      city: '',
      zip: '',
    },
    contact: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      timeline: '',
      notes: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const est = calcEstimate(state);

  function handleSelectProject(p: ProjectKey) {
    setState((s) => ({ ...s, project: p }));
    // move to next step automatically
    setStep(1);
  }

  function handleDetailsChange(update: Partial<EstimatorStateLike['details']>) {
    setState((s) => ({
      ...s,
      details: { ...s.details, ...update },
    }));
  }

  async function handleSubmitLead() {
    // fake submit for now, then advance to review
    try {
      setSubmitting(true);
      // TODO: call /api/leads with state + est
    } catch (_err) {
      // swallow for now
    } finally {
      setSubmitting(false);
      setStep(3); // go to Review after "submit"
    }
  }

  // ---------- RENDER CURRENT STEP ----------
  function renderStepBody() {
    if (step === 0) {
      // PROJECT SELECT GRID
      return (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
              What are you working on?
            </h1>
            <p className="text-white/60 text-sm leading-relaxed">
              Pick the project you want priced. We&apos;ll ask 4-6 dead simple
              questions a real estimator would ask and give you real RI / MA /
              CT numbers.
            </p>
          </div>

          <ProjectSelector
            value={state.project as ProjectKey}
            onChange={handleSelectProject}
          />
        </div>
      );
    }

    if (step === 1) {
      // PROJECT DETAILS
      return (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Step 2 of 4
            </div>
            <h2 className="text-xl font-bold text-white">
              Tell us about the {state.project || 'project'}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              This tightens your range. No trick questions.
            </p>
          </div>

          <StepDetails
            project={state.project as ProjectKey}
            details={state.details}
            onChange={handleDetailsChange}
          />

          {/* live estimate card */}
          <div className="rounded-lg bg-white/[0.03] border border-amber-400/30 ring-1 ring-white/10 shadow-[0_30px_120px_rgba(255,200,0,0.15)] p-4 text-center text-white">
            <div className="text-[10px] uppercase tracking-wide text-amber-300 font-semibold">
              Current Range
            </div>
            <div className="text-2xl font-bold text-amber-200 mt-1 drop-shadow-[0_0_20px_rgba(255,200,0,0.5)]">
              {est.low.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}{' '}
              –{' '}
              {est.high.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </div>
            <div className="text-[11px] text-white/50 mt-2 leading-relaxed">
              Final quote just needs a quick site look.
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="text-xs text-white/50 hover:text-white underline underline-offset-4"
            >
              ← Back
            </button>

            <button
              onClick={() => setStep(2)}
              className="rounded-lg border border-amber-400 bg-amber-500/10 text-amber-300 px-4 py-2 text-sm font-semibold shadow-[0_20px_40px_rgba(255,200,0,.2)] hover:bg-amber-500/20"
            >
              Next: Contact Info →
            </button>
          </div>
        </div>
      );
    }

    if (step === 2) {
      // CONTACT
      return (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Step 3 of 4
            </div>
            <h2 className="text-xl font-bold text-white">
              Where should we send your quote?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              A real project manager (not a call center) will reach out.
            </p>
          </div>

          <ContactForm
            state={state}
            setState={setState}
            submitting={submitting}
            onSubmit={handleSubmitLead}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-white/50 hover:text-white underline underline-offset-4"
            >
              ← Back
            </button>

            <button
              disabled={submitting}
              onClick={handleSubmitLead}
              className={[
                'rounded-lg border px-4 py-2 text-sm font-semibold',
                submitting
                  ? 'border-white/20 bg-white/10 text-white/40 cursor-not-allowed'
                  : 'border-amber-400 bg-amber-500/10 text-amber-300 shadow-[0_20px_40px_rgba(255,200,0,.2)] hover:bg-amber-500/20',
              ].join(' ')}
            >
              {submitting ? 'Sending…' : 'Submit & See Summary →'}
            </button>
          </div>
        </div>
      );
    }

    // step === 3 REVIEW
    return (
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Final Step
          </div>
          <h2 className="text-xl font-bold text-white">
            Here&apos;s what we&apos;ll go over with you
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Save this for your records.
          </p>
        </div>

        <ReviewSummary state={state} estLow={est.low} estHigh={est.high} />

        <div className="flex justify-between">
          <button
            onClick={() => setStep(2)}
            className="text-xs text-white/50 hover:text-white underline underline-offset-4"
          >
            ← Back
          </button>

          <a
            href="tel:401-808-6886"
            className="rounded-lg border border-amber-400 bg-amber-500/10 text-amber-300 px-4 py-2 text-sm font-semibold shadow-[0_20px_40px_rgba(255,200,0,.2)] hover:bg-amber-500/20"
          >
            Call Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#1a1a1f] to-[#000000] text-white px-4 py-12 md:py-16">
      <div className="max-w-3xl w-full mx-auto">
        {renderStepBody()}
      </div>
    </main>
  );
}