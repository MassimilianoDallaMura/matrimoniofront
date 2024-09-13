export interface Invitati {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
    password: string;
    allergies: string[];
    ruolo: string;
    dieta: string;
    participatione: string;
    plusOneAllowed: boolean;
    plusOneConfirmed: boolean;
    plusOne: PlusOne | null;
    partecipazione: string;

  }
  export interface PlusOne {
    id?: number; // Aggiungi `?` se non è sempre presente
    firstName?: string;
    lastName?: string;
    allergies?: string[];
    dieta?: string;
  }
