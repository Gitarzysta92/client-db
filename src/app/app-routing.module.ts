import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './components/main/app.component'
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { ComparisionComponent } from './components/comparision/comparision.component';


import { AuthGuardService } from './services/auth-guard/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },
  { path: 'profiles', component: AppComponent ,canActivate: [AuthGuardService], children: [
    { path: '', component: ProfilesComponent },
    { path: 'add', component: AddProfileComponent },
    { path: ':id', component: ProfileComponent },
    { path: 'edit/:id', component: EditProfileComponent }
  ]},
  { path: 'asd', component: AppComponent ,canActivate: [AuthGuardService], children: [
    { path: 'asd', component: ComparisionComponent }
  ]},
  
  { path: 'login', component: UserAuthComponent },
  
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
