import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getUserFollowers(username: string | undefined){
    return this.http.get<User[]>(environment.apiAdress + '/user/followers/' + username);
  }

  public getUserFollowing(username: string | undefined){
    return this.http.get<User[]>(environment.apiAdress + '/user/following/' + username);
  }

  public changeProfilePicture(image: File){
    return this.http.post<User>(environment.apiAdress + '/user/pfp', image);
  }

  public changeBannerPicture(image: File){
    return this.http.post<User>(environment.apiAdress + '/user/banner', image);
  }

  public downloadPicture(imageName: string){
    return this.http.get(environment.apiAdress + '/images/' + imageName);
  }
}
