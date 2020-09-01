export interface SignUpEmailParams {
  email: string;
  password: string;
}

export interface SignInEmailParams extends SignUpEmailParams {}

export interface AuthService {
  initialize: () => void;
  signUpEmail: (params: SignUpEmailParams) => Promise<boolean>;
  signInEmail: (params: SignInEmailParams) => Promise<boolean>;
}
