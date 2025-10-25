'use client';

import React, { useState } from 'react';

// -----------------------------------------
// TYPES
// -----------------------------------------
type PropertyType = 'single' | 'multi' | 'condo' | '';
type ProjectType =
  | 'kitchen'
  | 'bathroom'
  | 'roofing'
  | 'deck'
  | 'siding'
  | 'addition'
  | '';

type KitchenScope =
  | 'refresh' // counters/floors, keep cabinets
  | 'replaceCabinets' // new cabinets, same layout
  | 'fullGutLayout' // full gut, moving walls/plumbing
  | '';

type BathroomScope =
  | 'cosmetic' // tile/vanity/fixtures, same layout
  | 'gutSameLayout' // full gut, rebuild same layout
  | 'gutMovePlumbing' // gut + move plumbing / expand
  | '';

type ApplianceLevel = 'reuse' | 'mid' | 'highEnd' | '';
type BathType = 'powder' | 'full' | 'primaryLuxury' | '';
type StoriesOption = '1' | '2' | '3+' | '';

type FormState = {
  // STEP 1 - property
  propertyType: PropertyType;
  yearBuilt: string;
  stories: StoriesOption | '';
  houseSqft: string;

  // STEP 2 - project
  projectType: ProjectType;

  // STEP 3a - kitchen-specific
  kitchenScope: KitchenScope;
  kitchenSize: 'small' | 'medium' | 'large' | '';
  kitchenApplianceLevel: ApplianceLevel;

  // STEP 3b - bathroom-specific
  bathType: BathType;
  bathroomScope: BathroomScope;
  showerType: 'fiberglass' | 'customTile' | 'luxWetRoom' | '';

  // (future: roof / deck / siding / addition fields...)

  // STEP 4 - contact
  name: string;
  phone: string;
  email: string;
  zip: string;
};

// -----------------------------------------
// STYLES / REUSABLE UI PRIMITIVES
// -----------------------------------------

