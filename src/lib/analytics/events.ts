import { trackEvent } from "./track";

type AnalyticsExtras = Record<string, unknown>;

export type CtaName =
  | "project_calculator"
  | "get_quote"
  | "see_projects"
  | "referral_link";

const getPageLocation = () =>
  typeof window !== "undefined" ? window.location.href : "";

export function trackCtaClick(ctaName: CtaName, extras: AnalyticsExtras = {}) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    page_location: getPageLocation(),
    ...extras,
  });
}

export function trackFormStart(formId: string, extras: AnalyticsExtras = {}) {
  trackEvent("form_start", {
    form_id: formId,
    page_location: getPageLocation(),
    ...extras,
  });
}

export function trackFormSubmit(formId: string, extras: AnalyticsExtras = {}) {
  trackEvent("form_submit", {
    form_id: formId,
    page_location: getPageLocation(),
    ...extras,
  });
}

export function trackCalculatorStart(extras: AnalyticsExtras = {}) {
  trackEvent("calculator_start", {
    page_location: getPageLocation(),
    ...extras,
  });
}

export function trackCalculatorComplete(extras: AnalyticsExtras = {}) {
  trackEvent("calculator_complete", {
    page_location: getPageLocation(),
    ...extras,
  });
}

export function trackScrollDepth(percent: number, extras: AnalyticsExtras = {}) {
  trackEvent("scroll_depth", {
    percent,
    page_location: getPageLocation(),
    ...extras,
  });
}
