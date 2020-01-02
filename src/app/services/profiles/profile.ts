export class Profile {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  rating: number;
  birthDate: Date | string;
  creationDate: Date | string;
  lastUpdate: Date | string;
  gender: string;
  nationalities: Array<string>;
  isActive: boolean;
}