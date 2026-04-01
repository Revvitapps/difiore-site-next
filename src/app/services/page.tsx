import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Home Remodeling and Exterior Services in PA and DE | DiFiore Builders",
  description:
    "Explore DiFiore Builders services for roofing and siding, kitchens and bathrooms, additions and basements, and new builds across Chadds Ford, Glen Mills, West Chester, and Wilmington.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function Page() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  const services = [
    {
      href: "/services/roofing-siding",
      title: "Roofing & Siding",
      desc: "Exterior systems built for weather protection and long-term curb appeal.",
      image: "/difiore-services-showcase-3style-roof.webp",
      imageAlt: "Roofing and siding project by DiFiore Builders",
    },
    {
      href: "/services/kitchens-bathrooms",
      title: "Kitchens & Bathrooms",
      desc: "Layout-first remodeling with durable materials and coordinated trades.",
      image: "/difiore-services-showcase-kitchen-whole.webp",
      imageAlt: "Kitchen remodeling project by DiFiore Builders",
    },
    {
      href: "/services/additions-basements",
      title: "Additions & Basements",
      desc: "Expanded living space with structural planning and clean project management.",
      image: "/difiore-services-showcase-additions-playroom1.webp",
      imageAlt: "Home addition and basement finishing project by DiFiore Builders",
    },
    {
      href: "/services/new-builds-gc",
      title: "New Builds & General Construction",
      desc: "From framing to final punch list with one point of accountability.",
      image: "/difiore-services-showcase-newbuild.jpg",
      imageAlt: "New build and general construction project by DiFiore Builders",
    },
  ];

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <header className="max-w-3xl">
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-extrabold tracking-tight">
            Home Services from One Accountable GC Team
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            DiFiore Builders handles full-service residential construction from roofing and siding to kitchen and bath
            remodeling, additions, basement finishing, and new builds.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.href} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/45">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
              <h2 className="text-xl font-semibold text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.desc}</p>
              <Link
                href={service.href}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
              >
                Explore {service.title}
              </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/service-areas"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            View service areas
          </Link>
          <Link
            href="/project-calculator"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Start cost estimator
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact DiFiore Builders
          </Link>
        </div>
      </section>
    </>
  );
}
