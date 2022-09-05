import { useQuery } from '@tanstack/react-query';

import tcgFetcher from '../tcg-fetcher';

type FetchCardsRaritiesResponse = {
  data: {
    data: string[];
  };
};

export const fetchCardRarities = async () => {
  const res = await tcgFetcher.get<unknown, FetchCardsRaritiesResponse>('/v2/rarities');
  const sets = res.data.data.map((v) => ({
    id: v,
    name: v,
  }));

  return {
    rarities: sets.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

export const useQueryCardRarity = () => useQuery(['card-rarity'], fetchCardRarities);
