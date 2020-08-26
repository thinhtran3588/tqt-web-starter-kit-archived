import React from 'react';
import Head from 'next/head';
import styles from './layout.module.css';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {title, children} = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title || 'TQT Web Starter Kit'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {children}
    </div>
  );
};
