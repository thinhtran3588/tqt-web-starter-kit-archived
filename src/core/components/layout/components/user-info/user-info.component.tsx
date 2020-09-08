/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useI18n} from 'next-localization';
import Typography from '@material-ui/core/Typography';
import InputIcon from '@material-ui/icons/Input';
import type {RootState} from '@app/stores/store';
import {Link} from '@app/core/components/link/link.component';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
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
    <>
      {auth.isSignedIn && (
        <>
          <Box title={t('nav.openUserMenu')} onClick={openMenu} className={classes.profile}>
            <Hidden smDown>
              <Typography className={classes.userTitle} variant='body2'>
                {helloMessage}
              </Typography>
            </Hidden>
            <AccountCircleIcon />
          </Box>
          <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} role='button' onClose={closeMenu}>
            {authService && <MenuItem onClick={signOut}>{t('nav.signOut')}</MenuItem>}
          </Menu>
        </>
      )}
      {!auth.isSignedIn && (
        <Link href='/sign-in'>
          <IconButton role='button' color='inherit' title={t('nav.signIn')}>
            <InputIcon />
          </IconButton>
        </Link>
      )}
    </>
  );
};
