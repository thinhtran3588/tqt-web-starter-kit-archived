/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useI18n} from 'next-localization';
import Typography from '@material-ui/core/Typography';
import InputIcon from '@material-ui/icons/Input';
import type {RootState} from '@app/stores/store';
import {Link} from '@app/core/components/link/link.component';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import type {AuthService} from '@app/modules/auth/interfaces/auth.service.interface';
import {useStyles} from './user-info.styles';

export const UserInfo = (): JSX.Element => {
  const classes = useStyles();
  const {t} = useI18n();
  const auth = useSelector((state: RootState) => state.auth);
  const [menuAnchorEl, setMenuAnchorEl] = useState(undefined);
  const helloMessage = `${t('common.hello')}, ${auth.displayName}`;
  const [authService, setAuthService] = useState<AuthService>();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = (): void => {
    setMenuAnchorEl(undefined);
  };

  const signOut = (): void => {
    authService.signOut();
  };

  return (
    <Box>
      {auth.isSignedIn && (
        <>
          <Box onClick={openMenu} className={classes.profile}>
            <Typography className={classes.userTitle} variant='body2'>
              {helloMessage}
            </Typography>
            <AccountCircleIcon />
          </Box>
          <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} role='button' onClose={closeMenu}>
            {authService && <MenuItem onClick={signOut}>{t('nav.signOut')}</MenuItem>}
          </Menu>
        </>
      )}
      {!auth.isSignedIn && (
        <Link href='/signin'>
          <Button variant='text' color='inherit' size='large' className={classes.linkButton} startIcon={<InputIcon />}>
            {t('nav.signIn')}
          </Button>
        </Link>
      )}
    </Box>
  );
};
