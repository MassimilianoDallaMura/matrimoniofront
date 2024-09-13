import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raccomandazione } from '../interface/raccomandazione'; 

@Injectable({
  providedIn: 'root'
})
export class RaccomandazioneService {

  private apiUrl = 'https://isolated-carlee-massimiliano-dalla-mura-a8fb8735.koyeb.app/api/raccomandazioni'; // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient) {}

 // Metodo per aggiungere una raccomandazione con FormData
 addRaccomandazione(formData: FormData): Observable<Raccomandazione> {
  return this.http.post<Raccomandazione>(this.apiUrl, formData);
}

getRaccomandazioni(): Observable<Raccomandazione[]> {
  return this.http.get<Raccomandazione[]>(`${this.apiUrl}/tutte`);
}

  // Metodo per ottenere una raccomandazione tramite ID
  getRaccomandazioneById(id: number): Observable<Raccomandazione> {
    return this.http.get<Raccomandazione>(`${this.apiUrl}/${id}`);
  }

  // Metodo per eliminare una raccomandazione
  deleteRaccomandazione(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
