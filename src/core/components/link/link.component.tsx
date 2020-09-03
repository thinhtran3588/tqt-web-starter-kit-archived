/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import {useI18n} from 'next-localization';
import {config} from '@app/core/config';

export interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
}
export const Link = (props: LinkProps): JSX.Element => {
  const {children, href, as, ...other} = props;
  const {locale} = useI18n();
  const lng = locale() || config.defaultLng;

  return (
    <NextLink href={`/[lng]${href}`} as={`/${lng}${as || href}`} {...other}>
      <a href={`/${lng}${as || href}`}>{children}</a>
    </NextLink>
  );
};
