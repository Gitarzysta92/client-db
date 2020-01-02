import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  isAuthorized(): boolean {
    return !!User.data
  }

  authorize(): void {
    User.data = true;
  };

  unAuthorize(): void {
    this.localStorageService.clearStorage();
    User.data = null
  }
}


class User {
  static data: any;
}
