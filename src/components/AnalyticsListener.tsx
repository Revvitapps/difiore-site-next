"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const utms: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const value = searchParams?.get(key);
      if (value) {
        utms[key] = value;
      }
    });

    const pageLocation =
      typeof window !== "undefined" ? window.location.href : pathname;

    trackEvent("page_view", {
      page_location: pageLocation,
      page_referrer: typeof document !== "undefined" ? document.referrer : "",
      page_title: typeof document !== "undefined" ? document.title : "",
      ...utms,
    });
  }, [pathname, searchParams]);

  // Count taps on any phone link, site-wide.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      trackEvent("call_click", {
        phone: link.getAttribute("href")?.replace("tel:", ""),
        page_location: window.location.href,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
