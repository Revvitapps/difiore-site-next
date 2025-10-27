'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { EstimatorDetails, ProjectKey } from './types';

type EstimateSnapshot = {
  conservative: number;
  likely: number;
  premium: number;
  breakdownLines?: string[];
};

type StepDetailsProps = {
  project: ProjectKey | null;
  details: EstimatorDetails;
  estimate: EstimateSnapshot | null;
  onChange: <K extends keyof EstimatorDetails>(key: K, value: EstimatorDetails[K]) => void;
};

type FieldConfig = {
  key: keyof EstimatorDetails;
  label: string;
  type: 'text' | 'number' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const PROJECT_FIELDS: Partial<Record<ProjectKey, FieldConfig[]>> = {
  kitchen: [
    {
      key: 'cabinetsScope',
      label: 'Cabinet Scope',
      type: 'select',
      options: [
        { value: 'refresh', label: 'Refresh / paint existing' },
        { value: 'replaceSameLayout', label: 'Replace in same layout' },
        { value: 'fullGutMoveWalls', label: 'Full gut / move walls' },
      ],
    },
    {
      key: 'applianceLevel',
      label: 'Appliance Package',
      type: 'select',
      options: [
        { value: 'reuse', label: 'Reuse existing' },
        { value: 'mid', label: 'Mid-grade upgrade' },
        { value: 'highEnd', label: 'High-end / pro series' },
      ],
    },
  ],
  bathroom: [
    {
      key: 'bathType',
      label: 'Bathroom Type',
      type: 'select',
      options: [
        { value: 'powder', label: 'Powder / half bath' },
        { value: 'guestFull', label: 'Guest full bath' },
        { value: 'primarySpa', label: 'Primary / spa bath' },
      ],
    },
  ],
  roofing: [
    {
      key: 'roofType',
      label: 'Roof Material',
      type: 'select',
      options: [
        { value: 'archAsp', label: 'Architectural Asphalt' },
        { value: 'cedarShake', label: 'Cedar Shake' },
        { value: 'slate', label: 'Slate' },
        { value: 'rubber', label: 'EPDM / Rubber' },
      ],
    },
    {
      key: 'roofComplexity',
      label: 'Roof Complexity',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple (gable / few planes)' },
        { value: 'complex', label: 'Complex (hips / dormers)' },
        { value: 'veryComplex', label: 'Very complex (cut-up / steep)' },
      ],
    },
    {
      key: 'tearOff',
      label: 'Tear Off Existing Layers?',
      type: 'select',
      options: [
        { value: 'tearOff', label: 'Yes, full tear-off' },
        { value: 'overlay', label: 'No, overlay existing' },
      ],
    },
  ],
  siding: [
    {
      key: 'sidingMaterial',
      label: 'Siding Material',
      type: 'select',
      options: [
        { value: 'vinyl', label: 'Vinyl' },
        { value: 'fiberCement', label: 'Fiber cement' },
        { value: 'cedar', label: 'Cedar' },
      ],
    },
  ],
  windows: [
    {
      key: 'windowCount',
      label: 'Number of Windows',
      type: 'number',
      placeholder: 'e.g. 12',
    },
  ],
};

function fieldPlaceholder(key: keyof EstimatorDetails, project: ProjectKey | null) {
  if (key === 'squareFootage') {
    switch (project) {
      case 'roofing':
        return 'Roof or living sqft (e.g. 2200)';
      case 'deck':
        return 'Deck square feet (e.g. 320)';
      case 'addition':
        return 'New finished sqft (e.g. 450)';
      default:
        return 'e.g. 200';
    }
  }

  if (key === 'scopeDescription') {
    switch (project) {
      case 'kitchen':
        return 'Gut to studs, new layout, island...';
      case 'bathroom':
        return 'Tile shower, new vanity, move plumbing...';
      case 'deck':
        return 'Composite, wrap-around, covered porch...';
      case 'addition':
        return 'Primary suite over garage, finish basement...';
      case 'roofing':
        return 'Shingle color, leaks, layers...';
      default:
        return 'Tell us a little about the scope...';
    }
  }

  return undefined;
}

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] font-semibold uppercase tracking-wide text-white/60">
      {children}
    </span>
  );
}

