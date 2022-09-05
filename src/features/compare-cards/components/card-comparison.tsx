import { MAX_CARD_TO_COMPARE } from '@/constants';

import SearchCard from './search-card';

export default function CardComparison() {
  const cards = [];

  return (
    <>
      <h1 className="h1 pb-5 xl:pr-16">Compare Card</h1>
      {cards.length < MAX_CARD_TO_COMPARE && (
        <div className="-mx-1.5 pb-5 lg:-mx-0.5">
          <SearchCard />
        </div>
      )}
    </>
  );
}
