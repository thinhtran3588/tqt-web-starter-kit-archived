/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {I18nProvider} from 'next-localization';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoSsr from '@material-ui/core/NoSsr';
import {theme} from '@app/core/theme';
import {store} from '@app/stores/store';
import {Provider} from 'react-redux';
import {GlobalError} from './components/global-error/global-error.component';
import {LoadingModal} from './components/loading-modal/loading-modal.component';

const Firebase = dynamic(() => import('./components/firebase/firebase.component').then((mod) => mod.Firebase));

export const App = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.lng}>
          <Component {...pageProps} />
          <NoSsr>
            <CssBaseline />
            <GlobalError />
            <LoadingModal />
            <Firebase />
          </NoSsr>
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  );
};
