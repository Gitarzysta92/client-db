export const validationMessages = {
  'name': [
    { type: 'required', message: 'Name is required' },
    { type: 'minlength', message: 'Name must have at least one character' },
    { type: 'maxlength', message: 'Name cannot be more than 25 characters long' },
    { type: 'pattern', message: 'Your Name must contain only letters' }
  ],
  'surname': [
    { type: 'required', message: 'Surname is required' },
    { type: 'minlength', message: 'Surname must have at least one character' },
    { type: 'maxlength', message: 'Surname cannot be more than 25 characters long' },
    { type: 'pattern', message: 'Your Surname must contain only letters' }
  ],
  'phone': [
    { type: 'required', message: 'Phone number is required' },
    { type: 'pattern', message: 'Enter valid a phone number +xx xxx xxx xxx' }
  ],
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  'rating': [
    { type: 'required', message: 'User rating is required' },
    { type: 'max', message: 'Rating should be below 10 ' },
    { type: 'min', message: 'Rating should be above 0 ' },
  ],
  'birthDate': [
    { type: 'required', message: 'Your birth date is required' },
  ],
  'gender': [
    { type: 'required', message: 'Your gender is required' }
  ],
  'nationalities': [
    { type: 'required', message: 'Your must provide at least one nationality' }
  ],
  'isActive': [
    { type: 'required', message: 'Your must confirm profile status' }
  ],
  }