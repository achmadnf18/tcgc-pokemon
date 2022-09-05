import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';
import { QueryCardFilter, QueryCardsData, QueryCardsKey } from './cards';

const LIMIT = 15;

type FetchCardsResponse = {
  data: {
    data: QueryCardsData;
  };
};

const fetchCardByName = async (ctx: QueryFunctionContext<QueryCardsKey>) => {
  const { name } = ctx.queryKey[1];
  const res = await tcgFetcher.get<unknown, FetchCardsResponse>('/v2/cards', {
    params: { q: `name:"${name}*"`, page: ctx.pageParam || 1, pageSize: LIMIT },
  });
  return res.data.data;
};

export const useCardByName = (filter: QueryCardFilter) =>
  useQuery<QueryCardsData, unknown, QueryCardsData, QueryCardsKey>(
    ['cards', filter],
    (ctx) => fetchCardByName(ctx),
    {
      keepPreviousData: true,
    },
  );
