import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  public createPostWithMedia(postData: any, mediaFile:File, token: any){
    const formData: FormData = new FormData();
    formData.append('post', JSON.stringify(postData));
    formData.append('media', mediaFile);

    return this.http.post<any>('http://localhost:8000/posts/media', formData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
