import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Assicurati che il percorso sia corretto

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authSrv.authData$.pipe(
      take(1),
      map(authData => {
        if (authData) {
          return true; // L'utente è autenticato
        } else {
          this.router.navigate(['/login']); // Reindirizza a login se non autenticato
          return false;
        }
      })
    );
  }
}
