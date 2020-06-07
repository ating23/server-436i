export interface SignupInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface ResetPasswordInterface {
  accountId: string;
  token: string;
  password: string;
  passwordConfirmation: string;
}