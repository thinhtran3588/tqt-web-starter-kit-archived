/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {I18nProvider} from 'next-localization';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import {RootState} from '@app/stores/store';
import {NotificationProvider} from '@app/core/contexts/notification.context';
import {useShallowEqualSelector} from '@app/core/hooks/use-shallow-equal-selector';

export interface AppPropviderProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

export const AppProvider = (props: AppPropviderProps): JSX.Element => {
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
