import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

import { Profile } from '../../services/profiles/profile';
import { ProfileService } from '../../services/profiles/profile.service';


interface FormSetup {
  buttonText: string;
  callback: Function;
  userData?: Profile;
}


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})


export class EditProfileComponent implements OnInit {

  formSetup: FormSetup;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location
  ) {
    this.formSetup = {
      buttonText: 'Update Profile',
      callback: this.updateProfile.bind(this)
    }
  }

  updateProfile(formData): void {
    formData.lastUpdate = this.getCurrentDate()  
    this.profileService.updateProfile(formData)
      .subscribe(res => res && this.location.back());
  }

  getCurrentDate(): string {
    const pipe = new DatePipe('en-GB');
    const currentDateTime = Date.now();
    return pipe.transform(currentDateTime, 'short');
  }

  getUserData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.profileService.getProfile(id).subscribe(user => {
      this.formSetup.userData = user;
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getUserData();
  }
}
