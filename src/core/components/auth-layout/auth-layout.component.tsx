/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src='/images/icons/app-logo.png' alt='TQT Logo' className={classes.logo} />
            <Typography component='h1' variant='h5'>
              {other.title}
            </Typography>
            {children}
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
