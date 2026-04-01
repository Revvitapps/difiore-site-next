import Link from "next/link";

export default function LocationLinks() {
  return (
    <section className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 via-zinc-950/80 to-black p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Now Serving</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Charlotte first, Philadelphia next
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Matt is based in Charlotte, so new projects and local referrals there get priority. We
              also maintain full crews and long-term clients across the greater Philadelphia area.
            </p>
          </div>
          <div className="grid gap-3">
            <Link
              href="/charlotte"
              className="rounded-xl border border-white/15 bg-white/5 p-4 text-left text-white shadow hover:border-amber-300/60"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Charlotte, NC</div>
              <div className="mt-2 text-lg font-semibold">Local remodels, roofing, and additions</div>
              <div className="mt-2 text-xs text-white/70">Explore Charlotte services →</div>
            </Link>
            <Link
              href="/philadelphia"
              className="rounded-xl border border-white/15 bg-white/5 p-4 text-left text-white shadow hover:border-amber-300/60"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Philadelphia, PA</div>
              <div className="mt-2 text-lg font-semibold">Trusted crews across the Main Line</div>
              <div className="mt-2 text-xs text-white/70">Explore Philadelphia services →</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
