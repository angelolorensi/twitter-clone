import { CodeVerification } from './../../model/CodeVerification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePhone } from 'src/app/model/UpdatePhone';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/auth/register', user);
  }

  public updateUserPhone(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.put<UpdatePhone>('http://localhost:8000/auth/update/phone',updatePhone);
  }

  public sendVerificationEmail(updatePhone: UpdatePhone): Observable<UpdatePhone> {
    return this.http.post<UpdatePhone>('http://localhost:8000/auth/email/code', updatePhone);
  }

  public verifyCode(codeVerification: CodeVerification): Observable<CodeVerification> {
    return this.http.post<CodeVerification>('http://localhost:8000/auth/email/verify', codeVerification);
  }
}
