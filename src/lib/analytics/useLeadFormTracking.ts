"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./track";

type LeadFormTrackingOptions = {
  formId: string;
  fields: Record<string, string | undefined | null>;
  step?: string | number;
  context?: Record<string, string | number | boolean | null | undefined>;
};

/**
 * Lightweight tracker for lead forms: fires view, start, and partial-fill events.
 * - view: on mount
 * - start: first time any field has a value
 * - partial: first time each field becomes non-empty
 */
export function useLeadFormTracking({ formId, fields, step, context }: LeadFormTrackingOptions) {
  const startedRef = useRef(false);
  const seenFieldsRef = useRef(new Set<string>());

  useEffect(() => {
    trackEvent("lead_form_view", { form_id: formId, step, ...context });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  useEffect(() => {
    const entries = Object.entries(fields || {});
    const hasAnyValue = entries.some(([, value]) => typeof value === "string" && value.trim().length > 0);

    if (hasAnyValue && !startedRef.current) {
      startedRef.current = true;
      trackEvent("lead_form_start", { form_id: formId, step, ...context });
    }

    entries.forEach(([field, value]) => {
      if (typeof value !== "string") return;
      const trimmed = value.trim();
      if (!trimmed) return;
      if (seenFieldsRef.current.has(field)) return;
      seenFieldsRef.current.add(field);
      trackEvent("lead_form_partial", { form_id: formId, field, step, ...context });
    });
  }, [context, fields, formId, step]);
}
