export interface CreatePlayerDto {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  dateJoin: string; // تُعامل التواريخ في TypeScript كـ string (بصيغة ISO مثل "YYYY-MM-DD")
  type: string;
}

export interface Player {
  playerID: Number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateJoin: string;
  type: string;
  status: string;
}

export interface Update_Player {
  playerID: Number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
}

export interface PlayerLookup {
  playerID: number;
  fullName: string;
}
