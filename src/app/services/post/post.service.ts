import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  public createPostWithMedia(postData: any, mediaFile:File){
    const formData: FormData = new FormData();
    formData.append('post', JSON.stringify(postData));
    formData.append('media', mediaFile);

    return this.http.post<Post>(environment.apiAdress + '/posts/media', formData);
  }

  public createPost(postData: any){
    return this.http.post<Post>(environment.apiAdress + '/posts/', postData);
  }

  public getAllPosts(){
    return this.http.get<Post[]>(environment.apiAdress + '/posts/');
  }

  public getPostsByAuthor(userId:number){
    return this.http.get<Post[]>(environment.apiAdress + '/posts/author/' + userId);
  }

  public likePost(postId: number){
    return this.http.post(environment.apiAdress + '/posts/like', {postId: postId}, {responseType: 'text'});
  }

  public repost(postId: number){
    return this.http.post(environment.apiAdress + '/posts/repost', {postId: postId}, {responseType: 'text'});
  }
}
