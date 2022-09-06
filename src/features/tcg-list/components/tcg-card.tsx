import { useState } from 'react';

import Modal from '@/components/commons/modal';
import TcgImage from '@/components/commons/tcg-image';
import { TcgCardData } from '@/types';

import TcgCardDetail from './tcg-card-detail';

type Props = {
  card: TcgCardData;
  onSelect?: (card: TcgCardData) => void;
};

function TcgCard({ card, onSelect }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const doSelect = (selectedCard: TcgCardData) => {
    onSelect?.(selectedCard);
    setOpenModal(false);
  };

  return (
    <>
      <div role="none" className="tcg-card" onClick={() => setOpenModal(true)}>
        <TcgImage img={card.images.small} />
      </div>
      <Modal
        classPanel="!bg-transparent"
        visible={openModal}
        onClose={() => setOpenModal(false)}
        footer={<div />}
      >
        <div className="tcg-card__modal-content lg:max-h-[30rem]">
          <TcgCardDetail
            card={card}
            onSelect={onSelect ? doSelect : undefined}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </Modal>
    </>
  );
  // return (

  // );
}

export default TcgCard;
