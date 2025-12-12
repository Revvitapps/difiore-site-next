# Analytics Event Spec (shared)

One naming/schema for every site (Next.js + Wix). Each property swaps its own pixel/property IDs, but events and params stay consistent.

## Core events
- `page_view` — any page load or SPA route change
- `view_content` — key service/offer page view
- `lead_form_view` — form visible in viewport
- `lead_form_start` — form interaction begins
- `lead_form_submit` — form successfully submitted (Meta: `Lead`)
- `call_click` — click-to-call taps
- `sms_click` — SMS taps
- `chat_start` — chat widget opened/started
- `booking_start` / `booking_complete` — scheduling flows
- `purchase` — paid transactions when applicable

## Standard parameters
- **Global**: `page_location`, `page_referrer`, `page_title`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- **Lead events**: `lead_id` (internal), `lead_type` (`auto`, `home_services`, `ott_consult`, etc.), `value` (number), `currency` (ISO code), `form_name`
- **Commerce-ish**: `item_id`, `item_name`, `item_category`, `price`, `quantity`

## Mapping notes
- GA4: send events as-is.
- Meta: map `lead_form_submit` → `Lead`, `purchase` → `Purchase`, `view_content` → `ViewContent`, `page_view` → `PageView`; others can stay custom.
- DataLayer: also push `{ event: <name>, ...params }` so GTM/other tools can hook in.

## Identity & consent
- Only send user-provided identifiers (email/phone) with consent; hash when required (Meta CAPI, Google Ads uploads).
- No collection of sensitive categories (health, religion, etc.) or stealth fingerprinting.
