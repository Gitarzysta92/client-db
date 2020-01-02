import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isAuthorized(): boolean {
    return !!User.data
  }

  authorize(): void {

    User.data = true;
  };

  unAuthorize(): void {
    User.data = null
  }
}


class User {
  static data: any;
}
