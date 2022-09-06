/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo } from 'react';
import { useLocalStorage } from 'react-power-ups';

import { TcgCardData } from '@/types';

import { CompareCardsContext } from '../contexts/compare-cards';

type Props = {
  children: ReactNode;
};

export default function CompareCardsProvider({ children }: Props) {
  const [compareCards, setCompareCards] = useLocalStorage<TcgCardData[]>({
    key: 'compareCards',
    initialValue: [],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(
    () => ({ compareCards: compareCards || [], setCompareCards }),
    [compareCards],
  );

  return <CompareCardsContext.Provider value={value}>{children}</CompareCardsContext.Provider>;
}
