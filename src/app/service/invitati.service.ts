import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Invitati } from '../interface/invitati.interface'; 
import { AuthData } from '../interface/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class InvitatiService {

  private apiUrl = 'https://isolated-carlee-massimiliano-dalla-mura-a8fb8735.koyeb.app/api/invitati';
  private authDataSubject = new BehaviorSubject<AuthData | null>(null); // Comportamento dell'utente
  authData$ = this.authDataSubject.asObservable(); // Observable dell'utente

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    // Recupera il token dal localStorage
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // Metodo per creare un nuovo invitato
  saveBasicInvitato(invitato: Invitati): Observable<Invitati> {
    const url = `${this.apiUrl}/saveBasic`;
    return this.http.post<Invitati>(url, invitato, this.getHttpOptions());
  }

  updateInvitato(id: number, body: any): Observable<any> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put(url, body, this.getHttpOptions()).pipe(
      catchError(this.handleError('updateInvitato'))
    );
  }
  

  // Metodo per ottenere tutti gli invitati
  getAllInvitati(): Observable<Invitati[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Invitati[]>(url, this.getHttpOptions());
  }

  // Metodo per eliminare un invitato
  deleteInvitato(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url, this.getHttpOptions());
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

    // Metodo per ottenere un invitato per ID
    getInvitatoById(id: number): Observable<Invitati> {
      const url = `${this.apiUrl}/find/${id}`;
      return this.http.get<Invitati>(url).pipe(
          catchError(error => {
              if (error.status === 404) {
                  console.error(`Record con ID ${id} non trovato.`);
              } else {
                  console.error('Errore nel recupero dei dati:', error);
              }
              return throwError(() => new Error('Errore nella richiesta'));
          })
      );
    } 
}