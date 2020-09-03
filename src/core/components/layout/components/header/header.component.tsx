/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {useI18n} from 'next-localization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import NoSsr from '@material-ui/core/NoSsr';
import config from '@app/core/config.json';
import {LanguageSetting} from '@app/core/components/language-setting/language-setting.component';
import {Link} from '@app/core/components/link/link.component';
import {Drawer} from '../drawer/drawer.component';
import {useStyles} from './header.styles';
import {UserInfo} from '../user-info/user-info.component';

export const Header = (): JSX.Element => {
  const classes = useStyles();
  const {t} = useI18n();
  const {appName} = config;
  const menuItems = [
    {url: '/', key: 'home', title: t('nav.home')},
    {url: '/blogs', key: 'blogs', title: t('nav.blogs')},
    {url: '/about', key: 'about', title: t('nav.about')},
    {url: '/form', key: 'form', title: t('nav.form')},
  ];
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <LanguageSetting />
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
