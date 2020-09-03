/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useI18n} from 'next-localization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import NoSsr from '@material-ui/core/NoSsr';
import config from '@app/core/config.json';
import {languages, languageMap} from '@app/core/i18n/i18n';
import {Link} from '@app/core/components/link/link.component';
import {Drawer} from '../drawer/drawer.component';
import {useStyles} from './header.styles';
import {UserInfo} from '../user-info/user-info.component';

export const Header = (): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const {t, locale} = useI18n();
  const {appName} = config;
  const menuItems = [
    {url: '/', key: 'home', title: t('nav.home')},
    {url: '/blogs', key: 'blogs', title: t('nav.blogs')},
    {url: '/about', key: 'about', title: t('nav.about')},
    {url: '/form', key: 'form', title: t('nav.form')},
  ];
  const [openDrawer, setOpenDrawer] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState(undefined);

  const openLangMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLangAnchorEl(event.currentTarget);
  };

  const closeLangMenu = (): void => {
    setLangAnchorEl(undefined);
  };

  const changeLang = (lng: string): void => {
    router.push('/[lng]', `/${lng}`);
    closeLangMenu();
  };

  return (
    <AppBar position='static' variant='elevation'>
      <Toolbar>
        <Link href='/'>
          <img src='/images/icons/app-icon.png' alt='TQT Logo' className={classes.logo} />
        </Link>
        <Typography variant='h6' className={classes.title}>
          {appName}
        </Typography>
        <Hidden smDown>
          {menuItems.map((item) => (
            <Link href={item.url} key={item.url}>
              <Button variant='text' color='inherit' size='large' className={classes.linkButton}>
                {item.title}
              </Button>
            </Link>
          ))}
        </Hidden>
        <NoSsr>
          <UserInfo />
        </NoSsr>
        <IconButton role='button' title={t('nav.changeLanguage')} color='inherit' onClick={openLangMenu}>
          <img src={`/images/flag-${locale() || config.defaultLng}.png`} alt='lang' className={classes.flag} />
        </IconButton>
        <Menu anchorEl={langAnchorEl} keepMounted open={Boolean(langAnchorEl)} role='button' onClose={closeLangMenu}>
          {languages.map((lng) => (
            <MenuItem key={lng} onClick={() => changeLang(lng)}>
              <img src={`/images/flag-${lng}.png`} alt={languageMap[lng].name} className={classes.lngFlag} />
              {languageMap[lng].name}
            </MenuItem>
          ))}
        </Menu>
        <Hidden mdUp>
          <IconButton
            role='button'
            title={t('nav.openMenu')}
            color='inherit'
            onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Drawer menuItems={menuItems} open={openDrawer} setOpen={setOpenDrawer} />
    </AppBar>
  );
};
