import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {useStyles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {title, children} = props;
  const classes = useStyles();
  const defaultTitle = 'TQT Web Starter Kit';
  const pageLinks = [
    {title: 'Home', url: '/'},
    {title: 'Blogs', url: '/blogs'},
    {title: 'About', url: '/about'},
    {title: 'Form', url: '/form'},
  ];
  return (
    <div className={classes.root}>
      <Head>
        <title>{title || defaultTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='preload'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          as='style'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onLoad={"this.onload=null;this.rel='stylesheet'" as any}
        />
        <link
          rel='preload'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          as='style'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onLoad={"this.onload=null;this.rel='stylesheet'" as any}
        />
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Link href='/'>
            <a href='/'>
              <img src='/app-icon.png' alt='TQT Logo' className={classes.logo} />
            </a>
          </Link>
          <Typography variant='h6' className={classes.title}>
            {defaultTitle}
          </Typography>
          {pageLinks.map((link) => (
            <Link href={link.url} key={link.url}>
              <a href={link.url}>
                <Typography variant='h6' className={classes.pageLink}>
                  {link.title}
                </Typography>
              </a>
            </Link>
          ))}
          <Link href='/login' key='login'>
            <a href='/login'>
              <Icon title='Login'>login</Icon>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};
