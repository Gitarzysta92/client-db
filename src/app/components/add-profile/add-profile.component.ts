import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';

import { Profile } from '../../services/profiles/profile';
import { ProfileService } from '../../services/profiles/profile.service';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})


export class AddProfileComponent implements OnInit {

  formSetup: object = {
    buttonText: 'Add profile',
    callback: this.addProfile.bind(this)
  }

  constructor(
    private profileService: ProfileService,
    private location: Location
  ) {}

  addProfile(formData: Profile): void {
    formData.creationDate = this.getCurrentDate();
    formData.lastUpdate = '';
    this.profileService.addProfile(formData)
      .subscribe(res => res && this.location.back());
  }

  getCurrentDate(): string {
    const pipe = new DatePipe('en-GB');
    const currentDateTime = Date.now();
    return pipe.transform(currentDateTime, 'short');
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
  }

}
