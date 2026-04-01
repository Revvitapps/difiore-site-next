import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CANONICAL_NAP } from "@/lib/seo/constants";

const PHONE_DISPLAY = CANONICAL_NAP.phoneDisplay;
const PHONE_LINK = `tel:${CANONICAL_NAP.phoneE164}`;
const SERVICE_AREA_DEFAULT = "Chadds Ford, PA, Glen Mills, PA, West Chester, PA, and Wilmington, DE.";

type HomeContactSectionProps = {
  phoneDisplay?: string;
  phoneLink?: string;
  serviceArea?: string;
  serviceAreasHref?: string;
  serviceAreasLabel?: string;
};

export default function HomeContactSection({
  phoneDisplay = PHONE_DISPLAY,
  phoneLink = PHONE_LINK,
  serviceArea = SERVICE_AREA_DEFAULT,
  serviceAreasHref = "/service-areas",
  serviceAreasLabel = "Service areas",
}: HomeContactSectionProps) {
  return (
    <section id="contact" className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Contact</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let’s talk about your remodel or addition
          </h2>
          <p className="mt-3 text-base text-white/70">
            Fill out the same form our estimator team already uses, or dial the direct line below and we will call back
            the same day.
          </p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-[0_35px_80px_rgba(0,0,0,.5)] backdrop-blur md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                  Call now
                </p>
                <a
                  href={phoneLink}
                  className="block text-4xl font-bold tracking-tight text-white underline-offset-4 hover:text-amber-300 sm:text-5xl"
                >
                  {phoneDisplay}
                </a>
                <p className="text-sm text-white/70">
                  We keep this line open during work hours. If we miss you, leave a quick note and the estimator team
                  will call back shortly.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-lg font-semibold text-white">Need ballpark numbers first?</h3>
                <p className="mt-2 text-sm text-white/70">
                  The cost estimator follows the same questions our project specialists ask on-site—launch it to lock in
                  a quick scope before we visit.
                </p>
                <Link
                  href="/project-calculator"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow hover:bg-amber-300"
                >
                  Launch the estimator
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <ContactForm />
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm text-white/70">
                <dl className="grid gap-6 md:grid-cols-3">
                  <div>
                    <dt className="text-white/80 font-semibold">Service area</dt>
                    <dd className="mt-1">{serviceArea}</dd>
                  </div>
                  <div>
                    <dt className="text-white/80 font-semibold">Prefer to email?</dt>
                    <dd className="mt-1">
                      The same inbox that powers the estimator monitors this form for a next business-day response.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/80 font-semibold">Office address</dt>
                    <dd className="mt-1">
                      {CANONICAL_NAP.streetAddress}
                      <br />
                      {CANONICAL_NAP.city}, {CANONICAL_NAP.region} {CANONICAL_NAP.postalCode}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm text-white/70">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">What to expect</p>
          <ul className="mt-3 space-y-2 text-base">
            <li>• Same-day acknowledgement from a DiFiore project specialist.</li>
            <li>• Follow-up to confirm scope, timeline, and whether a site visit is needed.</li>
            <li>• Transparent pricing, schedule, and next steps before we swing a hammer.</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={serviceAreasHref} className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              {serviceAreasLabel}
            </Link>
            <Link href="/services" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              All services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
