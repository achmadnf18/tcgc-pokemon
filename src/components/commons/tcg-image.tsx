import Head from 'next/head';
import { ReactEventHandler } from 'react';

type Props = {
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  img?: string;
  alt?: string;
  onError?: ReactEventHandler<HTMLImageElement>;
};

export default function TcgImage({
  priority,
  className,
  imgClassName,
  img,
  alt = 'pokemon',
  onError,
  ...props
}: Props & JSX.IntrinsicElements['picture']) {
  return (
    <>
      {priority && (
        <Head>
          <link rel="preload" as="image" href={img} />
        </Head>
      )}

      <picture className={className} onError={onError} {...props}>
        <source srcSet={img} type="image/png" />
        <img src={img} alt={alt} loading={priority ? undefined : 'lazy'} className={imgClassName} />
      </picture>
    </>
  );
}
