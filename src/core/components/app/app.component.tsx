import React from 'react';
import type {AppProps} from 'next/app';
import NextApp from 'next/app';
import {appWithTranslation} from '@app/core/i18n';

const AppBase = ({Component, pageProps}: AppProps): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};
AppBase.getInitialProps = async (appContext) => ({...(await NextApp.getInitialProps(appContext))});
export const App = appWithTranslation(AppBase);
