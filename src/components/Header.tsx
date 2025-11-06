"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!servicesOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [servicesOpen]);

  const closeServices = React.useCallback(() => setServicesOpen(false), []);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur"
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 m-2 rounded bg-white px-3 py-2 text-sm text-black shadow"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/difiore-logo.png"
            alt="DiFiore Builders"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="font-semibold tracking-tight text-white">
            DiFiore Builders
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {/* Before & After and Our Story etc */}
          <Link
            href="/before-and-after"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Before &amp; After
          </Link>

          {/* Services dropdown (hover/focus keeps it open) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocusCapture={() => setServicesOpen(true)}
            onBlurCapture={(event) => {
              const relatedTarget = event.relatedTarget as Node | null;
              if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              className="text-sm text-zinc-300 hover:text-white focus:outline-none"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              Services
            </button>
            <div
              className={`absolute left-0 mt-2 min-w-[220px] rounded-lg border border-white/10 bg-zinc-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${
                servicesOpen
                  ? "visible opacity-100 translate-y-0"
                  : "invisible -translate-y-1 opacity-0"
              }`}
              role="menu"
            >
              <Link
                href="/services/kitchens-bathrooms"
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
                onClick={closeServices}
              >
                Kitchens &amp; Bathrooms
              </Link>
              <Link
                href="/services/roofing-siding"
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
                onClick={closeServices}
              >
                Roofing &amp; Siding
              </Link>
              <Link
                href="/services/additions-basements"
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
                onClick={closeServices}
              >
                Additions &amp; Basements
              </Link>
              <Link
                href="/services/new-builds-gc"
                className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                role="menuitem"
                onClick={closeServices}
              >
                New Builds &amp; General Construction
              </Link>
            </div>
          </div>

          <Link
            href="/our-story"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Our Story
          </Link>

          <Link
            href="/project-calculator"
            className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-amber-400"
          >
            Cost Estimator
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* mobile menu panel with slide-down animation */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`relative z-50 overflow-hidden border-t border-white/10 bg-[rgba(18,24,36,.92)] shadow-xl backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
          <Link
            href="/before-and-after"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Before &amp; After
          </Link>
          <Link
            href="/services/roofing-siding"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Roofing &amp; Siding
          </Link>
          <Link
            href="/services/kitchens-bathrooms"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Kitchens &amp; Bathrooms
          </Link>
          <Link
            href="/services/additions-basements"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Additions &amp; Basements
          </Link>
          <Link
            href="/services/new-builds-gc"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            New Builds &amp; General Construction
          </Link>
          <Link
            href="/our-story"
            className="block text-base font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Our Story
          </Link>
          <Link
            href="/project-calculator"
            className="block rounded-md bg-amber-500 px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-amber-400"
            onClick={() => setMobileOpen(false)}
          >
            Cost Estimator
          </Link>

          <div className="border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/40">
            Family-owned, licensed &amp; insured. Serving the Tri-State Area since 2003.
          </div>
        </div>
      </div>

      {/* mobile overlay */}
      <button
        type="button"
        aria-hidden={!mobileOpen}
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
    </header>
  );
}
