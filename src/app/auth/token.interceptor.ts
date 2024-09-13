import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.authData$.pipe(
      take(1),
      switchMap(authData => {
        if (authData) {
          // Solo un token 'Bearer' deve essere presente
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authData.accessToken}`
            }
          });
          return next.handle(authReq);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
