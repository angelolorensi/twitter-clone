import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public registerUser(user: { name: any, email: any, dob: any }){
    return this.http.post<User>(environment.apiAdress + '/auth/register', user);
  }

  public updateUserPhone(updatePhone: {username:string, phone:string}){
    return this.http.put(environment.apiAdress + '/auth/update/phone',updatePhone);
  }

  public sendVerificationEmail(verificationEmail: {username:string, phone:string}){
    return this.http.post(environment.apiAdress + '/auth/email/code',verificationEmail);
  }

  public verifyCode(codeVerification: {code: string, username:string}){
    return this.http.post(environment.apiAdress + '/auth/email/verify',codeVerification);
  }

  public changePassword(passwordChange: {username:string, password: string}){
    return this.http.put(environment.apiAdress + '/auth/update/password',passwordChange);
  }

  public login(login: {email: string, password: string}){
    return this.http.post<{token: string}>(environment.apiAdress + '/auth/login', login);
  }

  public userLoggedIn() {
    return this.http.get<User>(environment.apiAdress + '/user/verify');
  }

  public getResetPasswdCode(email:string):Observable<any>{
    return this.http.post(environment.apiAdress + '/auth/password/code', email, {responseType: 'text'});
  }

  public sendResetPasswdCode(code:string):Observable<any>{
    return this.http.post(environment.apiAdress + '/auth/password/verify', code, {responseType: 'text'});
  }

}
