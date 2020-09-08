/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Provider} from 'react-redux';
import {I18nProvider} from 'next-localization';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoSsr from '@material-ui/core/NoSsr';
import {store, RootState} from '@app/stores/store';
import {NotificationProvider} from '@app/core/contexts/notification.context';
import {useShallowEqualSelector} from '@app/core/hooks/use-shallow-equal-selector';
import {GlobalError} from './components/global-error/global-error.component';
import {LoadingModal} from './components/loading-modal/loading-modal.component';

const Firebase = dynamic(() => import('./components/firebase/firebase.component').then((mod) => mod.Firebase));

interface AppPropviderProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}
const AppProvider = (props: AppPropviderProps): JSX.Element => {
  const {children, pageProps} = props;
  const {isLoadedFromStorage, theme, lng} = useShallowEqualSelector((state: RootState) => ({
    isLoadedFromStorage: state.isLoadedFromStorage,
    theme: state.settings.theme,
    lng: state.settings.language,
  }));
  const router = useRouter();

  const appTheme = createMuiTheme({
    palette: {
      primary: {
        main: lightBlue[800],
      },
      secondary: {
        main: purple[500],
      },
      error: {
        main: red.A400,
      },
      type: theme,
    },
  });

  useEffect(() => {
    if (isLoadedFromStorage && lng !== pageProps.lng) {
      const as = router.asPath
        .split('/')
        .map((path, index) => (index === 1 ? lng : path))
        .join('/');
      router.push(router.pathname, as);
    }
  }, [isLoadedFromStorage, lng, pageProps.lng, router]);

  return (
    <ThemeProvider theme={appTheme}>
      <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.lng}>
        <NotificationProvider>{children}</NotificationProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

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
          <CssBaseline />
          <GlobalError />
          <LoadingModal />
          <Firebase />
        </NoSsr>
      </AppProvider>
    </Provider>
  );
};
