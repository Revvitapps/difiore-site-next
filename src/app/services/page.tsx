import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "At DiFiore Builders Inc., we offer a wide range of home improvement services at honest and fair prices for both, residential as well as commercial projects. From roofing and siding to additions to full house renovations, there is not a job we can't handle. We always strive to build lasting client relationships and provide top quality work from start to finish every time. Contact us to get a quote!",
  alternates: {
    canonical: "https://difiorebuilders.com/services",
  },
};

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center">
      <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-extrabold tracking-tight">Services</h1>
      <p className="mt-3 text-zinc-300">Choose a service from the menu to learn more.</p>
    </section>
  );
}
