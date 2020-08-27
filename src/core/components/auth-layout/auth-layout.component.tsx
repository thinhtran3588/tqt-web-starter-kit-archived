import React from 'react';
import Head from 'next/head';
import {useStyles} from './auth-layout.styles';

export interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthLayout = (props: AuthLayoutProps): JSX.Element => {
  const {
    title = 'TQT Web Starter Kit',
    description = 'The web starter kit written in Next.js, React and Typescript with <3',
    children,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta name='Description' content={description} />
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
