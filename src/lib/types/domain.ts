export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  gender: "MASCULINO" | "FEMININO";
  isAlive: boolean;
  photoUrl: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  disappearanceInfo: string | null;
  clothing: string | null;
  caseNumber: string;
  occurrenceId: number;
  foundDate: string | null;
  foundAlive: boolean;
}

export interface Tip {
  id?: number;
  ocoId: number;
  information: string;
  date: string;
  attachments?: File[];
  description?: string;
}

export interface SearchParams {
  query?: string;
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  location?: string;
  status?: string;
  sortBy?: "name" | "date" | "age";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}