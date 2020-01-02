import { Component, OnInit } from '@angular/core';

import { Profile } from '../../services/profiles/profile';
import { ProfileService } from '../../services/profiles/profile.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})


export class ProfilesComponent implements OnInit {
  profiles: Profile[] = [];
  topRated: Profile[] = [];

  constructor(private profileService: ProfileService) {}

  getProfiles(): void {
    this.profileService.getProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
        this.topRated = this.getTopRated(profiles);
      });
  }

  removeProfile(id: string): void {
    this.profileService.deleteProfile(id)
      .subscribe(res => this.getProfiles());
  }
  
  sortDescending(arr) {
    return arr.sort((first, second) => second.rating - first.rating);
  }

  getTopRated(arr) {
    return this.sortDescending(arr).slice(0,4);
  }

  ngOnInit() {
    this.getProfiles();
  }

}
