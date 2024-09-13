import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData } from '../interface/auth-data.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private authSub = new BehaviorSubject<AuthData | null>(this.getStoredUser());
  private jwtHelper: JwtHelperService;
  private loginUrl = 'https://isolated-carlee-massimiliano-dalla-mura-a8fb8735.koyeb.app/auth/login';
  private authDataSubject = new BehaviorSubject<AuthData | null>(null);
  authData$ = this.authDataSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.token = storedUser.accessToken;
      this.authSub.next(storedUser);
    }
    this.jwtHelper = new JwtHelperService();
    console.log('AuthService initialized. Stored user:', storedUser);
  }

  private getStoredUser(): AuthData | null {
    const storedUser = localStorage.getItem('user');
    console.log('Retrieved stored user:', storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(username: string, password: string): Observable<void> {
    console.log('Attempting login with username:', username);
    return this.http.post(this.loginUrl, { username, password }, { responseType: 'text' }).pipe(
      map((response: string) => {
        console.log('Login successful, received token:', response);
        
        // Decodifica il token JWT per ottenere l'ID dell'utente
        const decodedToken = this.jwtHelper.decodeToken(response);
        console.log('Decoded token:', decodedToken);
  
        // Estrai l'`id` dal token decodificato
        const userId = decodedToken.sub; 
  
        const authData: AuthData = {
          accessToken: response,
          invitato: { 
            id: userId,
            username: '' // Puoi aggiornare questo valore se necessario
          }
        };
  
        // Salva l'intero oggetto `AuthData` nel localStorage
        localStorage.setItem('user', JSON.stringify(authData));
        this.authDataSubject.next(authData);
        console.log('Auth data stored and subject updated:', authData);
      }),
      catchError(this.handleError<void>('login'))
    );
  }
  

  

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.log('Full error:', error);
      return throwError('Something went wrong; please try again later.');
    };
  }

  logout(): void {
    console.log('Logging out, removing token.');
    localStorage.removeItem('authToken');
    this.authDataSubject.next(null);
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token from storage:', token);
    return token;
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    console.log('Checking admin status with token:', token);
    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ isAdmin: boolean }>(`${this.loginUrl}/isAdmin`, { headers }).pipe(
      map(response => {
        console.log('Admin status response:', response.isAdmin);
        return response.isAdmin;
      }),
      catchError(() => {
        console.log('Error occurred while checking admin status.');
        return of(false);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.authData$.pipe(
      map(authData => {
        const isLoggedIn = !!authData?.accessToken;
        console.log('Is user logged in?', isLoggedIn);
        return isLoggedIn;
      })
    );
  }

  // Metodo per recuperare l'ID dell'utente loggato
  getInvitatoId(): number | null {
    const storedUser = this.getStoredUser();
    const id = storedUser ? +storedUser.invitato.id : null;
    console.log('Retrieved invitato ID:', id);
    return id;
  }
}
