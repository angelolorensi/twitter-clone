export class IdentifierResponse{

  username:string;
  phone:string;
  email:string;

  constructor(username: string, phone: string, email: string){
    this.email = email;
    this.username = username;
    this.phone = phone;
  }

}
