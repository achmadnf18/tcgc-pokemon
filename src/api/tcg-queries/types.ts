import { useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';

type FetchCardsTypeResponse = {
  data: {
    data: string[];
  };
};

export const fetchCardTypes = async () => {
  const res = await tcgFetcher.get<unknown, FetchCardsTypeResponse>('/v2/types');
  const sets = res.data.data.map((v) => ({
    id: v,
    name: v,
  }));

  return {
    types: sets.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

export const useQueryCardType = () => useQuery(['card-type'], fetchCardTypes);
