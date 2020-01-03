import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';


import { MessageService } from '../messages/message.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  authState: Subject<boolean>;

  storageKey: string = 'token'

  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) { 
    this.authState = new Subject();

    let user = JSON.parse(localStorage.getItem(this.storageKey));
    if (user && user.isAuth) {
      User.data = true;
      this.authState.next(true);
    }
  }

  isAuthorized(): boolean {
    return !!User.data
  }

  authorize(): void {
    User.data = true;
    this.authState.next(true);
    localStorage.setItem(this.storageKey, JSON.stringify({ isAuth: true}));
    console.log('authorize');
    this.messageService.log('User authorized', 'ok');
  };

  unAuthorize(): void {
    this.localStorageService.clearStorage();
    User.data = null
    this.authState.next(false);
    this.messageService.clear();
    localStorage.removeItem(this.storageKey);
  }
}


class User {
  static data: any;
}
