/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import Link from 'next/link';
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
import {config} from '@app/core/config';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {Drawer} from './components/drawer/drawer.component';
import {useStyles} from './layout.styles';

export const Layout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const language = 'en';
  const t = (key: string): string => key;
  const {appName} = config;
  const classes = useStyles();
  const pageLinks = [
    {url: '/', key: 'home', text: 'home'},
    {url: '/blogs', key: 'blogs', text: 'blogs'},
    {url: '/about', key: 'about', text: 'about'},
    {url: '/form', key: 'form', text: 'form'},
  ];
  const languages = [
    {
      code: 'en',
      title: 'English',
    },
    {
      code: 'vi',
      title: 'Tiếng Việt',
    },
  ];
  const [openDrawer, setOpenDrawer] = useState(false);

  const [langAnchorEl, setLangAnchorEl] = useState(undefined);

  const openLangMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLangAnchorEl(event.currentTarget);
  };

  const closeLangMenu = (): void => {
    setLangAnchorEl(undefined);
  };

  const changeLang = (_lang: string): void => {
    closeLangMenu();
  };

  return (
    <BaseLayout {...other}>
      <AppBar position='static' variant='elevation'>
        <Toolbar>
          <Link href='/'>
            <a href='/'>
              <img src='/images/icons/app-icon.png' alt='TQT Logo' className={classes.logo} />
            </a>
          </Link>
          <Typography variant='h6' className={classes.title}>
            {appName}
          </Typography>
          <Hidden smDown>
            {pageLinks.map((link) => (
              <Link href={link.url} key={link.url}>
                <a href={link.url} title={t(link.key)}>
                  <Button variant='text' color='inherit' size='large' className={classes.linkButton}>
                    {t(link.key)}
                  </Button>
                </a>
              </Link>
            ))}
          </Hidden>
          <Hidden smDown>
            <Link href='/signin' key='signin'>
              <a href='/signin' title='Sign In'>
                <Button
                  variant='text'
                  color='inherit'
                  size='large'
                  className={classes.linkButton}
                  startIcon={<InputIcon />}>
                  {t('signIn')}
                </Button>
              </a>
            </Link>
          </Hidden>
          <Hidden mdUp>
            <IconButton role='button' title='Open Menu' color='inherit' onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <IconButton role='button' title='Change language' color='inherit' onClick={openLangMenu}>
            <img src={`/images/flag-${language}.png`} alt='lang' className={classes.flag} />
          </IconButton>
          <Menu anchorEl={langAnchorEl} keepMounted open={Boolean(langAnchorEl)} role='button' onClose={closeLangMenu}>
            {languages.map((lang) => (
              <MenuItem onClick={() => changeLang(lang.code)} key={lang.code}>
                <img src={`/images/flag-${lang.code}.png`} alt={lang.title} className={classes.langFlag} />
                {lang.title}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer menuItems={pageLinks} open={openDrawer} setOpen={setOpenDrawer} />
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
