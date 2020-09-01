import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';
import {Link} from '@app/core/components/link/link.component';
import type {AuthService} from '@auth/interfaces/auth.service.interface';
import {useStyles} from './sign-in.styles';

export const SignInScreen = (): JSX.Element => {
  const classes = useStyles();
  const [authService, setAuthService] = useState<AuthService>();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const signIn = async (): Promise<void> => {
    await authService.signInEmail({email: 'quangthinhtran3588@gmail.com', password: 'Abc@123'});
  };

  return (
    <AuthLayout title='Sign In'>
      <form className={classes.form} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
        <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={signIn}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='/recoverpassword'>
              <Typography variant='body2'>Forgot password?</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href='/sighup'>
              <Typography variant='body2'>Don&apos;t have an account? Sign Up</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export {getStaticPaths, getStaticProps};
