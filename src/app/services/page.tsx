import Link from "next/link";

const SERVICES = [
  { id: "roofing", title: "Roofing & Siding", href: "/services/roofing" },
  { id: "additions", title: "Additions & Basements", href: "/services/additions" },
  { id: "kitchens", title: "Kitchens & Renovations", href: "/services/kitchens" },
  { id: "new-builds", title: "New Builds & GC", href: "/services/new-builds" },
];

export default function ServicesIndex() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl font-extrabold mb-6">Services</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map(s => (
            <Link key={s.id} href={s.href} className="block p-6 rounded-2xl border bg-zinc-900/60">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-zinc-300">Learn more about {s.title}.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
