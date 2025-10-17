'use client';
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/difiore-logo.png" alt="DiFiore Builders" className="h-8 w-auto" />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        <nav className="flex items-center gap-4">
          {/* Services dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onClick={() => setOpen((s) => !s)}
              onBlur={(e) => {
                // close when focus leaves the dropdown
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(false);
              }}
              className="text-sm text-zinc-300 hover:text-white"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Services
            </button>

            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className={(open ? "block" : "hidden") + " absolute right-0 mt-2 w-56 rounded-md bg-zinc-900/90 border border-white/10 shadow-lg backdrop-blur"}
              role="menu"
            >
              <Link href="/services/roofing" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5" role="menuitem">Roofing &amp; Siding</Link>
              <Link href="/services/additions" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5" role="menuitem">Additions &amp; Basements</Link>
              <Link href="/services/kitchens" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5" role="menuitem">Kitchens &amp; Renovations</Link>
              <Link href="/services/new-builds" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5" role="menuitem">New Builds &amp; GC</Link>
            </div>
          </div>

          <Link href="/our-story" className="hidden md:inline text-sm text-zinc-300 hover:text-white">Our Story</Link>
          <Link href="/our-projects" className="hidden md:inline text-sm text-zinc-300 hover:text-white">Our Projects</Link>
        </nav>
      </div>
    </header>
  );
}
