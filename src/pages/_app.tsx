import '@/styles/globals.css';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';

import Layout from '@/components/layouts/layout';
import getQueryClient from '@/config/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo
          defaultTitle="Pokémon TCG Center"
          titleTemplate="%s | Pokémon TCG Center"
          description={process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION || 'Pokémon TCG Center'}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
