import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RaccomandazioneService } from '../../service/raccomandazione.service';
import { Raccomandazione } from 'src/app/interface/raccomandazione';
import { InvitatiService } from 'src/app/service/invitati.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Invitati } from 'src/app/interface/invitati.interface';

@Component({
  selector: 'app-around',
  templateUrl: './around.component.html',
  styleUrls: ['./around.component.scss']
})


export class AroundComponent implements OnInit {
  loading: boolean = true; // Variabile per tenere traccia del caricamento

  isAdmin: boolean = false;
  isNormalUser: boolean = false;
  invitatiId: number | null = null;
  invitati: Invitati | null = null;
  userId: number | null = null; // ID dell'utente loggato
  autoSlideInterval: any;
  filteredCards: Raccomandazione[] = [];
  newRaccomandazione: Raccomandazione = {
    titolo: '',
    descrizione: '',
    categoria: [], // Deve essere un array
    images: [],
    link: '',
  };

  link: string | null = null;
  selectedCategory: string | null = null;

  // Card array with multiple categories
  raccomandationCards: Raccomandazione[] = [
    { 
      images: ['assets/la tortuga2.png'],
      titolo: 'LA TORTUGA', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/latortugaayampe/',
    },
    { 
      images: ['assets/vistamar1.png'],
      titolo: 'VISTAMAR', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/vistamar_ayampe/?hl=es',
    },
    { 
      images: ['assets/el campito1.png'],
      titolo: 'EL CAMPITO', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/elcampitoayampe/?hl=es',
    },
    { 
      images: ['assets/mulata1.png'],
      titolo: 'MULATA', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/mulataec/'
    },
    { 
      images: ['assets/barn pasteleria1.png'],
      titolo: 'THE BARN', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/thebarn_ec/?hl=es',
    },
    { 
      images: ['assets/el pacay3.png'],
      titolo: 'EL PACAY', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/elpacay_ayampe/?hl=es',
    },
    { 
      images: ['assets/los orishas1.png'],
      titolo: 'LOS ORISHAS', 
      descrizione: 'Ayampe',
      categoria: ['comer', 'dormir'],
      link: 'https://www.instagram.com/los_orishas/?hl=es ',
    },
    { 
      images: ['assets/casa nomadica.jpg'],
      titolo: 'CASA NOMADICA', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/casanomadica',
    },
    { 
      images: ['assets/malevo.jpg'],
      titolo: 'MALEVO', 
      descrizione: 'Ayampe',
      categoria: ['comer', 'dormir'],
      link: 'https://www.instagram.com/malevo.ayampe/',
    },
    { 
      images: ['assets/el paso.jpg'],
      titolo: 'EL PASO', 
      descrizione: 'Ayampe',
      categoria: ['comer', 'dormir'],
      link: 'https://www.instagram.com/elpasoayampe/',
    },
    { 
      images: ['assets/el jaguar.jpg'],
      titolo: 'EL JAGUAR', 
      descrizione: 'Ayampe',
      categoria: ['comer', 'dormir'],
      link: 'https://www.instagram.com/ayampe.jaguar/',
    },
    { 
      images: ['assets/casa zen.jpg'],
      titolo: 'CASA ZEN', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/casazen.ayampe',
    },
    { 
      images: ['assets/casa tambo.jpg'],
      titolo: 'CASA TAMBO', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/casatambo.ayampe',
    },
    { 
      images: ['assets/ganso.jpg'],
      titolo: 'GANSO Y BUHO', 
      descrizione: 'Ayampe',
      categoria: ['comer','dormir'],
      link: 'https://www.instagram.com/gansoybuhohotel',
    },
    { 
      images: ['assets/villa catalina.jpg'],
      titolo: 'VILLA CATALINA', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/villacatalina_ec',
    },
    { 
      images: ['assets/challwa.jpg'],
      titolo: 'CHALLWA HOUSE', 
      descrizione: 'Ayampe',
      categoria: ['dormir'],
      link: 'https://www.instagram.com/challwa.house/',
    },
    { 
      images: ['assets/distinto.jpg'],
      titolo: 'DISTINTO', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/distinto.ayampe',
    },
    { 
      images: ['assets/ohlala.jpg'],
      titolo: 'OH LA LA', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/oh_la_la_ayampe/?hl=it',
    },
    { 
      images: ['assets/tacos.jpg'],
      titolo: 'AYAMPE TACOS', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/ayampe_tacos/',
    },
    { 
      images: ['assets/enjoy.jpg'],
      titolo: 'ENJOY', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/enjoy_icecreamshop/',
    },
    { 
      images: ['assets/mali.jpg'],
      titolo: 'MALI', 
      descrizione: 'Ayampe',
      categoria: ['comer'],
      link: 'https://www.instagram.com/mali.thai.fusion/',
    },

  ];

  showRecommendationForm: boolean = false;
  error: string | null = null;
  currentImageIndex: { [key: string]: number } = {}; // Aggiunto per gestire l'immagine corrente per ogni card

