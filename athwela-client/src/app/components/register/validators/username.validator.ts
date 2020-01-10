import { AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';

export class UsernameValidator {
    static createValidator(authService: AuthService) {
        return (control: AbstractControl) => {
            return authService.checkUsernameNotTaken(control.value).pipe(map(res => {
                return res['exists'] ? { usernameTaken: true } : null;
            }));
        };
    }
}