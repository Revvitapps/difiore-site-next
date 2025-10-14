import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/blob-f4d6c03.png"
            alt="DiFiore Builders"
            className="h-8 w-auto"
          />
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-zinc-300 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
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
