import CardComparison from '@/features/compare-cards/components/card-comparison';
import CardComparisonSeo from '@/features/compare-cards/components/card-comparison-seo';
import SearchCard from '@/features/compare-cards/components/search-card';

export default function CompareCardsPage() {
  const cards = [];

  if (cards.length === 0) {
    return (
      <>
        <CardComparisonSeo />
        <h1 className="h1 pb-6">Compare Card</h1>
        <SearchCard />
      </>
    );
  }

  return (
    <>
      <CardComparisonSeo />
      <CardComparison />
    </>
  );
}
