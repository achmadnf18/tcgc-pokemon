/* eslint-disable import/no-named-default */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
import { QueryCardsData } from '@/api/tcg-queries/cards';
import { default as SvelteCard } from '@/features/tcg-list/lib/components/card.svelte';
import { convert } from '@/utils/svelte-convert/convert';

function TcgCard({ id, name, number, supertype, subtypes, rarity, images }: QueryCardsData[0]) {
  const Card = convert({ Component: SvelteCard, className: 'tcg-card', tag: 'div' });
  return (
    <Card
      id={id}
      name={name}
      number={number}
      supertype={supertype}
      subtypes={subtypes}
      rarity={rarity}
      img={images.large}
    />
  );
}

export default TcgCard;
