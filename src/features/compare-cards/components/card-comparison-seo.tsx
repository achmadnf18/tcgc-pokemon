import { NextSeo } from 'next-seo';

import { MAX_CARD_TO_COMPARE } from '@/constants';

export default function CardComparisonSeo() {
  return (
    <NextSeo
      title="Compare TCG Pokémons"
      description={`Compare TCG Pokémons easily! Select up to ${MAX_CARD_TO_COMPARE} cards to compare. Tell your friend that your TCG Pokémons is better.`}
      openGraph={{
        images: [
          {
            url: `${
              process.env.NEXT_PUBLIC_BASE_URL || ''
            }/images/compare-pokemons-thumbnail-1200x630.jpg`,
            width: 1200,
            height: 630,
            alt: 'Pokemon Comparison',
            type: 'image/jpeg',
          },
          {
            url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/compare-pokemons-thumbnail.jpg`,
            width: 2560,
            height: 1280,
            alt: 'Pokemon Comparison',
            type: 'image/jpeg',
          },
        ],
      }}
    />
  );
}
