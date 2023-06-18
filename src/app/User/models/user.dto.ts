export class UserDTO {
  username: string;
  platform: string;
  email: string;
  password: string;

  constructor(
    username: string,
    platform: string,
    email: string,
    password: string
  ) {
    this.username = username;
    this.platform = platform;
    this.email = email;
    this.password = password;
  }
}
