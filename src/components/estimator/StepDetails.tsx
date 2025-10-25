'use client';

import React from 'react';
import type { EstimatorState, ProjectType } from '../EstimatorForm';
import { computeEstimate } from '../EstimatorForm';

interface StepDetailsProps {
  state: EstimatorState;
  setState: React.Dispatch<React.SetStateAction<EstimatorState>>;
  est: ReturnType<typeof computeEstimate> | null;
  currency: (n: number | undefined) => string;
}

export function StepDetails({ state, setState, est, currency }: StepDetailsProps) {
  const project = state.project as ProjectType | '';

  // helper to update nested "details"
  function updateDetails<K extends keyof EstimatorState['details']>(
    key: K,
    value: EstimatorState['details'][K]
  ) {
    setState((s) => ({
      ...s,
      details: {
        ...s.details,
        [key]: value,
      },
    }));
  }

  //
  // per-project forms
  //
  function renderRoofing() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Approx Roof Square Footage
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="2200"
              value={state.details.roofSqft ?? ''}
              onChange={(e) => updateDetails('roofSqft', Number(e.target.value))}
            />
            <p className="text-[11px] text-white/50">
              Whole roof surface area. We&apos;ll verify on site.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Tear-Off Existing Roof?
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={String(state.details.tearOff ?? true)}
              onChange={(e) =>
                updateDetails('tearOff', e.target.value === 'true')
              }
            >
              <option value="true">Yes, full tear-off</option>
              <option value="false">No / layover</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Material</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.material ?? 'architectural'}
              onChange={(e) => updateDetails('material', e.target.value)}
            >
              <option value="asphalt_3tab">3-Tab Asphalt (budget)</option>
              <option value="architectural">Architectural Asphalt (most common)</option>
              <option value="metal_standing">Standing Seam Metal</option>
              <option value="cedar">Cedar Shake</option>
              <option value="slate_synthetic">Synthetic Slate</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Roof Complexity</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.complexity ?? 'complex'}
              onChange={(e) => updateDetails('complexity', e.target.value)}
            >
              <option value="simple">Simple (2 planes, low pitch)</option>
              <option value="complex">Complex (hips/valleys)</option>
              <option value="very_complex">Very Complex / Steep / Cut-up</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  function renderDeck() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Approx Deck Square Footage
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="300"
              value={state.details.deckSqft ?? ''}
              onChange={(e) => updateDetails('deckSqft', Number(e.target.value))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Railing Linear Feet
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="40"
              value={state.details.railingFeet ?? ''}
              onChange={(e) =>
                updateDetails('railingFeet', Number(e.target.value))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Deck Surface</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.material ?? 'popular_comp'}
              onChange={(e) => updateDetails('material', e.target.value)}
            >
              <option value="standard_pt">Pressure-Treated Wood</option>
              <option value="popular_comp">Composite (most popular)</option>
              <option value="premium_comp">Premium Composite</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Stairs?</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={String(state.details.stairs ?? true)}
              onChange={(e) =>
                updateDetails('stairs', e.target.value === 'true')
              }
            >
              <option value="true">Yes, include stairs</option>
              <option value="false">No stairs needed</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-white/70 block">
              Railing Style
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.railing ?? 'basic'}
              onChange={(e) => updateDetails('railing', e.target.value)}
            >
              <option value="none">No Railing / Ground Level</option>
              <option value="basic">Wood/Post (standard)</option>
              <option value="metal">Metal / Cable / Premium</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  function renderBathroom() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Bathroom Type</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.bathType ?? 'guest_full'}
              onChange={(e) => updateDetails('bathType', e.target.value)}
            >
              <option value="powder">Powder / Half Bath</option>
              <option value="guest_full">Guest / Hall Full Bath</option>
              <option value="primary">Primary / Master Bath</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Finish Level
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.finishLevel ?? 'popular'}
              onChange={(e) => updateDetails('finishLevel', e.target.value)}
            >
              <option value="standard">Good / Value</option>
              <option value="popular">Better / Most Popular</option>
              <option value="premium">Best / Luxury</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Layout / Plumbing Move
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.layoutChange ?? 'minor'}
              onChange={(e) => updateDetails('layoutChange', e.target.value)}
            >
              <option value="none">Keep layout</option>
              <option value="minor">Minor changes</option>
              <option value="major">Major rework</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Shower Type</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.showerType ?? 'tub_shower'}
              onChange={(e) => updateDetails('showerType', e.target.value)}
            >
              <option value="tub_shower">Tub/Shower Combo</option>
              <option value="walk_in_tile">Walk-in Tiled Shower</option>
              <option value="curbless_tile">Curbless / Zero-Entry</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-white/70 block">
              Vanity Length (feet)
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="5"
              value={state.details.vanityLength ?? ''}
              onChange={(e) =>
                updateDetails('vanityLength', Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    );
  }

  function renderKitchen() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Approx Kitchen Sq Ft
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="180"
              value={state.details.sizeSqft ?? ''}
              onChange={(e) => updateDetails('sizeSqft', Number(e.target.value))}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Finish Level
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.finishLevel ?? 'popular'}
              onChange={(e) => updateDetails('finishLevel', e.target.value)}
            >
              <option value="standard">Standard (stock cabinets)</option>
              <option value="popular">Popular (semi-custom)</option>
              <option value="premium">Premium / Custom</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Layout Change
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.layoutChange ?? 'minor'}
              onChange={(e) => updateDetails('layoutChange', e.target.value)}
            >
              <option value="keep">Keep same layout</option>
              <option value="minor">Minor move of appliances</option>
              <option value="major">Major walls/plumbing move</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Appliance Package
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.appliancePackage ?? 'mid'}
              onChange={(e) =>
                updateDetails('appliancePackage', e.target.value)
              }
            >
              <option value="basic">Basic / Builder Grade</option>
              <option value="mid">Mid-Range (most common)</option>
              <option value="pro">Pro / High-End</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-white/70 block">
              Include Island?
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={String(state.details.island ?? false)}
              onChange={(e) =>
                updateDetails('island', e.target.value === 'true')
              }
            >
              <option value="false">No Island</option>
              <option value="true">Yes, Add/Upgrade Island</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  function renderSiding() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Exterior Sq Ft (walls)
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="2000"
              value={state.details.sidingSqft ?? ''}
              onChange={(e) =>
                updateDetails('sidingSqft', Number(e.target.value))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Material</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.material ?? 'vinyl'}
              onChange={(e) => updateDetails('material', e.target.value)}
            >
              <option value="vinyl">Vinyl</option>
              <option value="fiber_cement">Fiber Cement / Hardie</option>
              <option value="cedar">Cedar</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Stories</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.stories ?? state.address.stories ?? '2'}
              onChange={(e) => updateDetails('stories', e.target.value)}
            >
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3+ Stories</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Windows/Doors to Re-trim / Flash
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="6"
              value={state.details.windowWrapCount ?? ''}
              onChange={(e) =>
                updateDetails('windowWrapCount', Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    );
  }

  function renderAddition() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Approx Added / Finished Sq Ft
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="600"
              value={state.details.addSqft ?? ''}
              onChange={(e) => updateDetails('addSqft', Number(e.target.value))}
            />
            <p className="text-[11px] text-white/50">
              For basements, use finished area.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              Space Type / Finish Level
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={state.details.finishLevel ?? 'standard'}
              onChange={(e) => updateDetails('finishLevel', e.target.value)}
            >
              <option value="standard">Standard Living Space</option>
              <option value="premium">High-End / Custom Trim</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">Is Basement?</label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={String(state.details.isBasement ?? false)}
              onChange={(e) =>
                updateDetails('isBasement', e.target.value === 'true')
              }
            >
              <option value="false">No - New addition / bump out</option>
              <option value="true">Yes - Basement Finish / Remodel</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white/70 block">
              # of Bathrooms in Added Space
            </label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="1"
              value={state.details.bathroomCount ?? ''}
              onChange={(e) =>
                updateDetails('bathroomCount', Number(e.target.value))
              }
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-white/70 block">
              Kitchenette / Wet Bar?
            </label>
            <select
              className="w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-amber-400"
              value={String(state.details.kitchenette ?? false)}
              onChange={(e) =>
                updateDetails('kitchenette', e.target.value === 'true')
              }
            >
              <option value="false">No</option>
              <option value="true">Yes, include kitchenette / bar</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // pick which inner form to render
  function renderProjectForm() {
    switch (project) {
      case 'roofing':
        return renderRoofing();
      case 'deck':
        return renderDeck();
      case 'bathroom':
        return renderBathroom();
      case 'kitchen':
        return renderKitchen();
      case 'siding':
        return renderSiding();
      case 'addition':
        return renderAddition();
      default:
        return (
          <div className="text-white/70 text-sm">
            Select a project type first so we know what to ask.
          </div>
        );
    }
  }

  return (
    <div className="space-y-6 text-white">
      <div>
        <div className="text-lg font-bold">Project Details</div>
        <div className="text-sm text-white/70">
          A few specifics so we can ballpark it.
        </div>
      </div>

      {/* dynamic form */}
      {renderProjectForm()}

      {/* live estimate preview */}
      <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white">Your Estimate</div>
          <div className="text-[11px] text-white/60">
            Rough range. Final quote after site visit.
          </div>
        </div>

        {est ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-white/60 text-[12px]">Conservative</div>
              <div className="text-green-400 font-bold text-lg">
                {currency(est.low)}
              </div>
            </div>
            <div className="rounded-lg border border-amber-500 bg-amber-500/10 p-3 shadow-[0_24px_60px_rgba(255,200,0,.15)]">
              <div className="text-amber-300 text-[12px] font-semibold">
                Most Likely
              </div>
              <div className="text-amber-300 font-extrabold text-xl">
                {currency(est.mid)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-white/60 text-[12px]">Premium</div>
              <div className="text-orange-400 font-bold text-lg">
                {currency(est.high)}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-white/50 text-[13px]">
            Fill in details to get a live range.
          </div>
        )}
      </div>
    </div>
  );
}