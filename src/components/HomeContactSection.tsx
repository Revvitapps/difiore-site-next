import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const PHONE_DISPLAY = "(610) 358-5433";
const PHONE_LINK = "tel:+16103585433";

export default function HomeContactSection() {
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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_60px_rgba(3,6,14,.6)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Call or text</p>
              <a
                href={PHONE_LINK}
                className="mt-3 block text-3xl font-semibold text-white hover:text-amber-300 sm:text-4xl"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="mt-4 text-sm text-white/70">
                We keep this line open during work hours. If we miss you, leave a quick note and the estimator team
                will call back shortly.
              </p>
              <dl className="mt-6 grid gap-4 text-sm text-white/70">
                <div>
                  <dt className="text-white/90 font-semibold">Service area</dt>
                  <dd>Tri-State area with a focus on Chadds Ford, Glen Mills, West Chester, and Wilmington.</dd>
                </div>
                <div>
                  <dt className="text-white/90 font-semibold">Prefer to email?</dt>
                  <dd>The same inbox that powers the estimator monitors this form for a next business-day response.</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1f2937] via-[#0f172a] to-black p-6 shadow-[0_25px_60px_rgba(2,6,23,.6)]">
              <h3 className="text-xl font-semibold text-white">Need ballpark numbers first?</h3>
              <p className="mt-3 text-sm text-white/70">
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

          <ContactForm />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm text-white/70">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">What to expect</p>
          <ul className="mt-3 space-y-2 text-base">
            <li>• Same-day acknowledgement from a DiFiore project specialist.</li>
            <li>• Follow-up to confirm scope, timeline, and whether a site visit is needed.</li>
            <li>• Transparent pricing, schedule, and next steps before we swing a hammer.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
