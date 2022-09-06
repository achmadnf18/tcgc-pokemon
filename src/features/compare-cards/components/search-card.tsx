/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useState } from 'react';

import { useCardByName } from '@/api/tcg-queries/card-names';
import TcgCard from '@/features/tcg-list/components/tcg-card';
import { TcgCardData } from '@/types';

type Props = {
  onSelect?: (card: TcgCardData) => void;
};

export default function SearchCard({ onSelect }: Props) {
  const [keyword, setKeyword] = useState('');
  const [showResult, setShowResult] = useState(false);

  const {
    data: cards = [],
    isPreviousData,
    isFetching,
  } = useCardByName({
    name: keyword,
  });

  return (
    <div className="flex flex-col">
      <div className="mb-5 flex h-[38px]">
        <input
          type="text"
          placeholder="🔍 Search Trading Card"
          className="h-full w-full rounded-md bg-slate-200 px-3 dark:bg-dark-base dark:ring-1 dark:ring-dark-light"
          onChange={debounce(({ target }) => {
            setKeyword(target.value);
            setShowResult(true);
          }, 600)}
        />
      </div>
      {keyword.length > 0 && (
        <div className="flex items-center gap-3 pb-5">
          <h2 className="h2">Search Result</h2>
          <button
            type="button"
            className="rounded-md border border-slate-500 px-3 py-1 hover:bg-slate-500/10"
            onClick={() => setShowResult(!showResult)}
          >
            {showResult ? 'Hide' : 'Show'}
          </button>
        </div>
      )}
      <div className="relative z-30">
        <div className="absolute inset-x-0">
          <div className={clsx('tcg-card__search-result', !showResult && 'hidden')}>
            {isFetching && <h1 className="text-center text-sm italic">⏳ Loading...</h1>}
            {!isFetching && cards.length === 0 && (
              <h1 className="text-center text-sm italic">No data for &quot;{keyword}&quot;</h1>
            )}
            <div
              className={clsx(
                'tcg-card-container card-comparison__search-result relative',
                isPreviousData && 'opacity-60',
              )}
            >
              {cards?.map((card, idx) => (
                <TcgCard key={`${card.id}-${idx}`} card={card} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
