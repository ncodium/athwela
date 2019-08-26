import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMessage: NgFlashMessageService) { }

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
  }

}
