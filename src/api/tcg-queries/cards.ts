import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import { TcgCardData } from '@/types';

import tcgFetcher from '../tcg-fetcher';

const LIMIT = 24;

export type QueryCardFilter = {
  q?: string;
  page?: number;
  pageSize?: number;
  name?: string;
  set?: string;
  types?: string;
  subtypes?: string;
  supertype?: string;
  rarity?: string;
};

type FetchCardsResponse = {
  data: {
    data: TcgCardData[];
  };
};

export type QueryCardsKey = ['cards', QueryCardFilter];
export type QueryCardsData = FetchCardsResponse['data']['data'];

export const fetchCards = async (ctx: QueryFunctionContext<QueryCardsKey>) => {
  const { name, set, types, subtypes, supertype, rarity } = ctx.queryKey[1];
  const params = { name, set, types, subtypes, supertype, rarity };
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([, v]) => v)
    .join(' ');

  const res = await tcgFetcher.get<unknown, FetchCardsResponse>('/v2/cards', {
    params: { q, page: ctx.pageParam || 1, pageSize: LIMIT },
  });
  return res.data.data;
};

export const useInfQueryCards = (filter: QueryCardFilter) =>
  useInfiniteQuery<QueryCardsData, unknown, QueryCardsData, QueryCardsKey>(
    ['cards', filter],
    fetchCards,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < LIMIT ? undefined : allPages.length + 1,
    },
  );
