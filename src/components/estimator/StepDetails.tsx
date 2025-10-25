// src/components/estimator/StepDetails.tsx
import { EstimatorState } from '../EstimatorForm';

export function StepDetails({ state, setState }: {
  state: EstimatorState;
  setState: (s: EstimatorState) => void;
}) {
  const updateDetail = (key: string, value: any) => {
    setState({ ...state, details: { ...state.details, [key]: value } });
  };

  return (
    <div className="space-y-4 text-white">
      <div className="text-xl font-semibold">{state.project.charAt(0).toUpperCase() + state.project.slice(1)} Details</div>
      {state.project === 'roofing' && (
        <>
          <input
            placeholder="Roof Area (sqft)"
            type="number"
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.sqft || ''}
            onChange={(e) => updateDetail('sqft', Number(e.target.value))}
          />
          <select
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.material || 'architectural'}
            onChange={(e) => updateDetail('material', e.target.value)}
          >
            <option value="3-tab">3-Tab Shingles</option>
            <option value="architectural">Architectural Shingles</option>
            <option value="metal">Metal Roof</option>
          </select>
        </>
      )}

      {state.project === 'kitchen' && (
        <>
          <input
            placeholder="Kitchen Size (sqft)"
            type="number"
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.sqft || ''}
            onChange={(e) => updateDetail('sqft', Number(e.target.value))}
          />
          <select
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.finish || 'popular'}
            onChange={(e) => updateDetail('finish', e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="popular">Popular (Most common)</option>
            <option value="premium">Premium</option>
          </select>
        </>
      )}

      {state.project === 'siding' && (
        <>
          <input
            placeholder="Wall Area (sqft)"
            type="number"
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.wallArea || ''}
            onChange={(e) => updateDetail('wallArea', Number(e.target.value))}
          />
          <select
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.material || 'vinyl'}
            onChange={(e) => updateDetail('material', e.target.value)}
          >
            <option value="vinyl">Vinyl</option>
            <option value="wood">Wood</option>
            <option value="composite">Composite</option>
            <option value="premium">Premium</option>
          </select>
        </>
      )}

      {state.project === 'addition' && (
        <>
          <input
            placeholder="Addition Size (sqft)"
            type="number"
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.sqft || ''}
            onChange={(e) => updateDetail('sqft', Number(e.target.value))}
          />
          <label className="block text-sm">Includes bathroom?</label>
          <select
            className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
            value={state.details.bath || 'no'}
            onChange={(e) => updateDetail('bath', e.target.value)}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </>
      )}

      <input
        placeholder="Project Address"
        className="w-full px-4 py-2 bg-black/10 border border-white/10 rounded-xl"
        value={state.address}
        onChange={(e) => setState({ ...state, address: e.target.value })}
      />
    </div>
  );
}