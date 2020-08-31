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
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import config from '@app/core/config.json';
import {languages, languageMap} from '@app/core/i18n/i18n';
import {Link} from '../link/link.component';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {Drawer} from './components/drawer/drawer.component';
import {useStyles} from './layout.styles';

export const Layout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const {t, locale} = useI18n();
  const router = useRouter();
  const {appName} = config;
  const classes = useStyles();
  const pages = [
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
    <BaseLayout {...other}>
      <AppBar position='static' variant='elevation'>
        <Toolbar>
          <Link href='/'>
            <img src='/images/icons/app-icon.png' alt='TQT Logo' className={classes.logo} />
          </Link>
          <Typography variant='h6' className={classes.title}>
            {appName}
          </Typography>
          <Hidden smDown>
            {pages.map((page) => (
              <Link href={page.url} key={page.url}>
                <Button variant='text' color='inherit' size='large' className={classes.linkButton}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Hidden>
          <Hidden smDown>
            <Link href='/signin'>
              <Button
                variant='text'
                color='inherit'
                size='large'
                className={classes.linkButton}
                startIcon={<InputIcon />}>
                {t('nav.signIn')}
              </Button>
            </Link>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              role='button'
              title={t('nav.openMenu')}
              color='inherit'
              onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
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
        </Toolbar>
      </AppBar>
      <Drawer menuItems={pages} open={openDrawer} setOpen={setOpenDrawer} />
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
