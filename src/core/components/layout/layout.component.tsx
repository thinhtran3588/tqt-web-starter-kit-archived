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
import {BaseLayout} from '../base-layout/base-layout.component';
import {useStyles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const language = 'en';
  const t = (key: string): string => key;
  const appName = 'TQT';
  const {
    title = appName,
    description = 'The starter kit written in Next.js, React and Typescript with <3',
    children,
  } = props;
  const classes = useStyles();
  const pageLinks = [
    {url: '/', key: 'home'},
    {url: '/blogs', key: 'blogs'},
    {url: '/about', key: 'about'},
    {url: '/form', key: 'form'},
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

  const openMenu = (): void => {};

  return (
    <BaseLayout title={title} description={description}>
      <AppBar position='static' variant='elevation'>
        <Toolbar>
          <Link href='/'>
            <a href='/'>
              <img src='/images/app-icon.png' alt='TQT Logo' className={classes.logo} />
            </a>
          </Link>
          <Typography variant='h6' className={classes.title}>
            {appName}
          </Typography>
          <Hidden xsDown>
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
          <IconButton aria-controls='language-menu' color='inherit' title='Change language' onClick={openLangMenu}>
            <img src={`/images/flag-${language}.png`} alt='lang' className={classes.flag} />
          </IconButton>
          <Menu
            id='language-menu'
            anchorEl={langAnchorEl}
            keepMounted
            open={Boolean(langAnchorEl)}
            onClose={closeLangMenu}>
            {languages.map((lang) => (
              <MenuItem onClick={() => changeLang(lang.code)} key={lang.code}>
                <img src={`/images/flag-${lang.code}.png`} alt={lang.title} className={classes.langFlag} />
                {lang.title}
              </MenuItem>
            ))}
          </Menu>
          <Hidden xsDown>
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
          <Hidden smUp>
            <IconButton aria-controls='menu' color='inherit' title='Open Menu' onClick={openMenu}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
