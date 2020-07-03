import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService implements HttpInterceptor {
  constructor(private userService: UserService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(request.url.indexOf('slack') <= -1){
      let userToken = this.userService.userId;
      if (userToken) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${userToken}`
              }
          });
      }
    }

    return next.handle(request);
  }
}
