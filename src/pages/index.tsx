/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { dehydrate, DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useIntersection } from 'react-power-ups';

import { fetchCards, QueryCardFilter, useInfQueryCards } from '@/api/tcg-queries/cards';
import getQueryClient from '@/config/react-query';
import TcgCard from '@/features/tcg-list/components/tcg-card';
import TcgListFilter from '@/features/tcg-list/components/tcg-list-filter';
import TcgCardsShimmer from '@/features/tcg-list/components/tcg-list-shimmer';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const INITIAL_FILTER = { q: '', page: 1, pageSize: 24 };

const SEO_DESCRIPTION =
  process.env.NEXT_PUBLIC_SEO_HOMEPAGE_DESCRIPTION ||
  process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION ||
  'Pokémon TCG Center';

export async function getStaticProps(): Promise<Result> {
  const queryClient = getQueryClient();
  await queryClient.fetchInfiniteQuery(['cards', INITIAL_FILTER], fetchCards);
  // await queryClient.fetchQuery(['pokemon-g&t'], fetchPokemonGenAndTypes);

  // https://github.com/tannerlinsley/react-query/issues/1458
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState,
    },
  };
}

export default function PokemonListPage() {
  const [filter, setFilter] = useState<QueryCardFilter>(INITIAL_FILTER);
  const { data, isFetching, isFetchingNextPage, isPreviousData, fetchNextPage } =
    useInfQueryCards(filter);

  const loadMoreRef = useIntersection({
    rootMargin: '560px',
    onEnter: () => fetchNextPage(),
    enabled: !isFetching,
  });

  const cards = data?.pages.flat();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <>
      <NextSeo
        description={SEO_DESCRIPTION}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/pokemon-tcg-logo.png`,
              width: 1200,
              height: 630,
              alt: 'Pokemon TCG Center',
              type: 'image/png',
            },
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/pokemon-tcg-log.png`,
              width: 2560,
              height: 1280,
              alt: 'Pokemon TCG Center',
              type: 'image/png',
            },
          ],
        }}
      />

      <div className="sticky-section mb-8">
        <TcgListFilter filter={filter} setFilter={setFilter} />
      </div>
      {/* <hr className="-mx-6 mb-8 hidden lg:block" /> */}

      {isPreviousData && <div className="relative -top-4 text-center">⏳ Loading...</div>}
      <div className={clsx('tcg-card-container relative', isPreviousData && 'opacity-60')}>
        {cards?.map((card, idx) => (
          <TcgCard key={`${card.id}-${idx}`} card={card} />
        ))}
        {!isFetching && cards?.length === 0 && 'No result'}
        {isFetchingNextPage && <TcgCardsShimmer />}

        {/* Add 3 empty div to enforce 4 columns layout even when just displaying 1 card */}
        <div />
        <div />
        <div />
      </div>
      <div ref={loadMoreRef} />
    </>
  );
}
