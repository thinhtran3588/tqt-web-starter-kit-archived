import React from 'react';
import Typography from '@material-ui/core/Typography';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';

export const SignInScreen = (): JSX.Element => {
  return (
    <AuthLayout title='About'>
      <Typography variant='h6'>Sign In</Typography>
    </AuthLayout>
  );
};

export {getStaticPaths, getStaticProps};
