export class UpdatePhone{
  username: string | undefined;
  phone:string;

  constructor(username:string, phone:string){
    this.phone = phone;
    this.username = username;
  }
}
