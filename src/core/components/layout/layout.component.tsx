import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import {Link} from '@app/core/i18n';
import {BaseLayout} from '../base-layout/base-layout.component';
import {useStyles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const appName = 'TQT Web Starter Kit';
  const {
    title = appName,
    description = 'The web starter kit written in Next.js, React and Typescript with <3',
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

  const {
    t,
    i18n: {language, changeLanguage},
  } = useTranslation('common');
  const [langAnchorEl, setLangAnchorEl] = useState(undefined);

  const openLangMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLangAnchorEl(event.currentTarget);
  };

  const closeLangMenu = (): void => {
    setLangAnchorEl(undefined);
  };

  const changeLang = (lang: string): void => {
    changeLanguage(lang);
    closeLangMenu();
  };

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
          {pageLinks.map((link) => (
            <Link href={link.url} key={link.url}>
              <a href={link.url} title={t(link.key)}>
                <Button variant='text' color='inherit' size='large' className={classes.pageLinkButton}>
                  {t(link.key)}
                </Button>
              </a>
            </Link>
          ))}
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
          <Link href='/signin' key='signin'>
            <a href='/signin' title='Sign In'>
              <Button variant='text' color='inherit' size='large' startIcon={<Icon>login</Icon>}>
                {t('signIn')}
              </Button>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
