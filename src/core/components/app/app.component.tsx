/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {I18nProvider} from 'next-localization';

export const App = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.lng}>
        <Component {...pageProps} />
      </I18nProvider>
    </>
  );
};
