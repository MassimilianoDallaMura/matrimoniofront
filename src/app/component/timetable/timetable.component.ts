import { Component, OnInit } from '@angular/core';
import { Messaggio } from 'src/app/interface/messaggio';
import { MessaggioService } from 'src/app/service/messaggio.service'; 
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  messaggi: Messaggio[] = [];
  nuovoMessaggio: string = '';
  userId: number | null = null;
  messaggiCaricati: boolean = false;
  colori: string[] = ['#ff9a3c', '#ff4d4d', '#fbc02d', '#e64a19', '#d32f2f'];

  constructor(
    private messaggioService: MessaggioService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getInvitatoId();
    if (this.userId) {
      this.caricaMessaggi();
    }
  }

  async caricaMessaggi(): Promise<void> {
    try {
      const data = await this.messaggioService.getTuttiMessaggi().toPromise();
      console.log('Messaggi caricati:', data);
      this.messaggi = data ?? [];
      this.messaggiCaricati = true; // Imposta come caricati una volta ricevuti i dati
    } catch (error) {
      console.error('Errore durante il caricamento dei messaggi:', error);
    }
  }

  getColore(index: number): string {
    return this.colori[index % this.colori.length];
  }

  async inviaMessaggio(): Promise<void> {
    if (this.nuovoMessaggio.trim() && this.userId) {
      const messaggio = {
        testo: this.nuovoMessaggio,
        autoreId: this.userId
      };
  
      try {
        const risposta = await this.messaggioService.salvaMessaggio(messaggio).toPromise();
        
        if (risposta) { // Verifica se la risposta non è undefined
          this.nuovoMessaggio = '';
          this.messaggi = [risposta, ...this.messaggi];
        } else {
          console.error('La risposta dal server è undefined');
        }
      } catch (error) {
        console.error('Errore durante l\'invio del messaggio:', error);
      }
    }
  }
}