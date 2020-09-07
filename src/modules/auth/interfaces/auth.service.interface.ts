export interface SignUpEmailParams {
  email: string;
  password: string;
}

export interface SignInEmailParams extends SignUpEmailParams {}

export interface AuthService {
  signUpEmail: (params: SignUpEmailParams) => Promise<boolean>;
  signInEmail: (params: SignInEmailParams) => Promise<boolean>;
  signOut: () => Promise<void>;
  signInFacebook: () => Promise<boolean>;
  signInGoogle: () => Promise<boolean>;
  signInApple: () => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  registerRecaptchaVerifier: (buttonId: string, onPress: () => void) => void;
  sendPhoneNoVerificationCode: (phoneNo: string) => Promise<void>;
  verifyCode: (verificationCode: string) => Promise<void>;
}
