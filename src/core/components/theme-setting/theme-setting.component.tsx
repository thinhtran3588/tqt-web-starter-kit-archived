import React from 'react';
import {useI18n} from 'next-localization';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {useDispatch, useSelector} from 'react-redux';
import type {Dispatch, RootState} from '@app/stores/store';

export const ThemeSetting = (): JSX.Element => {
  const {t} = useI18n();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const {
    settings: {setTheme},
  } = useDispatch<Dispatch>();

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton role='button' title={t('nav.changeTheme')} color='inherit' onClick={toggleTheme}>
      {theme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};
