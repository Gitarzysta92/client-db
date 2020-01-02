import * as uuid from 'uuid/v4';

const profileProps: Array<string> = ['name','surname','birthDate', 'creationDate', 
'lastUpdate', 'gender', 'nationalities', 'phone', 'email', 'rating', 'isActive'];


interface UserData {
  name: string;
  surname: string;
  birthDate: Date;
  creationDate: Date;
  lastUpade: Date;
  gender: string;
  nationalities: number[];
  phone: string;
  email: string;
  rating: number;
  isActive: Boolean;
}

interface Profile extends UserData {
  readonly id: string; 
}

interface ApiResult {
  result: string | object | Array<Profile> | boolean;
  error?: string;
}



class Profiles {
  private profiles: Array<Profile>

  constructor(profiles: Array<UserData>) {
    this.profiles = this.setup(profiles) || [];
  }


  public addProfile(profileData: UserData): ApiResult {
    const isInvalid: boolean = this.validateData(profileData);
    if (isInvalid) return { result: false }

    const profile: Profile = this.createProfile(profileData);
    this.profiles.push(profile);
    return { result: profile.id };
  }


  public getProfiles(): ApiResult {
    return { result: this.profiles.length > 0 ? this.profiles : false };
  }


  public getProfile(id: string): ApiResult {
    const profile = this.profiles.find(profile => profile.id === id);
    return { result: profile ? profile : false }
  }


  public updateProfile(id: string, newData: UserData): ApiResult {
    const isInvalid: boolean = this.validateData(newData);
    if (isInvalid) return { result: false, error: 'invalid data' }

    const profile: object | undefined = this.profiles
      .find((profile, index) => {
        if (profile.id !== id) return false;   

        const updatedProfile = Object.assign(profile, newData);
        this.profiles[index] = updatedProfile;

        return true;
      });
      return { result: profile ? profile : false }
  }


  public removeProfile(id: string): ApiResult {
    const currentProfiles: number = this.profiles.length
    const updatedProfiles: Array<Profile> = this.profiles.filter(profile => {
      return profile.id !== id ? true : false;
    });
    if(updatedProfiles.length === currentProfiles) return { result: false }

    this.profiles = updatedProfiles;
    return { result: true };
  }


  private createProfile(profileData: UserData): Profile {
    const id: string = uuid();
    return Object.assign(profileData, { id });
  }


  private setup(profiles: Array<UserData>): Array<Profile> {
    return profiles.map(profile => this.createProfile(profile));
  }

  
  private validateData(incomingData: object) {
    return !profileProps.every(prop =>
      Object.prototype.hasOwnProperty.call(incomingData, prop));

  }

}

export default Profiles;