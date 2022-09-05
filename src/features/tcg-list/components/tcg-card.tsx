/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-named-default */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { QueryCardsData } from '@/api/tcg-queries/cards';
import Modal from '@/components/commons/modal';
import StatsAndAbility from '@/components/commons/stats-and-ability';
import TcgImage from '@/components/commons/tcg-image';
import { default as SvelteCard } from '@/features/tcg-list/lib/components/card.svelte';
import { convert } from '@/utils/svelte-convert/convert';

type Props = {
  card: QueryCardsData[0];
};

function TcgCard({ card }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const Card = convert({
    Component: SvelteCard,
    className: 'tcg-card min-w-[9.25rem] max-w-[19.25rem]',
    tag: 'div',
  });

  return (
    <>
      <div className="tcg-card" onClick={() => setOpenModal(true)}>
        <TcgImage img={card.images.large} />
      </div>
      <Modal
        classPanel="!bg-transparent"
        visible={openModal}
        onClose={() => setOpenModal(false)}
        footer={<div />}
      >
        <div className="tcg-card__modal-content lg:max-h-[30rem]">
          <div className="max-w-[19.25rem]">
            <Card
              id={card.id}
              name={card.name}
              number={card.number}
              supertype={card.supertype}
              subtypes={card.subtypes}
              rarity={card.rarity}
              img={card.images.large}
            />
          </div>
          <div className="tcg-card__detail">
            <div className="flex justify-between">
              <h1 className="h1">Card Details</h1>
              <button
                type="button"
                className="rounded-md border border-slate-500 px-3 py-1 hover:bg-slate-500/10"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
            <hr className="my-3" />

            <StatsAndAbility card={card} />
          </div>
        </div>
      </Modal>
    </>
  );
  // return (

  // );
}

export default TcgCard;
