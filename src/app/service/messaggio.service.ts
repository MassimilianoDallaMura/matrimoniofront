// src/app/services/messaggio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment.development'; 
import { Messaggio } from '../interface/messaggio'; 

@Injectable({
  providedIn: 'root'
})
export class MessaggioService {

  private baseUrl = `https://isolated-carlee-massimiliano-dalla-mura-a8fb8735.koyeb.app/api/messaggi`;

  constructor(private http: HttpClient) {}

  getTuttiMessaggi(): Observable<Messaggio[]> {
    return this.http.get<Messaggio[]>(`${this.baseUrl}/tutti`);
  }

  getMessaggioById(id: number): Observable<Messaggio> {
    return this.http.get<Messaggio>(`${this.baseUrl}/${id}`);
  }

  salvaMessaggio(messaggio: { testo: string, autoreId: number }): Observable<Messaggio> {
    return this.http.post<Messaggio>(`${this.baseUrl}/salva`, messaggio);
  }
}

