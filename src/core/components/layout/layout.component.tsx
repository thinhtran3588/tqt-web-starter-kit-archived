/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {Header} from './components/header/header.component';
import {useStyles} from './layout.styles';

export const Layout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const classes = useStyles();

  return (
    <BaseLayout {...other}>
      <Grid container component='main' className={classes.root}>
        <Header />
        <Grid item component={Paper} square className={classes.container}>
          {children}
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
