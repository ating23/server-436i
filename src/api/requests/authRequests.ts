export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ForgotPassswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  accoundId: string;
  accessToken: string;
  password: string;
  passwordConfirmation: string;
}