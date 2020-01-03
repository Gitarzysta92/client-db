import { Injectable } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authState: Subject<boolean>;

  storageKey: string = 'token'

  constructor(
    private messageService: MessageService
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
    this.messageService.log('User authorized', 'ok');
  };

  unAuthorize(): void {
    User.data = null
    this.authState.next(false);
    this.messageService.clear();
    localStorage.removeItem(this.storageKey);
  }
}


class User {
  static data: any;
}
