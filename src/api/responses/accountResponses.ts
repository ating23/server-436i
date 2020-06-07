export class GetAccountResponse {
  account: {
    accountId: string;
    accessToken: string;
    name: string;
    email: string;
    createdOn: string;
  }

  constructor (
    accountId: string,
    accessToken: string,
    name: string,
    email: string,
    createdOn: string,
  ) {
    this.account = {
      accountId: accountId,
      accessToken: accessToken,
      name: name,
      email: email,
      createdOn: createdOn
    }
  }
}

export class UpdateAccountResponse {}