import { useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';

type FetchCardsSuperTypeResponse = {
  data: {
    data: string[];
  };
};

export const fetchCardSuperTypes = async () => {
  const res = await tcgFetcher.get<unknown, FetchCardsSuperTypeResponse>('/v2/supertypes');
  const sets = res.data.data.map((v) => ({
    id: v,
    name: v,
  }));

  return {
    supertypes: sets.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

export const useQueryCardSuperType = () => useQuery(['card-supertype'], fetchCardSuperTypes);
