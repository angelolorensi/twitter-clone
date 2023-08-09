import { CodeVerification } from '../../model/requests/CodeVerification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/requests/Login';
import { PasswordChange } from 'src/app/model/requests/PasswordChange';
import { UpdatePhone } from 'src/app/model/requests/UpdatePhone';
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
    return this.http.put<UpdatePhone>(
      'http://localhost:8000/auth/update/phone',
      updatePhone
    );
  }

  public sendVerificationEmail(
    updatePhone: UpdatePhone
  ): Observable<UpdatePhone> {
    return this.http.post<UpdatePhone>(
      'http://localhost:8000/auth/email/code',
      updatePhone
    );
  }

  public verifyCode(
    codeVerification: CodeVerification
  ): Observable<CodeVerification> {
    return this.http.post<CodeVerification>(
      'http://localhost:8000/auth/email/verify',
      codeVerification
    );
  }

  public changePassword(
    passwordChange: PasswordChange
  ): Observable<PasswordChange> {
    return this.http.put<PasswordChange>(
      'http://localhost:8000/auth/update/password',
      passwordChange
    );
  }

  public login(
    login: Login
  ): Observable<any> {
    return this.http.post<LoginResponse>(
      'http://localhost:8000/auth/login',
      login
    );
  }
}
