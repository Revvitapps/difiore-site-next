import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

const navLinks = site.nav.filter((link) => link.href !== '/');

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040913]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-white/95">
          <Image src="/difiore-logo.png" alt="DiFiore Builders" width={42} height={42} priority className="h-[42px] w-[42px]" />
          <span className="text-[17px] font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-white/80 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/project-calculator"
            className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 shadow hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            Project Calculator
          </Link>
        </div>
      </div>
    </header>
  );
}
