// canonical shared types for the estimator flow

// NOTE: keep this in sync with ProjectSelector options
export type ProjectKey =
  | 'roofing'
  | 'deck'
  | 'bathroom'
  | 'kitchen'
  | 'siding'
  | 'windows'
  | 'addition'; // "basement" is merged into addition for now; windows share siding flow

// step in wizard (1..5)
export type EstimatorStep = 1 | 2 | 3 | 4 | 5;

// granular scope questions per project
export type EstimatorDetails = {
  // shared-ish
  squareFootage?: string;
  scopeDescription?: string;

  // roofing
  tearOff?: 'tearOff' | 'overlay';
  roofType?: 'archAsp' | 'cedarShake' | 'slate' | 'rubber';
  roofComplexity?: 'simple' | 'complex' | 'veryComplex';

  // bath
  bathType?: 'powder' | 'guestFull' | 'primarySpa';
  finishLevel?: 'popular' | 'basic' | 'designer';
  layoutChanges?: 'sameLayout' | 'minor' | 'movePlumbing';
  showerType?: 'standard' | 'tilePan' | 'wetRoom';
  vanityLengthFt?: string;

  // kitchen
  cabinetsScope?: 'refresh' | 'replaceSameLayout' | 'fullGutMoveWalls';
  applianceLevel?: 'reuse' | 'mid' | 'highEnd';

  // siding / windows
  sidingMaterial?: 'vinyl' | 'cedar' | 'fiberCement';
  windowCount?: string;
};

// full wizard state the page owns
export type EstimatorStateLike = {
  step: EstimatorStep;
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
