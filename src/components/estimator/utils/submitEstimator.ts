'use client';

export type EstimatorSubmissionPayload = {
  project: string;
  projectLabel?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneFormatted?: string;
  };
  details?: Record<string, string>;
  estimate?: {
    conservative?: number | null;
    likely?: number | null;
    premium?: number | null;
    breakdownLines?: string[];
  };
  meta?: {
    source?: string;
    submittedAt?: string;
    url?: string;
  };
};

type SubmissionResponse = {
  success: boolean;
};

export async function submitEstimatorPayload(
  payload: EstimatorSubmissionPayload
): Promise<SubmissionResponse> {
  const response = await fetch('/api/estimator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Failed to send estimator submission.';
    try {
      const data = await response.json();
      if (typeof data?.error === 'string') message = data.error;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return response.json() as Promise<SubmissionResponse>;
}
