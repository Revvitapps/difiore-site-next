import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import AboutSlab from '@/components/AboutSlab';
import Reviews from '@/components/Reviews';
import ServiceHero from '@/components/ServiceHero';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'DiFiore Builders delivers full-service additions, renovations, roofing, siding, and more — quality work from the foundation to the roof.',
  alternates: { canonical: '/' },
};

const serviceSections = [
  {
    id: 'additions',
    title: 'Additions',
    bgUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac8263a0?auto=format&fit=crop&w=2400&q=80',
    meta: ['Design-Build', 'Permit Ready', 'Seamless Tie-ins'],
    bullets: ['Primary suites & sunrooms', 'Garage & dormer expansions', 'Foundations to finishes'],
    primary: { href: '/project-calculator', label: 'Plan My Addition' },
    secondary: { href: '/past-projects#additions', label: 'See Projects' },
  },
  {
    id: 'kitchens-renovations',
    title: 'Kitchens & Renovations',
    bgUrl: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=80',
    meta: ['Cabinetry', 'Tile & Stone', 'Lighting'],
    bullets: ['Custom kitchens & baths', 'Flooring, trim & built-ins', 'Mechanical & electrical updates'],
    primary: { href: '/project-calculator', label: 'Start My Renovation' },
    secondary: { href: '/past-projects#renovations', label: 'See Projects' },
  },
  {
    id: 'exteriors',
    title: 'Roofing, Siding & Exterior Updates',
    bgUrl: 'https://images.unsplash.com/photo-1617099397830-5c9c0d31b0d0?auto=format&fit=crop&w=2400&q=80',
    meta: ['Curb Appeal', 'Weather-Tight', 'Energy Efficient'],
    bullets: ['Roofing replacements & repairs', 'Siding, windows & doors', 'Decks, porches & outdoor living'],
    primary: { href: '/project-calculator', label: 'Book Exterior Project' },
    secondary: { href: '/past-projects#exteriors', label: 'See Projects' },
  },
] as const;

export default function Page() {
  return (
    <>
      <Hero />
      <AboutSlab />
      {serviceSections.map((section) => (
        <ServiceHero key={section.id} {...section} />
      ))}
      <Reviews />
    </>
  );
}