// neon glass card wrapper
function SectionCard({
  title,
  stepLabel,
  children,
}: {
  title: string;
  stepLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-cyan-400/20 bg-[rgba(15,17,23,0.6)] backdrop-blur-md shadow-[0_30px_120px_rgba(0,255,255,0.07)] ring-1 ring-white/5 p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {stepLabel ? (
          <span className="text-[11px] font-medium text-cyan-300/70 tracking-wide">
            {stepLabel}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

// subtle label
function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium text-zinc-300 mb-1"
    >
      {children}
    </label>
  );
}

// frosted text input
function TextInput({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none ring-1 ring-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/60"
    />
  );
}

// frosted number input
function NumberInput({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      id={id}
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none ring-1 ring-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/60"
    />
  );
}

// pill selector option with cyan neon hover
function PillOption({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full rounded-lg border px-3 py-2 text-left text-sm font-medium shadow-sm transition',
        'bg-white/[0.03] backdrop-blur',
        active
          ? // active state: brighter cyan ring / glow
            'border-cyan-400/60 text-zinc-100 ring-2 ring-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.5)]'
          : // idle state: faint edges + subtle cyan hover
            'border-white/15 text-zinc-300 ring-1 ring-white/5 hover:border-cyan-400/40 hover:text-cyan-200 hover:ring-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

// -----------------------------------------
// COST ENGINE
// -----------------------------------------

function calcEstimate(form: FormState): { low: number; high: number } {
  // no project selected yet
  if (!form.projectType) return { low: 0, high: 0 };

  let baseTotal = 0;

  // Helpers
  const num = (str: string) => {
    const n = parseFloat(str);
    return isNaN(n) ? 0 : n;
  };

  // cost multipliers that apply broadly
  const oldHouseBump =
    form.yearBuilt && parseInt(form.yearBuilt) < 1975 ? 1.1 : 1.0;

  const multiStoryAccessBump =
    (form.projectType === 'roofing' || form.projectType === 'siding') &&
    (form.stories === '2' || form.stories === '3+')
      ? 1.15
      : 1.0;

  // Project-specific logic
  if (form.projectType === 'kitchen') {
    // base cost per sqft by scope
    let perSqFt = 0;
    switch (form.kitchenScope) {
      case 'refresh':
        // keep cabinets, new counters/floors
        perSqFt = 175;
        break;
      case 'replaceCabinets':
        // new cabinets, same layout
        perSqFt = 250;
        break;
      case 'fullGutLayout':
        // gut + move walls/plumbing
        perSqFt = 325;
        break;
      default:
        perSqFt = 200;
    }

    // size multiplier
    let sqft = 0;
    if (form.kitchenSize === 'small') sqft = 110;
    if (form.kitchenSize === 'medium') sqft = 160;
    if (form.kitchenSize === 'large') sqft = 220;

    // appliance bump
    let applianceFactor = 1;
    if (form.kitchenApplianceLevel === 'mid') applianceFactor = 1.08;
    if (form.kitchenApplianceLevel === 'highEnd') applianceFactor = 1.15;

    baseTotal = sqft * perSqFt * applianceFactor;
  }

  if (form.projectType === 'bathroom') {
    let perBathBase = 0;
    // bath type sets general scale
    switch (form.bathType) {
      case 'powder':
        perBathBase = 12000;
        break;
      case 'full':
        perBathBase = 28000;
        break;
      case 'primaryLuxury':
        perBathBase = 45000;
        break;
      default:
        perBathBase = 20000;
    }

    // scope bump
    let scopeFactor = 1;
    if (form.bathroomScope === 'cosmetic') scopeFactor = 1.0;
    if (form.bathroomScope === 'gutSameLayout') scopeFactor = 1.25;
    if (form.bathroomScope === 'gutMovePlumbing') scopeFactor = 1.45;

    // shower type bump
    let showerFactor = 1;
    if (form.showerType === 'fiberglass') showerFactor = 1.0;
    if (form.showerType === 'customTile') showerFactor = 1.15;
    if (form.showerType === 'luxWetRoom') showerFactor = 1.3;

    baseTotal = perBathBase * scopeFactor * showerFactor;
  }

  if (form.projectType === 'roofing') {
    // We'll rough it based on houseSqft as proxy for roof surface
    const roofSqft = num(form.houseSqft) * 1.15; // avg slope/overhang
    const perSq = 9; // $9/sqft baseline install
    baseTotal = roofSqft * perSq;
  }

  if (form.projectType === 'deck') {
    // Placeholder until we add deck questions
    const deckSqft = 200;
    const perSq = 55; // assume composite mid-grade
    baseTotal = deckSqft * perSq;
  }

  if (form.projectType === 'siding') {
    // rough siding area guess = houseSqft * 2.6 (outside wall area-ish)
    const wallArea = num(form.houseSqft) * 2.6;
    const perSq = 14; // baseline vinyl
    baseTotal = wallArea * perSq;
  }

  if (form.projectType === 'addition') {
    // assume new conditioned space
    const addSqft = 300;
    const perSq = 250; // framing+MEP+finishes
    baseTotal = addSqft * perSq;
  }

  // global multipliers
  baseTotal = baseTotal * oldHouseBump * multiStoryAccessBump;

  // final +/-15%
  const low = Math.round(baseTotal * 0.85);
  const high = Math.round(baseTotal * 1.15);

  return { low, high };
}

function currency(n: number) {
  return n === 0
    ? '—'
    : n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// -----------------------------------------
// STEP 3 SUB-FORMS (dynamic per project)
// -----------------------------------------

function KitchenDetails({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Scope of work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.kitchenScope === 'refresh'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenScope: 'refresh' }))
            }
          >
            <div className="text-zinc-100">Refresh</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              New counters + floors,
              <br />
              keep cabinets
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenScope === 'replaceCabinets'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenScope: 'replaceCabinets' }))
            }
          >
            <div className="text-zinc-100">New Cabinets</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Same layout, all new boxes
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenScope === 'fullGutLayout'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenScope: 'fullGutLayout' }))
            }
          >
            <div className="text-zinc-100">Full Gut</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Move walls / plumbing
            </div>
          </PillOption>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Kitchen size
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.kitchenSize === 'small'}
            onClick={() => setForm((f) => ({ ...f, kitchenSize: 'small' }))}
          >
            <div className="text-zinc-100">Small</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              &lt; 125 sqft
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenSize === 'medium'}
            onClick={() => setForm((f) => ({ ...f, kitchenSize: 'medium' }))}
          >
            <div className="text-zinc-100">Medium</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              125–200 sqft
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenSize === 'large'}
            onClick={() => setForm((f) => ({ ...f, kitchenSize: 'large' }))}
          >
            <div className="text-zinc-100">Large</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              200+ sqft
            </div>
          </PillOption>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Appliances
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.kitchenApplianceLevel === 'reuse'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenApplianceLevel: 'reuse' }))
            }
          >
            <div className="text-zinc-100">Reusing most</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Keep current set
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenApplianceLevel === 'mid'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenApplianceLevel: 'mid' }))
            }
          >
            <div className="text-zinc-100">Mid‑grade</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Std stainless pkg
            </div>
          </PillOption>
          <PillOption
            active={form.kitchenApplianceLevel === 'highEnd'}
            onClick={() =>
              setForm((f) => ({ ...f, kitchenApplianceLevel: 'highEnd' }))
            }
          >
            <div className="text-zinc-100">High‑end / Built‑in</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Panel‑ready, pro range
            </div>
          </PillOption>
        </div>
      </div>
    </div>
  );
}

