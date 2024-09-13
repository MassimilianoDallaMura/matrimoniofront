// src/app/service/donation-info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation } from '../interface/donation.interface'; 

@Injectable({
  providedIn: 'root'
})
export class DonationInfoService {
  private apiUrl = 'https://isolated-carlee-massimiliano-dalla-mura-a8fb8735.koyeb.app/api/donation-info'; // URL base dell'API

  constructor(private http: HttpClient) { }

  // Metodo per ottenere le informazioni sulla donazione
  getDonationInfo(): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiUrl}/mostra`);
  }

  // Metodo per salvare le informazioni sulla donazione
  saveDonationInfo(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiUrl}/salva`, donation);
  }
}
