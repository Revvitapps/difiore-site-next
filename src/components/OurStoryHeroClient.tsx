'use client';

import SideBeforeAfterPairs from '@/components/SideBeforeAfterPairs';

export default function OurStoryHeroClient() {
  return (
    <SideBeforeAfterPairs
      sepX={230}
      sepY={0}
      cardW={320}
      cardH={280}
      insetX={280}
      insetY={160}
      columnGap={72}
      tl={{
        before: '/difiore-os-before-tl.JPG',
        after: '/difiore-os-after-tl.JPG',
        altBefore: 'Top-left before',
        altAfter: 'Top-left after',
      }}
      bl={{
        before: '/difiore-os-before-bl.jpeg',
        after: '/difiore-os-after-bl.jpeg',
        altBefore: 'Bottom-left before',
        altAfter: 'Bottom-left after',
      }}
      tr={{
        before: '/difiore-services-showcase-newbuild.jpg',
        after: '/difiore-os-newbuild-after-tr.png',
        altBefore: 'Top-right before',
        altAfter: 'Top-right after',
      }}
      br={{
        before: '/difiore-os-before-br-front.jpeg',
        after: '/difiore-services-additions-secondstory2.jpeg',
        altBefore: 'Bottom-right before',
        altAfter: 'Bottom-right after',
      }}
    />
  );
}
