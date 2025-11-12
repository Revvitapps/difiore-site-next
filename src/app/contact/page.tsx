import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const PHONE_DISPLAY = "(610) 358-5433";
const PHONE_LINK = "tel:+16103585433";

export const metadata: Metadata = {
  title: "Contact Us | DiFiore Builders",
  description:
    "Ready to plan your remodel or addition? Call DiFiore Builders at (610) 358-5433 or send a message through our contact form for a same-day response.",
  alternates: {
    canonical: "https://difiorebuilders.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let’s talk about your home project
          </h1>
          <p className="text-lg text-white/70">
            Whether you have drawings in-hand or just started your wish list, reach out and our project specialist
            will respond within one business day to map out next steps.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_25px_60px_rgba(3,6,14,.6)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Call or text</p>
              <a href={PHONE_LINK} className="mt-3 block text-3xl font-semibold text-white hover:text-amber-300 sm:text-4xl">
                {PHONE_DISPLAY}
              </a>
              <p className="mt-4 text-sm text-white/70">
                We keep this line open during the workday. If we miss you, leave a quick note and the same team that monitors
                the estimator will call right back.
              </p>
              <dl className="mt-6 grid gap-4 text-sm text-white/70">
                <div>
                  <dt className="text-white">Service area</dt>
                  <dd>Tri-State area with a focus on Chadds Ford, Glen Mills, West Chester, and Wilmington.</dd>
                </div>
                <div>
                  <dt className="text-white">Prefer email?</dt>
                  <dd>The same inbox that powers our estimator monitors this form for a same-day response.</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1f2937] via-[#0f172a] to-black p-6 shadow-[0_25px_60px_rgba(2,6,23,.6)]">
              <h2 className="text-xl font-semibold text-white">Need ballpark numbers first?</h2>
              <p className="mt-3 text-sm text-white/70">
                Our cost estimator walks through the same steps our team uses to prep for the call. Complete it for a
                quick range before we meet on-site.
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
      </section>

      <section className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white/70">
            <p className="text-sm uppercase tracking-[0.2em] text-white">What to expect</p>
            <ul className="mt-4 space-y-3 text-base">
              <li>• Same-day acknowledgement from a DiFiore project specialist.</li>
              <li>• A follow-up call to confirm scope, timeline, and whether a site visit is needed.</li>
              <li>• Transparent pricing, schedule, and next steps laid out before we swing a hammer.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
