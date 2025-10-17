import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/difiore-logo.png" alt="DiFiore Builders" className="h-8 w-auto" />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          <Link href="/our-story" className="text-sm text-zinc-300 hover:text-white">
            Our Story
          </Link>

          {/* Services — CSS-only dropdown (desktop) */}
          <div className="relative group">
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Services
              <span aria-hidden>▾</span>
            </Link>

            {/* Menu */}
            <div
              className="
                invisible opacity-0 group-hover:visible group-hover:opacity-100
                transition-opacity duration-150 ease-out
                absolute right-0 mt-2 w-64 rounded-xl border border-white/10
                bg-zinc-900/95 backdrop-blur shadow-[0_16px_40px_rgba(3,9,20,.45)]
                p-2
              "
              role="menu"
            >
              <Link
                href="/services/roofing-siding"
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
              >
                Roofing &amp; Siding
              </Link>
              <Link
                href="/services/additions"
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
              >
                Additions &amp; Basements
              </Link>
              <Link
                href="/services/kitchens-renovations"
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
              >
                Kitchens &amp; Renovations
              </Link>
              <Link
                href="/services/new-builds-gc"
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
              >
                New Builds &amp; General Construction
              </Link>
            </div>
          </div>

          <Link href="/our-projects" className="text-sm text-zinc-300 hover:text-white">
            Our Projects
          </Link>

          <Link
            href="/project-calculator"
            className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-amber-400"
          >
            Project Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
