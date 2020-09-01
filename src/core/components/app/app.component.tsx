/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {I18nProvider} from 'next-localization';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {theme} from '@app/core/theme';

export const App = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.lng}>
          <Component {...pageProps} />
        </I18nProvider>
      </ThemeProvider>
    </>
  );
};
