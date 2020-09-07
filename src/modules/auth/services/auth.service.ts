import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AppError} from '@app/core/exceptions/app-error';
import type {SignUpEmailParams, SignInEmailParams} from '@auth/interfaces/auth.service.interface';
import {sleep} from '@app/core/helpers/sleep';

let confirmationResult: firebase.auth.ConfirmationResult | undefined;

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

export const signInFacebook = async (): Promise<boolean> => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('email');
    await firebase.auth().signInWithPopup(provider);
    // TODO: log request
    // logAuthEvent('SIGN_IN', 'FACEBOOK');
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') {
      return false;
    }
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    throw err;
  }
  return true;
};

export const signInGoogle = async (): Promise<boolean> => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    await firebase.auth().signInWithPopup(provider);
    // TODO: log request
    // logAuthEvent('SIGN_IN', 'GOOGLE');
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') {
      return false;
    }
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    throw err;
  }
  return true;
};

export const signInApple = async (): Promise<boolean> => {
  try {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    provider.addScope('name');
    provider.addScope('email');
    await firebase.auth().signInWithPopup(provider);
    // TODO: log request
    // logAuthEvent('SIGN_IN', 'APPLE');
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') {
      return false;
    }
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    throw err;
  }
  return true;
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    // TODO: log request
    // logAuthEvent(EVENT_NAME.RECOVER_PASSWORD);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      return;
    }
    throw err;
  }
};

export const registerRecaptchaVerifier = async (buttonId: string, onPress: () => void): Promise<void> => {
  while (!firebase.apps || firebase.apps.length === 0) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(100);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).recaptchaVerifier) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
      size: 'invisible',
      callback(_response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onPress();
      },
    });
  }
};

export const sendPhoneNoVerificationCode = async (phoneNo: string): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNo, (window as any).recaptchaVerifier);
  } catch (err) {
    if (err.code === 'auth/user-disabled') {
      throw new AppError('USER_DISABLED', 'auth.userDisabledError');
    }
    if (err.code === 'auth/quota-exceeded') {
      throw new AppError('SMS_QUOTA_EXCEEDED', 'auth.smsQuotaExceedError');
    }
    if (err.code === 'auth/invalid-phone-number') {
      throw new AppError('INVALID_PHONE_NO', 'auth.invalidPhoneNumberError');
    }

    throw err;
  }
};

export const verifyCode = async (verificationCode: string): Promise<void> => {
  try {
    if (confirmationResult) {
      await confirmationResult.confirm(verificationCode);
      confirmationResult = undefined;
      // TODO: log request
      // logAuthEvent('SIGN_IN', 'PHONE_NO');
    }
  } catch (err) {
    if (err.code === 'auth/invalid-verification-code') {
      throw new AppError('INVALID_PHONE_NO', 'auth.invalidVerificationCodeError');
    }
    throw err;
  }
};
