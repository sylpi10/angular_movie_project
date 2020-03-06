import { FormGroup, AbstractControl } from "@angular/forms";

// To validate password and confirm password
export function ComparePassword(
  controlName: string,
  matchingControlName: string
) {
  return (registerForm: FormGroup) => {
    const control = registerForm.controls[controlName];
    const matchingControl = registerForm.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}