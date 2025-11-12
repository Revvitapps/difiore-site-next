"use client";
import Link from "next/link";
import Image from "next/image";

type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  circleClass?: string;
  iconClass?: string;
};

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Qualityworkfromthefoundationtotheroof/",
    iconSrc: "/facebook-bw.png",
    iconAlt: "Facebook logo",
    circleClass: "bg-white",
    iconClass: "h-6 w-6",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/difiorebuilders/",
    iconSrc: "/instagram-bw.png",
    iconAlt: "Instagram logo",
    circleClass: "bg-white",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/DiFioreBuilders",
    iconSrc: "/X_logo_2023.svg",
    iconAlt: "X logo",
    circleClass: "bg-white",
  },
  {
    name: "Yelp",
    href: "https://www.yelp.com/biz/difiore-builders-chadds-ford-3",
    iconSrc: "/yelp-bw.png",
    iconAlt: "Yelp logo",
    circleClass: "bg-white",
    iconClass: "h-6 w-6",
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative z-20 isolate border-t border-white/15 bg-zinc-950/95 text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/difiore-logo.png"
              alt="DiFiore Builders"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-semibold tracking-tight">DiFiore Builders</span>
          </Link>

          <div className="flex flex-1 justify-center">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, iconSrc, iconAlt, circleClass, iconClass }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 hover:shadow-lg ${circleClass ?? "bg-white/90"}`}
                >
                  <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={28}
                    height={28}
                    className={`object-contain ${iconClass ?? "h-5 w-5"}`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-300 md:justify-end md:text-right"
          >
            <Link href="/our-story" className="hover:text-white">Our Story</Link>
            <Link href="/before-and-after" className="hover:text-white">Before &amp; After</Link>
            <Link href="/project-calculator" className="hover:text-white">Project Calculator</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DiFiore Builders.</p>
          <p>Family-owned, licensed &amp; insured. Serving the Tri-State area since 2003.</p>
        </div>
      </div>
    </footer>
  );
}
