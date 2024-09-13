export interface Messaggio {
  id: number;
  testo: string;
  autore: {
    id: number;
    firstName: string;
    lastName: string;
  };
  timestamp: string;
  dataCreazione?: Date;
}
