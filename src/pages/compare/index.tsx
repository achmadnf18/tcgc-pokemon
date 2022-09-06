import { uniq } from 'lodash';

import CardComparisonContainer from '@/features/compare-cards/components/card-comparison-container';
import CardComparisonSeo from '@/features/compare-cards/components/card-comparison-seo';
import SearchCard from '@/features/compare-cards/components/search-card';
import { useCompareCards } from '@/features/compare-cards/contexts/compare-cards';
import TcgCardDetail from '@/features/tcg-list/components/tcg-card-detail';

export default function CompareCardsPage() {
  const { compareCards, setCompareCards } = useCompareCards();

  return (
    <>
      <CardComparisonSeo />
      <h1 className="h1 pb-6">Compare Card</h1>
      <SearchCard onSelect={(card) => setCompareCards(uniq([...(compareCards || []), card]))} />
      <div className="card-comparison flex overflow-x-auto">
        {compareCards.map((card) => (
          <CardComparisonContainer key={card.id}>
            <div className="tcg-card__modal-content card-comparison">
              <TcgCardDetail card={card} />
            </div>
          </CardComparisonContainer>
        ))}
      </div>
    </>
  );
}
