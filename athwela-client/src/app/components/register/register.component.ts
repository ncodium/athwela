import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  alerts: any = [];

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please complete the form!`
        }
      ];
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please use a valid e-mail!`
        }
      ];
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data['success']){
        this.alerts = [
          {
            type: 'success',
            msg: `You are now registered and can log in!`
          }
        ];
        this.router.navigate(['/login']);
      } else {
        this.alerts = [
          {
            type: 'danger',
            msg: `Something went wrong!`
          }
        ];
        this.router.navigate(['/register']);
      }
    });
  }

}
