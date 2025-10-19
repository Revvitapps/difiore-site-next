import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/difiore-logo.png"
            alt="DiFiore Builders"
            className="h-8 w-auto"
          />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/our-story" className="text-sm text-zinc-300 hover:text-white">Our Story</Link>
          <Link href="/our-projects" className="text-sm text-zinc-300 hover:text-white">Our Projects</Link>
          <Link href="/before-and-after" className="text-sm text-zinc-300 hover:text-white">Before &amp; After</Link>

          {/* Services dropdown (hover/focus keeps it open) */}
          <div className="relative group">
            <button
              className="text-sm text-zinc-300 hover:text-white focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Services
            </button>
            <div
              className="
                invisible absolute left-0 mt-2 min-w-[220px] rounded-lg border border-white/10
                bg-zinc-900/95 p-2 opacity-0 shadow-xl backdrop-blur
                transition-all duration-150
                group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100
              "
              role="menu"
            >
              <Link href="/services/kitchens-bathrooms" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">
                Kitchens &amp; Bathrooms
              </Link>
              {/* You can add the others as you build them */}
              <Link href="/#roofing-siding" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">
                Roofing &amp; Siding
              </Link>
              <Link href="/#additions" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">
                Additions &amp; Basements
              </Link>
              <Link href="/#new-builds-gc" className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10" role="menuitem">
                New Builds &amp; General Construction
              </Link>
            </div>
          </div>

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
