import React from 'react';
import Head from 'next/head';
import config from '@app/core/config.json';

export interface BaseLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

export const BaseLayout = (props: BaseLayoutProps): JSX.Element => {
  const {
    title = config.appName,
    description = config.appDescription,
    url = config.domain,
    imageUrl = `${config.domain}/images/icons/android-chrome-192x192.png`,
    children,
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='Description' content={description} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={imageUrl} />
        <meta name='twitter:creator' content={config.author} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={config.appName} />
        <meta property='og:url' content={url} />
        <meta property='og:image' content={imageUrl} />
      </Head>
      {children}
    </>
  );
};
