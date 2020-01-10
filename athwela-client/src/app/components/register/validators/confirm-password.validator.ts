import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    static matchPassword(control: AbstractControl) {
        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        if (password != confirmPassword) {
            control.get('confirmPassword').setErrors({ doesNotMatch: true });
        }
        else {
            return null;
        }
    }
}