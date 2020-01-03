import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    const isUserAuthorized = this.userService.isAuthorized();
    console.log('Auth guard');
    if (!isUserAuthorized) {
      this.router.navigate(['login']);
    }

    return isUserAuthorized;
  }
}
