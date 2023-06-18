export class AuthDTO {
  userId: string;
  username: string;
  platform: string;
  email: string;
  password: string;

  constructor(
    userId: string,
    username: string,
    platform: string,
    email: string,
    password: string
  ) {
    this.userId = userId;
    this.username = username;
    this.platform = platform;
    this.email = email;
    this.password = password;
  }
}
