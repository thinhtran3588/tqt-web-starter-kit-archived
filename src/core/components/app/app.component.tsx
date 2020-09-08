/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoSsr from '@material-ui/core/NoSsr';
import {store} from '@app/stores/store';
import {GlobalError} from './components/global-error/global-error.component';
import {LoadingModal} from './components/loading-modal/loading-modal.component';
import {LanguageHanlder} from './components/language-handler/language-handler.component';
import {AppProvider} from './components/app-provider/app-provider.component';

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
      <AppProvider pageProps={pageProps}>
        <Component {...pageProps} />
        <NoSsr>
          <LanguageHanlder lngDict={pageProps.lngDict} lng={pageProps.lng} />
          <CssBaseline />
          <GlobalError />
          <LoadingModal />
          <Firebase />
        </NoSsr>
      </AppProvider>
    </Provider>
  );
};
