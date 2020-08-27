import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {BaseLayout} from '../base-layout/base-layout.component';
import {useStyles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {
    title = 'TQT Web Starter Kit',
    description = 'The web starter kit written in Next.js, React and Typescript with <3',
    children,
  } = props;
  const classes = useStyles();
  const pageLinks = [
    {title: 'Home', url: '/'},
    {title: 'Blogs', url: '/blogs'},
    {title: 'About', url: '/about'},
    {title: 'Form', url: '/form'},
  ];
  return (
    <BaseLayout title={title} description={description}>
      <AppBar position='static'>
        <Toolbar>
          <Link href='/'>
            <a href='/'>
              <img src='/app-icon.png' alt='TQT Logo' className={classes.logo} />
            </a>
          </Link>
          <Typography variant='h6' className={classes.title}>
            {title}
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
          <Link href='/signin' key='signin'>
            <a href='/signin' title='Sign In'>
              <IconButton color='inherit' title='Sign In'>
                <Icon>login</Icon>
              </IconButton>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
