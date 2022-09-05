import { useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';

type FetchCardsSubTypeResponse = {
  data: {
    data: string[];
  };
};

export const fetchCardSubTypes = async () => {
  const res = await tcgFetcher.get<unknown, FetchCardsSubTypeResponse>('/v2/subtypes');
  const sets = res.data.data.map((v) => ({
    id: v,
    name: v,
  }));

  return {
    subtypes: sets.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

export const useQueryCardSubType = () => useQuery(['card-subtype'], fetchCardSubTypes);
