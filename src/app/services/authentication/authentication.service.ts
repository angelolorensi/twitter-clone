import { RegistrationUser } from 'src/app/model/RegistrationUser';
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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public registerUser(user: RegistrationUser): Observable<RegistrationUser> {
    return this.http.post<RegistrationUser>(environment.apiAdress + '/auth/register', user);
  }

  public updateUserPhone(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.put<UpdatePhone>(environment.apiAdress + '/auth/update/phone',updatePhone);
  }

  public sendVerificationEmail(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.post<UpdatePhone>(environment.apiAdress + '/auth/email/code',updatePhone);
  }

  public verifyCode(codeVerification: CodeVerification): Observable<CodeVerification>{
    return this.http.post<CodeVerification>(environment.apiAdress + '/auth/email/verify',codeVerification);
  }

  public changePassword(passwordChange: PasswordChange): Observable<PasswordChange> {
    return this.http.put<PasswordChange>(environment.apiAdress + '/auth/update/password',passwordChange);
  }

  public login(login: Login): Observable<any> {
    return this.http.post<LoginResponse>(environment.apiAdress + '/auth/login', login);
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
