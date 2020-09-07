/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Box from '@material-ui/core/Box';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {Header} from './components/header/header.component';
import {useStyles} from './layout.styles';

export const Layout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const classes = useStyles();

  return (
    <BaseLayout {...other}>
      <Header />
      <Box className={classes.root}>{children}</Box>
    </BaseLayout>
  );
};
