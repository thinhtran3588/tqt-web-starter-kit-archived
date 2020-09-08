/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {config} from '@app/core/config';
import {BaseLayout, BaseLayoutProps} from '../base-layout/base-layout.component';
import {useStyles} from './auth-layout.styles';
import {LanguageSetting} from '../language-setting/language-setting.component';
import {ThemeSetting} from '../theme-setting/theme-setting.component';

export const AuthLayout = (props: BaseLayoutProps): JSX.Element => {
  const {children, ...other} = props;
  const classes = useStyles();

  return (
    <BaseLayout {...other}>
      <Grid container component='main' className={classes.root}>
        <Grid item xs={false} sm={4} md={7} lg={8} xl={9} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square>
          <Box className={classes.paper}>
            <img src='/images/icons/app-logo.png' alt='TQT Logo' className={classes.logo} />
            <Box className={classes.formContainer}>{children}</Box>
            <Box className={classes.settings}>
              <LanguageSetting />
              <ThemeSetting />
            </Box>

            <Typography variant='body2' color='textSecondary' align='center'>
              {`Copyright © ${config.author} ${new Date().getFullYear()}`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
