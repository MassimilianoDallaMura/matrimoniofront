// src/app/interface/donation.interface.ts
export interface Donation {
    id?: number; // id è opzionale in quanto potrebbe non essere presente nel corpo della richiesta
    content: string;
  }
  