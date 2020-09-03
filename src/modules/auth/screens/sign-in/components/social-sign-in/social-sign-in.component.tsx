import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import type {Dispatch} from '@app/stores/store';
import type {AuthService} from '@app/modules/auth/interfaces/auth.service.interface';
import type {SignInType} from '@app/modules/auth/models/auth.model';
import {useRouter} from '@app/core/hooks/use-router';
import IconButton from '@material-ui/core/IconButton';
import {useI18n} from 'next-localization';
import {useStyles} from './social-sign-in.styles';

export const SocialSignIn = (): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const {t} = useI18n();
  const {
    loading: {setLoading},
  } = useDispatch<Dispatch>();
  const [authService, setAuthService] = useState<AuthService>();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const signIn = async (signInType: SignInType): Promise<void> => {
    setLoading(true);
    let isSignedIn = false;

    switch (signInType) {
      case 'APPLE':
        isSignedIn = await authService.signInApple();
        break;
      case 'GOOGLE':
        isSignedIn = await authService.signInGoogle();
        break;
      case 'FACEBOOK':
        isSignedIn = await authService.signInFacebook();
        break;
      default:
        return;
    }

    if (isSignedIn) {
      router.push('/');
    }

    setLoading(false);
  };
  return (
    <Box className={classes.container}>
      <IconButton role='button' title={t('auth.loginFacebook')} color='inherit' onClick={() => signIn('FACEBOOK')}>
        <FacebookIcon color='primary' className={classes.socialIcon} />
      </IconButton>
      <IconButton role='button' title={t('auth.loginFacebook')} color='inherit' onClick={() => signIn('GOOGLE')}>
        <img src='/images/icons/google-icon.png' alt='Google Icon' className={classes.socialIcon} />
      </IconButton>
      <IconButton role='button' title={t('auth.loginApple')} color='inherit' onClick={() => signIn('APPLE')}>
        <AppleIcon className={classes.socialIcon} />
      </IconButton>
    </Box>
  );
};
