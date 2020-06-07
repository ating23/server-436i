export class AuthorizationResponse {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class ResetPasswordResponse {
  accoundId: string;
  accessToken: string;

  constructor (accountId: string, accessToken: string) {
    this.accoundId = accountId;
    this.accessToken = accessToken;
  }
}