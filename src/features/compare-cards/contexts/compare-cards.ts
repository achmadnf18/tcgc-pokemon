import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { TcgCardData } from '@/types';

type ContextValue = {
  compareCards: TcgCardData[];
  setCompareCards: Dispatch<SetStateAction<TcgCardData[]>>;
};

export const CompareCardsContext = createContext<ContextValue | null>(null);

export const useCompareCards = () => useContext(CompareCardsContext)!;
