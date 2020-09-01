import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';
import {Link} from '@app/core/components/link/link.component';
import {useStyles} from './sign-in.styles';

export const SignInScreen = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AuthLayout title='Sign In'>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
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
        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
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
