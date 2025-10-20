import Link from "next/link";
export default function Roofing() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl font-extrabold">Roofing & Siding</h1>
        <p className="mt-4 text-[15px] text-zinc-200">Weather-tight systems, clean lines, and long-term performance.</p>
        <div className="mt-6 space-y-4">
          <ul className="list-disc pl-5 text-zinc-200">
            <li>Full tear-offs & re-roofs</li>
            <li>Premium underlayments & flashing</li>
            <li>Color-matched trim & accessories</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href="/project-calculator" className="rounded-full bg-amber-500 px-4 py-2 text-zinc-900">Get a Quote</Link>
            <Link href="/our-projects" className="rounded-full border px-4 py-2 text-white">See Projects</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
