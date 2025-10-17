import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/difiore-logo.png" alt="DiFiore Builders" className="h-8 w-auto" />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/our-story" className="text-sm text-zinc-300 hover:text-white">Our Story</Link>

          {/* Hover-sticky dropdown (no click needed) */}
          <div className="relative group">
            <button
              type="button"
              className="peer text-sm text-zinc-300 hover:text-white"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              Services ▾
            </button>

            {/* Invisible hover bridge + menu container */}
            <div className="absolute left-0 top-full pt-2 pointer-events-none">
              <div
                role="menu"
                className="
                  min-w-56 rounded-lg border border-white/10 bg-zinc-900/95 shadow-lg backdrop-blur
                  transition duration-150
                  opacity-0 translate-y-1 invisible
                  group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
                  peer-focus:opacity-100 peer-focus:translate-y-0 peer-focus:visible
                  pointer-events-auto
                "
              >
                <div className="p-2">
                  <Link href="/services/roofing-siding" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">Roofing &amp; Siding</Link>
                  <Link href="/services/additions" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">Additions &amp; Basements</Link>
                  <Link href="/services/kitchens-renovations" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">Kitchens &amp; Renovations</Link>
                  <Link href="/services/new-builds-gc" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">New Builds &amp; General Construction</Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/our-projects" className="text-sm text-zinc-300 hover:text-white">Our Projects</Link>
          <Link href="/before-and-after" className="text-sm text-zinc-300 hover:text-white">Before &amp; After</Link>
          <Link href="/project-calculator" className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-amber-400">Project Calculator</Link>
        </nav>

        {/* Mobile: simple, no dropdown (links directly) */}
        <nav className="flex items-center gap-3 md:hidden">
          <Link href="/our-story" className="text-sm text-zinc-300 hover:text-white">Our Story</Link>
          <Link href="/#services" className="text-sm text-zinc-300 hover:text-white">Services</Link>
          <Link href="/our-projects" className="text-sm text-zinc-300 hover:text-white">Projects</Link>
          <Link href="/before-and-after" className="text-sm text-zinc-300 hover:text-white">B&amp;A</Link>
        </nav>
      </div>
    </header>
  );
}
