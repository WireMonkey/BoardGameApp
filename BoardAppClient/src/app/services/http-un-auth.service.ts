import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpUnAuthService implements HttpInterceptor {

  constructor(private userService: UserService, private messageService: MessageService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.userService.logoutUser();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unauthorized: Session expired." });
          of();
      }
      
      const error = err.error || err.statusText;
      return throwError(error);
      
  }))
  }
}
