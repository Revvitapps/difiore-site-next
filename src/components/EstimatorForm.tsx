// src/components/EstimatorForm.tsx
'use client';

import { useState } from 'react';
import { ProjectSelector } from './estimator/ProjectSelector';
import { StepDetails } from './estimator/StepDetails';
import { ReviewSummary } from './estimator/ReviewSummary';
import { ContactForm } from './estimator/ContactForm';
import { submitEstimate } from './estimator/utils/emailSubmit';

export type ProjectType = 'roofing' | 'deck' | 'bathroom' | 'kitchen' | 'siding' | 'addition';

export interface EstimatorState {
  step: number;
  project: ProjectType | '';
  address: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    notes?: string;
  };
  details: Record<string, any>;
}

export default function EstimatorForm({ onSubmitTo }: { onSubmitTo: string }) {
  const [state, setState] = useState<EstimatorState>({
    step: 0,
    project: '',
    address: '',
    contact: { firstName: '', lastName: '', email: '' },
    details: {},
  });

  const go = (dir: number) => setState((s) => ({ ...s, step: Math.max(0, Math.min(4, s.step + dir)) }));

  const handleSubmit = async () => {
    try {
      await submitEstimate(state, onSubmitTo);
      alert('Estimate submitted successfully. Thank you!');
      setState((s) => ({ ...s, step: 0, project: '', address: '', details: {} }));
    } catch (err) {
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="rvv-bubble bg-[rgba(12,15,20,0.9)] border border-white/15 rounded-2xl p-6 shadow-[0_24px_60px_rgba(2,8,18,.45)]">
      {state.step === 0 && <ProjectSelector state={state} setState={setState} />}
      {state.step === 1 && <StepDetails state={state} setState={setState} />}
      {state.step === 2 && <ContactForm state={state} setState={setState} />}
      {state.step === 3 && <ReviewSummary state={state} onSubmit={handleSubmit} />}

      <div className="mt-6 flex justify-between">
        <button onClick={() => go(-1)} disabled={state.step === 0} className="text-sm text-zinc-300 hover:text-white">← Back</button>
        <button
          onClick={() => go(1)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold px-5 py-2 rounded-full"
        >
          {state.step === 3 ? 'Submit' : 'Next →'}
        </button>
      </div>
    </div>
  );
}