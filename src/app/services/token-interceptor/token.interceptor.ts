import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem('token');

    // Check if the request URL contains "/auth"
    if (!request.url.includes('/auth') || request.url.includes('/author')) {
      // If it doesn't contain "/auth", add the Authorization header
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + jwtToken) });
    }

    return next.handle(request);
  }
}
