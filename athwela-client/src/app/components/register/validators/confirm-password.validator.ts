import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    static matchPassword(control: AbstractControl) {
        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        if (password != confirmPassword) {
            control.get('confirmPassword').setErrors({ match: false });
        }
        else {
            control.get('confirmPassword').setErrors({ match: true });
        }
    }
}