import React from 'react';
import type {AppProps} from 'next/app';

export const App = ({Component, pageProps}: AppProps): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};