function BathroomDetails({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Bathroom type
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.bathType === 'powder'}
            onClick={() => setForm((f) => ({ ...f, bathType: 'powder' }))}
          >
            <div className="text-zinc-100">Half / Powder</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Sink + toilet only
            </div>
          </PillOption>
          <PillOption
            active={form.bathType === 'full'}
            onClick={() => setForm((f) => ({ ...f, bathType: 'full' }))}
          >
            <div className="text-zinc-100">Full Bath</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Tub or shower
            </div>
          </PillOption>
          <PillOption
            active={form.bathType === 'primaryLuxury'}
            onClick={() =>
              setForm((f) => ({ ...f, bathType: 'primaryLuxury' }))
            }
          >
            <div className="text-zinc-100">Primary / Luxury</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Large suite feel
            </div>
          </PillOption>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Scope of work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.bathroomScope === 'cosmetic'}
            onClick={() =>
              setForm((f) => ({ ...f, bathroomScope: 'cosmetic' }))
            }
          >
            <div className="text-zinc-100">Cosmetic refresh</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Tile / vanity only
            </div>
          </PillOption>
          <PillOption
            active={form.bathroomScope === 'gutSameLayout'}
            onClick={() =>
              setForm((f) => ({ ...f, bathroomScope: 'gutSameLayout' }))
            }
          >
            <div className="text-zinc-100">Full gut</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Rebuild same layout
            </div>
          </PillOption>
          <PillOption
            active={form.bathroomScope === 'gutMovePlumbing'}
            onClick={() =>
              setForm((f) => ({ ...f, bathroomScope: 'gutMovePlumbing' }))
            }
          >
            <div className="text-zinc-100">Full gut + Move stuff</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Expand / relocate
            </div>
          </PillOption>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wide text-cyan-300/70 font-semibold mb-2">
          Shower / Tub
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PillOption
            active={form.showerType === 'fiberglass'}
            onClick={() => setForm((f) => ({ ...f, showerType: 'fiberglass' }))}
          >
            <div className="text-zinc-100">Prefab / Fiberglass</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Fast install, budget
            </div>
          </PillOption>
          <PillOption
            active={form.showerType === 'customTile'}
            onClick={() => setForm((f) => ({ ...f, showerType: 'customTile' }))}
          >
            <div className="text-zinc-100">Custom Tile Shower</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Tile walls / pan
            </div>
          </PillOption>
          <PillOption
            active={form.showerType === 'luxWetRoom'}
            onClick={() =>
              setForm((f) => ({ ...f, showerType: 'luxWetRoom' }))
            }
          >
            <div className="text-zinc-100">Wet Room / Luxury</div>
            <div className="text-[11px] text-zinc-400 font-normal">
              Curbless, glass, spa vibe
            </div>
          </PillOption>
        </div>
      </div>
    </div>
  );
}

// we can stub placeholder panels for other project types for now
function PlaceholderDetails({ label }: { label: string }) {
  return (
    <div className="text-sm text-zinc-400">
      <p className="mb-2">
        {label} options will go here (materials, size, access, etc.).
      </p>
      <p className="text-[11px] text-zinc-500 leading-relaxed">
        We’ll ask the same questions your builder would ask on that first call
        and update pricing live.
      </p>
    </div>
  );
}

// -----------------------------------------
// MAIN PAGE COMPONENT
// -----------------------------------------

