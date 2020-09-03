/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import config from '@app/core/config.json';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {useStyles} from './auth-layout.styles';

export const AuthLayout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const classes = useStyles();
  return (
    <BaseLayout {...other}>
      <Grid container component='main' className={classes.root}>
        <Hidden xsDown>
          <Grid item className={classes.image} />
        </Hidden>
        <Grid xs={12} item component={Paper} elevation={6} square className={classes.rightPanel}>
          <div className={classes.paper}>
            <img src='/images/icons/app-logo.png' alt='TQT Logo' className={classes.logo} />
            <Box className={classes.formContainer}>{children}</Box>
            <Box mt={5}>
              <Typography variant='body2' color='textSecondary' align='center'>
                {`Copyright © ${config.author} ${new Date().getFullYear()}`}
              </Typography>
            </Box>
          </div>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
