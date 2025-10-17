import Link from "next/link";
export default function Additions() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl font-extrabold">Additions & Basements</h1>
        <p className="mt-4 text-[15px] text-zinc-200">New space that looks like it was always part of your home.</p>
        <ul className="mt-6 list-disc pl-5 text-zinc-200">
          <li>Primary suites & sunrooms</li>
          <li>Garage & dormer expansions</li>
        </ul>
      </div>
    </section>
  );
}
