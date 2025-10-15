export default function Services() {
  const items = [
    { title: "Roofing & Siding", blurb: "Weather-tight systems, clean lines, long-term performance." },
    { title: "Additions", blurb: "New space that looks like it was always there." },
    { title: "Kitchens & Renovations", blurb: "Smart layouts, durable materials, beautiful details." },
    { title: "New Builds & General Construction", blurb: "From plans to punch list — streamlined process." },
  ];
  return (
    <section className="px-6 md:px-8 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-2xl font-semibold">Our Services</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((s) => (
            <article key={s.title} className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{s.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
