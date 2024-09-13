import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invitati } from 'src/app/interface/invitati.interface'; 
import { InvitatiService } from 'src/app/service/invitati.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-gestionale',
  templateUrl: './gestionale.component.html',
  styleUrls: ['./gestionale.component.scss']
})
export class GestionaleComponent implements OnInit {
  expanded: { [key: number]: boolean } = {};
  invitati: Invitati[] = [];
  invitatiForm: FormGroup;
  editingInvitato: Invitati | null = null;
  notification: { message: string, type: 'success' | 'error' } | null = null;
  searchTerm: string = '';
  partecipazioneFilter: string = '';
  allergieFilter: string = '';
  dietaFilter: string = '';
  isFormVisible: boolean = false; 
  showFilters: boolean = false;
  showDropdown: boolean = false;
  selectedAllergy: string = '';

  constructor(
    private fb: FormBuilder,
    private invitatiService: InvitatiService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
  ) {
    this.invitatiForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required], 
      password: ['', Validators.required],
      plusOneAllowed: [false]
    });
  }

  ngOnInit(): void {
    this.loadAllInvitati();
  }

  loadAllInvitati(): void {
    this.invitatiService.getAllInvitati().subscribe(
      response => {
        this.invitati = response;
      },
      error => {
        console.error('Error al recuperar invitados:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.invitatiForm.valid) {
      const invitatoData: Invitati = this.invitatiForm.value;
      if (this.editingInvitato) {
        this.updateInvitato(this.editingInvitato.id, invitatoData);
      } else {
        this.createInvitato(invitatoData);
      }
    }
  }

  createInvitato(invitato: Invitati): void {
    this.invitatiService.saveBasicInvitato(invitato).subscribe(
      response => {
        this.invitati.push(response);
        this.invitatiForm.reset();
        this.editingInvitato = null;
        this.showNotification('Invitado agregado exitosamente!', 'success');
      },
      error => {
        console.error('Error al crear invitado:', error);
        this.showNotification('Error al agregar invitado.', 'error');
      }
    );
  }

  updateInvitato(id: number, invitato: Partial<Invitati>): void {
    this.invitatiService.updateInvitato(id, invitato).subscribe(
      response => {
        const index = this.invitati.findIndex(i => i.id === id);
        if (index !== -1) {
          this.invitati[index] = response;
        }
        this.editingInvitato = null;
        this.invitatiForm.reset();
        this.showNotification('Invitada/o agregada/o con éxito', 'success');
      },
      error => {
        console.error('Error al actualizar:', error);
        this.showNotification('Error al actualizar el invitada/o', 'error');
      }
    );
  }

  editInvitato(invitato: Invitati): void {
    this.editingInvitato = invitato;
    this.invitatiForm.patchValue(invitato);
  }

  deleteInvitato(id: number): void {
    this.invitatiService.deleteInvitato(id).subscribe(
      (response) => {
        this.invitati = this.invitati.filter(i => i.id !== id);
      
      },
      error => {
        console.error('Error al eliminar:', error);
        this.showNotification('Error al eliminar invitada/o', 'error');
      }
    );
  }
  

  toggleAdminRole(invitato: Invitati): void {
    const nuovoRuolo = invitato.ruolo === 'ADMIN' ? 'NORMAL_USER' : 'ADMIN';

    this.invitatiService.updateInvitato(invitato.id, { ruolo: nuovoRuolo }).subscribe(
      response => {
        this.loadAllInvitati(); // Ricarica gli invitati dal backend
        const message = nuovoRuolo === 'ADMIN' ? '¡Administrador designado invitado!' : '¡Se eliminó el rol de administrador!';
        this.showNotification(message, 'success');
      },
      error => {
        console.error('Errore nel cambiamento del ruolo:', error);
        this.showNotification('Error al cambiar de rol', 'error');
      }
    );
  }

  toggleDetails(invitatoId: number): void {
    this.expanded[invitatoId] = !this.expanded[invitatoId];
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { message, type };
    setTimeout(() => this.closeNotification(), 3000); // Chiudi la notifica dopo 3 secondi
  }

  closeNotification(): void {
    this.notification = null;
  }

  filteredAllergies(): string[] {
    // Ottieni tutte le allergie uniche
    const allAllergies = this.invitati.flatMap(invitato => 
      (invitato.allergies || []).concat(invitato.plusOne?.allergies || [])
    );
    return Array.from(new Set(allAllergies)); // Rimuovi duplicati
  }

  onAllergieFilterChange(): void {
    // Questo metodo può essere usato per gestire la logica di filtro se necessario
  }

  selectAllergy(allergy: string): void {
    this.allergieFilter = allergy;
    this.selectedAllergy = allergy; // Aggiorna la selezione dell'allergia
    this.showDropdown = false; // Chiudi il dropdown dopo la selezione
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  filteredInvitati() {
    return this.invitati.filter(invitato => {
      // Filtra per partecipazione
      const partecipazioneMatch = this.partecipazioneFilter === '' || invitato.partecipazione === this.partecipazioneFilter;
  
      // Filtra per allergie (invitato principale e plusOne)
      const allergyFilterLower = this.allergieFilter.toLowerCase();
      const hasAllergies = allergyFilterLower === '' || 
        (invitato.allergies && invitato.allergies.some(allergy => allergy.toLowerCase().includes(allergyFilterLower))) ||
        (invitato.plusOne && invitato.plusOne.allergies && invitato.plusOne.allergies.some(allergy => allergy.toLowerCase().includes(allergyFilterLower)));
  
      // Filtra per dieta (invitato principale e plusOne)
      const dietaMatch = this.dietaFilter === '' || 
        invitato.dieta === this.dietaFilter || 
        (invitato.plusOne && invitato.plusOne.dieta === this.dietaFilter);
  
      // Filtra per nome/cognome
      const searchTermLower = this.searchTerm.toLowerCase();
      const nameMatch = searchTermLower === '' || 
        invitato.firstName.toLowerCase().includes(searchTermLower) || 
        invitato.lastName.toLowerCase().includes(searchTermLower) || 
        (invitato.plusOne && 
         invitato.plusOne.firstName && invitato.plusOne.firstName.toLowerCase().includes(searchTermLower) || 
         invitato.plusOne?.lastName && invitato.plusOne.lastName.toLowerCase().includes(searchTermLower));
  
      // Restituisci l'invitato se tutti i criteri di filtro corrispondono
      return partecipazioneMatch && hasAllergies && dietaMatch && nameMatch;
    });
  }

  // Metodo per il toggle della visibilità del form
  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  getUniqueAllergies(): string[] {
    const allergiesSet = new Set<string>();

    this.invitati.forEach(invitato => {
      // Aggiungi le allergie dell'invitato principale
      if (invitato.allergies) {
        invitato.allergies.forEach(allergy => allergiesSet.add(allergy));
      }

      // Aggiungi le allergie del plusOne, se esistono
      if (invitato.plusOne && invitato.plusOne.allergies) {
        invitato.plusOne.allergies.forEach(allergy => allergiesSet.add(allergy));
      }
    });

    return Array.from(allergiesSet);
  }
  
  @HostListener('document:click', ['$event'])
  clickout(event: any): void {
    if (!event.target.closest('.autocomplete-dropdown') && !event.target.closest('#allergieFilter')) {
      this.showDropdown = false; // Chiudi il dropdown quando si clicca al di fuori
    }
  }
}
