'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type GalleryPair = {
  title: string;
  serviceHref: string;
  serviceLabel: string;
  challenge: string;
  scope: string;
  result: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

const PAIRS: GalleryPair[] = [
  {
    title: "Kitchen modernization",
    serviceHref: "/services/kitchens-bathrooms",
    serviceLabel: "Kitchens & Bathrooms",
    challenge: "Outdated finishes and poor workflow in a frequently used kitchen.",
    scope: "Cabinet, surface, lighting, and fixture updates with coordinated finishes.",
    result: "A brighter, more functional kitchen designed for daily use and resale value.",
    before: {
      src: "/difiore-os-before-bl.jpeg",
      alt: "Kitchen before renovation with dated finishes",
    },
    after: {
      src: "/difiore-os-after-bl.jpeg",
      alt: "Kitchen after renovation with updated cabinetry and lighting",
    },
  },
  {
    title: "Second-story addition",
    serviceHref: "/services/additions-basements",
    serviceLabel: "Additions & Basements",
    challenge: "Homeowners needed significant extra square footage without moving.",
    scope: "Structural planning, framing, exterior tie-in, and finish carpentry.",
    result: "A seamless addition that matches the original home profile and flow.",
    before: {
      src: "/difiore-os-before-br-front.jpeg",
      alt: "Home exterior before addition",
    },
    after: {
      src: "/difiore-services-additions-secondstory2.jpeg",
      alt: "Home exterior after second-story addition",
    },
  },
  {
    title: "Bathroom upgrade",
    serviceHref: "/services/kitchens-bathrooms",
    serviceLabel: "Kitchens & Bathrooms",
    challenge: "Older bathroom materials and low-performing fixtures.",
    scope: "Demolition, waterproofing, fixture replacement, and finish installation.",
    result: "A durable, cleaner-lined bathroom with improved comfort and maintenance.",
    before: {
      src: "/difiore-services -bathroom-shower1.JPG",
      alt: "Bathroom before remodel",
    },
    after: {
      src: "/difiore-services-kitchen-darkwood-stainless-appoliances.JPG",
      alt: "Bathroom remodel with tile and glass shower",
    },
  },
  {
    title: "Basement transformation",
    serviceHref: "/services/additions-basements",
    serviceLabel: "Additions & Basements",
    challenge: "Unfinished lower level with limited usable living space.",
    scope: "Framing, insulation, electrical, drywall, and full interior finishing.",
    result: "A warm, livable family room that added practical daily-use space.",
    before: {
      src: "/difiore-services-showcase-additions-playroom1.webp",
      alt: "Basement before finishing",
    },
    after: {
      src: "/difiore-services-showcase-additions-familyroom-1.webp",
      alt: "Finished basement with seating area",
    },
  },
];

export default function BeforeAfterGallery() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl space-y-24 md:space-y-32">
        {PAIRS.map((pair, index) => {
          const isEven = index % 2 === 0;
          const beforeInitial = prefersReducedMotion
            ? false
            : { opacity: 0, x: isEven ? -60 : 60 };
          const afterInitial = prefersReducedMotion
            ? false
            : { opacity: 0, x: isEven ? 60 : -60 };

          return (
            <div
              key={`${pair.before.src}-${pair.after.src}`}
              className="grid gap-8 md:grid-cols-2 md:gap-12"
            >
              <motion.figure
                initial={beforeInitial}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.8, ease: "easeOut", delay: 0.1 }
                }
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={pair.before.src}
                  alt={pair.before.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl border border-white/15 object-cover shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                />
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Before</figcaption>
              </motion.figure>

              <motion.figure
                initial={afterInitial}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.8, ease: "easeOut", delay: 0.25 }
                }
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={pair.after.src}
                  alt={pair.after.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl border border-white/15 object-cover shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                />
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">After</figcaption>
              </motion.figure>

              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
                <h3 className="text-xl font-semibold text-white">{pair.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  <strong className="text-white">Challenge:</strong> {pair.challenge}
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  <strong className="text-white">Scope:</strong> {pair.scope}
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  <strong className="text-white">Result:</strong> {pair.result}
                </p>
                <Link
                  href={pair.serviceHref}
                  className="mt-4 inline-flex rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Related service: {pair.serviceLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