  constructor(
    private location: Location,
    private raccomandazioneService: RaccomandazioneService,
    private invitatiService: InvitatiService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.invitatiId = this.authService.getInvitatoId();
      this.userId = this.authService.getInvitatoId(); // Imposta l'ID dell'utente loggato
      if (this.invitatiId) {
        await this.getInvitatoDetails();
        await this.loadRaccomandazioni();
      }
    } catch (error) {
      console.error('Errore durante il caricamento iniziale:', error);
    } finally {
      this.loading = false; // Nascondi lo spinner dopo che tutto è caricato
    }
  }

  async getInvitatoDetails(): Promise<void> {
    if (this.invitatiId) {
      try {
        const user = await this.invitatiService.getInvitatoById(this.invitatiId).toPromise();
        this.invitati = user ?? null; // Assegna null se user è undefined
        this.setUserRole(this.invitati?.ruolo);
      } catch (error) {
        console.error('Errore nel recuperare i dettagli dell\'utente', error);
      }
    }
  }
  

  async loadRaccomandazioni(): Promise<void> {
    try {
      const data = await this.raccomandazioneService.getRaccomandazioni().toPromise();
      if (data) {
        this.raccomandationCards = [...this.raccomandationCards, ...data];
        this.applyFilter();
        // Imposta l'indice dell'immagine corrente per ogni card
        this.raccomandationCards.forEach(card => {
          this.currentImageIndex[card.titolo] = 0;
        });
      } else {
        console.error('Nessuna raccomandazione disponibile');
        this.error = 'Nessuna raccomandazione disponibile';
      }
    } catch (error) {
      console.error('Errore nel caricamento delle raccomandazioni:', error);
      this.error = 'Errore nel caricamento delle raccomandazioni';
    }
  }
  

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.newRaccomandazione.images = Array.from(files); // Assicurati che images sia sempre un array di File
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

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  showAll(): void {
    this.selectedCategory = null;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredCards = this.selectedCategory
      ? this.raccomandationCards.filter(card =>
        card.categoria.includes(this.selectedCategory!)
      )
      : this.raccomandationCards;
  }

  toggleAddRecommendationForm(): void {
    this.showRecommendationForm = !this.showRecommendationForm;
  }

  addRaccomandazione(): void {
    console.log('Categorie:', this.newRaccomandazione.categoria); // Log delle categorie
    console.log('Titolo:', this.newRaccomandazione.titolo);
    console.log('Descrizione:', this.newRaccomandazione.descrizione);

    if (
      this.newRaccomandazione.titolo &&
      this.newRaccomandazione.descrizione &&
      this.newRaccomandazione.categoria.length > 0
    ) {
      const formData = new FormData();
      formData.append('titolo', this.newRaccomandazione.titolo);
      formData.append('descrizione', this.newRaccomandazione.descrizione);

      // Aggiungi le categorie come stringhe
      this.newRaccomandazione.categoria.forEach(cat => {
        console.log('Aggiungendo categoria:', cat); // Log per ogni categoria aggiunta
        formData.append('categoria', cat);
      });

      // Aggiungi i file immagine solo se esistono
      if (this.newRaccomandazione.images) {
        this.newRaccomandazione.images.forEach((file, index) => {
          console.log('Aggiungendo immagine:', file); // Log per ogni file immagine
          formData.append('images', file);
        });
      }

      // Invio della richiesta
      this.raccomandazioneService.addRaccomandazione(formData).subscribe(
        (data: Raccomandazione) => {
          console.log('Raccomandazione aggiunta con successo:', data);
          this.raccomandationCards.push(data);
          this.applyFilter();
          this.resetForm();
        },
        (error) => {
          console.error('Errore nell\'aggiunta della raccomandazione:', error);
          this.error = 'Errore nell\'aggiunta della raccomandazione';
        }
      );
    } else {
      console.warn('Form validation failed:', this.newRaccomandazione);
    }
  }

  resetForm(): void {
    this.newRaccomandazione = {
      titolo: '',
      descrizione: '',
      categoria: [],
      images: []  // Reinizializza images come array vuoto
    };
    this.showRecommendationForm = false;
  }

  openLink(link: string | undefined): void {
    if (link) {
      window.open(link, '_blank'); // '_blank' per aprire in una nuova scheda
    }
  }

  getCategoryClass(category: string): string {
    return category === 'dormir' ? 'category-badge dormir' : 'category-badge comer';
  }

  startAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.autoSlideInterval = setInterval(() => {
      this.filteredCards.forEach(card => {
        this.changeSlide(card.titolo, 1);
      });
    }, 3000); // Cambia immagine ogni 3 secondi
  }

  changeSlide(title: string, direction: number): void {
    const cardIndex = this.currentImageIndex[title];
    const card = this.raccomandationCards.find(card => card.titolo === title);
    if (card && card.images) {
      let newIndex = (cardIndex + direction + card.images.length) % card.images.length;
      this.currentImageIndex[title] = newIndex;
    }
  }
  
  
}