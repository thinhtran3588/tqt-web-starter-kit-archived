import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AppError} from '@app/core/exceptions/app-error';
import type {SignUpEmailParams, SignInEmailParams} from '@auth/interfaces/auth.service.interface';

const firebaseConfig = {
  apiKey: 'AIzaSyCH_Hlb30OeTgvF-AcqMODNlfddghJNjwc',
  authDomain: 'tqt-apps-staging.firebaseapp.com',
  databaseURL: 'https://tqt-apps-staging.firebaseio.com',
  projectId: 'tqt-apps-staging',
  storageBucket: 'tqt-apps-staging.appspot.com',
  messagingSenderId: '216990881783',
  appId: '1:216990881783:web:a4ce455b6a5148957a00f2',
  measurementId: 'G-8E6VTSTR06',
};

export const initialize = (): void => {
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const signUpEmail = async (params: SignUpEmailParams): Promise<boolean> => {
  try {
    const {email, password} = params;
    // Create a new user in with the credential
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // TODO: log request
  } catch (err) {
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    if (err.code === 'auth/email-already-in-use') {
      throw new AppError('EMAIL_ALREADY_IN_USE', 'auth.emailAlreadyInUseError');
    }
    if (err.code === 'auth/too-many-requests') {
      throw new AppError('TOO_MANY_REQUESTS', 'auth.tooManyRequestsError');
    }
    throw err;
  }
  return true;
};

export const signInEmail = async (params: SignInEmailParams): Promise<boolean> => {
  try {
    const {email, password} = params;
    // Sign the user in with the credential
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // TODO: log request
  } catch (err) {
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      throw new AppError('WRONG_CREDENTIAL', 'auth.wrongCredentialError');
    }
    if (err.code === 'auth/too-many-requests') {
      throw new AppError('TOO_MANY_REQUESTS', 'auth.tooManyRequestsError');
    }
    throw err;
  }
  return true;
};

export const signOut = async (): Promise<void> => {
  if (firebase.auth().currentUser) {
    await firebase.auth().signOut();
  }
};
