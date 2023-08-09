export class PasswordChange{
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}
