import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'profilesCRUD';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  unAuthorize() {
    this.userService.unAuthorize();
    this.router.navigate(['../']);
    console.log('asd')
  }


}
