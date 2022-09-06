/* eslint-disable import/no-named-default */
import StatsAndAbility from '@/components/commons/stats-and-ability';
import { default as SvelteCard } from '@/features/tcg-list/lib/components/card.svelte';
import { TcgCardData } from '@/types';
import { convert } from '@/utils/svelte-convert/convert';

type Props = {
  card: TcgCardData;
  onSelect?: (card: TcgCardData) => void;
  onClose?: () => void;
};

export default function TcgCardDetail({ card, onSelect, onClose }: Props) {
  const Card = convert({
    Component: SvelteCard,
    className: 'tcg-card min-w-[9.25rem] max-w-[19.25rem]',
    tag: 'div',
  });

  return (
    <>
      <div className="max-w-[19.25rem]">
        <Card
          id={card.id}
          name={card.name}
          number={card.number}
          supertype={card.supertype}
          subtypes={card.subtypes}
          rarity={card.rarity}
          img={card.images.large}
          showcase
        />
      </div>
      <div className="tcg-card__detail">
        <div className="flex justify-between">
          <h1 className="h2 lg:h1">Card Details</h1>
          <div className="flex justify-end gap-2">
            {onSelect && (
              <button
                type="button"
                className="rounded-md border border-emerald-500 bg-emerald-500/10 px-3 py-1 hover:bg-emerald-500/50"
                onClick={() => onSelect(card)}
              >
                Select
              </button>
            )}
            {onClose && (
              <button
                type="button"
                className="rounded-md border border-slate-500 px-3 py-1 hover:bg-slate-500/10"
                onClick={onClose}
              >
                Close
              </button>
            )}
          </div>
        </div>
        <hr className="my-3" />

        <StatsAndAbility card={card} />
      </div>
    </>
  );
}
