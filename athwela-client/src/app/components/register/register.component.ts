import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
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

  constructor(
    private validateService: ValidateService, 
    private flashMessage: NgFlashMessageService,
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
      this.flashMessage.showFlashMessage({
        messages: ["Please fill out all fields"],
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.showFlashMessage({
        messages: ["Please use a valid email"],
        dismissible: false,
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data['success']){
        this.flashMessage.showFlashMessage({
          messages: ["You are now registered and can log in"],
          dismissible: false,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.showFlashMessage({
          messages: ["Something went wrong"],
          dismissible: false,
          timeout: 3000,
          type: 'danger',
        });
        this.router.navigate(['/register']);
      }
    });
  }

}
