import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Profile } from '../../services/profiles/profile';
import { validationMessages } from './validation-messages';

const countries = ['Polish', 'English', 'French', 'Italian', 'German'];
const profileStatus = [ { value: true, view: 'Active' }, { value: false, view: 'Inactive' }];

interface Provider {
  buttonText: string;
  callback(formData: Profile ): void;
  userData?: Profile;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})

export class ProfileFormComponent {
  @Input() Provider: Provider;

  profile: object;
  profileForm: FormGroup;
  validationMessages: object;
  countries: Array<string>;
  profileStatus: Array<object>;
  buttonText: string;
  
  constructor(private formBuilder: FormBuilder) {
    this.profile = {};
    this.validationMessages = validationMessages;
    this.countries = countries;
    this.profileStatus = profileStatus;
    this.createForm(); 
  }

  onSubmit(): void {
    const updatedData = Object.assign(this.profile, this.profileForm.value);
    if (this.profileForm.invalid) return;
    this.Provider.callback(updatedData);
  }

  ngOnInit() {
    const userData = this.Provider.userData;
    if (userData) {
      this.profile = userData;
      this.profileForm.patchValue(this.profile);
    } 
    this.buttonText = this.Provider.buttonText;
  }


  createForm(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
		    Validators.minLength(1),
		    Validators.pattern('^[a-zA-Z]+'),
        Validators.required
      ])],
      surname: ['', Validators.compose([
        Validators.maxLength(25),
		    Validators.minLength(1),
		    Validators.pattern('^[a-zA-Z]+'),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.maxLength(25),
		    Validators.minLength(5),
		    Validators.pattern('[+][0-9]{2}(\\s[0-9]{3})+'),
        Validators.required
      ])],
      email: ['', Validators.compose([
		    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.required
      ])],
      rating: ['', Validators.compose([
        Validators.max(10),
        Validators.min(0),
        Validators.required
      ])],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationalities: ['', Validators.required],
      isActive: ['', Validators.required]
    });
  }
}
