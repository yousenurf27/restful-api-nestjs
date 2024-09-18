export class RegisterUserReq {
  username: string;
  password: string;
  name: string;
}

export class UserRes {
  username: string;
  name: string;
  token?: string;
}

export class LoginUserReq {
  username: string;
  password: string;
}
