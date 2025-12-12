export type AnalyticsEventName =
  | "page_view"
  | "view_content"
  | "lead_form_view"
  | "lead_form_start"
  | "lead_form_submit"
  | "call_click"
  | "sms_click"
  | "chat_start"
  | "booking_start"
  | "booking_complete"
  | "purchase";

export type AnalyticsEventParams = Record<string, unknown>;

const metaNameMap: Record<AnalyticsEventName, string> = {
  lead_form_submit: "Lead",
  purchase: "Purchase",
  view_content: "ViewContent",
  page_view: "PageView",
  lead_form_view: "Lead",
  lead_form_start: "Lead",
  call_click: "Contact",
  sms_click: "Contact",
  chat_start: "Contact",
  booking_start: "Schedule",
  booking_complete: "Schedule",
};

type WindowWithAnalytics = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined") return;

  const payload = params || {};
  const win = window as WindowWithAnalytics;

  const gtag = win.gtag;
  if (typeof gtag === "function") {
    gtag("event", name, payload);
  }

  const fbq = win.fbq;
  if (typeof fbq === "function") {
    const fbEventName = metaNameMap[name] || "CustomEvent";
    fbq("track", fbEventName, { ...payload });
  }

  const dataLayer = win.dataLayer || [];
  dataLayer.push({ event: name, ...payload });
  win.dataLayer = dataLayer;
}
