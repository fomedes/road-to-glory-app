export class UserDTO {
  constructor(
    public id: string = '',
    public access_token: string = '',
    public username: string = '',
    public email: string = '',
    public password: string = '',
    public country: string = '',
    public platform: string = '',
    public accountLevel: number = 1
  ) {}
}
