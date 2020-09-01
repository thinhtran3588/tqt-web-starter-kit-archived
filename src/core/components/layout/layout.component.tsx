/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {Header} from './components/header/header.component';
import {useStyles} from './layout.styles';

export const Layout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const classes = useStyles();

  return (
    <BaseLayout {...other}>
      <Header />
      <div className={classes.root}>{children}</div>
    </BaseLayout>
  );
};
