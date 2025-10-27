'use client';

import React from 'react';
import type { EstimatorDetails, ProjectKey } from './types';

type EstimatePreview = {
  conservative: number;
  likely: number;
  premium: number;
  breakdownLines?: string[];
};

type StepDetailsProps = {
  project: ProjectKey | null;
  details: EstimatorDetails;
  est: EstimatePreview | null;
  onChange: <K extends keyof EstimatorDetails>(
    key: K,
    value: EstimatorDetails[K]
  ) => void;
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function TextInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-200">
      <span className="text-[13px] font-semibold text-zinc-200">{label}</span>
      <input
        className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-200">
      <span className="text-[13px] font-semibold text-zinc-200">{label}</span>
      <select
        className="rounded-xl border border-white/15 bg-[rgba(20,20,28,.6)] px-3 py-2 text-[14px] text-white outline-none focus:ring-2 focus:ring-amber-400/50"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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

export default function StepDetails({
  project,
  details,
  est,
  onChange,
}: StepDetailsProps) {
  if (!project) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        Choose a project type first and we’ll load the matching questions here.
      </div>
    );
  }

  const update = <K extends keyof EstimatorDetails>(key: K) => {
    return (val: EstimatorDetails[K]) => onChange(key, val);
  };

  return (
    <div className="space-y-6 text-zinc-200">
      <div className="grid gap-4 md:grid-cols-3 text-sm">
        <TextInput
          label="Approx. Square Footage"
          placeholder="e.g. 2400"
          value={details.squareFootage ?? ''}
          onChange={(val) => update('squareFootage')(val)}
        />

        {(project === 'deck' || project === 'addition') && (
          <TextInput
            label={
              project === 'deck' ? 'Desired Dimensions' : 'New / Finished Sq Ft'
            }
            placeholder={
              project === 'deck' ? "12'x20'" : 'e.g. 450'
            }
            value={details.scopeDescription ?? ''}
            onChange={(val) => update('scopeDescription')(val)}
          />
        )}

        {(project === 'bathroom' ||
          project === 'kitchen' ||
          project === 'siding' ||
          project === 'windows') && (
          <TextInput
            label="Quick Scope Summary"
            placeholder={
              project === 'bathroom'
                ? 'Tile shower, double vanity, move toilet'
                : project === 'kitchen'
                ? 'Gut to studs, new layout, island'
                : 'Whole home wrap / window package'
            }
            value={details.scopeDescription ?? ''}
            onChange={(val) => update('scopeDescription')(val)}
          />
        )}
      </div>

      {project === 'roofing' && (
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <SelectInput
            label="Existing Roof Removal"
            value={details.tearOff ?? ''}
            onChange={(val) => update('tearOff')(val as EstimatorDetails['tearOff'])}
            options={[
              { value: 'tearOff', label: 'Full tear-off' },
              { value: 'overlay', label: 'Install over current layer' },
            ]}
          />
          <SelectInput
            label="Roof Material"
            value={details.roofType ?? ''}
            onChange={(val) => update('roofType')(val as EstimatorDetails['roofType'])}
            options={[
              { value: 'archAsp', label: 'Architectural Asphalt' },
              { value: 'cedarShake', label: 'Cedar Shake' },
              { value: 'slate', label: 'Natural Slate' },
              { value: 'rubber', label: 'EPDM / Rubber' },
            ]}
          />
          <SelectInput
            label="Roof Complexity"
            value={details.roofComplexity ?? ''}
            onChange={(val) =>
              update('roofComplexity')(val as EstimatorDetails['roofComplexity'])
            }
            options={[
              { value: 'simple', label: 'Simple (few planes)' },
              { value: 'complex', label: 'Complex (dormers / hips)' },
              { value: 'veryComplex', label: 'Very complex (cut-up / steep)' },
            ]}
          />
        </div>
      )}

      {project === 'bathroom' && (
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <SelectInput
            label="Bath Type"
            value={details.bathType ?? ''}
            onChange={(val) => update('bathType')(val as EstimatorDetails['bathType'])}
            options={[
              { value: 'powder', label: 'Powder / half bath' },
              { value: 'guestFull', label: 'Guest full bath' },
              { value: 'primarySpa', label: 'Primary / spa bath' },
            ]}
          />
          <SelectInput
            label="Layout Changes"
            value={details.layoutChanges ?? ''}
            onChange={(val) =>
              update('layoutChanges')(val as EstimatorDetails['layoutChanges'])
            }
            options={[
              { value: 'sameLayout', label: 'Keep existing layout' },
              { value: 'minor', label: 'Minor tweaks' },
              { value: 'movePlumbing', label: 'Move plumbing walls' },
            ]}
          />
          <SelectInput
            label="Finish Level"
            value={details.finishLevel ?? ''}
            onChange={(val) =>
              update('finishLevel')(val as EstimatorDetails['finishLevel'])
            }
            options={[
              { value: 'basic', label: 'Builder basic' },
              { value: 'popular', label: 'Most popular' },
              { value: 'designer', label: 'Designer / high-end' },
            ]}
          />
          <SelectInput
            label="Shower Type"
            value={details.showerType ?? ''}
            onChange={(val) =>
              update('showerType')(val as EstimatorDetails['showerType'])
            }
            options={[
              { value: 'standard', label: 'Prefab / fiberglass' },
              { value: 'tilePan', label: 'Tile surround w/ pan' },
              { value: 'wetRoom', label: 'Curbless / wet room' },
            ]}
          />
          <TextInput
            label="Vanity Length (ft)"
            placeholder="e.g. 6"
            value={details.vanityLengthFt ?? ''}
            onChange={(val) => update('vanityLengthFt')(val)}
          />
        </div>
      )}

      {project === 'kitchen' && (
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <SelectInput
            label="Cabinet Scope"
            value={details.cabinetsScope ?? ''}
            onChange={(val) =>
              update('cabinetsScope')(val as EstimatorDetails['cabinetsScope'])
            }
            options={[
              { value: 'refresh', label: 'Refresh / paint existing' },
              { value: 'replaceSameLayout', label: 'Replace in same layout' },
              { value: 'fullGutMoveWalls', label: 'Full gut / move walls' },
            ]}
          />
          <SelectInput
            label="Appliance Package"
            value={details.applianceLevel ?? ''}
            onChange={(val) =>
              update('applianceLevel')(val as EstimatorDetails['applianceLevel'])
            }
            options={[
              { value: 'reuse', label: 'Reuse existing' },
              { value: 'mid', label: 'Mid-grade upgrade' },
              { value: 'highEnd', label: 'High-end / pro style' },
            ]}
          />
        </div>
      )}

      {(project === 'siding' || project === 'windows') && (
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <SelectInput
            label="Siding Material"
            value={details.sidingMaterial ?? ''}
            onChange={(val) =>
              update('sidingMaterial')(val as EstimatorDetails['sidingMaterial'])
            }
            options={[
              { value: 'vinyl', label: 'Vinyl' },
              { value: 'cedar', label: 'Cedar' },
              { value: 'fiberCement', label: 'Fiber cement' },
            ]}
          />
          <TextInput
            label="Number of Windows"
            placeholder="e.g. 18"
            value={details.windowCount ?? ''}
            onChange={(val) => update('windowCount')(val)}
          />
        </div>
      )}

      {est ? (
        <div className="rounded-xl border border-white/10 bg-[rgba(20,20,28,.6)] p-4 text-[13px] text-zinc-200 shadow-[0_20px_60px_rgba(251,191,36,.15)]">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-400/90">
            Rough Cost Range (not a formal quote)
          </div>
          <div className="mt-3 grid gap-3 text-center md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="text-[11px] text-zinc-400 uppercase tracking-wide">
                Conservative
              </div>
              <div className="text-white font-semibold">{money.format(est.conservative)}</div>
            </div>
            <div className="rounded-lg border border-amber-400/40 bg-black/30 p-3 shadow-[0_20px_60px_rgba(251,191,36,.35)]">
              <div className="text-[11px] text-amber-300 uppercase tracking-wide">
                Most Likely
              </div>
              <div className="text-white font-semibold">{money.format(est.likely)}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="text-[11px] text-zinc-400 uppercase tracking-wide">Premium</div>
              <div className="text-white font-semibold">{money.format(est.premium)}</div>
            </div>
          </div>
          {est.breakdownLines?.length ? (
            <div className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
              {est.breakdownLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div className="mt-2 text-white/40">
                Final quote requires a site visit (structure/utilities/permits).
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/15 bg-[rgba(20,20,28,.3)] p-4 text-[12px] text-zinc-400">
          Add square footage and scope details to see live numbers here.
        </div>
      )}
    </div>
  );
}
