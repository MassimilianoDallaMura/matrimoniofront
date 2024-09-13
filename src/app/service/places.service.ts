import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiKey = 'AIzaSyCLOGCnTseLnQWBrE0_UzP5BfwqxI9fPbc'; // Assicurati che questa sia la tua chiave API corretta
  private apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  constructor(private http: HttpClient) { }

  getNearbyPlaces(location: string, radius: number, type: string): Observable<any> {
    let params = new HttpParams()
      .set('location', location)
      .set('radius', radius.toString())
      .set('type', type)
      .set('key', this.apiKey);

    console.log(`Request URL: ${this.apiUrl}`); // Log per debug

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(this.handleError) // Gestione degli errori
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message); // Log dell'errore
    return throwError('Something went wrong; please try again later.');
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
