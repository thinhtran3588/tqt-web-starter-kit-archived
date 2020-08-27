import React from 'react';
import {useStyles} from './auth-layout.styles';
import {BaseLayout} from '../base-layout/base-layout.component';

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
    <BaseLayout title={title} description={description}>
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