function TextControl({
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'number';
  onChange: (val: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <ControlLabel>{label}</ControlLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 placeholder:text-white/35"
      />
    </label>
  );
}

function SelectControl({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <ControlLabel>{label}</ControlLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/10 bg-[rgba(15,15,25,.75)] px-4 py-3 text-[14px] text-white/90 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60"
      >
        <option value="">Select an option…</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function StepDetails({ project, details, estimate, onChange }: StepDetailsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!project) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[rgba(12,14,22,.7)] p-6 text-sm text-white/70">
        Pick a project type first to load tailored questions and live pricing.
      </div>
    );
  }

  const projectFields = PROJECT_FIELDS[project] ?? [];

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[rgba(12,14,22,.7)] p-6 backdrop-blur-md">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
          Step 2 • Scope &amp; Details
        </div>
        <h3 className="mt-2 text-2xl font-bold">Tell us a little more</h3>
        <p className="mt-2 text-sm text-white/60">
          We’ll use this to generate your live estimate below.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <TextControl
            label="Approx. Square Footage"
            value={details.squareFootage ?? ''}
            placeholder={fieldPlaceholder('squareFootage', project)}
            type="number"
            onChange={(val) => onChange('squareFootage', val)}
          />
          <TextControl
            label="Quick Scope Summary"
            value={details.scopeDescription ?? ''}
            placeholder={fieldPlaceholder('scopeDescription', project)}
            onChange={(val) => onChange('scopeDescription', val)}
          />
        </div>

        {projectFields.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {projectFields.map((field) => {
              const value = (details[field.key] ?? '') as string;
              if (field.type === 'select' && field.options) {
                return (
                  <SelectControl
                    key={field.key}
                    label={field.label}
                    value={value}
                    onChange={(val) => onChange(field.key, val)}
                    options={field.options}
                  />
                );
              }

              return (
                <TextControl
                  key={field.key}
                  label={field.label}
                  value={value}
                  placeholder={field.placeholder}
                  type={field.type === 'number' ? 'number' : 'text'}
                  onChange={(val) => onChange(field.key, val)}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,.12)_0%,rgba(8,10,18,.85)_55%)] p-6 text-white shadow-[0_40px_120px_rgba(0,0,0,.45)] ring-1 ring-white/5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
          Rough Cost Range (not a formal quote)
        </div>

        {estimate ? (
          <>
            <div className="mt-4 grid gap-3 text-center md:grid-cols-3">
              {([
                { label: 'Conservative', value: estimate.conservative, tone: 'text-emerald-400' },
                { label: 'Most Likely', value: estimate.likely, tone: 'text-amber-300' },
                { label: 'Premium', value: estimate.premium, tone: 'text-rose-300' },
              ] as const).map((tier, idx) => (
                <motion.div
                  key={tier.label}
                  className={[
                    'rounded-xl border border-white/10 bg-black/30 p-4',
                    idx === 1 ? 'ring-2 ring-amber-300/50 shadow-[0_20px_60px_rgba(251,191,36,.35)]' : '',
                  ].join(' ')}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                >
                  <div className="text-[11px] uppercase tracking-wide text-white/60">
                    {tier.label}
                  </div>
                  <div className={`mt-2 text-lg font-semibold ${tier.tone}`}>
                    {money.format(tier.value)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 text-[12px] text-white/55 leading-relaxed">
              {estimate.breakdownLines?.length
                ? estimate.breakdownLines.map((line, idx) => <div key={idx}>{line}</div>)
                : 'Cabinets, counters, flooring, appliances'}
              <div className="mt-2 text-white/40">
                Final quote requires a site visit (structure / utilities / permits).
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4 text-sm text-white/60">
            Add square footage and scope details to see live pricing.
          </div>
        )}
      </div>
    </div>
  );
}
