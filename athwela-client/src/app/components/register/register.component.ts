import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

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

  constructor(private validateService: ValidateService) { }

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
      console.log('Please fill in all fields');
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      return false;
    }
  }

}
