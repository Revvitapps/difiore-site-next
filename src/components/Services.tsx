import ServiceHero from '@/components/ServiceHero';

/* Image lists (from /public) */
export const ROOFING_IMAGES = [
  '/difiore-services-showcase-3style-roof.png',
  '/difiore-services-showcase-roofing-gutter.webp',
  '/difiore-services-showcase-roofing-materials-.webp',
  '/difiore-services-showcase-Roofing.webp',
];

export const ADDITIONS_IMAGES = [
  '/difiore-services-showcase-addition-showcase.jpeg',
  '/difiore-services-showcase-additions-familyroom-1.JPG',
  '/difiore-services-showcase-additions-playroom1.JPG',
  '/difiore-services-showcase-decking-pool.jpeg', // moved here
];

export const BATHROOMS_IMAGES = [
  '/difiore-services-showcase-bathroom-shower-walkin-fulltile.JPG',
  '/difiore-services-showcase-bathroom-shower-walkin-fulltile2.JPG',
];

export const KITCHENS_IMAGES = [
  '/difiore-services-showcase-kitchen-closeup.webp',
  '/difiore-services-showcase-kitchen-whole.webp',
];

export default function Services() {
  return (
    <section className="px-4 pb-20 pt-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8">
        <ServiceHero
          id="roofing-siding"
          title="Roofing & Siding"
          images={ROOFING_IMAGES}
          blurb="Durable roofing systems and clean, tight siding installs—done right the first time."
          meta={['Asphalt', 'Metal', 'Gutters']}
          cta={{ href: '/project-calculator', label: 'Get Roofing Estimate' }}
        />

        <ServiceHero
          id="additions"
          title="Additions & Basements"
          images={ADDITIONS_IMAGES}
          blurb="Add square footage with smart framing, insulation, and finishes that feel original to your home."
          meta={['Family Rooms', 'Basements', 'Decks']}
          cta={{ href: '/project-calculator', label: 'Plan My Addition' }}
        />

        <ServiceHero
          id="bathrooms"
          title="Bathrooms"
          images={BATHROOMS_IMAGES}
          blurb="From walk-in showers to full tile suites—bright, watertight, and easy to maintain."
          meta={['Walk-In Showers', 'Tile']}
          cta={{ href: '/project-calculator', label: 'Bathroom Quote' }}
        />

        <ServiceHero
          id="kitchens"
          title="Kitchens"
          images={KITCHENS_IMAGES}
          blurb="Hard-working layouts, durable surfaces, and clean detailing that make every day easier."
          meta={['Cabinetry', 'Stone', 'Lighting']}
          cta={{ href: '/project-calculator', label: 'Kitchen Quote' }}
        />
      </div>
    </section>
  );
}