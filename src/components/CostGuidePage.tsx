import Link from "next/link";

type CostGuidePageProps = {
  title: string;
  intro: string;
  rangeLabel: string;
  whatDrivesCost: string[];
  citySpecificNotes: string[];
  relatedServiceUrl: string;
  relatedServiceLabel: string;
};

export default function CostGuidePage({
  title,
  intro,
  rangeLabel,
  whatDrivesCost,
  citySpecificNotes,
  relatedServiceUrl,
  relatedServiceLabel,
}: CostGuidePageProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-300">{intro}</p>
      </header>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-semibold text-white">Typical planning range</h2>
        <p className="mt-3 text-lg font-semibold text-amber-300">{rangeLabel}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          These are planning ranges, not fixed bids. Final pricing depends on field conditions, design selections,
          permitting requirements, and scope decisions confirmed during site review.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
          <h2 className="text-xl font-semibold text-white">What drives cost</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
            {whatDrivesCost.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
          <h2 className="text-xl font-semibold text-white">Local factors to account for</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
            {citySpecificNotes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-semibold text-white">Next step</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          Use the estimator for a fast range, then schedule a scope call so we can confirm assumptions and provide a
          realistic plan.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/project-calculator"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Open project calculator
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact DiFiore Builders
          </Link>
          <Link
            href={relatedServiceUrl}
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            {relatedServiceLabel}
          </Link>
        </div>
      </section>
    </section>
  );
}
