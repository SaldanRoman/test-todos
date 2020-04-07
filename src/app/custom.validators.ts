import { FormControl } from '@angular/forms';

export class CustomValidators {
  static required(control: FormControl): { [key: string]: boolean } {
    return control.value.trim() === '' ? { required: true } : null;
  }
}
