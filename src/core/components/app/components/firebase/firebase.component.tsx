/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useDispatch} from 'react-redux';
import type {Dispatch} from '@app/stores/store';
import type {SignInType} from '@app/modules/auth/models/auth.model';
import {useI18n} from 'next-localization';

export const Firebase = (): JSX.Element => {
  const {locale} = useI18n();
  const language = locale();
  const {
    auth: {setAuth, clearAuth},
  } = useDispatch<Dispatch>();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().languageCode = language;
    }
    if (firebase.apps && firebase.apps.length > 0) {
      firebase.auth().languageCode = language;
    }
  }, [language]);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user): void => {
      if (!user) {
        clearAuth();
      } else {
        let avatarUrl = user.photoURL || '';
        let signInType: SignInType = 'EMAIL';
        let displayName = user.displayName || undefined;
        if (user.providerData && user.providerData.length >= 1) {
          if (user.providerData[0].providerId === 'facebook.com') {
            signInType = 'FACEBOOK';
            avatarUrl = `${avatarUrl}?type=large`;
          } else if (user.providerData[0].providerId === 'google.com') {
            signInType = 'GOOGLE';
            avatarUrl = avatarUrl.replace('s96-c', 's400-c');
          } else if (user.providerData[0].providerId === 'apple.com') {
            signInType = 'APPLE';
            displayName = displayName || user.providerData[0].email;
          } else if (user.providerData[0].providerId === 'phone') {
            signInType = 'PHONE_NO';
            displayName = displayName || user.providerData[0].phoneNumber;
          } else {
            signInType = 'EMAIL';
            displayName = displayName || user.providerData[0].email;
          }
        }
        setAuth({
          userId: user.uid,
          displayName,
          avatarUrl,
          isSignedIn: true,
          signInType,
        });
      }

      // TODO: config error/analytics
      // configError({userId: user?.uid || ''});
      // configAnalytics({userId: user?.uid || ''});
    });
    return subscriber; // unsubscribe
  }, [clearAuth, setAuth]);
  return <></>;
};
