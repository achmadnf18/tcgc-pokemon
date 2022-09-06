import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function CardComparisonContainer({ children }: Props) {
  return (
    <div className={clsx('max-w-[17rem] flex-none pr-2 pr-4 lg:max-w-[27rem] lg:snap-start')}>
      {children}
    </div>
  );
}
