import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Profile } from '../../services/profiles/profile';
import { ProfileService } from '../../services/profiles/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profile: Profile;
  
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location
  ) {}

  getProfile(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.profileService.getProfile(id)
      .subscribe(profile => {  
        this.profile = profile;
      });
  }

  removeProfile(id: string): void {
    this.profileService.deleteProfile(id)
      .subscribe(res => this.location.back());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getProfile();
    
  }

}
