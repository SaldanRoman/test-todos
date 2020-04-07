import { FormControl } from '@angular/forms';

export class CustomValidators {
  static required(control: FormControl): { [key: string]: boolean } {
    if (control.value.trim() === '') {
      return { required: true };
    } else {
      return null;
    }
  }
}
