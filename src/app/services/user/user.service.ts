import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getUserFollowers(username: string | undefined){
    return this.http.get<User[]>('http://localhost:8000/user/followers/' + username);
  }

  public getUserFollowing(username: string | undefined){
    return this.http.get<User[]>('http://localhost:8000/user/following/' + username);
  }
}
