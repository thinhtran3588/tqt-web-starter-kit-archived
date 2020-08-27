import React from 'react';
import Head from 'next/head';
import {useStyles} from './auth-layout.styles';

export interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const AuthLayout = (props: AuthLayoutProps): JSX.Element => {
  const {title, children} = props;
  const classes = useStyles();
  const defaultTitle = 'TQT Web Starter Kit';
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
      {children}
    </div>
  );
};
