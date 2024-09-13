export interface Raccomandazione {
  id?: number;
  titolo: string;
  descrizione: string;
  categoria: string[];
  images?: (string | File)[]; // Accetta sia stringhe che File
  link?: string;
}
