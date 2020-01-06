import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



// import misc material elements
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

// import form material elements
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// App root component
import { AppComponent } from './components/main/app.component';

// App components
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { ComparisionComponent } from './components/comparision/comparision.component';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './components/entry/entry/entry.component';

import { NgForageModule, NgForageConfig, Driver } from 'ngforage';




@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    MessagesComponent,
    ProfileComponent,
    NavigationComponent,
    ProfileFormComponent,
    AddProfileComponent,
    EditProfileComponent,
    LoaderComponent,
    UserAuthComponent,
    EntryComponent,
    ComparisionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    NgForageModule.forRoot()
  ],
  providers: [
    MatNativeDateModule
  ],
  bootstrap: [EntryComponent]
})
export class AppModule {
  public constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'MyApp',
      driver: [ // defaults to indexedDB -> webSQL -> localStorage
        Driver.INDEXED_DB,
        Driver.LOCAL_STORAGE
      ]
    });
  }
}


