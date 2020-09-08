/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useI18n} from 'next-localization';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {config} from '@app/core/config';
import {languages, languageMap} from '@app/core/i18n/i18n';
import {useDispatch} from 'react-redux';
import type {Dispatch} from '@app/stores/store';
import {useStyles} from './language-setting.styles';

export const LanguageSetting = (): JSX.Element => {
  const router = useRouter();
  const classes = useStyles();
  const {t, locale} = useI18n();
  const [langAnchorEl, setLngAnchorEl] = useState(undefined);
  const {
    settings: {setLanguage},
  } = useDispatch<Dispatch>();

  const openLngMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLngAnchorEl(event.currentTarget);
  };

  const closeLngMenu = (): void => {
    setLngAnchorEl(undefined);
  };

  const changeLng = (lng: string): void => {
    closeLngMenu();
    const as = router.asPath
      .split('/')
      .map((path, index) => (index === 1 ? lng : path))
      .join('/');
    router.push(router.pathname, as);
    setLanguage(lng);
  };

  return (
    <>
      <IconButton role='button' title={t('nav.changeLanguage')} color='inherit' onClick={openLngMenu}>
        <img src={`/images/flag-${locale() || config.defaultLng}.png`} alt='lang' className={classes.flag} />
      </IconButton>
      <Menu anchorEl={langAnchorEl} keepMounted open={Boolean(langAnchorEl)} role='button' onClose={closeLngMenu}>
        {languages.map((lng) => (
          <MenuItem key={lng} onClick={() => changeLng(lng)}>
            <img src={`/images/flag-${lng}.png`} alt={languageMap[lng].name} className={classes.lngFlag} />
            {languageMap[lng].name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
