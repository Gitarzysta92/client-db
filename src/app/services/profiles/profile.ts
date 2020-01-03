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


  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.birthDate = data.birthDate;
    this.creationDate = data.creationDate;
    this.lastUpdate = data.lastUpdate;
    this.gender = data.gender;
    this.nationalities = data.nationalities;
    this.phone = data.phone;
    this.email = data.email;
    this.rating = data.rating;
    this.isActive = data.isActive;
  }

  
}