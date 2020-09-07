/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {useI18n} from 'next-localization';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';
import {EmailSignIn} from './components/email-sign-in/email-sign-in.component';
import {EmailSignUp} from './components/email-sign-up/email-sign-up.component';
import {SocialSignIn} from './components/social-sign-in/social-sign-in.component';
import {useStyles} from './sign-in.styles';

export const SignInScreen = (): JSX.Element => {
  const classes = useStyles();
  const {t} = useI18n();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <AuthLayout title={t('nav.signIn')}>
      <Tabs
        value={tabIndex}
        onChange={(_event, newIndex) => setTabIndex(newIndex)}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'>
        <Tab label={t('auth.signIn')} id='tab-sign-in' aria-controls='tab-sign-in' className={classes.tab} />
        <Tab label={t('auth.signUp')} id='tab-sign-up' aria-controls='tab-sign-up' className={classes.tab} />
      </Tabs>
      <SwipeableViews axis='x' index={tabIndex} onChangeIndex={setTabIndex}>
        <Box role='tabpanel' hidden={tabIndex !== 0} id='tab-panel-sign-in' aria-labelledby='tab-panel-sign-in'>
          {tabIndex === 0 && <EmailSignIn />}
        </Box>
        <Box role='tabpanel' hidden={tabIndex !== 1} id='tab-panel-sign-up' aria-labelledby='tab-panel-sign-up'>
          {tabIndex === 1 && <EmailSignUp />}
        </Box>
      </SwipeableViews>
      <SocialSignIn />
    </AuthLayout>
  );
};

export {getStaticPaths, getStaticProps};
