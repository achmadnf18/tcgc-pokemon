/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useState } from 'react';

import { useCardByName } from '@/api/tcg-queries/card-names';
import TcgCard from '@/features/tcg-list/components/tcg-card';

type Props = {
  onSelect?: (card: Object) => void;
};

export default function SearchCard({ onSelect }: Props) {
  const [keyword, setKeyword] = useState('');

  const { data: cards = [], isPreviousData } = useCardByName({
    name: keyword,
  });

  return (
    <div className="flex flex-col">
      <div className="mb-[2rem] flex h-[38px]">
        <input
          type="text"
          placeholder="🔍 Search Trading Card"
          className="h-full w-full rounded-md bg-slate-200 px-3 dark:bg-dark-base dark:lg:ring-1 dark:lg:ring-dark-light"
          onChange={debounce(({ target }) => setKeyword(target.value), 600)}
        />
      </div>
      <div
        className={clsx(
          'tcg-card-container card-comparison relative',
          isPreviousData && 'opacity-60',
        )}
      >
        {cards?.map((card, idx) => (
          <TcgCard key={`${card.id}-${idx}`} card={card} />
        ))}
      </div>
    </div>
  );
}
