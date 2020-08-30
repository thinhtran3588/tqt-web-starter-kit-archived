import React from 'react';
import Head from 'next/head';

export interface BaseLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const BaseLayout = (props: BaseLayoutProps): JSX.Element => {
  const {
    title = 'TQT',
    description = 'The web starter kit written in Next.js, React and Typescript with <3',
    children,
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='Description' content={description} />
      </Head>
      {children}
    </>
  );
};
