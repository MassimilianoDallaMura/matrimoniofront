import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { InvitatiService } from 'src/app/service/invitati.service';
import { DonationInfoService } from 'src/app/service/donation-info.service';
import { Invitati } from 'src/app/interface/invitati.interface';
import { Donation } from 'src/app/interface/donation.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {
  showSettings = false;
  invitatiId: number | null = null;
  invitati: Invitati | null = null;
  isAccordionOpen: boolean = false;
  participation: string | null = null;
  plus: string | null = null;
  plusOneName: string = '';
  plusOneLastName: string = '';
  plusOneAllergies: string = '';
  allergie: string = '';
  confirmationMessage: string = '';
  diet: string = '';
  
  // Data limite per abilitare/disabilitare il pulsante
  limitDate: Date = new Date('2024-09-20');
  currentDate: Date = new Date(); // Data attuale

  plusDiet: string | null = null;
  donationContent: string = ''; // Campo per il contenuto della donazione
  newDonationContent: string = ''; // Campo per il nuovo contenuto della donazione

  isAdmin: boolean = false;
  isNormalUser: boolean = false;

  constructor(
    private location: Location,
    private authService: AuthService,
    private invitatiService: InvitatiService,
    private donationInfoService: DonationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invitatiId = this.authService.getInvitatoId();
    if (this.invitatiId) {
      this.getInvitatoDetails();
      this.getDonationInfo();
    }
  }

  getInvitatoDetails(): void {
    if (this.invitatiId) {
      this.invitatiService.getInvitatoById(this.invitatiId).subscribe(
        (user: Invitati) => {
          this.invitati = user;
          this.setUserRole(this.invitati?.ruolo);
          console.log('Dettagli invitato:', this.invitati);
        },
        (error) => {
          console.error('Errore nel recuperare i dettagli dell\'utente', error);
        }
      );
    }
  }

  getDonationInfo(): void {
    this.donationInfoService.getDonationInfo().subscribe(
      (info: Donation) => {
        this.donationContent = info.content; // Memorizza il contenuto della donazione
        console.log('Informazioni sulla donazione:', info);
      },
      (error) => {
        console.error('Errore nel recuperare le informazioni sulla donazione', error);
      }
    );
  }

  saveDonation(): void {
    if (this.isAdmin) {
      const newDonation: Partial<Donation> = {
        content: this.newDonationContent
      };

      this.donationInfoService.saveDonationInfo(newDonation as Donation).subscribe(
        (response: Donation) => {
          this.donationContent = response.content; // Aggiorna il contenuto della donazione visualizzato
          this.newDonationContent = ''; // Pulisce il campo di input
          this.confirmationMessage = 'Donazione salvata con successo!';
          console.log('Donazione aggiornata:', response);
        },
        (error) => {
          console.error('Errore nel salvare la donazione:', error);
          this.confirmationMessage = 'Errore nel salvataggio della donazione.';
        }
      );
    } else {
      console.error('Accesso negato. Solo admin può salvare le donazioni.');
      this.confirmationMessage = 'Accesso negato. Solo admin può salvare le donazioni.';
    }
  }

  setUserRole(ruolo: string | undefined): void {
    if (ruolo === 'ADMIN') {
      this.isAdmin = true;
      this.isNormalUser = false;
    } else if (ruolo === 'NORMAL_USER') {
      this.isAdmin = false;
      this.isNormalUser = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

  submitForm(): void {
    if (this.invitatiId && this.invitati) {
      const convertNullToUndefined = (value: string | null): string | undefined => value === null ? undefined : value;

      const aggiornamenti: Partial<Invitati> = {
        partecipazione: this.participation === 'YES' ? 'CONFIRMADO' : 'RECHAZADO',
        plusOneConfirmed: this.plus === 'YES',
        ruolo: this.isAdmin ? 'ADMIN' : 'NORMAL_USER',
        dieta: convertNullToUndefined(this.diet),
        allergies: this.allergie ? [this.allergie] : undefined,
        plusOne: this.plus === 'YES' ? {
          firstName: convertNullToUndefined(this.plusOneName),
          lastName: convertNullToUndefined(this.plusOneLastName),
          allergies: this.plusOneAllergies ? [this.plusOneAllergies] : undefined,
          dieta: convertNullToUndefined(this.plusDiet || ''),
        } : undefined
      };

      this.invitatiService.updateInvitato(this.invitatiId, aggiornamenti).subscribe(
        (response) => {
          this.confirmationMessage = 'Datos actualizados con éxito!';
          console.log('Datos actualizados:', response);
        },
        (error) => {
          console.error('Error al actualizar:', error);
          this.confirmationMessage = 'Error al actualizar datos.';
        }
      );
    } else {
      console.error('ID invitato non valido.');
      this.confirmationMessage = 'ID invitato non valido.';
    }
  }

  toggleSettings(): void {
    if (!this.isToggleDisabled()) {
      this.showSettings = !this.showSettings;
    }
  }

  toggleAccordion(): void {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Metodo per controllare se il pulsante deve essere disabilitato
  isToggleDisabled(): boolean {
    return this.currentDate > this.limitDate;
  }
}