export default function ProjectCalculatorPage() {
  const [form, setForm] = useState<FormState>({
    // STEP 1
    propertyType: '',
    yearBuilt: '',
    stories: '',
    houseSqft: '',
    // STEP 2
    projectType: '',
    // STEP 3 kitchen
    kitchenScope: '',
    kitchenSize: '',
    kitchenApplianceLevel: '',
    // STEP 3 bath
    bathType: '',
    bathroomScope: '',
    showerType: '',
    // STEP 4 contact
    name: '',
    phone: '',
    email: '',
    zip: '',
  });

  const est = calcEstimate(form);

  // which detail component to show
  function renderProjectDetails() {
    switch (form.projectType) {
      case 'kitchen':
        return <KitchenDetails form={form} setForm={setForm} />;
      case 'bathroom':
        return <BathroomDetails form={form} setForm={setForm} />;
      case 'roofing':
        return <PlaceholderDetails label="Roofing" />;
      case 'deck':
        return <PlaceholderDetails label="Deck / Outdoor build" />;
      case 'siding':
        return <PlaceholderDetails label="Siding / Exterior refresh" />;
      case 'addition':
        return <PlaceholderDetails label="New Addition / Bump-out" />;
      default:
        return (
          <div className="text-sm text-zinc-500">
            Pick a project type above to see scope questions and live pricing.
          </div>
        );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('ESTIMATE LEAD SUBMIT', form, est);
    alert(
      "Thanks! We'll reach out to confirm scope, schedule a site visit, and firm up your quote."
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0c0f14] via-[#0f1117] to-[#05070a] text-zinc-100 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl w-full">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Project Cost Estimator
          </h1>
          <p className="mt-3 text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Live ballpark pricing for kitchens, baths, roofing, siding, decks,
            and additions — tuned for Rhode Island + nearby MA/CT. This is not
            a final quote; we’ll still confirm site conditions and finish
            choices. But it’s what real projects land in.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT / MAIN FLOW (Steps 1-3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* STEP 1 */}
            <SectionCard title="About your home" stepLabel="STEP 1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* property type */}
                <div className="sm:col-span-2">
                  <Label htmlFor="propertyType">Property type</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <PillOption
                      active={form.propertyType === 'single'}
                      onClick={() =>
                        setForm((f) => ({ ...f, propertyType: 'single' }))
                      }
                    >
                      <div className="text-zinc-100">Single‑family</div>
                      <div className="text-[11px] text-zinc-400 font-normal">
                        Standalone house
                      </div>
                    </PillOption>
                    <PillOption
                      active={form.propertyType === 'multi'}
                      onClick={() =>
                        setForm((f) => ({ ...f, propertyType: 'multi' }))
                      }
                    >
                      <div className="text-zinc-100">Multi‑family</div>
                      <div className="text-[11px] text-zinc-400 font-normal">
                        Duplex / 3‑fam
                      </div>
                    </PillOption>
                    <PillOption
                      active={form.propertyType === 'condo'}
                      onClick={() =>
                        setForm((f) => ({ ...f, propertyType: 'condo' }))
                      }
                    >
                      <div className="text-zinc-100">Condo / Townhome</div>
                      <div className="text-[11px] text-zinc-400 font-normal">
                        Shared building
                      </div>
                    </PillOption>
                  </div>
                </div>

                {/* year built */}
                <div>
                  <Label htmlFor="yearBuilt">Year built</Label>
                  <NumberInput
                    id="yearBuilt"
                    value={form.yearBuilt}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, yearBuilt: e.target.value }))
                    }
                    placeholder="e.g. 1958"
                  />
                </div>

                {/* stories */}
                <div>
                  <Label htmlFor="stories">Stories</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['1', '2', '3+'] as StoriesOption[]).map((opt) => (
                      <PillOption
                        key={opt}
                        active={form.stories === opt}
                        onClick={() => setForm((f) => ({ ...f, stories: opt }))}
                      >
                        <div className="text-zinc-100">{opt}</div>
                      </PillOption>
                    ))}
                  </div>
                </div>

                {/* sqft (used by roofing/siding calc too) */}
                <div className="sm:col-span-2">
                  <Label htmlFor="houseSqft">
                    Approx. affected square footage
                  </Label>
                  <NumberInput
                    id="houseSqft"
                    value={form.houseSqft}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, houseSqft: e.target.value }))
                    }
                    placeholder="e.g. 1800"
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">
                    For exterior work, use total exterior area. For kitchens /
                    baths just rough the room size.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* STEP 2 */}
            <SectionCard
              title="What are you planning?"
              stepLabel="STEP 2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {([
                  { val: 'kitchen', label: 'Kitchen Remodel' },
                  { val: 'bathroom', label: 'Bathroom Remodel' },
                  { val: 'roofing', label: 'Roof Replacement' },
                  { val: 'deck', label: 'Deck / Outdoor Build' },
                  { val: 'siding', label: 'Siding / Exterior Refresh' },
                  { val: 'addition', label: 'New Addition / Bump-out' },
                ] as { val: ProjectType; label: string }[]).map((opt) => (
                  <PillOption
                    key={opt.val}
                    active={form.projectType === opt.val}
                    onClick={() =>
                      setForm((f) => ({ ...f, projectType: opt.val }))
                    }
                  >
                    <div className="text-zinc-100">{opt.label}</div>
                  </PillOption>
                ))}
              </div>
            </SectionCard>

            {/* STEP 3 */}
            <SectionCard
              title={
                form.projectType
                  ? `Details for ${form.projectType
                      .charAt(0)
                      .toUpperCase()}${form.projectType.slice(1)}`
                  : 'Project details'
              }
              stepLabel="STEP 3"
            >
              {renderProjectDetails()}
            </SectionCard>
          </div>

          {/* RIGHT / SUMMARY + CTA (Step 4) */}
          <div className="space-y-6 lg:col-span-1">
            {/* LIVE ESTIMATE */}
            <SectionCard title="Your rough estimate" stepLabel="LIVE">
              <p className="text-sm text-zinc-400 mb-4">
                Updates as you answer. This is typical RI / MA / CT pricing we
                actually see on real jobs, not a lowball internet number.
              </p>

              <div className="rounded-lg bg-white/[0.03] backdrop-blur border border-cyan-400/20 ring-1 ring-white/5 shadow-[0_30px_120px_rgba(0,255,255,0.07)] p-4 text-center">
                <div className="text-[10px] uppercase tracking-wide text-cyan-300/70 font-semibold">
                  Estimated Range
                </div>
                <div className="text-2xl font-bold text-zinc-100 mt-1 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  {currency(est.low)} – {currency(est.high)}
                </div>
                <div className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                  Final quote requires a site visit to confirm structure,
                  plumbing / electrical, and permit factors.
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li>
                  • Property:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.propertyType || '—'}
                  </span>
                </li>
                <li>
                  • Built:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.yearBuilt || '—'}
                  </span>
                </li>
                <li>
                  • Stories:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.stories || '—'}
                  </span>
                </li>
                <li>
                  • Project:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.projectType || '—'}
                  </span>
                </li>
                <li>
                  • Area:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.houseSqft || '—'} sqft
                  </span>
                </li>
                <li>
                  • ZIP:{' '}
                  <span className="font-medium text-zinc-100">
                    {form.zip || '—'}
                  </span>
                </li>
              </ul>
            </SectionCard>

            {/* CONTACT / STEP 4 */}
            <SectionCard title="Lock in a consult" stepLabel="STEP 4">
              <p className="text-sm text-zinc-400 mb-4">
                Send this over to DiFiore. We’ll reach out with schedule,
                timeline, and next steps. Want to talk now? Ask for live help.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <TextInput
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <TextInput
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="(555) 123‑4567"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <TextInput
                    id="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="zip">Project ZIP Code</Label>
                  <TextInput
                    id="zip"
                    value={form.zip}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, zip: e.target.value }))
                    }
                    placeholder="e.g. 02816"
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">
                    We currently serve Rhode Island + nearby MA/CT.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-white text-black px-4 py-3 text-sm font-semibold shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Send me my estimate
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('We will flag this as urgent / live help requested.');
                }}
                className="mt-3 w-full rounded-lg border border-cyan-400/40 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-cyan-200 shadow ring-1 ring-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              >
                Talk to a project specialist now
              </button>

              <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed text-center">
                No spam. A project specialist (human or AI) will reach out,
                usually same day.
              </p>
            </SectionCard>
          </div>
        </form>
      </div>
    </main>
  );
}