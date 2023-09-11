import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CodeVerification } from 'src/app/model/requests/CodeVerification';
import { Login } from 'src/app/model/requests/Login';
import { PasswordChange } from 'src/app/model/requests/PasswordChange';
import { UpdatePhone } from 'src/app/model/requests/UpdatePhone';
import { IdentifierResponse } from 'src/app/model/responses/IdentifierResponse';
import { LoginResponse } from 'src/app/model/responses/LoginResponse';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/auth/register', user);
  }

  public updateUserPhone(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.put<UpdatePhone>('http://localhost:8000/auth/update/phone',updatePhone);
  }

  public sendVerificationEmail(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.post<UpdatePhone>('http://localhost:8000/auth/email/code',updatePhone);
  }

  public verifyCode(codeVerification: CodeVerification): Observable<CodeVerification>{
    return this.http.post<CodeVerification>('http://localhost:8000/auth/email/verify',codeVerification);
  }

  public changePassword(passwordChange: PasswordChange): Observable<PasswordChange> {
    return this.http.put<PasswordChange>('http://localhost:8000/auth/update/password',passwordChange);
  }

  public login(login: Login): Observable<any> {
    return this.http.post<LoginResponse>('http://localhost:8000/auth/login', login);
  }

  public userLoggedIn(token: any): Observable<any> {
    return this.http.get('http://localhost:8000/user/verify', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  public getResetPasswdCode(email:string):Observable<any>{
    return this.http.post('http://localhost:8000/auth/password/code', email, {responseType: 'text'});
  }

  public sendResetPasswdCode(code:string):Observable<any>{
    return this.http.post('http://localhost:8000/auth/password/verify', code, {responseType: 'text'});
  }

}
