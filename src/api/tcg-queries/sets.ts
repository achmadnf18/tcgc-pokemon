import { useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';

type FetchCardsSetResponse = {
  data: {
    data: {
      id: string;
      name: string;
    }[];
  };
};

export const fetchCardSets = async () => {
  const res = await tcgFetcher.get<unknown, FetchCardsSetResponse>('/v2/sets');
  const sets = res.data.data.map(({ id, name }) => ({
    id,
    name,
  }));

  return {
    sets: sets.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

export const useQueryCardSet = () => useQuery(['card-set'], fetchCardSets);
